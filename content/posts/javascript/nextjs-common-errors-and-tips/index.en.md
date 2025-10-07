---
date: '2025-10-02T18:39:50-06:00'
draft: true
title: 'Nextjs Common Errors and Tips'
categories:
- category
coverImage: "images/nextjs-common-errors-and-tips.jpg"
description: ''
keyword: ''
keywords:
- ''
authors:
- 'Eduardo Zepeda'
---

CSS CLS error icons prevented by, only shows when doing SSR

``` javascript
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */
```
