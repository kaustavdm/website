---
layout: post
slug: red5-pro-webrtc-first-impression
title: "Red5 Pro WebRTC: First impression"
image: red5-pro-banner.png
subheader: A quick review on building a basic WebRTC multi-party conference using Red5 Pro media streaming server.
tags:
- webrtc
- technology
- review
---

Multiple WebRTC media servers have stabilized over the last year; take a look at ["Overview of WebRTC Media servers"](http://webrtcbydralex.com/index.php/2016/12/13/overview-of-webrtc-media-servers/) by Dr. Alex Gouaillard for an extensive list. Some of the production ready media servers have been working on adding WebRTC to their list of live-streaming capabilities, which is no simple job given the complexity of the [WebRTC stack](https://webrtc.org/architecture/).

The newest addition to the list of media servers boasting WebRTC support is [Red5 Pro](https://www.red5pro.com). They announced [support for WebRTC](https://blog.red5pro.com/red5pro-release-2-webrtc/) in the 2.0 release last month. As part of my experiments with WebRTC media servers and topologies, I did a quick check to figure out how simple/straight-forward is it to use Red5 Pro for WebRTC. Here are the story, steps, code and impression.

## Experiment

My primary aim for the test run was to build a fully-functioning WebRTC-based multi-party conference for the web using Red5 Pro. I wanted to know:

- **How helpful are the developer documentation?** Are they complete, discoverable and useful? Can I work with the software on my own based on the documentation? A poor documentation is always a big blocker in adopting well-written and performant software.
- **How easy is it to get started?** Is the server installation and set-up simple enough? How fast can I get from zero to a multi-party application?
- **Does the server support [SFU](https://webrtcglossary.com/sfu/)?** SFU is vital for building multi-party, interactive broadcast without taxing CPU on the server.
- **How mature are the client SDKs?** Do they take care of browser differences in WebRTC implementation? Do they allow UI customization?
- **How complex is the whole process?** Do I have to be an expert full-stack programmer with expert DevOps skills? Does it [simplify WebRTC](https://www.chriskranky.com/how-to-simplify-webrtc/)?
- **How is the server performance and stability?** Can I confidently use the server for WebRTC applications in production? Do I have to worry about frequent crashes and poor quality?

To find these answers, here is what I did:

- Went through Red5 Pro documentation, especially through the quick start tutorials.
- Deployed a 1 GB droplet in Digital Ocean running Ubuntu 16.04 x86_64 in the NYC3 region. I intentionally picked a low-memory (1GB) cloud server to see how much power can Red5 Pro squeeze into a smaller box.
- Installed Red5 Pro server v2.0.5 in the Digital Ocean box.
- Set up TLS support with Let's Encrypt.
- Used Chrome 55.
- Tried out Red5 Pro's demos.
- Built a simple multi-party HTML5 application using Red5 Pro's JavaScript SDK and connected it to the hosted Red5 Pro server.
- Took a look at [webrtc-internals](https://testrtc.com/webrtc-api-trace/) to peek at connection internals.

**Read along for the details, or skip to the [Overall impression](#overall-impression) section for the feedback.**

## Installation experience

Red5 Pro has a quite straightforward guide for [installing the server on Ubuntu](https://www.red5pro.com/docs/server/ubuntuinstall/). It runs on JRE and needs [libva](https://cgit.freedesktop.org/libva/) and [libvdpau](https://cgit.freedesktop.org/~aplattner/libvdpau) for supporting WebRTC.

I had to create an account on [account.red5pro.com](https://account.red5pro.com) to get access to the server installer. I went for a "Developer" account for my evaluation. I did not have to put in my card details. The only downside was that I had to download the file to my local machine and then upload it to the Digital Ocean box. For a real-world use case, you may want to cache the installer somewhere on your network.

### Setting up SSL

WebRTC needs resources to be served over HTTPS, so this test required configuring Red5 Pro with SSL.

SSL setup took slightly longer than I had anticipated. I had to hunt down all the places where configurations needed to be added/updated. There are detailed documentation on setting up [Red5 Pro with SSL](https://www.red5pro.com/docs/server/red5prossl/), including a handy guide for Let's Encrypt and copy-paste-able commands for the whole process. Even with the ready-made commands, I used up 50 minutes in getting SSL up and running.

Red5 Pro's embedded Tomcat server needs a keystore to be set up with the full certificate chain, which makes this is a lengthy process, especially if you are not used to setting up Tomcat on SSL. Setting up SSL on this stack can be borderline painful. I did not need to secure RTMP for this test, so I skipped that section.

### Stock WebRTC demo

Once SSL was set up, I tried out the broadcast and subscribe demo that ships with Red5. Both the broadcast and subscribe endpoints used WebRTC. Setting up a broadcast between Bangalore and San Francisco had a latency of ~2 seconds, with a few STUN lookups and no TURN traffic.

The stock demo broadcast constrained user media to a low resolution and frame rate. These are video constraints applied to the broadcaster, obtained through `chrome://webrtc-internals`:

```json
{
  "width": {
    "min": 320,
    "max": 352
  },
  "height": {
    "min": 240,
    "max": 288
  },
  "frameRate": {
    "min": 8,
    "max": 24
  }
}
```

With the Red5 Pro server running, SSL set up, stock demo working, the next phase was to try and get multi-party conference working over WebRTC.

## Trial 1: Using Red5 Pro HTML SDK example

Red5 Pro's HTML SDK examples contain a ["two-way" WebRTC](https://github.com/red5pro/streaming-html5/blob/master/src/page/test/twoWay) example &mdash; a slightly-manual, 1:1 call WebRTC demo for Red5 Pro. It was close enough to the multi-party video chat I was looking for compared to the other examples. So, I decided to test this first, keeping in mind that I am trying to figure out whether Red5 Pro is suitable for multi-party WebRTC interactive broadcast.

### Setting up the demo

The WebRTC HTML5 examples shipped with Red5 Pro server are the best way to fire up these examples. The way to access them is to browse to `https://your-red5-host/webrtcexamples` or click "Red5 Pro HTML SDK Testbed" from `https://your-red5-host`. Once there, change the value of `Host` in Settings to your Red5 Pro host and click the "Testbed Menu" link on top. This will bring up a list of tests available. Choose the "Two-Way" test. To join as the other half, repeat the process, except in the Settings, swap stream names.

These demos are also constrained to low resolution and framerate. You can try out the "Publish - 1080p" test to check HD streaming capabilities.

### The outcome

For a single two-way (1:1) call, the server usage spiked from 4% CPU usage to 60%, memory usage spiked at 85%. Time to complete negotiation and start broadcasting and receiving media was about 10 seconds on the demo. the first 2-3 seconds had choppy video and then the video stream stabilized at a less-fluctuating bitrate.

The server console spewed out multiple errors while handling the codec, one of which possibly resulted in a loud static noise after 2-3 minutes of streaming. Trying to open another, concurrent two-way session crashed the server.

## Trial 2: Building an application using Red5 Pro Streaming SDK for HTML5

The next step was to build a simple multi-party conference using the HTML5 streaming SDK provided by Red5 Pro. The SDK needs to be downloaded from account.red5pro.com, same as the server code. To do this, I followed the documentation for their [HTML5 streaming SDK](https://www.red5pro.com/docs/streaming/web/).

Sadly, after a 4-hour struggle to put the pieces together, I gave up. The code that I had built is at [kaustavdm/red5-webrtc-multiparty-demo](https://github.com/kaustavdm/red5-webrtc-multiparty-demo); be advised that it is incomplete. Let's take a quick look at what worked and what did not.

## Overall impression

Keeping in mind that the WebRTC support in Red5 Pro is still new and the team is working hard to improve it, here are my impressions from this trial.

### What worked

- Signing up for an account and grabbing the required files for the server.
- Setting up the server on Ubuntu.
- Grabbing the SDK and setting up a simple web page
- Publishing stream to the default Red5 WebSocket app called `live`.
- Subscribing to stream in the same app by stream name &mdash; I need to manually put the streams I wanted to subscribe to. It should be possible to build a SFU-like topology using Red5, where each publisher publishes their stream and subscribes to other streams in the room/session, but I could not get it working for the reasons mentioned below.

### What needs improvement/clarification

- **Documentation**: Documentation on building a WebRTC application on Red5 Pro left me severely wanting for more. The only documentation on this matter is the HTML5 streaming SDK page and [3 markdown files](https://github.com/kaustavdm/red5-webrtc-multiparty-demo/blob/master/lib/red5pro) in the SDK package. All of them had very little information on the underlying API and came with only a few examples to build upon.
- **Signaling**: I could not find any signaling server inbuilt, or could not get one running. There is absolutely no documentation on the matter. I'm not sure if I am expected to maintain a separate signaling server and only stream the media through Red5 Pro. That would be a big overhead.
- **Subscribing to streams**: I could not find a way to get list of streams that have been published in the app/session already. Neither through client side events nor through any server-side call. This feature may be there and it may be undocumented. Either way, I could not figure out a way to dynamically subscribe to streams, which effectively meant that I could not do multi-party conferencing. This is where a SFU like TokBox's really shines.
- **SDK features**: The client SDKs do not take care of browser abstractions. Red5 Pro recommends using `adapter.js` for browser compatibility, but usually, there is a lot more work required to achieve proper feature parity across browsers. Though this may translate to a relatively lower level API access, the HTML5 SDK still leaves the heavy-lifting to the developer. You need to know enough of RTC to get your streams published.
- **Interactive chat/broadcast samples**: All the WebRTC samples available for Red5 Pro today are built for uni-directional broadcast. It would be great to see examples of interactive (bi-directional, real-time) broadcast samples with dynamic subscribing from the Red5 developer community.
- **Resource consumption:** One machine with a single core processor and 1 GB memory is nowhere near enough even for a basic use case.

### So, can I use it for my application?

If your use case is built around uni-directional broadcast, where you may want to use WebRTC for media ingestion, Red5 Pro should work for you. But, if you are looking for more advanced use cases, you may want to hold off using Red5 Pro for some time till its WebRTC offering and documentation get more solid.

In the meanwhile, if you do not want to deal with the infrastructure hassles and want production-ready WebRTC SDKs, try out [TokBox](https://tokbox.com).
