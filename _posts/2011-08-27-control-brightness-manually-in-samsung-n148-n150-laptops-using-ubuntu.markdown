---
author: kaustav
comments: true
date: 2011-08-27 04:06:00+00:00
layout: post
slug: control-brightness-manually-in-samsung-n148-n150-laptops-using-ubuntu
title: Control brightness manually in Samsung N148 / N150 laptops using Ubuntu
wordpress_id: 17
categories:
- Ubuntu
---


<table cellpadding="0" style="float: left; margin-right: 1em; text-align: left;" cellspacing="0" class="tr-caption-container" >
<tbody >
<tr >

<td style="text-align: center;" >[![](http://1.bp.blogspot.com/-64hOWzu0hBs/TsszYeYiRDI/AAAAAAAAAZM/-mTPNAllT5A/s200/01_medium_NP-N148P.jpg)](http://1.bp.blogspot.com/-64hOWzu0hBs/TsszYeYiRDI/AAAAAAAAAZM/-mTPNAllT5A/s1600/01_medium_NP-N148P.jpg)
</td>
</tr>
<tr >

<td style="text-align: center;" class="tr-caption" >Samsung N148
</td>
</tr>
</tbody>
</table>
My Samsung N148 Plus netbook (or mini-notebook) gave me quite some trouble using the brightness controls on it. There are a number of known issues regarding this.
After doing some search in the Ubuntu forums and other blogs, I finally decided to use a rather direct method to increase brightness of my laptop. I suggest you use this with caution, if you plan to use it since this method exposes uses super-user rights. Also note that this method requires a basic familiarity with the terminal.<!-- more -->
Anyway, here are the steps:




	
  1. First, I created a file named "brightness" in "/usr/bin/".

	
  2. Then I pasted this code in it: sudo setpci -s 00:02.0 F4.B=50

	
  3. Make the file executible. sudo chmod +x /usr/bin/brightness

	
  4. Now in the terminal, enter "brightness" and it will ask for the su password. Once given, it will increase the brightness of the screen to the specified level.


Try experimenting with the value at the end of the code ( B=50 ) to find what fits your eyes.

image source: samsung.com


