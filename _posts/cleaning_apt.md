# Cleaning APT

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

### Date Published: 2022_11_16 (YYYY_MM_DD)

### Written by: Lenny Metlitsky [@leomet07](https://github.com/leomet07)

### Written by: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
