---
title: WeChat IPv6 Upload Problem
description: Solving slow upload speeds on WeChat when using IPv6 networks.
date: 2025-12-02
image: https://miro.medium.com/1*dSUrAN4j3hK0Uxv-oYaTfg.png
minRead: 7
author:
  name: Chuge Liu
  avatar:
    src: https://avatars.githubusercontent.com/u/79881792?v=4
    alt: Chuge Liu
---

Last month I installed an X86 soft router in our office to enable a full-network proxy. The system is iStoreOS, which turns on IPv6 by default, so every device on the intranet gets an IPv6 address. In most cases IPv6 works fine, but when I used WeChat to upload pictures or videos the speed dropped to only a few dozen KB per second—bad enough to ruin the experience.

Based on [this write-up from the Beijing Film Academy Network Center](https://nic.bfa.edu.cn/info/1003/1488.htm?utm_source=chatgpt.com), one of the main causes is a mismatch between WeChat’s HTTP-DNS/preferred routing and the actual IPv6 egress. WeChat—especially on desktop—prefers its own HTTP-DNS to resolve server IPs so it can steer traffic. The snag is:

- The DNS query might exit over IPv6 to get the resolution result.
- The actual upload could then exit over IPv4 (or the other way around).
- If your IPv6 and IPv4 exits use different ISPs or paths—common on campus, corporate networks, or multi-exit broadband—you end up visiting an IPv4 route with an IPv6-optimized address (or vice versa). That cross-network detour spikes latency and packet loss, so uploads crawl.

Think of it like navigation telling you “the subway is fastest,” but you actually take the bus while still following the subway transfer points.

## Solutions

Use the Windows Ethernet settings to temporarily disable IPv6 and confirm whether IPv6 is the culprit. In my case, uploads returned to normal the moment I turned IPv6 off, but that’s only a diagnostic quick fix.

The longer-term mitigation was disabling IPv6 on the iStoreOS LAN interface so devices on the local network no longer obtain IPv6 addresses. That keeps the entire office from hitting the same slow-upload path.
