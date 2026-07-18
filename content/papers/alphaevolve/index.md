---
id: alphaevolve
short_title: AlphaEvolve
title: 'AlphaEvolve: A coding agent for scientific and algorithmic discovery'
authors:
  - Alexander Novikov
  - Ngân Vũ
  - Marvin Eisenberger
  - Emilien Dupont
  - Po-Sen Huang
  - Adam Zsolt Wagner
  - Sergey Shirobokov
  - Borislav Kozlovskii
  - Francisco J. R. Ruiz
  - Abbas Mehrabian
  - M. Pawan Kumar
  - Abigail See
  - Swarat Chaudhuri
  - George Holland
  - Alex Davies
  - Sebastian Nowozin
  - Pushmeet Kohli
  - Matej Balog
year: 2025
date: 2025-06-16
venue: arXiv white paper
paper_url: https://arxiv.org/pdf/2506.13131
institutions:
  - google-deepmind
primary_dimension: scope
dimensions:
  - design-object
  - search
  - feedback
  - scope
problems:
  - Scientific algorithm discovery
  - Data-center scheduling
  - Matrix multiplication
  - Hardware accelerator optimization
featured: true
summary: AlphaEvolve presents an evolutionary coding agent that edits executable algorithms, receives evaluator feedback, and searches across scientific and production infrastructure tasks.
---

## Why it matters

AlphaEvolve makes the system boundary larger than a single heuristic function. An autonomous pipeline of language models proposes direct code changes, evaluators measure them, and the search continues across longer-lived algorithmic artifacts. The paper describes a white-paper system rather than a conventional conference submission, so the atlas labels it accurately.

![AlphaEvolve paper overview](./images/paper-cover.jpg)

*Paper cover and opening figure. Source: Novikov et al., AlphaEvolve; see the [arXiv white paper](https://arxiv.org/abs/2506.13131).*

## Core method

AlphaEvolve orchestrates coding agents, evolutionary selection, and one or more evaluators. Candidates are executable programs, and the harness can apply domain-specific correctness and performance checks. The paper reports applications to data-center scheduling, accelerator circuits, LLM training infrastructure, mathematical algorithms, and matrix multiplication.

## Contributions

- A general coding-agent architecture for evaluator-guided algorithm evolution.
- Evidence that evolutionary code editing can target both scientific and production systems.
- A broad system-level framing of automatic discovery beyond fixed heuristic templates.

## Strengths and limitations

The executable artifact and evaluator make the loop concrete, while the wider system boundary enables real engineering impact. Reproducibility is limited by proprietary models, infrastructure, evaluators, and compute. Long-horizon evolution also makes harness safety, budget allocation, and anti-hacking checks central research concerns.

## What to improve

Open implementations, transparent evaluation harnesses, and standardized budgets would make comparisons with academic AHD systems more meaningful.

## Connections

The atlas treats AlphaEvolve as a system-level generalization of evaluator-guided program search, including FunSearch as its closest historical anchor.
