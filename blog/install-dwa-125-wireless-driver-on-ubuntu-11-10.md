---
date: 2011-10-27
slug: install-dwa-125-wireless-driver-on-ubuntu-11-10
title: Install DWA-125 wireless driver on Ubuntu 11.10
categories:
- DWA-125
- Ubuntu
---

[DLink DWA-125](http://www.dlink.com/products/?pid=722) wireless adapter can be installed on Ubuntu 11.10 from driver source. This article builds on [this post](http://ubuntuforums.org/showthread.php?t=1289917) on Ubuntu Forums by [flbiggs](http://ubuntuforums.org/member.php?u=98328).There is no driver available for DWA-125 on Linux. So, we need to compile the chipset driver from source. Ubuntu 11.10 ships with Linux 3. So even if someone had installed using flbiggs' method in an earlier version of Ubuntu, he/she might have to redo the entire process from scratch, since as in my case, the driver was not automatically updated to the new version of Linux. Even symlinking the old driver did not work. It turned up incompatibility errors. So here's how to install DLink DWA-125 on Ubuntu 11.10. As noted by other users, this method works for Ubuntu 12.04 as well.<!-- more -->


**Update**
If your DLink DWA-125 stops working after a kernel upgrade, I recommend you reinstall from source code, according to the process below, by compiling for the new kernel version.

**Before you begin**
To run the commands mentioned in this article, you need to have [sudo](https://help.ubuntu.com/community/RootSudo) access. Also, if you don't have build-essential package installed, please install it. You can enter sudo apt-get install build-essential in terminal to get it installed.

**Download source**
First, get the source code. The source code is available from [Ralink](http://www.ralinktech.com/). Extract the downloaded zip file to a suitable location.

**Install**
For the purpose of this documentation, let's assume the Ubuntu username to be "user" and the path to the folder where the zip file was extracted to be "~/source/dwa-125".

**Edit configuration:**
Edit the file ~/source/dwa-125/os/linux/config.mk and change the following values:

```
# Support Wpa_Supplicant
HAS_WPA_SUPPLICANT=y

# Support Native WpaSupplicant for Network Maganger
HAS_NATIVE_WPA_SUPPLICANT_SUPPORT=y
```

**Open a terminal and change directory:**

```
$ cd ~/source/dwa-125
```

**Run "make"**

```
$ sudo make
```

**Run "make install"**

```
$ sudo make install
```


**Blacklist unnecessary drivers**
Edit `/etc/modprobe.d/blacklist.conf` and add these lines:

```
blacklist rt2x00usb
blacklist rt2x00lib
blacklist rt2800usb
```

**Activate driver module**
For Ubuntu 11.10, I found that I needed to use RT5370STA instead of RT3070STA as mentioned by flbiggs. So here's the command you need to get the module activated and to bring up the DWA-125 wireless device:

```
$ sudo modprobe rt5370sta
```


This should bring up the wireless adapter and network manager should start scanning and detect available wireless networks.

**Make driver load on startup**
Edit `/etc/modules` and add this line:

```
rt5370sta
```

This should activate the DWA-125 wireless device every time you turn on the computer.
