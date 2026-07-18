<div align="center">

# Awesome LLM4AHD

**Large language models for automatic heuristic and algorithm design.**

[Website](https://ciam-group.github.io/awesome-llm4ad/) · [Papers](#papers) · [Contribution guide](docs/CONTRIBUTION_GUIDE.md)

</div>

## Scope

This repository curates papers in which large language models participate in the design, search, evaluation, or improvement of executable algorithms and heuristics. Peer-reviewed papers, arXiv preprints, and public technical reports are included; software without an accompanying paper is not listed as a paper entry.

## Papers

Each entry links to the paper, a structured reading note, and code when available. Dates follow the first public release; venue years are shown separately.

<!-- PAPER_TABLE:START -->
| Month | Paper | Venue | Problems | Focus | Resources |
|:---:|---|:---:|---|:---:|:---:|
| 2023.11 | [**AEL** — Algorithm Evolution Using Large Language Model](https://arxiv.org/pdf/2311.15249) | arXiv 2023 | `Traveling Salesman Problem` | Design object | [Note](content/papers/ael/index.md) |
| 2023.12 | [**FunSearch** — Mathematical discoveries from program search with large language models](https://www.nature.com/articles/s41586-023-06924-6.pdf) | Nature 2023 | `Cap set problem`, `Online bin packing` | Design object | [Note](content/papers/funsearch/index.md) · [Code](https://github.com/google-deepmind/funsearch) |
| 2024.01 | [**EoH** — Evolution of Heuristics: Towards Efficient Automatic Algorithm Design Using Large Language Model](https://arxiv.org/pdf/2401.02051) | ICML 2024 | `Traveling Salesman Problem`, `Bin Packing Problem`, `Flow Shop Scheduling Problem` | Design object | [Note](content/papers/eoh/index.md) · [Code](https://github.com/FeiLiu36/EoH) |
| 2024.02 | [**ReEvo** — ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/pdf/2402.01145) | NeurIPS 2024 | `Traveling Salesman Problem`, `Vehicle Routing Problem`, `Orienteering Problem`, +2 | Feedback | [Note](content/papers/reevo/index.md) · [Code](https://github.com/ai4co/reevo) |
| 2024.12 | [**HSEvo** — HSEvo: Elevating Automatic Heuristic Design with Diversity-Driven Harmony Search and Genetic Algorithm Using LLMs](https://arxiv.org/pdf/2412.14995) | AAAI 2025 | `Traveling Salesman Problem`, `Bin Packing Problem`, `Orienteering Problem` | Search | [Note](content/papers/hsevo/index.md) · [Code](https://github.com/datphamvn/HSEvo) |
| 2025.01 | [**MCTS-AHD** — Monte Carlo Tree Search for Comprehensive Exploration in LLM-Based Automatic Heuristic Design](https://arxiv.org/pdf/2501.08603) | ICML 2025 | `Traveling Salesman Problem`, `Capacitated Vehicle Routing Problem`, `Knapsack Problem`, +2 | Search | [Note](content/papers/mcts-ahd/index.md) · [Code](https://github.com/zz1358m/MCTS-AHD-master) |
| 2025.06 | [**AlphaEvolve** — AlphaEvolve: A coding agent for scientific and algorithmic discovery](https://arxiv.org/pdf/2506.13131) | arXiv white paper 2025 | `Scientific algorithm discovery`, `Data-center scheduling`, `Matrix multiplication`, +1 | Scope | [Note](content/papers/alphaevolve/index.md) |
| 2025.08 | [**EoH-S** — EoH-S: Evolution of Heuristic Set using LLMs for Automated Heuristic Design](https://arxiv.org/pdf/2508.03082) | AAAI 2026 | `Online Bin Packing`, `Traveling Salesman Problem`, `Capacitated Vehicle Routing Problem` | Scope | [Note](content/papers/eoh-s/index.md) |
| 2025.08 | [**MLES** — Multimodal LLM-assisted Evolutionary Search for Programmatic Control Policies](https://arxiv.org/pdf/2508.05433) | ICLR 2026 | `LunarLander`, `CarRacing` | Feedback | [Note](content/papers/mles/index.md) · [Code](https://github.com/QingL2000/MLES) |
<!-- PAPER_TABLE:END -->

## Interactive atlas

The website connects the collection through a compact [paper timeline](https://ciam-group.github.io/awesome-llm4ad/), a curated [relation map](https://ciam-group.github.io/awesome-llm4ad/relations), and paper-level research notes.

[![AHD Papers timeline](docs/assets/atlas-preview.png)](https://ciam-group.github.io/awesome-llm4ad/)

## Contributing

No local setup is required. Add or edit Markdown directly in GitHub; automated checks validate the content, update the paper table, and rebuild the website after merge.

- [Add a paper](docs/CONTRIBUTION_GUIDE.md#add-a-paper)
- [Add a relation](docs/CONTRIBUTION_GUIDE.md#add-a-relation)
- [Choose relation types and dimensions](docs/CONTRIBUTION_GUIDE.md#choose-the-classification)
- [Contribution rules](CONTRIBUTING.md)

## Citation

If this collection supports your research, cite the repository URL. Please cite original papers for paper-specific claims and results.

## License

Repository code and original notes are available under the [Apache License 2.0](LICENSE). Paper figures remain the property of their original authors and publishers and are included with source attribution for scholarly navigation.
