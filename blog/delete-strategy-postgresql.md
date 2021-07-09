---
date: 2018-01-19
slug: delete-strategy-postgresql
title: Choosing delete strategy in PostgreSQL
description: Whether to soft delete or hard delete user-generated content in an application's database should depend on the nature of the data being deleted. Here is a high level strategy for making that decision based on users' intentions.
image: /assets/images/covers/delete-strategy.jpg
tags:
- postgresql
- database
---

I have previously discussed the approach I took to [store record history in PostgreSQL][versioning] for a discussion platform that we are building. I had to do a close analysis of what strategy to use when it comes to deleting content as part of data modelling for the same application. This article lays down the strategy I used to decide the approach to take. This strategy can come in handy for anyone building a system that handles user generated content, like blog posts, articles, comments, threads etc. and needs to provide options for deleting them.

There are many good resources[^1] on the internet discussing the merits of actually deleting the content compared to just marking it as deleted[^2]. The go-to suggestion of database experts seem to lean towards avoiding soft deletes whenever possible. Soft deletes bloat table and index sizes resulting in slower queries and can be troublesome for unique indexes.

Yet, the answer is often not that straightforward. It gets tricky when your data has relations. For example, if you are building a commenting system, the comments are likely to have foreign key relations to articles, which can in turn have foreign key relations to categories and articles may reference each other. The whole purpose of having foreign key constraints is to ensure data integrity and avoid accidental deletes. You cannot use `ON DELETE CASCADE` in such situations. You don't want to set off a chain of deletes.

## Identify user intentions

Basing the decision on what the user wants to do with the data makes the delete strategy clearer to reason with. There are, broadly speaking, two different intentions that a user can have towards removing access to data they have produced. For the sake of this article, let us refer to such user-generated items as "posts".

### Scenario 1: Hide

The first intent is where user wants to hide the contents[^3] of the post. In this case user is okay with others knowing that the post existed and but its contents have been explicitly hidden and any actions suspended. This is the ideal case for soft-delete.

Here user is aware that other posts can link to the current post. But they don't want anyone to access the content of that post any more. Anyone following a link from another post can end up at this post only to find it to be marked as deleted.

User would want an option to un-hide the post, though the actual number of times this happens can be rare. Additionally, user would not want the hidden post to appear in lists or searches by default.

### Scenario 2: Delete

The second intent is where user wants to delete and remove any trace of the post. In this case user wants the post gone and not just to hide it.

When user chooses this they do not want anyone to discover the post or know about its existence or link to it. They are also very unlikely to want to recover the deleted post. Existing URLs can return 404.

---

The content being removed may or may not be sensitive in either case. So, user is likely to go for hiding content instead of deleting it when:

- there is a higher chance of restoring the post in future, and
- when user wants to retain reference to the post.

But, user is likely to opt for deleting content if the content is sensitive.

## What happens when content is hidden or deleted

Depending on the permission model used, user can typically hide any post that they are author of or if they have admin rights. Hiding a post does not have side effects. Only the contents are hidden. No other posts or references need to be updated to hide a post. Only the post in question needs to be marked as hidden.

Delete has a destructive intention and has side effects. To decide what happens on delete, you need to decide under what conditions you will allow posts to be deleted. There are two choices. You need to pick one, but you can implement both in your application:

- **Safe:** Do not allow posts with references to be deleted to prevent loss of context. Use foreign key constraints in the database definition to make sure there are no dangling posts[^4]. In that case, the database design will not allow said post to be deleted (for good reasons) to maintain referential integrity. If any other post or other data references current post, then it is already part of knowledge chain. This means user can only delete a post that has no other reference to it.

- **Force:** Allow posts with references to be deleted at the cost of context loss. In this case, treat delete as a severely destructive operation (alert user 5 times asking, "Are you sure?") and forcefully delete the post by nullifying all references to it. This will cause all references to be obsolete. You can ensure that all references are set to `null` by using `ON DELETE SET NULL` on the foreign key constraint. **Use this only as an extreme measure when the data you are deleting has relations.**

## Retaining copy of content after delete

In case you decide to actually delete content, you can use triggers in PostgreSQL to archive a copy of the content to another table. Here is an example built from the schema I discussed in a [previous article][versioning].

First, create a mirror table which uses same schema as the original table except don't use any foreign key constraints on it.

```sql
-- Create table to store deleted node data
create table node_archives
  (like nodes excluding constraints);
```

Then, create a trigger that copies data on delete from the main table to the mirror table.

```sql
-- Create trigger function to copy nodes data to nodes_archive
create or replace function trigger_archive_node_on_delete()
    returns trigger
    language plpgsql as $body$
begin
  -- insert a copy of that data into node_archives
  insert into node_archives
      (id, created_at, updated_at, subject, body)
  values
      (old.id, old.created_at, old.updated_at, old.subject, old.body);
  return old;
end; $body$;

-- Create trigger to archive node on delete
create trigger trigger_node_archive
  before delete
  on nodes
  for each row
execute procedure trigger_archive_node_on_delete();
```

That way, if you delete a row from the `nodes` table, it will be removed from the `nodes` table but will be backed up in the `node_archives` table.

---

Following a method like this will ensure that you pick the best possible combination of strategy for responsibly deleting user generated content. As a bonus, you get to retain a copy of data for audit if needed.

[^1]: For starters, see [this thread][so-soft] on StackOverflow.
[^2]: This is usually called "soft delete".
[^3]: You can also call it "archiving".
[^4]: This is what happens to child and adjacent nodes in a graph when you remove a node without cleaning up its children or adjacencies.

[so-soft]: https://stackoverflow.com/questions/378331/physical-vs-logical-soft-delete-of-database-record
[versioning]: /blog/versioning-content-postgresql
