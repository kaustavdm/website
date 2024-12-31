---
date: 2024-12-31
slug: ontology-kg-graphrag
title: Ontology and GraphRAGs to knowledge-centric systems
description: How systems like Upspeak can go from Knowledge Graphs to GraphRAGs and build towards agentic interfaces for personalised knowledge management.
tags:
- technology
- philosophy
- upspeak
- thoughts
- knowledge-graphs
---

## Introduction

We are in the Early Information Age, where we are still learning, as a species, to cope with the onslaught of data.

The exponential growth of digital information has led to fragmented repositories of knowledge scattered across various platforms, ranging from structured APIs to unstructured social networks. This proliferation creates both opportunities and complexities in managing, synthesising, and deriving actionable insights from disparate sources on the internet, particularly the systems and communities we participate in as individuals.

I started thinking and planning [Upspeak](https://github.com/upspeak/upspeak) a few years ago with the itch to address this pressing need. I envisioned Upspeak as an adaptive framework that connects structured and unstructured data, enriching it with semantic and contextual relationships, while keeping an uncompromisingly individual perspective. As it turns out, this is a very broad and thorny problem, resarching which has led me down an increasing number of rabbit holes that merit documenting.

And so, drawing inspiration from graph theory, natural language processing (NLP), and decentralised systems, I now intend to explore how [Knowledge Graphs](https://www.researchgate.net/publication/359999288_Knowledge_Graphs_Introduction_History_and_Perspectives)(KG) for individuals can become the backbone of [GraphRAG](https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/) that power agentic interfaces, enabling individuals to retrieve knowledge and engage with said knowledge contextually and interactively.

I have previously written (wondered?) about [a systems approach to remembering](/remembering-archiving-retrieval/) and [how we can go from fragmented archives to knowledge graphs](/fragmented-archives-to-knowledge-graphs/). This article carries on that line of exploration.

---

## Ontological foundations

Ontological foundations are central to the design of any knowledge management system as ambitious as Upspeak.

Ontology, in its philosophical sense, investigates the nature of being and categorisation. When applied to digital knowledge systems, it demands clarity about the entities represented, their properties, and interrelations. Upspeak's ontological approach aspires to reflect this philosophical rigour.

Nodes in Upspeak are designed as atomic, yet capable of aggregation into higher-order structures such as "Threads" or other composite graphs. Relationships (Edges) in Upspeak are intended to be context-dependent, allowing for iterative graph enrichment as an individual's understanding and access to information evolve. Additional properties can be added through "Annotations". Such an ontological foundation prioritises relational and situational aspects of entities over fixed categorisations. 

### A non-reductionist ontological approach

Specifically, such a foundation creates a [non-reductionist](https://jods.mitpress.mit.edu/pub/resisting-reduction/release/19) approach to ontology.

Non-reductionist perspectives in ontology reject the notion that systems can be fully understood or explained solely by examining their individual components. Instead, they argue that the relationships, interactions, and emergent properties of a system are equally important, if not more so, than its discrete parts.

Knowledge graphs inherently align with such non-reductionist thinking by focusing on both entities (nodes) and the relationships (edges) between them. These connections form a web of meaning, where the significance of a node is derived not only from its individual properties but also from its position and role within the graph.

A GraphRAG similarly embodies non-reductionist ontology as well by enabling capabilities like multi-hop reasoning and contextual understanding, which arise from the interplay of graph topology and neural models. These emergent behaviours cannot be reduced to the properties of individual nodes or edges.

Further, non-reductionist ontology intersects with graph theory in its emphasis on network effects, clustering, and centrality, specifically in these key areas:

1. **Graph ontologies**: Formalising graph entities and relationships using ontological vocabularies, ensuring semantic clarity.
2. **Reasoning and inference**: Graph-based reasoning algorithms (e.g., pathfinding, clustering) can be enriched by ontological rules, enabling higher-order insights.
3. **Dynamic graphs**: Ontological principles inform the design of dynamic graphs, where evolving contexts reshape nodes and edges in real time.

---

## On GraphRAG as an epistemic framework

Building upon the ontological foundations, GraphRAG represents a significant evolution in retrieval-augmented generation (RAG) systems.

Most existing RAG systems operate within the constraints of linear document structures. When given a query, a RAG system retrieves relevant documents from a vector database using semantic search, then feeds both the query and retrieved context to an LLM for generation. While this approach is effective for a good number of use cases, it treats documents as independent units and does not explicitly capture relationships between pieces of information. 

By comparison, GraphRAG leverages the rich semantic relationships encoded in Knowledge Graphs to enable more sophisticated information retrieval and generation. GraphRAG, thus, embraces a more nuanced, interconnected view of knowledge that more closely mirrors human cognitive processes.

At its core, GraphRAG's knowledge representation layer is a heterogeneous graph structure that goes beyond simple binary relationships. Each vertex in this knowledge topology maintains multiple parallel representations – semantic, structural, and typological – creating a rich multidimensional embedding space where meaning emerges from content, context and connection. 

Semantic embeddings capture the nuances of linguistic meaning; structural embeddings encode the topology of knowledge relationships; typological embeddings represent the categorical nature of entities. Philosophically, this treats the concept of meaning as inherently relational, rather than atomic.

This unification creates a knowledge space that is both mathematically rigorous and philosophically grounded.

---

## Towards knowledge-centric interaction systems

The implementation of GraphRAG in environments like Upspeak can create a new paradigm of knowledge management, producing a fundamental shift in how we conceptualize the interaction between human cognition and machine-mediated knowledge structures.

While the term "agentic" might suggest autonomous decision-making, I propose instead that these systems represent a new class of knowledge-centric interaction frameworks that augment human agency rather than attempting to replicate it.

In such systems, knowledge exists not as discrete units but as interconnected patterns across the graph structure, over multiple representation spaces (semantic, structural, and temporal), enabling different modes of access and reasoning. The topology of connections itself encodes meta-knowledge about relationships and dependencies.

Local context emerges from immediate neighborhood relationships in the graph. Global context is preserved through higher-order graph properties and meta-paths. The interaction between local and global contexts creates a dynamic knowledge space that adapts to user queries

The graph structure evolves through both explicit updates and implicit learning. Edge weights and node embeddings are continuously refined based on usage patterns. The system maintains provenance information to track the evolution of knowledge. All of this occurs within constraints that preserve semantic consistency.

---

## A rather long list of questions

In studying GraphRAG, I came up with more questions about nature of knowledge representation and human-machine knowledge interaction than I can answer. Allow me to list the questions in the hope that we will continue to work towards their answers.

Can the topology of knowledge graphs capture implicit human understanding? What is lost or gained in the translation between human cognitive structures and graph-based representations?

How do graph structures mediate between human and machine understanding, instead of asking if machines can understand? How might the structure of knowledge graphs reflect or differ from neural patterns in human cognition?

What is the relationship between individual knowledge graphs and collective knowledge structures? What role does the temporal evolution of graph structures play in knowledge development?

How do we design systems that don't just store and retrieve information, but actively engage with it? What would it mean for an artificial system to be genuinely curious?

And so, rather than pursuing artificial agency, let us focus on developing systems that enhance human agency through sophisticated knowledge interaction. The goal is not to replicate human understanding but to create complementary knowledge structures that extend human cognitive capabilities through well-designed interaction patterns.

---

## Future horizons

In my exploration of GraphRAG systems, I've encountered several intriguing frontiers that warrant deeper investigation. These areas not only challenge our current technical capabilities but also push us to question fundamental assumptions about knowledge representation and artificial reasoning.

When I observe how symbolic reasoning and neural methods interact within these systems, I see more than just a technical solution. I see a potential bridge between two fundamentally different ways of understanding the world. The neural components learn from experience, much like empiricist philosophy suggests, while the symbolic elements encode logical relationships and rules, aligning with rationalist thinking. What excites me most is how these approaches strengthen rather than compromise each other within the GraphRAG framework.

As I continue this work, I am convinced that the fusion of graph theory, retrieval-augmented generation, and agentic interfaces isn't just another incremental improvement in AI technology. Rather, it represents a fundamental rethinking of how artificial systems can engage with human knowledge.
