---
date: 2024-12-16
slug: fragmented-archives-to-knowledge-graphs
title: The evolution of knowledge — from fragmented archives to knowledge graphs
description: Exploring how intent-driven knowledge systems can transcend traditional archives; addressing challenges of context, ethics, and evolution in an interconnected world.
tags:
- technology
- philosophy
- upspeak
- thoughts
- knowledge-graphs
---

In an age where we are simultaneously experiencing an overabundance of information and its rather rapid obsolescence, the answer to the question of what it means to "know" grows increasingly complex.

In my [previous article](/remembering-archiving-retrieval/), I started examining the philosophical and practical conundrums of remembering, through the lens of archival and retrieval of information, and briefly looked at what today's knowledge archival systems should aspire to.

The utilitarian in me finds the static nature of traditional archival forms increasingly inadequate to synthesize the complexities of *context* and the dynamism of *intent*. Alternate models, my favourite being [knowledge graphs](https://ai.stanford.edu/blog/introduction-to-knowledge-graphs/), transcend the limitations of static systems by enabling interconnected, adaptive, and evolving representations of knowledge.

Let's continue to analyse further.

---

## The knowledge archive paradox

Humanity's quest to preserve its intellectual and cultural legacy spans millennia. We have come a long way from the baked clay tablets of Mesopotamia, to the printing press, to today's vast digital repositories and big data shenanigans. Yet, embedded in this quest for preservation is a profound paradox: while archives aspire to permanence, memory – whether individual or collective – is mutable, interpretative, and inherently chaotic.

The entropy of collective memory becomes evident as the volume of archived material expands. 

On one hand, without meticulous information organisation, retrieving meaningful insights becomes an increasingly Sisyphean task. Even with well-organized information and knowledge in our libraries, universities, journals and encyclopaedias, access to archived material is gatekeeped, while retrieving meaningful knowledge takes time, specialised expertise, and the output is often sparesely connected, leaving it to the researcher to connect the dots after retrieval.

And, yet, the act of information organisation is itself fraught with bias, privileging dominant narratives and marginalising alternative perspectives. Critically, the *intent* – the purpose that motivates the act of preservation – is often obscured or lost entirely, reducing archives to disconnected collections of facts separated from the motivations that shaped their creation.

---

## Role of Graphs in knowledge evolution

If traditional archives are akin to libraries – static shelves of books, journals and manuscripts – knowledge graphs are living ecosystems: interconnected, adaptive, and generative. They transcend the confines of isolated data storage, offering a paradigm of knowledge representation that thrives on relationships, context, and growth.

At their core, knowledge graphs model relationships between entities, transforming isolated fragments into cohesive networks. Think of David Hume's [Principles of Association](https://plato.stanford.edu/entries/hume/#PrinAsso), or Deleuze's "[rhizome](https://plato.stanford.edu/entries/deleuze/#ThouPlat)". We need non-linear, interconnected systems over hierarchical structures.

Practically speaking, knowledge graphs can bring several transformative capabilities to archival:

1. **Contextual Intent**: Nodes within a Graph can encapsulate metadata detailing *why* they exist and Edges can capture *how* the Nodes relate to each other, embedding purpose directly into the structure of the Graph.
2. **Multiplicity of Perspectives**: By removing hierarchical constraints, graphs allow for divergent interpretations to coexist, fostering deeper and more nuanced understandings. Each unique graph traversal formed from a new query produces a new perspective.
3. **Evolutionary Growth**: Graphs can accommodate version histories, branching, and merging, allowing knowledge to grow organically rather than stagnate in static snapshots.

Knowledge graphs can, thus, embrace divergence and multiplicity, and become ideal tools for personal knowledge archives that federate into larger, collective systems.

For instance, the perpetually-in-progress knowledge graph implementation for [Upspeak](https://github.com/upspeak/upspeak) can treat Threads not as linear discussions but as composite Nodes, creating dynamic networks of sub-threads, branches, forked threads and merged threads, that together can hold a multitude of diverse perspectives. Each node can be revisited, expanded, or recontextualised, mirroring the dynamic nature of thought itself, while the graph itself can be enriched through identifying associations and adding annotations.

---

## Knowledge graphs need careful implementation

While knowledge graphs offer profound possibilities, they also surface complex challenges at the intersections of technology, philosophy, and ethics. Let us consider three critical dimensions:

1. **Intent and Ethics**
   Archiving intent is indispensable, but whose intent is privileged? The design of inclusive systems must acknowledge and address the power imbalances that marginalise minority voices. For neurodivergent and queer individuals, whose experiences often defy mainstream categorisations, systems must accommodate multiplicity, fluidity, and self-representation. Crucially, they must resist ossifying dominant perspectives into unassailable norms.

2. **Power Dynamics**
   Centralised knowledge frameworks risk perpetuating existing hierarchies, privileging dominant epistemologies while silencing dissenting perspectives. By contrast, decentralised approaches – such as federated knowledge systems – can distribute control, enabling equitable representation. Synthetic intelligence, deployed as mediators, could synthesise diverse insights while preserving the integrity of individual contributions.

3. **Interoperability Across Epistemologies**
   The tension between systemic epistemological dualities – Western versus Eastern traditions, human versus machine cognition – raises critical questions about interoperability. Can systems accommodate pluralism while maintaining coherence? Achieving this requires transparent documentation of intent, reproducibility, and mechanisms for navigating epistemological differences.

---

## A depressively-optimistic anarchist's worldview

My worldview revolves around empowering the individual and then helping them play well with others.

I imagine a world where knowledge flows dynamically between individuals, communities, and technologies – unconstrained by the limitations of static repositories. In this vision, archives are no longer passive containers but active agents of exploration, collaboration, and growth.

In this world, the individual retains control of their data and enriches their personal knowledge graphs. Those individual graphs federate together to form larger graphs, enabling social queryability. Cryptographic guarantees and decentralised storage then ensure the integrity of archived information while preserving the ability to trace its evolution.

Individuals could then query not just *what* was archived but *why* it exists and *how* it connects to other ideas, enabling richer exploration. Knowledge would evolve through branching, merging, and recontextualisation, reflecting the organic and dynamic nature of thought.

Finally, artificial intelligence would not aim to imitate human cognition but rather act as systems capable of synthesising diverse epistemologies (hence, "synthetic"). Such systems could bridge the gaps between individual and collective knowledge, fostering deeper, more meaningful connections.

---

## Aside: about wikis

Now, perhaps this is an apples-to-oranges comparison given our current topic, but let us briefly consider the case of wikis. Do we even need to consider all these questions about remembering and archiving and retrieval, or can we get things done just by deploying wikis?

Technically, wikis are great at being static repositories of knowledge that can be collaboratively edited to store information connected through hyperlinks. They need additional structured data to be created or generated that knowledge graphs can consume to answer complex queries. Wikis, thus, need a layer above them to gather and synthesise information from an individual perspective.

That either means spending a lot of effort to enrich the information collaboratively in those centralised spaces by building a separate [structured data repository](https://www.wikidata.org). Or, it may be seen as an NLP problem, that can be resolved by pointing a current-day LLM at. In either case, deploying a wiki alone is not enough, though it may be sufficient if one does not need rich, queryable interfaces to their knowledge base.

Wikipedia, and other such large, public wikis, are indispensable repositories of human knowledge. I use them regularly and I am grateful they exist. I say apples-to-oranges because these are fundamentally public spaces. And so, the collaborative, consensus-driven nature of large wikis imposes a centralised editing structure that prioritises uniformity over individuality. You have the "Talk" page and version information, sure, but how easy is it to synthesise _that_ information? Consequently, lived experiences, marginal viewpoints, and nuanced interpretations are often diluted or excluded at the altar of greater public acceptability.

You can of-course self-host your own personal wiki, but then, you lose the ability to tap into that same broad collective mind that produces one of the largest knowledge base humanity has even produced. And, you still need that additional tooling to connect the dots programmatically.

---

## To know without rote

Knowledge is not merely a collection of static data points but a dynamic, higher-order entity shaped by the interplay of context, perspectives, and time. We need to fundamentally shift the focus of knowledge archives from merely preserving information as immutable artefacts to preserving it as a living, evolving entity enriched by its relational and temporal contexts, optimised for efficient retrieval.

The evolution of knowledge is not a linear trajectory. As we develop systems to preserve and engage with knowledge, we must embrace its inherently dynamic nature, shaped by intent, context, and the associations we forge.

Ultimately, the challenge is not merely to remember or forget but to choose how to weave and reweave the intricate web of connections that define our understanding of the world. 
