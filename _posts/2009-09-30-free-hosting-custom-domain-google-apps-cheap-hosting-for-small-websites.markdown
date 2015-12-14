---
author: kaustav
comments: true
date: 2009-09-30 19:43:00+00:00
layout: post
slug: free-hosting-custom-domain-google-apps-cheap-hosting-for-small-websites
title: Free hosting + Custom domain + Google Apps = cheap hosting for small websites
wordpress_id: 4
---

There are lots of users out there who want to host a tidy little website having a custom domain (e.g. _www.yourname.com_) but do not have heavy pockets or are unwilling to spare around Rs. 2000 annually to buy complete web hosting packages. If you are among them, a little workaround can bring down the cost to approx Rs. 500 a year.

Before we proceed, let me say that this information is aimed at beginners as expert webmasters with little to spare will find this set of information too obvious. This article will not go to the technical details of each configuration but will give an overall idea of how cheap web hosting can be done by coupling multiple products available on the internet.<!-- more -->

Selecting a Web Host
[![Free hosting](http://2.bp.blogspot.com/_cTMwx-Cbjjo/SsOuh3XBnDI/AAAAAAAAADA/J3DAS9zm06Y/s320/FreeHostiaFreeHosting.JPG)](http://2.bp.blogspot.com/_cTMwx-Cbjjo/SsOuh3XBnDI/AAAAAAAAADA/J3DAS9zm06Y/s1600-h/FreeHostiaFreeHosting.JPG)To begin with, we first need to select a good free web hosting provider. This will largely depend on the type of website you want. For a website where you would like to host a CMS (Content Management System) or a blog, you need to have latest versions of PHP and MySQL installed. A fair amount of survey is needed before you signup with a free host. Simply Google for that to find what other users have to say about that particular host. Also make it a point to check all features in details. I will not discuss about the softwares needed to be installed on a web host as that will be out of scope of this article. Sometimes, some web hosts provide free account only for a certain period after which your card is automatically billed on one of their premium plans. Be careful about those.

For suggestions on choosing a web host, you can consult [FreeWebhosts.com](http://www.free-webhosts.com/search-webhosts.php). As for myself, I am quite happy with the service offered by [FreeHostia.com](http://freehostia.com/).

After a free account is set up with a web host, it is time to register for a custom domain name. Free web hosting packages do not include a custom domain. What you get is a subdomain of the web host as URL for your website, which shows up something like _www.yourname.webhost.com_. But we want to get rid of the free web host's tag in our website's name and so we shall proceed to the only part of our web hosting package where we have to pay.

Registering a Custom Domain
Various domain name registrars offer different domain prices. Domain pricing depends on two factors. Firstly, the domain extension. A domain with .COM extension will cost less that a domain with .IN extension. Generally, domain registrars like [Rediff](http://hosting.rediff.com/domain-register) offer .COM domain for an annual fee below Rs. 500.

[![Rediff hosting](http://2.bp.blogspot.com/_cTMwx-Cbjjo/SsOtXl7eCDI/AAAAAAAAAC4/s0UbpxaM9_o/s320/Rediffhosting.JPG)](http://2.bp.blogspot.com/_cTMwx-Cbjjo/SsOtXl7eCDI/AAAAAAAAAC4/s0UbpxaM9_o/s1600-h/Rediffhosting.JPG)Secondly, if you want a domain name that is already parked by someone else, then you have to pay more to grab that domain. Some domain names with special keywords are offered by domain registrars at an extra price. This is where we step into the field of domain reselling, but that is not the interest of this article, hence, we will skip it.

After completing the registration and payment procedure, your custom domain will be up and functioning, but to make it work with the free web hosting account, you need to edit NameServer information on the domain registrar control panel. If this sounds ambiguous, check the FAQ section of your web host where you are likely to find NameServers to which you need to point your domain. In any problem, the web host's support team will definitely help you out. After the name servers have been changed, it will take around 1-2 days to update, so be patient and do not keep on changing the NameServer values. Once everything is complete, your custom domain will now point to your web hosting account and typing _www.yourcustomdomain.com_ will take you to the homepage of your web hosting account.

Getting custom email from Google Apps
[![Google Apps](http://3.bp.blogspot.com/_cTMwx-Cbjjo/SsO17xQW8DI/AAAAAAAAADI/Z2mOAx1_tVU/s400/GoogleAppsLogo.JPG)](http://3.bp.blogspot.com/_cTMwx-Cbjjo/SsO17xQW8DI/AAAAAAAAADI/Z2mOAx1_tVU/s1600-h/GoogleAppsLogo.JPG)Many free web hosts provide free email and some like [X10Hosting](http://x10hosting.com/freehosting.php) even provide SMTP support. POP is required for fetching emails using external email clients like Outlook Express or Thunderbird and SMTP is needed to send mails externally, either from an email client or through forms on a web page. So if you want to have mailer forms or mailing lists on your website, a stable and strong SMTP server is required. Thanks to Google for developing Google Apps which allows users to get custom email (e.g _yourname@yourcustomdomain.com_) on using GMail servers. As it is, Google servers are highly reliable and so you can have complete peace of mind that your mails will be delivered in time.


[![Google Apps Standard Edition](http://4.bp.blogspot.com/_cTMwx-Cbjjo/SsO2UACi4lI/AAAAAAAAADQ/EIgGwi8rDGg/s200/GoogleAppsStandardEdition.JPG)](http://4.bp.blogspot.com/_cTMwx-Cbjjo/SsO2UACi4lI/AAAAAAAAADQ/EIgGwi8rDGg/s1600-h/GoogleAppsStandardEdition.JPG)


Generally, Google Apps service comes for a premium, but a lightweight version of Google Apps called "[Google Apps Standard Edition](http://www.google.com/apps/intl/en/group/index.html)" is available for free which gives the flexibility to use customized address in Gmail, use Gmail SMTP and POP externally using the custom domain, Google Calendar and Google Docs.

For using Google Apps service, you need to edit MX records (Mail Exchanger record) of your domain name and in the hosting configuration of your web host to point your emails to Google's email server. After successful setup, your webmail will be accessible at the URL http://mail.google.com/a/_yourcustomdomain.com_.

Additionally, Google's SMTP server will be available for forms and mailing lists on your website and you can create upto 25 mail user accounts on Google Apps Standard Edition for free.

The sum up

Those who are unwilling to pay even for a custom domain name and have no problem if they do not get a .COM domain, then I would suggest them to use [CO.CC](http://co.cc/). These domain names are available free of cost and provide full domain control so that you can [use CO.CC with Google Apps. ](http://www.co.cc/google_apps/google_apps.php)
