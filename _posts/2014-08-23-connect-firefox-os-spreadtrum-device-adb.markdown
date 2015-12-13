---
author: kaustav
comments: true
date: 2014-08-23 11:09:18+00:00
layout: post
slug: connect-firefox-os-spreadtrum-device-adb
title: Connect Firefox OS Spreadtrum devices through adb
wordpress_id: 954
categories:
- Mozilla
tags:
- adb
- Firefox OS
- spreadtrum
---

The ultra low-cost [Firefox OS](https://www.mozilla.org/en-US/firefox/os) devices to be launched in India are built on Spreadtrum chipsets. Here are the quick steps for people running Linux or OS X to connect their Spreadtrum devices through `adb`:



## Make sure if the device is detected







  * Connect the device through a USB cable.


  * Enable `Remote Debugging` on the device from the `Developer` menu.


  * Run `lsusb` on Linux and ensure that the device is detected. the output of `lsusb` will have a line like this:




    
    <code>$ lsusb
    ...
    Bus 003 Device 008: ID 1782:5d04 Spreadtrum Communications Inc. 
    ...
    </code>



<!-- more -->

Here, `1782` is the vendor ID and `5d04` is the product ID. If you don't see your device in this output, make sure you've enabled `Remote Debugging` and the USB cable or the device itself is not faulty.

Note: OSX users can use [`lsusb` for OSX](https://github.com/jlhonora/lsusb).



## Create `udev` rule:







  * Edit (or create) `/etc/udev/rules.d/51-android.rules` and add:




    
    <code>SUBSYSTEM=="usb", ATTRS{idVendor}=="1782", MODE="0666"
    </code>







  * Restart `udev`. On Linux, do this:




    
    <code># /etc/init.d/udev restart
    </code>





## Add vendor ID to `adb_usb.ini`







  * Edit (or create) `~/.android/adb_usb.ini` and add this on a new line:




    
    <code>0x1782
    </code>







  * Ensure that this line is not repeated in the `adb_usb.ini` file.





## Restart `adb` server and reconnect the device







  * Kill adb server




    
    <code>$ adb kill-server
    </code>







  * Connect the device through USB cable.


  * Search for devices through `adb`. This will respawn the `adb` server.




    
    <code>$ adb devices
    </code>



If everything is in place, the device should show up in the `List of devices attached` in the output.

Sources:





  * [Getting adb to work with Spreadtrum devices](http://mobreveng.blogspot.in/2013/10/getting-adb-to-work-with-spreadtrum.html).


