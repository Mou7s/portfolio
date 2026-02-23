---
title: Github Copilot Isn't Working in Markdown Files 
description: A troubleshooting guide for when Copilot doesn't work in Markdown files.
date: 2026-02-23
image: https://images.ctfassets.net/8aevphvgewt8/2Zamxo7a7F9K9jsTAl2EGA/bce1f04a40536e89ef543cb311f2968b/github-copilot-cli.png
minRead: 15
author:
  name: Chuge Liu
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: Chuge Liu
---


## Copilot Isn’t Enabled for Markdown

By default, Copilot might not be configured to provide suggestions in Markdown files. You need to explicitly enable it in settings.
1. Open VS Code settings (File > Preferences > Settings).
2. Search for "Copilot:Enable".
3. Ensure that value of Markdown is true in the "Copilot: Enable" setting for Markdown files.