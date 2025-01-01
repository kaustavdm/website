---
date: 2025-01-01
slug: nats-upspeak-app-framework
title: Ultra-lightweight NATS-based modular app framework in Go
description: An explainer on why I wrote the `app` package for Upspeak. Why I used NATS and how it can be useful for you too.
tags:
- explanation
- nats
- upspeak
- go
---

If you've ever built a Go application that needed to be both modular and simple, you know this can feel like chasing two rabbits at once. While working on [Upspeak](https://github.com/upspeak/upspeak), I created the [`app`](https://github.com/upspeak/upspeak/tree/main/app) package to solve this exact challenge. What makes this package interesting isn't what it does, but what it doesn't do – it embraces constraints and lets [NATS](https://docs.nats.io) do the heavy lifting.

Let me walk you through how this package works and why you might find its approach interesting, even if you would never use it directly. You might find this article more useful if you read the [`app` package README](https://github.com/upspeak/upspeak/blob/main/app/README.md) first.

---

## Why NATS matters

Think about your typical application for a moment. Whether it's handling HTTP requests, processing events, or managing state changes, you're essentially passing messages around. This is where NATS comes in – not just as a message queue, but as the foundation of your application's connectivity.

I have been studying and tinkering with NATS for a while now. I even introduced it in the last couple of projects I worked on. Its design and values fit squarely with how I like to think of application architectures. And combining with Go gives NATS some added advantages, specifically that you get to embed the NATS Server in your application!

So, while NATS already mattered to me, when I chose NATS for the `app` package for Upspeak, it wasn't just for its message-passing capabilities. NATS gives us service discovery, load balancing, K/V stores, object stores, and various message patterns out of the box, thanks to [JetStream](https://docs.nats.io/nats-concepts/jetstream). And, all of these packaged in a neat, single binary, that can completely run on dynamic runtime configuration! This means I can focus on building our application logic instead of reinventing _those_ wheels. I can spend that energy in writing smarter, domain-specific abstractions.

I strongly recommend checking the videos over at [Synadia's YouTube channel](https://www.youtube.com/@SynadiaCommunications) to learn more about NATS.

---

## The beauty of embedded NATS

One of the most interesting aspects of the `app` package is its approach to NATS deployment. The package can run NATS in two modes: embedded within the application process, or connected to an external NATS server.

Let me show you how simple and cool this embedded mode is. The following function from the `app` package can run NATS right inside the application process:

```go
func startEmbeddedNatsServer(appName string, opts NATSConfig) (*natsserver.Server, error) {
    serverOpts := &natsserver.Options{
        ServerName:      fmt.Sprintf("%s-nats-server", appName),
        DontListen:      opts.Private,
        JetStream:       true,
        JetStreamDomain: appName,
    }

    ns, err := natsserver.NewServer(serverOpts)

	if err != nil {
		return nil, err
	}

	if opts.Logging {
		ns.ConfigureLogger()
	}

	ns.Start()

	if !ns.ReadyForConnections(5 * time.Second) {
		return nil, nats.ErrTimeout
	}

	return ns, nil
}
```

See what's happening here? When you run in embedded mode, you get a fully functional NATS server without any external dependencies.

I first came across this feature in this excellent video on [embedding NATS in Go](https://youtu.be/cdTrl8UfcBo). I also have the [code copied in this Gist](https://gist.github.com/kaustavdm/73560c70744cc5e08f3d08cc43a8f6af).

In general, the embedded mode is great for development and testing. When you're ready for production, you can switch to an external NATS server without changing your application code, if you are running a SaaS. The `app` package makes this choice configurable, in a surprisingly few lines of code.

But, the **embedded mode really shines if your application is meant to be self-hosted by individuals** and might be running on a resource-constrained environment, or even a single VM or a lightweight compute instance, I see no harm in using embedded NATS in "production". DIY, amirite?

There's more.

If you turn on the `DontListen` flag for the embedded NATS Server configuration, you get to connect to the server over inter-process communication (IPC), creating a completely isolated and private NATS server for your application.

Taken together, you can then connect to the embedded NATS server like this:

```go
func connectToEmbeddedNATS(appName string, ns *natsserver.Server, opts NATSConfig) (*nats.Conn, error) {
	clientOpts := []nats.Option{
		nats.Name(fmt.Sprintf("%s-nats-client", appName)),
	}
	if opts.Private {
		clientOpts = append(clientOpts, nats.InProcessServer(ns))
	}
	nc, err := nats.Connect(nats.DefaultURL, clientOpts...)
	if err != nil {
		return nil, err
	}

	return nc, nil
}
```

The embedded mode can give edge-computing a real boost. You can even offload synchronization logic completely to NATS by connecting the embedded NATS server on the edge device to a larger cluster on the cloud!

---

## Simple modularity

The heart of the `app` package is its `module` system. At first glance, the module interface might seem surprisingly simple:

```go
type Module interface {
    Name() string
    Init(config map[string]any) error
    HTTPHandlers(pub Publisher) []HTTPHandler
    MsgHandlers(pub Publisher) []MsgHandler
}
```

**This simplicity is intentional.**

In the (current) first implementation of the `app` package, the `Module` interface captures four essential aspects of any module: its identity (Name), its initialization logic (Init), its HTTP endpoints (HTTPHandlers), and its message handlers (MsgHandlers). What's particularly interesting is what's not in this interface. There's no direct dependency on NATS, no complex lifecycle management, and no intricate configuration requirements.

Each module can choose to listen for HTTP requests through a north-bound interface, and to NATS subjects through a south-bound interface. For either actions, a module can publish messages out to NATS. The `app.App` struct handles the responsibility of composing the HTTP handlers exported from modules into a single web server, and the message handlers exported from modules as NATS subscribers.

### Writing Your First Module

Here's where it gets interesting. Let's say you want to create a user management module. It might look something like this:

```go
type UserModule struct {
    // internal dependencies, e.g., connection config for an identity server
}

func (m *UserModule) Name() string {
    return "users"
}

func (m *UserModule) Init(config map[string]any) error {
    // Set up your identity server connection, initialize services...
    return nil
}

func (m *UserModule) HTTPHandlers(pub Publisher) []HTTPHandler {
    return []HTTPHandler{
        {
            Method: "POST",
            Path:   "/create",
            Handler: func(w http.ResponseWriter, r *http.Request) {
                // Handle user creation
            },
        },
    }
}

func (m *UserModule) MsgHandlers(pub Publisher) []MsgHandler {
    return []MsgHandler{
        {
            Subject: "user.created",
            Handler: func(msg *nats.Msg) {
                // Handle user created event
            },
        },
    }
}
```

Notice how lightweight this is? Your module only needs to define its routes and message handlers. The `app.App` type takes care of everything else – HTTP server setup, NATS connections, route namespacing, and more. This keeps the module code event-oriented and allows expressing it in small functions.

### The `Publisher` struct

Let's look at how modules send messages. Instead of exposing the NATS connection (`*nats.Conn`) directly to modules, the package provides a Publisher interface that wraps around `*nats.Conn`:

```go
type Publisher struct {
    nc *nats.Conn
}

func (p *Publisher) Publish(subject string, data []byte) error {
    msg := &nats.Msg{
        Subject: subject,
        Data:    data,
    }
    return p.nc.PublishMsg(msg)
}
```

This simple type is all that modules need to send out messages. Want to notify other modules when a user is created? Just publish a message. Need to trigger a payment process? Publish a message. The beauty is that the receiving modules don't need to know anything about the sender – they just listen for messages they're interested in.

This abstraction might seem like unnecessary indirection, but it serves several important purposes. It provides a clear contract for how modules can communicate, makes testing straightforward (you can easily mock the Publisher), and ensures modules can't accidentally misuse the NATS connection. This can be extended with methods like `Request` or `Survey` in the future to support other pubsub messaging patterns that NATS supports.

---

## Building a Modular Monolith

Here's where the modules come together to make the `App` happen. When you add multiple modules to your application:

```go
myApp := app.New(*config)
myApp.AddModule(&UserModule{})
myApp.AddModule(&PaymentModule{})
myApp.AddModule(&NotificationModule{})
```

You're creating a modular monolith. Each module is self-contained and communicates through well-defined interfaces (HTTP and NATS messages), but they will be composed into the top-level services that the `App` provides. This gives you the best of both worlds – the simplicity of a monolith with the clean boundaries of microservices.

The `app` package automatically namespaces your HTTP routes (so the `/create` route from the `users` module becomes `/users/create`) and handles message routing through NATS. This means your modules remain completely isolated from each other, communicating only through their defined interfaces.

## Configuration Made Simple

The `app.App` configuration (defined in `app.Config`) mirrors this modular structure:

```yaml
name: "upspeak"
nats:
  embedded: true
http:
  port: 8080
modules:
  users:
    enabled: true
    config:
      db_url: "postgres://localhost:5432/users"
```

Each module gets its own configuration section, but the overall structure stays clean and predictable. Modules can be explicitly disabled allowing only to run a few available modules. I intend to revisit this behaviour in the future, but for now, simplicity comes first.

---

## Up next

While the `app` package is purpose-built for Upspeak, the principles it demonstrates can inform how you approach your own application architecture. Future enhancements will add key-value storage, relational database, vector databases and object storage system integration, but always with the same focus on simplicity and modularity.

The key lesson here isn't about the specific implementation, but about how embracing constraints and choosing the right foundation can lead to elegant solutions. Sometimes the best framework isn't the one that does everything, but the one that helps you do the right things in the right way.
