# How AI Works — An Interactive Visual History of AI/ML

[![HTML5](https://img.shields.io/badge/HTML5-Canvas-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: Apache 2.0](https://img.shields.io/badge/Code-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![License: CC BY 4.0](https://img.shields.io/badge/Content-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![GitHub stars](https://img.shields.io/github/stars/yushundong/how-ai-works?style=social)](https://github.com/yushundong/how-ai-works)
[![GitHub downloads](https://img.shields.io/github/downloads/yushundong/how-ai-works/total?color=brightgreen&label=Downloads)](https://github.com/yushundong/how-ai-works/releases)
[![Models](https://img.shields.io/badge/Models-50-34d399)](section1.html)
[![Demos](https://img.shields.io/badge/Interactive_Demos-50-fb923c)](section1.html)

> **50 models · 1805–2024 · 8 sections · Interactive canvas demos**
>
> From Gauss's Least Squares to Sora's video generation — every milestone explained with hands-on visualizations.

🔗 **Author:** Dr. Yushun Dong @ Florida State University
🏷️ **License:** Code under Apache 2.0 · Content under CC BY 4.0

---

## Overview

**How AI Works** is a self-contained, static website that walks through the entire history of artificial intelligence and machine learning through **50 interactive model demos** spanning over 200 years. Every model includes:

- 📄 **Paper link** — direct link to the original publication
- 🔗 **Model lineage** — cross-references showing how each model evolves from and leads to others
- 🎮 **Interactive demo** — canvas-based visualization you can click, hover, and explore
- 📐 **Key formula** — the core equation or architecture in one line

No frameworks. No build step. No dependencies. Just open `index.html` in a browser.

---

## Sections & Models

### Section I — The Mathematical Roots (1805–1957)
| Year | Model | ID |
|------|-------|----|
| 1805 | Linear Regression (Least Squares) | `#model-linreg` |
| 1812 | Bayes' Theorem | `#model-bayes` |
| 1847 | Chain Rule of Calculus | `#model-chainrule` |
| 1906 | Markov Chains | `#model-markov` |
| 1957 | Perceptron | `#model-perceptron` |

### Section II — Early Learning Machines (1960–1967)
| Year | Model | ID |
|------|-------|----|
| 1960 | ADALINE | `#model-adaline` |
| 1963 | Naive Bayes Classifier | `#model-naivebayes` |
| 1967 | K-Nearest Neighbors | `#model-knn` |

### Section III — Pattern Recognition & Trees (1980–1995)
| Year | Model | ID |
|------|-------|----|
| 1980 | Neocognitron | `#model-neocognitron` |
| 1986 | Decision Tree (ID3/C4.5) | `#model-dtree` |
| 1995 | Random Forest | `#model-randomforest` |
| 1995 | SVM (Support Vector Machine) | `#model-svm` |
| 1997 | AdaBoost | `#model-adaboost` |

### Section IV — Neural Networks Rise (1986–1997)
| Year | Model | ID |
|------|-------|----|
| 1986 | Backpropagation | `#model-backprop` |
| 1985 | Boltzmann Machine | `#model-boltzmann` |
| 1989 | CNN / LeNet | `#model-cnn` |
| 1990 | RNN (Recurrent Neural Network) | `#model-rnn` |
| 1997 | LSTM | `#model-lstm` |
| 1998 | GMM + EM Algorithm | `#model-gmm` |

### Section V — Deep Foundations (2006–2011)
| Year | Model | ID |
|------|-------|----|
| 2006 | Deep Belief Network | `#model-dbn` |
| 2006 | Sparse Autoencoder | `#model-sparse-ae` |
| 2008 | Denoising Autoencoder | `#model-dae` |
| 2001 | GBDT (Gradient Boosted Trees) | `#model-gbdt` |
| 2003 | NNLM (Neural Language Model) | `#model-nnlm` |

### Section VI — The Deep Learning Explosion (2012–2015)
| Year | Model | ID |
|------|-------|----|
| 2012 | AlexNet | `#model-alexnet` |
| 2014 | Dropout | `#model-dropout` |
| 2013 | Word2Vec | `#model-word2vec` |
| 2013 | VAE (Variational Autoencoder) | `#model-vae` |
| 2014 | GAN (Generative Adversarial Network) | `#model-gan` |
| 2014 | Seq2Seq + Attention | `#model-seq2seq` |
| 2015 | ResNet (Residual Network) | `#model-resnet` |
| 2015 | Batch Normalization | `#model-batchnorm` |

### Section VII — The Transformer Revolution (2016–2019)
| Year | Model | ID |
|------|-------|----|
| 2016 | XGBoost | `#model-xgboost` |
| 2016 | WaveNet | `#model-wavenet` |
| 2017 | Transformer | `#model-transformer` |
| 2018 | ELMo | `#model-elmo` |
| 2018 | GPT-1 | `#model-gpt1` |
| 2018 | BERT | `#model-bert` |
| 2018 | StyleGAN | `#model-stylegan` |
| 2019 | GPT-2 | `#model-gpt2` |
| 2019 | T5 | `#model-t5` |

### Section VIII — Foundation Models & The AGI Era (2020–2024)
| Year | Model | ID |
|------|-------|----|
| 2020 | GPT-3 | `#model-gpt3` |
| 2020 | ViT (Vision Transformer) | `#model-vit` |
| 2021 | CLIP | `#model-clip` |
| 2020 | Diffusion Models | `#model-diffusion` |
| 2022 | ChatGPT (RLHF) | `#model-chatgpt` |
| 2023 | LLaMA | `#model-llama` |
| 2023 | GPT-4 | `#model-gpt4` |
| 2024 | Claude (Constitutional AI) | `#model-claude` |
| 2024 | Sora | `#model-sora` |

---

## Model Lineage Map

The site features cross-section hyperlinks showing how models evolved:

```
Least Squares ─→ ADALINE ─→ Backpropagation ─→ CNN/LeNet ─→ AlexNet ─→ ResNet ─→ ViT
                                                    │
Bayes ─→ Naive Bayes ─→ GMM+EM ──────────────────→ VAE ─→ Diffusion Models
                                                    │
Markov ─→ RNN ─→ LSTM ─→ Seq2Seq+Attention ─→ Transformer ─→ GPT/BERT/T5
                                                    │
Chain Rule ─→ Backprop ─→ DBN ─→ Sparse AE ─→ DAE ─────────→ Diffusion
                                                    │
Perceptron ─→ Boltzmann ─→ DBN ──────────────────→ AlexNet ─→ ResNet
                                                    │
Decision Tree ─→ Random Forest ─→ AdaBoost ─→ GBDT ─→ XGBoost
                                                    │
NNLM ─→ Word2Vec ─→ ELMo ─→ GPT-1 ─→ GPT-2 ─→ GPT-3 ─→ ChatGPT ─→ Claude
                                    │
                               BERT ─→ T5

Transformer ─→ ViT ─→ CLIP ─→ Stable Diffusion / DALL-E
         │
         ├─→ GPT-1 → GPT-2 → GPT-3 → ChatGPT → Claude
         ├─→ BERT → T5
         └─→ Sora (DiT = Diffusion + Transformer)

GAN ─→ StyleGAN ─→ (surpassed by) Diffusion Models ─→ Sora
```

---

## Technical Details

### Architecture
- **Pure static site** — HTML + CSS + JS, no build tools
- **Canvas demos** — all visualizations use HTML5 `<canvas>` API
- **Shared utilities** — `shared.js` provides `createCanvas()`, `addControls()`, `addHint()`, math helpers
- **Dark theme** — `styles.css` with CSS custom properties for section-specific accent colors
- **Mobile responsive** — all canvases scale via `width: 100%` CSS

### File Structure
```
site-en/
├── index.html          (9 KB)   Landing page with 8 section cards
├── section1.html       (23 KB)  5 models: Least Squares → Perceptron
├── section2.html       (18 KB)  3 models: ADALINE → KNN
├── section3.html       (29 KB)  5 models: Neocognitron → AdaBoost
├── section4.html       (33 KB)  6 models: Backprop → GMM+EM
├── section5.html       (26 KB)  5 models: DBN → NNLM
├── section6.html       (36 KB)  8 models: AlexNet → BatchNorm
├── section7.html       (43 KB)  9 models: XGBoost → T5
├── section8.html       (43 KB)  9 models: GPT-3 → Sora
├── styles.css          (15 KB)  Dark theme, responsive, all component styles
├── shared.js           (3 KB)   Canvas helpers, math utilities
└── README.md           (this file)
```

**Total size: ~280 KB** (no images, no external dependencies)

### CSS Custom Properties (Accent Colors)
```css
--a1: #38bdf8   /* Section I   — blue      */
--a2: #ffd166   /* Section II  — gold      */
--a3: #4ecdc4   /* Section III — teal      */
--a4: #a78bfa   /* Section IV  — purple    */
--a5: #ff6b6b   /* Section V   — red       */
--a6: #fb923c   /* Section VI  — orange    */
--a7: #f472b6   /* Section VII — pink      */
--a8: #34d399   /* Section VIII— green     */
```

### Special CSS Classes
- `.paper-link` — styled button for academic paper links (📄 icon)
- `.model-lineage` — italicized cross-reference text with colored links
- `.author-line` — subtle author/affiliation credit
- `.ew-logo` — embedded SVG logo
- `.mc-demo` — canvas demo container with responsive scaling

---

## How to Use

1. **Open locally:** Just double-click `index.html` — works offline
2. **Deploy:** Upload the entire folder to any static host (GitHub Pages, Netlify, Vercel, S3)
3. **Navigate:** Click section cards on home page, or use the top nav bar (I–VIII)
4. **Interact:** Every demo has hints, buttons, and mouse/click interactions
5. **Deep link:** Use `sectionN.html#model-name` to link directly to any model

---

## License

This project uses a dual-license structure:

- **Code** (JavaScript, CSS, build scripts, and code embedded in HTML) is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). See `LICENSE`.
- **Content** (explanatory text, narrative descriptions, educational materials) is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). See `CONTENT_LICENSE.md`.

The project name, logo, and associated branding are **not** covered by the open-source or content licenses. See `BRAND_GUIDELINES.md` for usage rules regarding forks and attribution.

For commercial use, enterprise deployments, or partnership inquiries, see `COMMERCIAL.md`.

---

## Credits

- **Author:** Dr. Yushun Dong, Florida State University
- **Design:** Dark theme with per-section accent colors, inspired by academic visualization
- **Demos:** All 50 interactive visualizations built with vanilla Canvas API
- **Papers:** Every model links to its original publication (arXiv, JMLR, NeurIPS, etc.)

---

*Built as an educational resource to make the history and mechanics of AI accessible to everyone.*
