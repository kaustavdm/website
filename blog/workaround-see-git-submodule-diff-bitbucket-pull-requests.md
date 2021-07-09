---
date: 2014-05-14
slug: workaround-see-git-submodule-diff-bitbucket-pull-requests
title: Workaround to see Git submodule diff in Bitbucket pull requests
tags:
- bitbucket
- git
---

If you update a [git submodule](http://git-scm.com/book/en/Git-Tools-Submodules) and send a pull request for that changeset on your project on Bitbucket, the diff in the pull request page does not show the change in the submodule commit hash. As a reviewer of the core repository in [FusionCharts](http://www.fusioncharts.com), I have to deal with plenty of submodule updates that do not reflect in the pull requests. You can always see the diff if you download the branch on your local machine and use `git diff` or a tool like SourceTree. But what if you wanted to see them live on Bitbucket? <!-- more -->



## Get the raw commit diff



The solution is to see raw commit diff on Bitbucket. A raw commit diff is the pure text output produced by running `git diff` on the changeset. The raw commit diff looks like this:

[caption id="attachment_913" align="alignnone" width="435"][![Raw commit diff of submodule update](https://kaustavdm.in/wp-content/uploads/2014/05/Screenshot-2014-05-14-12.34.151.png)](https://kaustavdm.in/wp-content/uploads/2014/05/Screenshot-2014-05-14-12.34.151.png) Raw commit diff of submodule update[/caption]

This is how you can get to the raw diff of a commit having a submodule change on Bitbucket:





  1. On your pull request page, head over to the **"Commits" tab** and locate the commit in which the submodule update was added. Go to the **commit's page** by clicking on the commit hash.

At FusionCharts, we have a strict policy of committing submodule updates in individual commits, so we do not mix submodule changes with other diff. This makes submodule updates easily discoverable later on.


  2. Click the **"View raw commit"** link on the right hand side of the page.


  3. See the submodule diff! The lines of interest to you would be the lines that look like this:





    <code>-Subproject commit 623d25e633c6f036806f0488449e08f5f3033e5c
    +Subproject commit 4fea3ad0a9b28b38ba31fbfeab4af4cd086c6dfe
    </code>





The first line mentions the previous commit hash of the submodule and the second line mentions the updated commit hash which the submodule now points to.


