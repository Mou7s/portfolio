---
title: ShellCrash Installation Guide
description: A step-by-step guide to installing and using ShellCrash for managing mihomo/sing-box cores on low-end routers or devices accessible via SSH.
date: 2026-02-23
image: https://avatars.githubusercontent.com/u/61367819?s=48&v=4
minRead: 10
author:
  name: Chuge Liu
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: Chuge Liu
---

## Introduction

ShellCrash is a script tool for conveniently deploying and managing mihomo/sing-box cores in a Shell environment. Compared with other tools, ShellCrash has a smaller footprint and provides a simpler installation and management experience. It is suitable for low-end routers or any device you can access via SSH. This article uses a low-end router with OpenWrt already installed as an example to explain how to install and use ShellCrash.

## Prerequisites

1. You need a device that can be accessed via SSH.
2. The device must be connected to the internet.
3. Log in to the device as the `root` user, or use an account with sufficient privileges.
4. The device needs either `curl` or `wget`.
   1. Use the `which` command to check whether `curl` or `wget` is installed.
      1. Check `curl`:
         ```bash
         which curl
         ```
      2. Check `wget`:
         ```bash
         which wget
         ```
   2. If neither command returns a path, `curl`/`wget` is not installed. Installation methods vary by system. For OpenWrt, you can use:
      ```bash
      opkg update
      opkg install wget
      ```
      or
      ```bash
      opkg update
      opkg install curl
      ```

## Installation
1. Connect to your device via SSH.
2. Run the following command to install ShellCrash:
   1. Install with `curl`:
      ```bash
      export url='https://testingcf.jsdelivr.net/gh/juewuy/ShellCrash@master' \
        && sh -c "$(curl -kfsSl $url/install.sh)" \
        && . /etc/profile &> /dev/null
      ```
   2. Install with `wget`:
       ```bash
       export url='https://testingcf.jsdelivr.net/gh/juewuy/ShellCrash@master' \
         && wget -q --no-check-certificate -O /tmp/install.sh $url/install.sh \
         && sh /tmp/install.sh \
         && . /etc/profile &> /dev/null
       ```
3. After installation, run `crash` to enter the ShellCrash console and check its status.
4. Install a local Dashboard panel:
   1. Run `crash` to enter the ShellCrash console.
   2. Enter `9` to open the Update & Support menu.
   3. Enter `4` to open the local Dashboard installation menu.
   4. Installing `zashboard` is recommended.
5. Switch the core to Mihomo or SingBoxR to resolve access issues with some mainland China websites:
   1. Run `crash` to enter the ShellCrash console.
   2. Enter `9` to open the Update & Support menu.
   3. Enter `2` to open the core switching menu.

## References
1. https://github.com/juewuy/ShellCrash/blob/dev/README_CN.md
