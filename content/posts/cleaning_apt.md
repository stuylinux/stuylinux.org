---
title: Cleaning APT
date: 2022-11-16
author: Lenny Metlitsky [@leomet07](https://github.com/leomet07), David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---

## Clearing the cache on Debian/Ubuntu (or their derivatives, such as PopOS)

1. Cleaning up orphaned packages

```bash
sudo apt autoremove
```

2. Preview of the cache and of what clearing/deleting the cache will delete

```bash
sudo apt clean --dry-run
```

Example:

```
debby@linodebox:~$ sudo apt clean --dry-run
Del /var/cache/apt/archives/* /var/cache/apt/archives/partial/*
Del /var/lib/apt/lists/partial/*
Del /var/cache/apt/pkgcache.bin /var/cache/apt/srcpkgcache.bin
debby@linodebox:~$
```

3. Clear the cache

```bash
sudo apt clean
```

If clearing the cache is successful, this command will have no output.
