---
title: GitHub Copilot 在 Markdown 文件中不生效的解决办法
description: 针对 VS Code 中 Copilot 无法在 Markdown 文件中提供自动补全建议的排查与修复指南。
date: 2026-02-23
image: https://images.ctfassets.net/8aevphvgewt8/2Zamxo7a7F9K9jsTAl2EGA/bce1f04a40536e89ef543cb311f2968b/github-copilot-cli.png
minRead: 5
author:
  name: mou7s
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: mou7s
---


## Copilot 未在 Markdown 中启用

默认情况下，GitHub Copilot 可能未配置为在 Markdown 文件中提供自动建议。您需要在 VS Code 设置中显式启用它。
1. 打开 VS Code 设置 (File > Preferences > Settings 或快捷键 `Ctrl+,` / `Cmd+,`)。
2. 搜索 `Copilot:Enable`。
3. 确保在 "Copilot: Enable" 列表设置中，`markdown` 项的值被设置为 `true`。