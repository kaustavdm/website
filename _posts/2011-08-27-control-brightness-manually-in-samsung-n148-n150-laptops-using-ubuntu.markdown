---
author: kaustav
comments: true
date: 2011-08-27 04:06:00+00:00
layout: post
slug: control-brightness-manually-in-samsung-n148-n150-laptops-using-ubuntu
title: Control brightness manually in Samsung N148 / N150 laptops using Ubuntu
categories:
- Ubuntu
---

My Samsung N148 Plus netbook (or mini-notebook) gave me quite some trouble using the brightness controls on it. There are a number of known issues regarding this.
After doing some search in the Ubuntu forums and other blogs, I finally decided to use a rather direct method to increase brightness of my laptop. I suggest you use this with caution, if you plan to use it since this method exposes uses super-user rights. Also note that this method requires a basic familiarity with the terminal.<!-- more -->
Anyway, here are the steps:





  1. First, I created a file named "brightness" in "/usr/bin/".


  2. Then I pasted this code in it: sudo setpci -s 00:02.0 F4.B=50


  3. Make the file executible. sudo chmod +x /usr/bin/brightness


  4. Now in the terminal, enter "brightness" and it will ask for the su password. Once given, it will increase the brightness of the screen to the specified level.


Try experimenting with the value at the end of the code ( B=50 ) to find what fits your eyes.
