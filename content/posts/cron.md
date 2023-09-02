---
title: Using Cron
date: 2023-01-27
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---

## What is a cron?

Cron (not to be confused with Corn 🌽) is a standard Unix daemon that runs commands on a user-defined schedule.

The daemon is designed to run forever as a background process on your computer, once it's set up, you can sit back and do nothing while it does all its work for you!

A user uses the `crontab` to view and edit their command schedule.

## How do I install cron?

Over the years of various Unix-like systems co-existing, various solutions have existed, with Vixie Cron, written by Paul Vixie, being one of the most notable classical cron implementations.

Debian Linux actually uses a heavily modified version of Vixie Cron, which can be installed with `apt install cron`. This package should also be available for derivatives like Ubuntu, Mint, and Pop! If not, consider some of the alternatives we also discuss!

Fedora Linux (and related distros like Red Hat Enterprise Linux) use cronie, another fork of a later edition of Vixie Cron known as ISC Cron.
This version of cron can be installed on Fedora using `dnf install cronie`, and equivalent commands on other distros.

Advanced distros, like Arch, Gentoo, and Void, also offer alternative implementations with their own goals, such as being lightweight, or having certain non-standard features. Read more in the [sources](#sourcesfurther-reading) section.

## Setting up a crontab

A standard cron implementation lets you List (view) the current crontab using `crontab -l`.
To Remove/clear the crontab, you can run `crontab -r`.

To Edit the crontab, you run `crontab -e`, which will read the `VISUAL` and `EDITOR` environment variables to determine what editor you prefer (usually `nano`, `vim`, or `emacs`).

Crontabs are user-specific, and if you run crontab with `sudo` (SuperUser DO), you can access the crontab of another user, usually the system root (administrator) account.
This is useful for when you want to use a privileged command, like a system update using `apt update && apt upgrade`, `pacman -Syu`, `xbps-install -Syu`, etc.

### Crontab Syntax

A cron job is described by a time specification and a (/bin/sh) command to run. Here is an example from my system:

```
0 18 * * 2 /usr/bin/flatpak update -y
```

1. The first number stands for the minute you want to run it.
2. The second number stands for the hour (0-23) that you run it.
3. The third number stands for the day of the month that you want to run it.
4. The fourth number stands for the month you want to run it.
5. The fifth number describes the day of the week (0-6, SUN-SAT) that you run it.

Check out [Crontab.guru](https://crontab.guru/) for a helpful interpreter of crontab times.

In this example, I have set my cron job to run at 18:00, or 6 PM, on Tuesdays. I want this to run every Tuesday, so I did not set any dates. ~~not that i can get a date anyways~~ It runs the `flatpak update` command with a `-y` flag to automatically say Yes to updating.

It is heavily recommended that you list out the entire path to the program you are executing (try `which [program]` to find that path) so there are no issues with cron being unable to find your program or mistaking the name for something else.

#### Non-standard specifications

Instead of doing a time specification manually, you can also use some common shorthands like `@hourly` on certain implementations of cron, like cronie.

Another useful specification is `@reboot`, which does what it says on the tin - run the command after the computer is rebooted.
For example, if I wanted to update my flatpaks every time I start my computer (very unnecessary!):

```
@reboot /usr/bin/flatpak update -y
```

## Applications

You can use cron for pretty much any task you run through a command line command, including shell scripts!
I personally use it to keep my system (Void XBPS and Flatpak) up to date, and to regularly clean out old package caches to save space.

Since I use a hosts file that gets updated regularly, I have a little [cron job](hosts_firewall) to update that too, separate from my package managers!

~~At this point I haven't had to manually update my system in ages and now I see what they meant when they said that robots will take all our jobs~~

## Sources/Further Reading

-   [Crontab.guru](https://crontab.guru/)
-   [ArchWiki - Cron](https://wiki.archlinux.org/title/cron)
-   [Debian Wiki - Cron](https://wiki.debian.org/cron)
-   [Gentoo Wiki - Cron](https://wiki.gentoo.org/wiki/Cron)
-   [Void Linux Handbook - Cron](https://docs.voidlinux.org/config/cron.html)
-   [Wikipedia - Cron](https://en.wikipedia.org/wiki/Cron)
