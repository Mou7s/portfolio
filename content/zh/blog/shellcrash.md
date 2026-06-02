---
title: ShellCrash 安装与配置超详细指南
description: 逐步教你如何在支持 SSH 登录的低配路由器或嵌入式设备上安装并管理 ShellCrash，实现以 mihomo/sing-box 内核为基础的代理分流。
date: 2026-02-23
image: https://avatars.githubusercontent.com/u/61367819?s=48&v=4
minRead: 8
author:
  name: mou7s
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: mou7s
---

## 介绍

ShellCrash 是一款非常实用的脚本工具，专门用于在 Shell 终端环境中快速部署与管理 mihomo (Clash Meta) / sing-box 等核心引擎。与图形化代理客户端相比，ShellCrash 占用的内存和系统资源极小，非常适合部署在硬件配置受限的家用路由器、软路由或任何可以通过 SSH 访问的服务器上。

本文以已经刷入 OpenWrt 系统的普通路由器为例，讲解如何使用 ShellCrash。

## 前提条件

1. 一台可以通过 SSH 远程访问的路由器或网关设备。
2. 该设备已联网。
3. 拥有 `root` 账户权限以运行安装脚本。
4. 设备中需要预装 `curl` 或 `wget`。
   1. 可以使用 `which` 命令进行检测：
      ```bash
      which curl
      # 或
      which wget
      ```
   2. 如果两个命令均无输出，请先在 OpenWrt 系统上运行安装：
      ```bash
      opkg update
      opkg install wget
      # 或者
      opkg update
      opkg install curl
      ```

## 安装步骤

1. 使用客户端建立与路由器的 SSH 连接。
2. 根据可用工具，运行一键安装脚本：
   * 使用 `curl` 安装：
     ```bash
     export url='https://testingcf.jsdelivr.net/gh/juewuy/ShellCrash@master' \
       && sh -c "$(curl -kfsSl $url/install.sh)" \
       && . /etc/profile &> /dev/null
     ```
   * 使用 `wget` 安装：
     ```bash
     export url='https://testingcf.jsdelivr.net/gh/juewuy/ShellCrash@master' \
       && wget -q --no-check-certificate -O /tmp/install.sh $url/install.sh \
       && sh /tmp/install.sh \
       && . /etc/profile &> /dev/null
     ```
3. 安装成功后，直接在终端中运行 `crash` 命令，即可呼出 ShellCrash 管理台菜单。
4. 安装本地控制面板 (Web Dashboard)：
   1. 运行 `crash` 进入菜单。
   2. 输入 `9` 进入“更新/卸载及其他功能”菜单。
   3. 输入 `4` 进入“面板管理”安装界面。
   4. 建议选择安装 `zashboard`，安装完成后即可通过浏览器直观管理节点。
5. 切换内核（如切换到 Mihomo 或 SingBoxR）：
   1. 运行 `crash` 进入控制台。
   2. 输入 `9` 打开更新列表。
   3. 选择 `2` 切换为所需要的内核。
