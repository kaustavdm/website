---
slug: webrtc-not-magic
date: 2017-02-14
title: WebRTC isn't magic
image: /assets/images/covers/webrtc-not-magic.jpg
description: WebRTC allows peers to see and talk to each other worldwide in real-time. It can look and sound like magic at the outset, till you learn to wield it.
tags:
- webrtc
- technology
- communication
- thoughts
---

Since the first time I read The Lord of The Rings, I have been very interested in the [Palantíri](http://lotr.wikia.com/wiki/Palant%C3%ADri), the seeing-stones; seven magical orbs that were built during the Elder Days and then placed by the Dúnedain across Middle Earth to communicate across long distances. One of them was at Orthanc, in Saruman's tower, with which he secretly consulted Sauron and assembled an army out of Sauron's blueprints.

A Palantír could connect to any other Palantír and people at both ends could see each other and often read each other's thoughts.  These Palantíri were communication devices; smooth, spherical orbs, often too heavy to lift and too difficult to manage. Only the strongest could control them. Any lesser mortal could fall prey to the call of the orbs; Pippin almost got his brain fried trying to take a look at one of those.

> "Any sufficiently advanced technology is indistinguishable from magic."
>
> &mdash; *Profiles of the Future*, Arthur Clarke

Things get interesting when we evaluate these orbs under the light of the present day technology that we have around us. The Palantíri can be considered to be a network of devices which could connect to each other directly, peer to peer, and share video and data. These orbs could get user media and transmit it across to the orb at the other end, which could then render those media data to its user. They had a camera, a video display and an aural interface fused together. They could all connect to each other as long as the person connecting knew what to connect to. So, there was some signaling layer in between, but you needed to know the address of the other orb in order to connect to it.

Then again, [JRRT](https://en.wikipedia.org/wiki/J._R._R._Tolkien) was writing a fantasy novel. Not a science fiction. So, these details can be at the best guessed at. We will never know *how* the Palantíri worked; what was their signaling layer, what codecs did they use and whether encoding and decoding was done at the hardware level. Their knowledge was protected as proprietary and faded from the world along with their creators. The Palantíri were ancient magic.

> '"If you study magic, does it become science?"<br> "You learn it's all science."'
>
> &mdash; *The Flicker Men*, Ted Kosmatka

## The road to RTC

Fast forward a few decades since Lord of The Rings was written (and come back to this world), we got a bunch of technologies that tried to solve the real-time communications (RTC) issue. Some of the biggest inventions in RTC were made in the last 2 decades, almost after 125 years since telephone was invented. We got VoIP built using open tools and technologies. We got IRC and XMPP. The second wave of VoIP gave us Skype and the entire gamut of Flash-based chat applications. At one point, the proprietary technologies got better than the ones in public domain. And the result was fragmentation. Lots of it. Each vendor and technology provider tried to build their own (and often better) version of RTC software. Without any standardization, everyone almost always needed to reinvent the RTC wheel.

Then, in the end of May 2011, [Google open-sourced WebRTC](http://lists.w3.org/Archives/Public/public-webrtc/2011May/0022.html). The web had already proven to be a valuable platform. The browsers have been the best of the apps. W3C and IETF put their armies together to standardize WebRTC so that it can be implemented properly across browsers. They envisioned the trust-worthy browsers to become the clients for real-time media communication of the future. No more downloading and installing proprietary clients for each services. Your web browser was *the* client. Google led the way. Mozilla and Opera followed close behind.

WebRTC is a big step forward from previous attempts at real-time communication. It is relatively new and highly flexible; it is just a  communication technology with many moving parts. It can be used in wildly different communication topologies &mdash; as unidirectional and bidirectional, for 1:1, 1:N or N:N use cases. An end user of a WebRTC application only sees and interacts with the thin UI layer on top. As a developer, if you want only basic peer to peer communication, you can put up a signaling server, write a few lines of code and, lo, you can put together a video chat application in 10 minutes. It almost sounds magical.

Magical, till you try doing something serious with WebRTC. Most of the developers who are lured by the promise of an "easy video chat that needs no plugins" find themselves to be the Pippin of the WebRTC world; they get their brain fried and go bald by tearing off every last strand of hair on their collective heads.

WebRTC has a lot happening under the hood. Its fundamentally peer-to-peer nature makes it tricky to build complex topologies, unless you understand it very deeply. [WebRTC is still too complex](https://www.chriskranky.com/how-to-simplify-webrtc/).

If you are willing to brave the challenge of learning WebRTC today, you may want to understand the exact science of how all the moving pieces fit together. You would want your disillusionment to result in practical knowledge that you can use in building RTC applications. It will require more effort, but that is definitely worth it.

So, where to start if you want to get knee deep?

- Go through the [WebRTC Getting Started](https://webrtc.org/start/) guide on webrtc.org.
- Check out [WebRTC samples](https://webrtc.github.io/samples/) and their [codebase](https://github.com/webrtc/samples/).
- Try out a few [WebRTC servers](http://webrtcbydralex.com/index.php/2016/12/13/overview-of-webrtc-media-servers/), like [Kurento](http://www.kurento.org/), [Licode](http://lynckia.com/licode/) etc.
- Watch [Badri](https://twitter.com/baddn) talk about ["WebRTC in the real world"](https://www.youtube.com/watch?v=rb46OzNB1k4).
- See whether you want to [build a WebRTC service yourself or try](https://www.chriskranky.com/build-vs-buy-your-webrtc-services/) an existing communication platform provider like [TokBox](https://tokbox.com) (*Disclaimer: I work for them*), Twilio etc.
- Get to know [STUN and TURN](https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/) in detail.
- Stay updated: Sign up for the newsletter from [Kranky Geek](https://www.krankygeek.com/).

Once you have learnt enough about WebRTC, it will not be an enigmatic magical puzzle any more. You would have learnt the science behind the magic. You can still call yourself a wizard.

<p class="meta"><small>Cover image source: <a href="https://pixabay.com/en/hands-sphere-light-fingers-magic-1835994/">Illustration by Rafael_Zajczewski</a> and <a href="https://webrtc.org/press/">WebRTC logo</a>.</small></p>
