---
title: ShellCrash Installation Guide
description: A step-by-step guide to installing and using ShellCrash for managing mihomo/sing-box cores on low-end routers or devices accessible via SSH.
date: 2026-02-23
image: https://avatars.githubusercontent.com/u/61367819?s=48&v=4
minRead: 10
author:
  name: mou7s
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: mou7s
---

## Introduction

ShellCrash is a lightweight script tool for deploying and managing mihomo (Clash Meta) / sing-box cores directly from a Shell environment. Compared with GUI-based proxy clients, ShellCrash uses far fewer resources, making it ideal for low-end routers, soft routers, or any device you can reach over SSH. This article walks through the installation and basic setup using a router running OpenWrt as an example.

## Prerequisites

1. A router or gateway device accessible via SSH.
2. The device must be connected to the internet.
3. Root access (or an account with sufficient privileges).
4. Either `curl` or `wget` must be installed.
   1. Check with `which`:
      ```bash
      which curl
      # or
      which wget
      ```
   2. If neither command returns a path, install one on OpenWrt:
      ```bash
      opkg update
      opkg install wget
      # or
      opkg update
      opkg install curl
      ```

## Installation

1. Connect to your device via SSH.
2. Run the one-click install script:
   * With `curl`:
     ```bash
     export url='https://testingcf.jsdelivr.net/gh/juewuy/ShellCrash@master' \
       && sh -c "$(curl -kfsSl $url/install.sh)" \
       && . /etc/profile &> /dev/null
     ```
   * With `wget`:
     ```bash
     export url='https://testingcf.jsdelivr.net/gh/juewuy/ShellCrash@master' \
       && wget -q --no-check-certificate -O /tmp/install.sh $url/install.sh \
       && sh /tmp/install.sh \
       && . /etc/profile &> /dev/null
     ```
3. After installation, run `crash` to open the ShellCrash menu.
4. Install a local Dashboard panel:
   1. Run `crash` to enter the menu.
   2. Enter `9` to open the Update & Support menu.
   3. Enter `4` to open the Dashboard installation menu.
   4. `zashboard` is recommended — once installed, you can manage nodes from a browser.
5. Switch the core (e.g. to Mihomo or SingBoxR):
   1. Run `crash` to enter the console.
   2. Enter `9` to open the Update & Support menu.
   3. Enter `2` to open the core switching menu.

## References
1. https://github.com/juewuy/ShellCrash/blob/dev/README_CN.md
