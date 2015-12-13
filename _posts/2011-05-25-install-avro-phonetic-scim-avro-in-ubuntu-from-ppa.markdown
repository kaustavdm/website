---
author: kaustav
comments: true
date: 2011-05-25 18:02:00+00:00
layout: post
slug: install-avro-phonetic-scim-avro-in-ubuntu-from-ppa
title: Install Avro Phonetic (scim-avro) in Ubuntu from PPA
wordpress_id: 16
categories:
- Avro
- Ubuntu
---




**Update: [Avro Phonetic on GNU/Linux is now stable](http://kaustav.codebinders.com/2012/07/avro-phonetic-on-gnulinux-is-now-stable.html). It is now available for GNU/Linux as an iBus input method. Please check http://linux.omicronlab.com/ for further instructions. I recommend you use ibus-avro instead of scim-avro. ibus-avro is far more stable and so far has worked flawlessly for me.**








<table cellpadding="0" style="float: left; margin-right: 1em; text-align: left;" cellspacing="0" class="tr-caption-container" >
<tbody >
<tr >

<td style="text-align: center;" >[![](http://1.bp.blogspot.com/-e-Agk9fPl48/Td1bQ1KwHxI/AAAAAAAAAWc/Xar8miHBSHY/s1600/avro.png)](http://1.bp.blogspot.com/-e-Agk9fPl48/Td1bQ1KwHxI/AAAAAAAAAWc/Xar8miHBSHY/s1600/avro.png)
</td>
</tr>
<tr >

<td style="text-align: center;" class="tr-caption" >Avro Phonetic
</td>
</tr>
</tbody>
</table>
I have built packages for Avro Phonetic engine for SCIM (scim-avro) 0.0.2 in my [Launchpad PPA](https://launchpad.net/%7Ekaustav-dasmodak/+archive/kido) with source available at [scim-avro's Google Code project](http://code.google.com/p/scim-avro/). The builds have been successful for both i386 and amd64 architectures. Currently targeted Ubuntu distributions are Lucid (10.04), Maverick (10.10), Natty (11.04), Oneiric (11.10) and Precise (12.04).

**Important note:** Ubuntu 11.10 and newer versions do not seem to have good support for SCIM, due to which scim-avro from my PPA does not work in all cases. Feedbacks received from Mr. Ashoke Kumar Bagchi, New Delhi, suggest that scim-avro has stopped working in Ubuntu 11.10 after an upgrade in February, 2012. If you fail to use scim-avro using all the methods mentioned in this post in Ubuntu 11.10 and newer versions, it will be a good idea to switch to [Probhat keyboard layout](http://ekushey.org/?page/probhat_layout). Also, have a look at Md. Enzam Hossain's [Avro Phonetic on Github](https://github.com/Avro-Phonetic).<!-- more -->

The benefit of using scim-avro from this PPA is that it is packaged for the respective Ubuntu releases and architectures and so will have greater compatibility with the version of Ubuntu on which it is used. This will also provide an easier method of installation for Ubuntu users.


## Installation


Execute these commands in the terminal:



	
  1. Add my Launchpad PPA to your software sources:
sudo add-apt-repository ppa:kaustav-dasmodak/kido

	
  2. Update package information:
sudo apt-get update

	
  3. Install scim-avro:
sudo apt-get install scim-avro


The package will pull scim, im-switch and scim-canna as dependencies. After installation, you need to select SCIM as default input method. Type this in terminal:

im-switch -c

and select 'scim' from the list. If that does not work, you may need to use 'scim-bridge' to get Avro working.

I'm interested to know if it working fine on 64-bit Ubuntu. Your comments will be appreciated.

See also: [http://omicronlab.com/forum/index.php?showtopic=2029&pid=12364&st=60&#entry12364](http://omicronlab.com/forum/index.php?showtopic=2029&pid=12364&st=60&#entry12364)

**Note: Those who had problems using SCIM as input method, please try the instructions from Amit Seal's blog post "[Using Avro in Ubuntu](http://lordamit.blogspot.com/2010/05/using-avro-in-ubuntu.html)" after installing from my PPA. Please let me know if it works.**

Image source: http://code.google.com/p/scim-avro/.


