---
layout: post
slug: versioning-content-postgresql
title: Store revisions of content in PostgreSQL
subheader: A simple way of storing and retrieving older versions of content, a.k.a, record history in PostgreSQL using triggers.
tags:
- postgresql
- database
---

Last weekend I was working on an upcoming discussion platform where we need to maintain edit history of comments. If a user posts some content and edits it, we want to store the content of the previous versions instead of just overwriting the content. Each revision is recorded and can be viewed at any time and can be linked to directly. Simple version control semantics.

We use PostgreSQL as the database for this application. We code SQL directly in the application and use `PL/PGSQL` where necessary. This lets us exploit much of the power of the database, which would not have been possible when using an ORM exclusively.

This article discusses the methods I used to manage record history for the comments and the requirements that shaped the design decisions. While some of the techniques here are specific to the system I am working on, they can help in similar scenarios which require developers to save edits of content they store in PostgreSQL.

## Requirements

While building a revision control system for the content of this platform, I wanted to offload the task of creating and maintaining revisions to PostgreSQL instead of letting the application server manage the complexities. The result was a simple and elegant solution with fewer lines of SQL than it was possible in application code.

The overall set of requirements was this:

- On each edit of comment node, store its previous data.
- Keep copies of the whole data in each revision, instead of storing a diff. This compromised storage space for speed of rendering the content and reduced complexity on the application side.
- Make it possible to retrieve specific revision of a given comment node.
- Only keep revisions of the user-generated content of the node. This includes subject and body of the node.

## Implementation

Here is the gist of the approach I used for the implementation.

The application will access latest content of a node more frequently than the revisions of that node. So, I kept the latest content in the main `nodes` table and moved revisions to a separate revisions table called `node_revisions`. The revision table is populated using [triggers][create-trigger] whenever any row in the main table is updated. The revision table maintains a foreign key constraint to the main table to identify the node to which the revision belongs to.

The relationship between nodes and their revisions can be summed up as: Each node can have many revisions, each revision belongs to one node.

### Main table

This is what the `nodes` table looks like (stripping additional columns not relevant here):

```sql
create table nodes (
    -- ID is created as bigint and used as primary key.
    -- This can be replaced with `bigserial` if you want auto-generated
    -- serial numbers
    id bigint not null primary key,

    -- Store timestamp that defaults to current time when
    -- a new nodes record is inserted
    created_at timestamp with time zone not null default now(),

    -- Store timestamp when the node was last updated. Defaults to null
    -- if node was not updated before
    updated_at timestamp with time zone,

    -- Subject stores the title of the node. This is specified by the
    -- user and is used for versioning. It is a nullable field.
    subject text,

    -- Body stores the description of the node. This is specified by the
    -- user and is used for versioning. It is also a nullable field.
    body text
);
```

What happened here:

- The `id` column is used to store a `bigint` to use as primary key in this example. In our application, we use a PostgreSQL function to generate the IDs but I skipped that part for this article. You can always use a `bigserial` instead, if you want PostgreSQL to auto-generate a sequential ID for your table.
- This table has a `created_at` column that stores the timestamp of when the row was inserted, that is what the `default now()` declaration does.
- There is an `updated_at` column which only has a timestamp value if a given record in the table was updated, otherwise it remains `null`.
- The `subject` and `body` columns are used to store content supplied by the user. These are the actual content that we want to store revisions of.

### Revisions table

This is what the `node_revisions` table looks like (once gain, stripping additional columns that are not relevant):

```sql
create table node_revisions (
    -- Foreign key constraint referencing the `id`
    -- column from the `nodes` table
    node_id bigint not null references nodes(id),

    -- This is timestamp of when this specific revision
    -- was originally created
    created_at timestamp with time zone,

    -- Copy of the `subject` column
    subject text,

    -- Copy of the `body` column
    body text,

    -- Create a composite primary key of node_id and created_at
    primary key (node_id, created_at)
);
```

What happened here:

- We use a composite primary key made of `node_id` and `created_at`, instead of using a separate ID for `node_revisions`. The rationale here is that each node will only have one revision at any given microsecond, which is a fair enough assumption to make.
- The `created_at` column actually reflects the timestamp when this revision's entry was actually created. So, the first revision of a node will contain the `created_at` timestamp of when the node was created.
- The `subject` and `body` columns are supposed to be populated with the exact content of the node.


### Trigger

When any row in `nodes` table is updated, we want to copy over the older content of that row as a revision in `node_revisions` table. This is where I used triggers. [Triggers in PostgreSQL][triggers] let you run a [custom procedure][procedure] on certain events, like insert or update or delete.

I created a small data change trigger that runs a custom procedure. This procedure inserts a new row in the `node_revisions` table using the `OLD` row of the `nodes` table. This trigger is run before each row update on the `nodes` table. Let's see how this works.

First, we need to write a database function to act as the procedure for the trigger. This function is written in PL/PGSQL and needs to return a `trigger`. Here is the code:

```sql
create or replace function trigger_on_node_revision()
    returns trigger
    language plpgsql as $body$
begin

    -- Create node revision only if node's subject or body columns have changed
    if old.subject <> new.subject or old.body <> new.body then
        if old.updated_at is null then
            -- First edit of node
            insert into node_revisions (node_id, created_at, subject, body)
            values (old.id, old.created_at, old.subject, old.body);
        else
            -- Subsequent edits of node
            insert into node_revisions (node_id, created_at, subject, body)
            values (old.id, old.created_at, old.subject, old.body);
        end if;
    end if;
    -- Return the `NEW` record so that update can carry on as usual
    return new;
end; $body$;
```

Then, we'll have to create the trigger to run the `trigger_on_node_revision()` function before update for each row on the `nodes` table:

```sql
create trigger trigger_node_revision
  before update
  on nodes
  for each row
execute procedure trigger_on_node_revision();
```

What happened here:

- First, in the procedure, we check if the content to the `subject` or the `body` column has changed in the update. This is possible using the special variable named `OLD` which holds the old database row for update or delete operations for triggers run for each row.
- Then, we check if this is the first edit of the node. In our case, the `updated_at` column is `null` if the node hasn't been updated ever. In that case, the `created_at` time for the revision is set as the `created_at` time for the node. Else, the `updated_at` time for the node is set as the `created_at` time for the revision.
- Then, we insert a new row into `node_revisions` using the content of the `OLD` row.
- Then, finally, we create the trigger to execute to procedure we have created.

## Next steps

With everything in place, now we just need to insert and update records in the `nodes` table. Here is how the queries look like:

Insert row with id `1` in `nodes`:

```sql
insert into nodes (id, subject, body)
    values (1, 'Hello World', 'Nice to meet you!');
```

Change the subject of the node with id `1` to 'Hello there':

```sql
update nodes set
    subject = 'Hello there',
    updated_at = now() -- We set this explicitly
where id = 1;
```

Get latest content of node with id `1`:

```sql
select id, created_at, updated_at, subject, body
from nodes
    where id = 1;
```

Get revisions of node with id `1` (latest first):

```sql
select created_at, subject, body
from node_revisions
    where node_id = 1
order by created_at desc;
```

---

That's all we need in the database side of things. PostgreSQL will take care of populating the revisions table and making sure that no revision is lost. Triggers, FTW!

[create-trigger]: https://www.postgresql.org/docs/9.1/static/sql-createtrigger.html
[triggers]: https://www.postgresql.org/docs/current/static/triggers.html
[procedure]: https://www.postgresql.org/docs/current/static/plpgsql-trigger.html
