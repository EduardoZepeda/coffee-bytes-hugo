---
aliases:
- /en/ai-generated-art-and-ai-generated-code-are-treated-differently/
authors:
- Eduardo Zepeda
categories:
- opinion
- artificial intelligence
coverImage: images/developers-difference-ai-and-artistas.jpg
date: '2025-05-25T14:29:58-06:00'
seo_title: "AI in Art vs Code: Why the Double Standard?"
description: Analysis of why generative AI is perceived differently by artists and
  developers. The double standard in the tech industry.
keyword: ''
keywords:
- artificial intelligence
- jpg
- ai
- devs
title: AI-generated Art and AI-generated code are treated differently
---

I came across an AI-generated image of *Sakura Card Captors* in the style of Spanish painter Remedios Varo on social media. The comments were overwhelmingly negative about AI - a common reaction given the [current AI hype]({{< ref path="/posts/artificial-intelligence/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="en" >}}).

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1748206520/coffee-bytes/sakura-card-captors-remedios-varo_mwazan.webp" class="md-local-image" alt="Sakura Card Captors image in the style of Remedios Varo created with AI" caption="Sakura Card Captors image in the style of Remedios Varo created with AI"  width="700" height="1050" >}}

## Artists hate AI, devs accept it

Many artists oppose AI. Movements like #NOAI and [Made with Human Intelligence](https://www.forbes.com/sites/lesliekatz/2024/07/17/human-intelligence-art-movement-takes-defiant-stand-against-ai/) have pushed back against [models trained on their work without permission](https://notbyai.fyi/es/#?), style imitation, and fears of replacement.

In contrast, the software industry has largely embraced AI as a productivity tool. Resistance tends to focus on technical issues rather than ethics of training data. The difference is striking.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753062961/coffee-bytes/no-ai-movement_g772l5.jpg" class="md-local-image" alt="NO AI movement" caption="NO AI movement"  width="600" height="600" >}}

## Why the double standard?

Art is visual and emotional - something humans have evolved to notice. Code is abstract and functional, often hidden from end users. Also, code isn't the final product people see; it's an instruction set for machines.

Oscar Wilde said "All art is quite useless" - meaning art exists for beauty and expression, not utility. Code has a clear purpose. That difference matters.

## Randomness and possibility space

Generative models work by learning patterns from training data and using randomness to produce new outputs that fit those patterns. Both art and code follow this process, but the space of valid solutions differs.

- **Art**: Nearly infinite valid ways to represent a concept. A painting in Picasso's style and one by Velázquez can both be valid interpretations.
- **Code**: Fewer valid solutions to achieve the same result. A loop from 0 to 100 might have a dozen reasonable implementations in one language, but many will differ in performance, readability, or correctness.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753063920/coffee-bytes/artificial-intelligence-art-randomness_pozdsb.webp" class="md-local-image" alt="An emotional photograph in the style of a Fujifilm disposable camera showing a medium shot of a Japanese woman in her 20s crying at a wedding ceremony." caption=""  width="600" height="797" >}}

As complexity grows, code's solution space expands, but constraints remain. You can measure correctness - a crawler that crashes or leaks memory is worse than one that doesn't. With art, there's usually no objective metric to say one valid interpretation is "better" than another. 

This is why randomness and variation work better for art generation. For code, you need more constraints and iterations to reach a working, acceptable solution.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753063920/coffee-bytes/artificial-intelligence-art-randomness_pozdsb.webp" class="md-local-image" alt="An emotional photograph in the style of a Fujifilm disposable camera (like 'Utsurundesu') showing a medium shot of a Japanese woman in her 20s, crying at a wedding ceremony. She stands among guests, wearing a soft pastel-colored dress. Her makeup is slightly smudged by tears. The scene is imbued with deep nostalgia and melancholy. Soft, dim lighting casts a gentle glow on her dark hair. The focus is on her expressive face, and in the reflection of her eyes, a bride and groom can be seen standing together. The background shows a beautiful wedding venue with warm lighting. The image features pronounced film grain, slightly muted tones, and cinematic blur, amplifying the emotional intensity of the moment from a wider perspective. The composition evokes longing and fleeting memories, characteristic of heartfelt disposable camera photography. The background is softly blurred." caption=""  width="600" height="797" >}}  

With code, it’s slightly different. Obviously, as the codebase grows, the number of possible solutions increases too. But here’s a crucial difference: unlike art, not all solutions are equally valid.  

## Visibility changes perception

AI art is the final product users see. AI-generated code is usually hidden behind an app or website. People don't see the code, so they don't react to it the same way.

[Tools like Bolt, Lovable, and v0]({{< ref path="/posts/artificial-intelligence/bolt-vs-lovable-vs-vercel-v0-mi-opinion/index.md" lang="en" >}}) generate code trained on public repositories (often without permission), yet there's little outrage compared to AI image generators.

## What about AI-generated websites?

Websites turn code into pixels, so they're visible. But they're still treated differently from art. Most people don't see a website as "human expression" the way they see a painting or illustration. Also, AI websites often look generic or similar to templates, and people are less likely to notice or care if AI generated them.

With art, flaws like extra fingers or the overused "Ghibli style" are obvious. With code rendered as a UI, those tells are less visible. AI-generated art stands out; AI-generated code is invisible.
