---
title: WeChat IPv6 Upload Problem
description: Solving slow upload speeds on WeChat when using IPv6 networks.
date: 2025-12-02
image: https://miro.medium.com/1*dSUrAN4j3hK0Uxv-oYaTfg.png
minRead: 7
author:
  name: mou7s
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: mou7s
---

Last month I set up an x86 soft router in the office for full-network proxying. The system is iStoreOS, which enables IPv6 by default, so every device on the LAN gets a global unicast address. Most apps work fine over IPv6, but I noticed something odd: uploading pictures or videos through the WeChat desktop client dropped to just a few tens of KB/s — completely unusable.

After digging around, I found a solid write-up from the [Beijing Film Academy Network Center](https://nic.bfa.edu.cn/info/1003/1488.htm?utm_source=chatgpt.com) that explains the root cause. It comes down to a mismatch between WeChat's HTTP-DNS routing and the actual IPv6 egress:

- WeChat resolves server IPs via its own HTTP-DNS, often over IPv6.
- The actual upload may then go out over IPv4 (or vice versa).
- If your IPv6 and IPv4 exits use different ISPs or paths — common on campus or corporate multi-exit networks — the upload ends up taking a cross-network detour, spiking latency and packet loss.

It's like a GPS telling you to take the subway, but you end up on a bus following the subway's transfer points — you'll get there eventually, but not efficiently.

## Solutions

A quick diagnostic: open Windows Ethernet settings and temporarily disable IPv6. In my case, uploads returned to normal the moment IPv6 was off — confirming it was the culprit.

For a permanent fix, I disabled IPv6 on the iStoreOS LAN interface so devices on the local network no longer receive IPv6 addresses. This keeps the entire office off the problematic path without affecting general internet connectivity.
