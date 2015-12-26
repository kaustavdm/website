---
author: kaustav
comments: true
date: 2011-11-21 12:14:00+00:00
layout: post
slug: how-translations-of-free-software-have-removed-the-language-barrier
title: How translations of free software have removed the language barrier
categories:
- Drupal
- Free Software
- Localization
- Ubuntu
---

The rise of internationalization and localization projects for free and open-source software projects has made operating systems and other free software[1] available in an increasingly large number of languages. English is no more the only language in which computers can be used. Speakers of languages other than English can use operating systems, browsers, word processors and various other software applications in their own language. In the free software world, a person now has the option to choose to install the software they use in the language the speak and write, thanks to the growing list of contributors who help in translating free software into different languages.<!-- more -->


**About character encoding**
Since the programming languages used today were built by English-speaking people, software codes are written using English alphabets and symbols, from the ASCII[2] character encoding scheme. To put it simply, a character encoding scheme[3] maps each character to a computer-readable symbol. The ASCII character set is pretty restrictive and allows only a limited set of characters. It was the adoption of the Unicode standard which provided over 1,09,000 characters in a unified encoding scheme.[4] As a result, it made possible to have multi-lingual computer environments. Unicode Transformation Format (UTF) schemes are flexible enough to allow a wide range of characters spanning across multiple languages. The most popular Unicode implementation, UTF-8, can support ASCII characters along with characters from other languages like Bengali, Hindi etc. The UTF-8 scheme is thus a popular choice in internationalization and localization projects.

**How translation of software works**
Software translation is an interesting mechanism. When a user uses a software, he/she does not interact with the raw source code that the programmer has written, but interacts with various messages that the software generates based on the current action it is ordered to perform. Now, while translating a software application, translators translate those lines of messages into different languages. So the source code remains the same, but the message shown to the user will depend on the language in which the user is using the software.

When a programmer writes code for a software application, he/she leaves scope for adapting the application to other languages. Portions of texts or strings that will be shown to end users are marked as translatable. An application can also be made to produce different message in different regions. This entire process is called “internationalization”.

Translators take these strings and convert them into equivalents in other languages through a process called “localization”. Different locale packs are created based on languages and regions. A locale, simply, is a pack of translations and customizations for an application in a particular language or region. These locales modify the language and region in which users use a particular application. Based on the locale chosen by the end user, an application generates messages translated into the chosen language.

**Adapting open standards in translation of software applications**
Proprietary software vendors, like Microsoft, use closed systems for internationalization and localization of their software components. But in doing so, they do not allow their users the freedom to help improve and, most importantly, share the translations. By contrast, the “GNU gettext” is a widely known and accepted method for internationalization and localization used by Unix-like operating systems. The GNU gettext, developed by the GNU project, lets programmers internationalize applications written in different programming languages like C or Python. GNU gettext is used to internationalize applications that run on Ubuntu and other GNU/Linux distributions.

Below is a discussion on some popular free-software translation platform.

**Localization standards in Launchpad**
Launchpad.net hosts all code, translations and issues for the Ubuntu operating system. Launchpad has a web-based translation system located at http://translations.launchpad.net. This web-based service lets contributors translate Ubuntu releases as well as all other translatable projects hosted on Launchpad.net. Launchpad has various language and region specific translation groups that are often in charge of translating projects into particular languages. Any translator wishing to contribute translations can join the corresponding groups. For example, Bengali language translations are contributed by Ubuntu Bengali Translators, Launchpad Bangla/Bengali Translators and Bengali Translation Team for Linux Mint.[5]

**Localization standards in Drupal**
Among web based applications, Drupal has its own localization scheme that is pretty similar to the GNU gettext. Drupal's localization server <http://localize.drupal.org> handles interface translations for all projects hosted on Drupal.org. Any web developer who contributes to Drupal core, hosts applications on Drupal.org or writes custom modules for Drupal can use this standard translating scheme.

Drupal also has its own Content Translation module that lets webmasters create a Drupal website in their own language by translating text strings on their own. For contributors, Localize.Drupal.org has a web-based translation mechanism which can be used to contribute translations to Drupal and its modules.[6]

**Combining free software with open translation standards**
Using an open standard like the GNU gettext ensures that other programmers can easily understand how one programmer has written his/her code. Also, it ensures that high quality and standards-compliant code fit for internationalization and localization is prepared. In turn, this improves the overall quality of applications and creates the possibility to spread useful applications in any written language.

Free software, particularly those licensed under the GPL and its derivatives, provide three basic freedom – freedom to use, freedom to modify and freedom to share. Combining with open internationalization standards, a large number of free software projects are regularly producing locales across different languages. This is evident by the increasing number of contributors and languages in different free software projects.

Launchpad.net has more than 59,000 translators across 42 translation groups as of November, 2011 who translate in 325 languages.[7] Drupal.org presently has 100 translation groups with over 3660 contributors.[8]

These are just a couple of projects among the vast majority of free software that are currently being translated into languages across the world.

**Bengali localization**
There has been significant progress in translating free software into Bengali. In Ubuntu, the Ubuntu Bengali Translators team, started by Mahay Alam Khan currently has 165 members, and contributes translations to upcoming and supported releases of Ubuntu. Ankur ICT Development Foundation (ankur.org.bd) a non-profit organization based in Bangladesh has worked consistently over the past nine years on localizing free and open-source software to Bengali. They create Bengali versions of popular software projects like Mozilla Firefox, OpenOffice.org, Pidgin, VLC Media Player etc. They also publish Bangla spell checkers for Firefox, Thunderbird, OpenOffice.org and other software.

**Contributing to the breaking of the language barrier**
It is no longer necessary to be able to speak, read and write English in order to use computers. The free software world has alternatives. This is the best time when one can contribute to the free software projects and help improve the quality of localizations. Contributing to localizations is a vast and completely different form of contribution to free software projects. A programmer might be able to write a program that can prove useful to people, but to ensure that it reaches to all parts of the globe, he/she needs the help of translators.



* * *



[1] “Free software” here refers to software that is “free” as in “freedom”, which gives its users rights to use, modify and share the software freely. For further details, see http://en.wikipedia.org/wiki/Free_software and http://www.gnu.org/philosophy/free-sw.html.[2] Pronounced “Ass-kee”, stands for “American Standard Code for Information Interchange”. For further details, see http://en.wikipedia.org/wiki/ASCII.

[3] See http://en.wikipedia.org/wiki/Character_encoding.

[4] “The Unicode Standard: A Technical Introduction” <http://www.unicode.org/standard/principles.html>. Retrieved 20-11-2011.

[5] “Bengali in Launchpad” <https://translations.launchpad.net/+languages/bn>. Retrieved 21-11-2011.

[6] “Translation process overview” <http://drupal.org/node/11130>. Retrieved 21-11-2011.

[7] “Launchpad Translations” <https://translations.launchpad.net/>. Retrieved 21-11-2011.

[8] “Translations | localize.drupal.org” <http://localize.drupal.org/>. Retrieved 21-11-2011.
