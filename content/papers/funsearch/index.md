---
id: funsearch
short_title: FunSearch
title: Mathematical discoveries from program search with large language models
authors:
  - Bernardino Romera-Paredes
  - Mohammadamin Barekatain
  - Alexander Novikov
  - Matej Balog
  - M. Pawan Kumar
  - Emilien Dupont
  - Francisco J. R. Ruiz
  - Jordan S. Ellenberg
  - Pengming Wang
  - Omar Fawzi
  - Pushmeet Kohli
  - Alhussein Fawzi
year: 2023
date: 2023-12-14
venue: Nature
paper_url: https://www.nature.com/articles/s41586-023-06924-6.pdf
code_url: https://github.com/google-deepmind/funsearch
institutions:
  - google-deepmind
  - uw-madison
  - inria
primary_dimension: design-object
dimensions:
  - design-object
  - search
  - feedback
  - scope
problems:
  - Cap set problem
  - Online bin packing
featured: true
summary: FunSearch pairs a pretrained language model with a systematic evaluator and evolves programs in function space, demonstrating new mathematical constructions and improved algorithmic heuristics.
---

## Why it matters

Large language models can propose plausible but incorrect ideas. FunSearch addresses that weakness by coupling creative program proposals to an evaluator that decides whether a candidate actually works. The result is an evolutionary procedure that searches for executable programs instead of asking an LLM to state a final answer directly.

![FunSearch paper overview](./images/paper-cover.jpg)

*Paper cover and opening figure. Source: Romera-Paredes et al., FunSearch; see the original [Nature article](https://www.nature.com/articles/s41586-023-06924-6).*

## Core method

FunSearch starts with a program skeleton and evolves the part containing the problem-specific logic. A frozen pretrained LLM proposes mutations using best-performing programs as examples. The evaluator executes each candidate and returns an objective score, allowing an evolutionary database to preserve high-performing discoveries and revisit promising branches.

The paper demonstrates the approach on the cap set problem in extremal combinatorics and on online bin packing. The latter is particularly relevant to LLM4AD because the output is an interpretable heuristic program rather than a raw solution vector.

## Contributions

- A reusable LLM-plus-evaluator evolutionary procedure for program search.
- Demonstrations that search can produce new mathematical constructions beyond the model's nominal answer.
- An algorithmic application that discovers improved online bin-packing heuristics.

## Strengths and limitations

The evaluator gives the loop a verifiable feedback channel and the program representation makes discoveries inspectable. The approach still depends on a good skeleton, an efficient evaluator, and a search budget. It also leaves open how to move from a single task-specific program to a transferable algorithm system.

## Connections

The atlas places FunSearch beside AEL as a late-2023 concurrent work. Later systems can be explored through the `system`, `search`, and `feedback` filters.
