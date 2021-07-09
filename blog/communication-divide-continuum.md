---
date: 2018-01-14
slug: communication-divide-continuum
title: Communication divide continuum
description: Today's communication technologies still carry on the legacy of divide we face in the real world. Healing this fragmentation requires designing technologies with empathy and inclusivity from the lowest level.
tags:
- communication
- technology
- thoughts
---

It is 2018. [Chat applications are abound][xkcd-chat]. Communication technology has improved many folds to allow realtime conversations with voice and video at comparatively lower costs than it did five years back. I work in helping developers add live video in their applications where they don't even have to worry about setting up any servers to handle media traffic. You can really build a multi-party video chat in less than 100 lines of code. RTC adoption and development has become significantly easier. This is fuelling growth and spread of critical services like healthcare and education, that were previously inaccessible beyond certain areas.

But, does this enable everyone to effectively communicate? Well, no.

## Fragmentation

Consider how fragmented our regular physical communication is. Our ability to have conversations is already limited by a multitude of factors, like the languages we can speak (and read or write), the cultures we are familiar with, the socio-economic and political strata we belong to, physical distance, time differences, or, the differences in our physical and mental abilities.

Some of these gaps are bridged by the tech we have today &mdash; online translators, screen-readers, secure and private chat applications, social media and collaboration tools, to name a few. This dependence sadly adds another dimension of exclusion based on access to technology.

The internet depends on ISPs and network providers to provide last mile connectivity. Restricted internet access is a major concern here, with ISPs hungering to bill preferentially for access to different websites. Laying out these networks physically and maintaining them requires a large amount of capital. This provides little incentive to private ISPs to lay expensive fibres in remote (or even rural) areas where they will not be able to recover the cost through subscriptions. Mobile networks overcome some of these limitations but are inherently delayed and often oversubscribed.

Some use cases require more resources than others given the nature of the technology. At the very basic, you will need smartphones and laptops of reasonable quality to access some services. If you are setting up a stable home network, you will need to invest in better routers and higher internet plan. Many of the internet based services work only on certain higher end devices. For example, a multi-party video call over WebRTC will drain your laptop's battery way quicker than having a text chat over IRC. Real-time communication requires above average mobile devices with good network throughput to connect and maintain a stable connection. Case in point: An average smartphone with a regular 4G connection does not always provide good video call experience. All of these cost money and energy. Anyone who cannot afford or does not have a decent set of devices and data plan is thus excluded from accessing these systems.

Then, there are hardware and software compatibility issues. Not every mobile device or laptop or desktop will be able to support all communication scenarios. Software have limited backward compatibility, meaning they will not work on older devices or platforms. Communication industry is an ever evolving landscape of innovations and standards. Hardware, operating system and browser vendors have to iterate quickly to add support for new drivers, codecs and APIs. WebRTC is an evolving technology today and still breaks between browser versions.

Devices also have varying capabilities. While someone may access a service through a small mobile screen with a VGA camera, someone else may use 4K screen with a Ultra-HD camera. Maintaining compatibility is a developer's nightmare. To deal with this, developers often end up limiting the endpoints they support; every additional endpoint supported is additional work. From a consumers' perspective, this often means they can be excluded from certain systems if they do not belong in the compatibility matrix targeted by the developers of those systems.

Many of these problems happen due to the very nature of the systems. For instance, you really cannot transmit video in realtime over a patchy and slow internet connection, irrespective of what codec you use. So, solutions to these problems need to rethink how these systems are designed and implemented in the first place.

Solving the issues mentioned so far are long term goals. Yet, much of the fragmentation that we see in communication tech today rises from short term business decisions and lack of empathy in design. Exclusion is usually a by-product of design oversight, except where it is intentional.

## Being inclusive

We already have enough tools to improve [accessibility][a11y] in our software. But developers often put accessibility as a second thought in order to focus their effort on shipping the product. While that is a valid approach to ship early, some developers don't make further attempt to make their product or service accessible. When communication applications are not accessibility friendly, they leave out a significant portion of users who may not be able to see or speak or type properly. A good approach here is to make sure that applications are designed with a focus on accessibility as part of the design, instead of an afterthought.

Limitation on the languages in which an application is available also ends up limiting its reach. This is also a large problem to solve. Maintaining multiple language packs of any application takes constant effort. While developers cannot always translate their interfaces to multiple languages, they can make sure their interfaces are capable of [internationalization][i18n].

The Web Accessibility initiative has a brilliant guide on [inclusive design][wai-users].

### Interoperability

How many of us use only one instant messaging/chat application to stay in touch with our social circle? A separate app for work is justified due to strict data sharing policies. But why can't the rest of the services connect with each other? Why can't I talk to my friend on Signal while I use Telegram or IRC? The answer is complicated.

Keeping these services up and running cost real money and effort. Someone needs to pay for it. The model that is unfortunately popular today does not ask the users to pay money or bring their own infrastructure to access the services. Instead, users pay through their data or by looking at advertised content or both. More users on a platform implies more eyeballs that generate more ad revenue.

Commercial services often see no value in opening up their services to interoperate with others because that would entail sharing their user base. Maintaining such a stack also involves extra work. So they refrain from taking such initiatives. The end result is that we have too many chat apps and too many silos. Unless you signup for these services directly, there is no straightforward way today to connect to users in other services. This is not a technological challenge. This is a business challenge which cannot be solved without changing existing business models.

We do have some good examples as well. Some popular services, like Slack, have public APIs to connect to send a message to a channel from an external application. This means, another service can choose to connect to the Slack network and potentially enable two way communication between those two services. [Matrix][matrix] does that and you can bridge multiple networks quite easily when using a service like [Riot.im][riot].

## Quick guide to non-fragmentation

So what we do to help improve the situation? We have limited impact on larger problems. Those of us designing communication systems can follow a few basic rules to make sure our applications do not contribute to the communication divide. Here is what we can do.

Design inclusively. Design to be:

- Accessible - Don't assume everyone can see and read clearly and write. Be aware of who you exclude.
- Multi-lingual - Don't assume English is the only language.
- Multi-cultural - Don't assume Silicon Valley is the world.
- Multi-disciplinary - Don't assume only software developers will be using your application.
- Multi-device - Don't assume everyone has a powerful device.
- Integrate - Don't try to do everything in one application. But, make sure you have clearly defined integration points. If you are developing a communication app, you can design your API for letting external services work with your service. There are many existing ways of doing this. The simplest of all is building a publicly consumable API of your application.

Purely unified communication may be a pipe dream, but strong integration points between communication services can go a long way towards reducing fragmentation. We don't need a [15th standard][15th]; we need communication services to be inclusive enough to welcome others in.

[xkcd-chat]: https://xkcd.com/1810/
[matrix]: https://matrix.org
[riot]: https://riot.im
[a11y]: https://www.w3.org/WAI/intro/accessibility.php
[i18n]: https://www.w3.org/International/questions/qa-i18n
[wai-users]: https://www.w3.org/WAI/users/
[15th]: https://xkcd.com/927/
