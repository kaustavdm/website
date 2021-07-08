---
date: 2009-10-25
layout: post
slug: joomla-1-5-sef-url-in-yahoo-india-small-business-web-hosting
title: Joomla 1.5 SEF url in Yahoo! India Small Business web hosting
tags:
  - joomla
---

It was a tough time when we ([Twicore](http://www.twicore.com/)) were developing a Joomla 1.5 based website ([Radical Socialist](http://www.radicalsocialist.in/)) on Yahoo! India Small Business web hosting. The luring factors that led us to suggest this webhost to our clients was the unmetered bandwidth, unmetered disk space and uptime of Yahoo! servers, specially when they are right here in India.<!-- more -->

But soon enough, we came across a number of obstacles which we had overlooked in the beginning. Firstly, Yahoo India Small Business hosting provides PHP 4.3.11 and secondly, they do not support files beginning with a period (.) and consecutively do not support .htaccess files. The web-based installer of Joomla was stuck at the page for entering database credentials (the next button simply did not work in spite of providing correct credentials). On contacting customer support, the only reply they gave repeatedly was that they do not have infrastructure for upgradation to PHP5. Furthermore, on escalating my complaint to chief customer care officer, we were suggested to build a website using PHP 4.3.11! Now that is crappy. Both PHP 4.3.11 and dinosaurs now rest in peace.


The downside was that we could not use even sh404sef for getting SEF without htaccess. Forget about applications that need PHP 4.4 or greater. SEF was stuck as Yahoo provides no support for mod_rewrite.

So the wayout was:




  1. Changing _**$live_site**_ variable in _**configuration.php**_ to **"http://www._yoursiteurl.com_"**. N.B. Changing it to "/" results in an inconvenience as everytime some settings are changed in Global Configuration in the backend, Joomla! treats "/" as trailing slash and deletes it and $live_site becomes blank once again. (This prevents error 404 and 500)


  2. Activating only SEF urls _without_ activating mod_rewrite.


Now there is an index.php associated with the urls, but atleast the rest of the URL follows SEF.
