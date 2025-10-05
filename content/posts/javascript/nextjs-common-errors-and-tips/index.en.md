---
date: '2025-10-02T18:39:50-06:00'
draft: true
title: 'Nextjs Common Errors and Tips'
categories:
- category
coverImage: "images/<your-image>"
description: ''
keyword: ''
keywords:
- ''
authors:
- ''
---

CSS CLS error icons prevented by, only shows when doing SSR

import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */
