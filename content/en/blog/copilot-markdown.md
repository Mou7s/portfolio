---
title: GitHub Copilot Not Working in Markdown Files
description: A quick fix for when Copilot stops giving suggestions in Markdown files.
date: 2026-02-23
image: https://images.ctfassets.net/8aevphvgewt8/2Zamxo7a7F9K9jsTAl2EGA/bce1f04a40536e89ef543cb311f2968b/github-copilot-cli.png
minRead: 15
author:
  name: mou7s
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: mou7s
---


## Copilot Isn't Enabled for Markdown

By default, Copilot might not be configured to provide suggestions in Markdown files. You need to explicitly enable it in settings.
1. Open VS Code settings (File > Preferences > Settings, or `Ctrl+,` / `Cmd+,`).
2. Search for `Copilot:Enable`.
3. In the "Copilot: Enable" list, make sure the `markdown` item is set to `true`.
