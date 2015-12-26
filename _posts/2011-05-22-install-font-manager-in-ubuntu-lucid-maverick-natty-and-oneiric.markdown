---
author: kaustav
comments: true
date: 2011-05-22 20:08:00+00:00
layout: post
slug: install-font-manager-in-ubuntu-lucid-maverick-natty-and-oneiric
title: Install Font Manager in Ubuntu Lucid, Maverick, Natty and Oneiric
categories:
- Ubuntu
---

## Background


I have installed Ubuntu 10.04 LTS Server x86_64 with XFCE on my PC and I'm gearing it towards a full-featured development environment for my web development tasks. In the meantime, I've been trying to learn more about Ubuntu/Debian and got myself interested in learning Ubuntu/Debian packaging.

I had been looking for some decent font viewer/manager application and found [Jerry Casiano's Font Manager (font-manager)](http://code.google.com/p/font-manager/) from [XFCE RecommendedApps](http://wiki.xfce.org/recommendedapps) page. A quick search on Launchpad.net did not show me any package available for Lucid. So I decided to try my newly learnt skills in packaging font-manager from source and uploading it to my PPA on Launchpad. I used font-manager 0.5.7's source package from [Font Manager's download page on Google Code](http://code.google.com/p/font-manager/downloads/list).<!-- more -->



After some failures, (I am yet far from being a packaging expert) I carefully sorted out build dependencies and ran _pbuilder_ on my computer and found the package to be successfully built. The next step was to _dput_ it to my launchpad PPA at [ppa:kaustav-dasmodak/kido](https://launchpad.net/~kaustav-dasmodak/+archive/kido). Imagine my joy on the first successful build for Lucid in the PPA! :)

That was yesterday, and, since then I have prepared builds for Maverick, Natty and Oneiric. I sent out an email to Jerry Casiano telling him about my packaging and he has appreciated my effort, though I'm sure there are many glitches to be found in the packaging. For my reference, he pointed out that there is already a package for font-manager in Natty, but I'm glad to have done something myself. :)


## 
Installing font-manager in Ubuntu 10.04, 10.10, 11.04 and 11.10


Font Manager 0.5.7 used in my packaging is presently being bugfixed and a new revision with the changes will be rolled out soon. Still, if you like Font Manager and want to install it on your Ubuntu machine, you can follow these easy steps to install the program from my PPA on Launchpad.

At the present, I have tested the builds for lucid x86_64 and natty x86. Other builds should work for their respective distribution. However, if they don't, feel free to contact me with the installation error.

So, here are the steps:



	
  1. **Add my ppa repository to your software sources:**
In terminal, use the following command:
sudo add-apt-repository ppa:kaustav-dasmodak/kido

	
  2. **Update you apt repository information:**
In terminal, use the following command:
sudo apt-get update

	
  3. **Install font-manager 0.5.7:**
Use the following command in terminal:
sudo apt-get install font-manager




If apt-get prompts you about installing unauthenticated software, go ahead with the installation. For further details, please check the PPA page at [ppa:kaustav-dasmodak/kido](https://launchpad.net/~kaustav-dasmodak/+archive/kido).










My thanks to Jerry Casiano, Karl Pickett and Wouter Bolsterlee whose contributions have made this effort possible.
