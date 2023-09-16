---
slug: semver-rolling-release-strategy
date: 2023-09-16
title: Combining semver and rolling releases
description: A hybrid format for combining semver with rolling releases for software versioning.
tags:
- software-design
- technology
- philosophy
---

I decided to take a hybrid approach for relase versioning on a new project I have joined.

I have been rather disillusioned with semver, and though I love semver, the disillusionment is about the inconsistency with which semver is applied to projects. In a project that I control alone (or with likeminds), I prefer semver because it conveys, as the name says, semantic information about the state of the software.

But, semver needs strict discipline thoughout the team. It demands a thorough understanding of the relative changes any changeset brings to accurately identify what the next version should be. `rustc` versioning is an ideal here.

The obvious alternative is rolling releases, but then I get tired of the long strings of non-semantic information in the version tags. For example, it is cool that you decided to release a software on the 1st of January, 2023, but IDK about the state of the software without going through the release notes. I am a proponent of semantic names.

I decided to strike a balance with this project. Why not mix semver with rolling releases? The solution: Drop the patch, and add a pre-release in `YYYYMMDD` format.

The version format thus becomes: `v<major>.<minor>-<YYYYMMDD>`.

At this point, it is not semver anymore since semver requires using the `patch`. Here is why that is acceptable in this project’s context.

In this scheme, a change in the `major` version will denote a break of backwards compatibility of any public API. A change in the `minor` version will denote new features or deprecation of existing public APIs. We don’t need the `patch` because the team will continue on a rolling weekly release. Internal changes that do not affect public APIs do not change the `major` or `minor`, and only increase the date. So, any bug fixes or hotfixes ship anyway and will result in an increment of the date stamp.

A version release is thus read as “a release for the `<major>.<minor>` branch made on the `YYYYMMDD` date”. So, when you see `v0.2-20230918` it kinda becomes self-evident.

This seems like a good balance that conveys some semantic information while staying true to a rolling release pattern, and the team members don’t have to fight over what the next minor or patch version should be.
