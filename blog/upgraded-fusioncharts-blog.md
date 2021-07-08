---
author: kaustav
comments: true
date: 2014-01-04
layout: post
slug: upgraded-fusioncharts-blog
title: How we upgraded the FusionCharts blog
tags:
- blog
- fusioncharts
- wordpress
---

Last week we did [a major infrastructural and architectural change](http://blog.fusioncharts.com/2014/01/48-hour-marathon-to-a-better-blog/) on the [FusionCharts blog](http://blog.fusioncharts.com). We finished the whole thing in a hackathon! The hackathon aimed at finding the key culprits causing performance issues and fixing them in a span of 48 hours. How cool can it be if you work in a company that organizes such code sprints time and again! I love this attitude :-D<!-- more -->



## What was the problem



The FusionCharts blog gained a significant number of audience over the years, but the blogging system was not performing well under the heavy load it received. The code base did not receive a good polish in the last couple of years to cope up with this situation. This affected page load times, which went as high as a few seconds for page generation.

The admin interface of the blog was taking even longer to load. Though this did not harm page loading times for the end user, publishing was not a pleasurable experience.

The blog is built on WordPress. So for any custom task, there was a plugin installed. Plugins are good as long as you can tame the beast. They listen to hooks fired by WordPress and add custom functionality for almost every step of the page generation process. Too many plugins, thus, decrease the efficiency of serving pages faster.

The theme used a number of custom classes to decorate a post. Some of the media plugins used on the blog then, actually put inline CSS for each element! We needed our posts to be composed of as pure markup as possible and the theme should take care of styling them appropriately. This called for a redesign of the theme and improving those styles.



## Unexpected results



We started scanning for performance penalties from the server level. So, step 1 was moving the blog to a separate server of its own. For this, we did a trial run on a t1.micro instance of AWS by moving the entire blog's code and database to the new server. But there was no significant improvement in page loading times.

Next, we disabled all plugins one by one, but still did not manage to reduce the page loading time.

This left us with only one possible candidate -- the theme layer. FusionCharts blog uses the Thesis theme framework for WordPress for its theme. The Thesis version was outdated and it was causing some unexpected issues with the latest versions of WordPress. The moment we disabled the existing theme and switched to a stock WordPress theme, page generation time went down to 800ms-900ms.



## Building WordPress from scratch



That performance was not enough for us. It was too cumbersome to pin-point other performance bottlenecks in our existing WordPress installation. So we decided to install a fresh copy of WordPress, reconsider each and every plugin, and use only those which has the least footprint.



### Replacing plugins



During the period since which the blog's code base was last upgraded, WordPress has evolved at a rapid rate. A lot of plugins have been replaced with core functions available from WordPress. For example, WordPress now includes full-blown media management, image resizing features are built in, and the visual editor has improved a hell lot. So we could get rid of three such plugins, which in turn reduced complexity in the workflow and enhanced page rendering times by that wee bit.

We found a feature-complete replacement of our syntax highlighter plugin, but the majority of heavy load is still taken by JetPack and spam filtering by Akismet.



## Re-creating the theme



Typography and semantic layout was comparatively weak in the previous theme. However, we were not ready to get rid of the theme because of its branding factor. Instead, we decided to rebuild the theme on the newest version of the Thesis framework.



### Challenges in creating the new theme



It turned out that the new API of the Thesis framework has completely changed compared to the older version used in the previous theme. Also, documentation for the new APIs and techniques are scarce.

The creators of the Thesis framework have apparently assumed that a completely GUI driven solution works best for their user base. You don't code your theme any more, but drag and drop elements, re-order them, rename them, all from the GUI that Thesis provides. This took some learning as it meant doing the things we are used to in an entirely different (often, weird) way.



### But we managed it



It took us some time, but in the end, we managed to recreate the entire theme from ground up, and made it resemble the older theme as much as possible. As a bonus, the new theme is now responsive, and works across devices! Typography has been greatly improved and we pruned the posts to match the newer set of styles, which in most of the cases meant getting rid of unwanted inline styles and render the post content as pure HTML markup.



### A by-product obtained



To help clean up posts faster, I wrote a [small tool](http://static.kaustavdm.in/html-cleanup/index.html) which would take a content of a post and clean up its inline styles and other unwanted attributes at the click of a button. This tool can be extended to be a full-featured dirty post cleanup program with loads of customizable options. Maybe even an API which you can call interactively ;-) Another item added to my to-do list!



## After the hackathon



The blog is now seeing about 5x performance improvement on the frontend and over 10x performance improvement on the backend. We have made writing articles simpler. The blog has become a pleasurable experience.

Kudos to Prithwiraj, Uttam and Shamasis for making this hackathon a success!

We have more plans in the bag. Something on the lines of a big revamp of the frontend in near future. So watch out for it!



## References







  * [48 hour marathon to a better blog](http://blog.fusioncharts.com/2014/01/48-hour-marathon-to-a-better-blog/)



