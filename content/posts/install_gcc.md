---
title: Set up gcc and g++ for development on Linux
date: 2022-11-24
author: Lenny Metlitsky [@leomet07](https://github.com/leomet07)
---

To install the C and C++ compilers of the GNU project, you need to install a couple packages. This includes the gcc/g++ compilers themselves, cmake, and some other dependencies. Here are the commands for some common distributions:

## Fedora (and its derivatives)

```bash
dnf groupinstall 'Development Tools'
```

## Arch Linux (and its derivatives)

```bash
pacman -S --needed base-devel
```

## Ubuntu/ Debian (and their derivatives)

```bash
apt install build-essential
```

## Void Linux

```bash
xbps-install gcc
xbps-install cmake
```

Note: The above command _also_ installs g++ and make

## That's it!

gcc, g++, and cmake should now be installed and ready to be used for compiling programs or development.
