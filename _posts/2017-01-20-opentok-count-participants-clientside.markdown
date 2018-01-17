---
layout: post
slug: opentok-count-participants-clientside
title: "Count participants client-side in OpenTok"
image: /assets/images/covers/opentok-room-count.jpg
description: You can use events triggered by OpenTok client SDKs to show the number of active participants in a multi-party WebRTC call running on TokBox, entirely on the client-side. Here is how.
tags:
- webrtc
- tokbox
- opentok
- technology
- javascript
---

One of the most frequently asked questions about building a live WebRTC broadcast or conference with [TokBox](https://tokbox.com) is how to show the number of participants present in a session. This is useful for both bi-directional interactive broadcasts (like multi-party video chat where everyone talks to everyone) as well as uni-directional broadcasts (like webinars, talk shows; where there are few publishers and many subscribers).

The ideal way to implement this would be on the server side using OpenTok's [Session Monitoring callbacks](https://tokbox.com/developer/guides/session-monitoring/), but the real-time session event callback system is not recommended for production use at the moment. In the meanwhile, a relatively less reliable, but effective method of showing participant count is to use [client-side session events](https://tokbox.com/developer/sdks/js/reference/Session.html#events) triggered by the OpenTok Web SDK.

> To know more about OpenTok `session` and `connection`, go through [Opentok Core Concepts](https://tokbox.com/developer/guides/core-concepts/).

## Implementation

<p class="note">For this article, I will cover only the <a href="https://tokbox.com/developer/sdks/js/">OpenTok Web SDK</a>. The same technique can be for OpenTok's Android and iOS SDKs.</p>

The trick here is to increment a counter whenever there is a new connection to the OpenTok session and decrement it whenever a connection drops. To be specific, we need to hook into the `connectionCreated` and `connectionDestroyed` events.

OpenTok Web SDK fires the `connectionCreated` event for each new connection that it receives, including once for each connection already present when you join a session.

We will use two counters, one to count subscribers and another count publishers. If your use case is a meshed, multi-party video conference, where everyone will be publishing and subscribing, you may want to use only one counter for everyone. Let's create both for now:

```javascript
var publishers_count = 0,
    subscribers_count = 0;
```

Next, with the OpenTok API key and session ID ready, we set up the session to handle events. For this to work, you will need to fetch `opentok_api_key` and `opentok_session_id` from the server.

```javascript
// Initialize the Session.
var session = OT.initSession(opentok_api_key, opentok_session_id);

// Bind session handlers. This mode lets you bind
// multiple event handlers at the same time.
session.on(handle_session_events);
```

Let's write the code that goes in the `handle_session_events` object:

```javascript
// Set up all required event handlers as an `object`.
// OpenTok lets you subscribe to multiple events at once.
var handle_session_events = {

    // This event is triggered whenever there is a new connection.
    connectionCreated: function (evt) {
        // Check if connection is from a publisher or subscriber
        if (evt.connection.permissions.publish) {
            publishers_count++;
        } else {
            subscribers_count++;
        }
    },

    // This event is triggered whenever a connection quits
    connectionDestroyed: function (evt) {
        // Check if connection is from a publisher or subscriber
        if (evt.connection.permissions.publish) {
            publishers_count--;
        } else {
            subscribers_count--;
        }
    }
};
```

This will ensure that the two variables, `publishers_count` and `subscribers_count`, reflect the number of publishers and subscribers connected to the session. Using vanilla JavaScript, you can poll these variables using a `setInterval()` and update any relevant DOM element. Or, if you use a UI framework that binds data to DOM, like Angular JS, you can bind these variables to DOM elements to update a UI counter as the data change.

For a live demonstration of this feature in an application, see [presenter.js](https://github.com/kaustavdm/tokinar/blob/master/assets/js/presenter.js) and [viewer.js](https://github.com/kaustavdm/tokinar/blob/master/assets/js/viewer.js) files in [Tokinar](https://github.com/kaustavdm/tokinar), my webinar demo for OpenTok.
