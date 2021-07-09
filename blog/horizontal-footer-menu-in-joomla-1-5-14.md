---
date: 2009-10-05
slug: horizontal-footer-menu-in-joomla-1-5-14
title: Horizontal Footer Menu in Joomla 1.5.14
tags:
  - joomla
---

This is an easy method to create horizontal footer menu in Joomla 1.5.14. It needs no javascript or special CSS modification. Joomla comes with tools capable enough to handle this on its own :-)<!-- more -->

**Steps:**




  * Create a menu from the Menu Manager. (Find how to create a menu [here](http://help.joomla.org/content/view/322/276/). Skip this step if you need to edit an existing menu.)


  * Go to Module Manager and edit the menu module.


  * Set menu "Position" to "syndicate", "footer" or any similar position applicable to your template.


  * In the "Parameters" box on the right, unfold "Module Parameters" and set **"Menu Style"** to **"Legacy - Horizontal"**. (That's the trick.) Note: "System - Legacy" plugin does not need to be enabled for this.


  * At this stage, all the menu items will appear horizontal but will be huddled up together. To separate the menu items from each other, unfold the "Other parameters" box and put a text separator in the field for "Spacer". The character "|" looks nice but this will depend upon the developer. If any character is needed at the beginning and end of the footer menu, put that character in the "End Spacer" field.


That's all. These simple steps will produce a simple horizontal footer menu in Joomla 1.5. However, this procedure will not support multilevel menus. CSS modification will be required in that case.
