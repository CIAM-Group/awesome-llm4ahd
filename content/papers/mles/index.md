---
id: mles
short_title: MLES
title: Multimodal LLM-assisted Evolutionary Search for Programmatic Control Policies
authors:
  - Qinglong Hu
  - Xialiang Tong
  - Mingxuan Yuan
  - Fei Liu
  - Zhichao Lu
  - Qingfu Zhang
year: 2026
date: 2025-08-07
venue: ICLR
paper_url: https://arxiv.org/pdf/2508.05433
code_url: https://github.com/QingL2000/MLES
institutions:
  - cityu-hk
  - huawei-noahs-ark
primary_dimension: feedback
dimensions:
  - design-object
  - search
  - feedback
  - scope
problems:
  - LunarLander
  - CarRacing
featured: true
summary: MLES combines multimodal LLM policy generation with evolutionary search and visual behavior analysis to discover executable, interpretable control policies.
---

## Why it matters

Learned control policies can be powerful but opaque. Scalar rewards alone often do not explain why a policy fails, which makes targeted improvement difficult. MLES uses a multimodal LLM to inspect execution traces and visual behavior while evolving programmatic policies that remain readable and executable.

![MLES paper overview](./images/paper-cover.jpg)

*Paper cover and opening figure. Source: Hu et al., MLES; see the [arXiv paper](https://arxiv.org/abs/2508.05433).*

## Core method

MLES runs a closed evolutionary loop over policy programs. The evaluator returns objective performance and visual rollouts; the multimodal model analyzes behavior and proposes targeted modifications. The reported instantiation uses an EoH-style evolutionary backbone, shares comparable initial populations, and adds visual feedback-driven behavior analysis.

The paper evaluates LunarLander and CarRacing, comparing programmatic policies with reinforcement-learning baselines and an evolution loop without the visual analysis component.

## Contributions

- A general multimodal evolutionary search framework for executable policies.
- Behavior-level visual feedback in addition to scalar rewards.
- A bridge between automatic heuristic design and interpretable control-program discovery.

## Strengths and limitations

Visual feedback can expose failure modes that a scalar score hides and gives the LLM a richer mutation signal. The approach introduces multimodal inference cost and depends on the quality of rendered traces, behavior descriptions, and evaluator design.

## What to improve

Behavior embeddings, automatic failure-mode taxonomies, and cross-task policy transfer could make the visual feedback channel less dependent on prompt wording.

## Connections

MLES adapts an EoH-like evolutionary backbone to programmatic control, demonstrating how the same search ideas can cross from combinatorial heuristics into multimodal policy discovery.
