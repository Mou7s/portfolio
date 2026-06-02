---
title: 黑苹果 Hackintosh 安装极简指南
description: 介绍如何使用 OpenCore 引导程序，快速且实用率高地在非 Apple 硬件上安装 macOS。
date: 2026-02-23
image: https://upload.wikimedia.org/wikipedia/commons/e/e4/Hackintosh-780x495.jpg
minRead: 10
author:
  name: mou7s
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: mou7s
---

## 介绍

黑苹果（Hackintosh）是指在非苹果官方出品的普通 PC 硬件上运行的 macOS 系统。在本指南中，您将学习到使用 [OpenCore](https://github.com/acidanthera/OpenCorePkg) 在 PC 上快速安装 macOS 的实用工作流。

## 前提条件

1. 您需要一台 Windows 电脑。
   *为了获得最好的 [Hardware-Sniffer](https://github.com/lzhoang2801/Hardware-Sniffer) 硬件检测体验，请使用 Windows。*
2. 该电脑必须连接到互联网。
3. 该电脑必须安装 Python。
4. 一个 U 盘（至少 16GB）。
5. 下载并准备 [Rufus](https://rufus.ie/#download)。
6. 下载 [OpCore-Simplify](https://github.com/lzhoang2801/OpCore-Simplify) 工具。
7. 下载 [OpenCore 官方包](https://github.com/acidanthera/OpenCorePkg)。
   *在此工作流中，我们只需要使用 OpenCore 内的 `macrecovery` 工具。*
8. **请注意：** 最稳健可靠的方式依然是参照 [Dortania 的 OpenCore 安装指南](https://dortania.github.io/OpenCore-Install-Guide/) 一步步手动构建您的 EFI 文件夹。由第三方一键生成的 EFI 在部分机器上可能不够完美。如果您希望快速上手，可以准备约一小时时间并跟随以下步骤开始。

## 安装步骤

1. 制作引导 U 盘
   1. 使用 Rufus 格式化 U 盘。
   2. 在 `设备` 中选择您的 U 盘。
   3. `引导类型选择` 选择 `非引导`。
   4. `分区类型` 选择 `GPT`。
   5. 其他设置保持默认值，点击 `开始`。
2. 生成 EFI 配置文件
   1. 打开下载完成的 OpCore-Simplify 文件夹，运行 `OpCore-Simplify.bat`。
   2. 选择 `Select Hardware Report`。
   3. 输入 `e` 自动扫描当前电脑的硬件设备生成报告。根据报告评估您的设备是否支持安装黑苹果。
   4. 如果硬件满足要求，选择 `Build OpenCore EFI`。选择您想安装的 macOS 版本，OpCore-Simplify 会为您自动生成对应的 EFI 文件夹。
   5. 生成完成后，会自动打开该 EFI 目录。把 `EFI` 文件夹复制到 U 盘的根目录下。
3. 下载 macOS 恢复文件 (Recovery)
   1. 打开下载完成的 OpenCore 文件夹，进入 `Utilities/macrecovery` 目录。
   2. 根据 [Dortania 安装指南中的 macrecovery 说明](https://dortania.github.io/OpenCore-Install-Guide/installer-guide/windows-install.html#downloading-macos) 找到您要安装的 macOS 版本的命令。
   3. 在该目录下运行终端命令，下载 macOS 恢复镜像。
   4. 下载完成后，将生成的 `com.apple.recovery.boot` 文件夹整体复制到 U 盘的根目录下。
4. 配置主板 BIOS
   1. 参照 [Dortania 的 OpenCore BIOS 设置说明](https://dortania.github.io/OpenCore-Install-Guide/)，调整您电脑主板的 BIOS。
   2. 不同的主板系列配置不同，请以 Dortania 官方文档为准。
   3. AMD 平台用户可参考 [Ryzen and Threadripper BIOS 推荐设置](https://dortania.github.io/OpenCore-Install-Guide/AMD/zen.html#amd-bios-settings)。
5. 开始安装 macOS
   1. 从刚才制作好的 U 盘启动，进入 OpenCore 引导菜单。
   2. 选择安装 macOS 恢复模式并按照提示完成整个系统的初始化安装。
