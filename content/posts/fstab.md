---
title: The fstab - it doesn't stab you!
date: 2023-09-26
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---

I've been promising this article for way too long...

## What is the fstab?
The fstab, or FileSystem TABle, is a file at `/etc/fstab` that tells the system
what block devices (such as disk partitions, or [ramdisks](posts/download_more_ram/)
to mount. It also describes what filesystem type and location to use, along
with additional information about integrity checks.

You can also define arguments for the filesystem mount, analogous to calling
`mount -o` with those arguments.

To edit the fstab, you will need superuser privileges.

### Stabbing open the fstab
Let's open up my fstab right now:
```
UUID=92d98adc-53d0-4537-a96c-07e504ea61c4 / btrfs defaults,compress=zstd 0 1
UUID=7547-C33D /boot/efi vfat defaults 0 2
/dev/disk/by-uuid/09B0B08392F141B8 /mnt/c ntfs3 defaults,noauto,force 0 0
/dev/sdb1 /mnt/f auto noauto,nosuid,nodev,nofail,uid=1000,gid=1000 0 0
tmpfs /tmp tmpfs defaults,nosuid,nodev 0 0
efivarfs /sys/firmware/efi/efivars/ efivarfs defaults 0 0
/swapfile.sys swap swap defaults 0 0
```
*Disclaimer: this has randomly generated uuids from `uuidgen`, and has lines
 altered for presentation purposes*

There's a lot of information here! (because I have a lot of partitions and data
for stuff...) Let's take a look at this line by line:

```
UUID=92d98adc-53d0-4537-a96c-07e504ea61c4 / btrfs defaults,compress=zstd 0 1
```

The first section **identifies** the disk in question. In this case, we use the
Universally Unique IDentifier (UUID), which can be found by running `blkid`:

```
$ blkid | grep 92d98adc   # grep to filter for the one we want
/dev/nvme0n1p5: UUID="92d98adc-53d0-4537-a96c-07e504ea61c4"
UUID_SUB="35c5695c-5fb2-40c1-9f87-345826dbf4af" BLOCK_SIZE="4096" TYPE="btrfs"
PARTUUID="2651510b-ae5e-4254-8423-3369645a68d4"
```

The second part, the `/`, identifies the location in the filesystem tree that
partition should be mounted at. In this case, `/` corresponds to the very root
of the filesystem, since this partition contains my main system.

The third part notes which filesystem type to use, `btrfs` in my case.

The fourth part contains the arguments, `defaults` will work for most people,
but I add `compress=zstd` to [compress my filesystem](/posts/btrfs-compression).

According to the [man page](https://linux.die.net/man/5/fstab) there's a 5th
number for `dump`, but I have never had to use this, nor can I even find a
`dump` program on my install, so I default to `0`.

The 6th option is a number to set `fsck` priority. For your system partition, it
should be `1`, and `2` for everything else.

Now that we have this down, I can highlight the interesting parts of my other
filesystems.

This is my EFI System Partition (ESP). Note that it's in (v)FAT format, as per
MicroSoft's standards, and that its "UUID" (well, [serial number](https://superuser.com/questions/1247972/how-to-change-vfat-partition-uuid))
is only 8 hex characters, for 32 bits of distinct options, as opposed to the 128
bits on a modern UUID.
```
UUID=7547-C33D /boot/efi vfat defaults 0 2
```


This is my old Windows partition! It's mounted with the Linux 5.15 Paragon 
`ntfs3` driver, instead of the old read-only `ntfs` driver, or the FUSE ntfs-3g
driver, since the latest kernel driver supports read and write, while also being
quite stable and preserving file flag bits.

I also use the /dev/disk/by-uuid/ symlink in the devices filesystem (devfs) as
an alternative way to refer to the same block device file (`/dev/sda3`).

It's set to `noauto` so it isn't automatically mounted, just that I can type
`mount /mnt/c` without specifying what device to mount from (or conversely, I
can use `mount /dev/sda3`, and it will automatically resolve!).
```
/dev/disk/by-uuid/09B0B08392F141B8 /mnt/c ntfs3 defaults,noauto,force 0 0
```

This is a weird one! I use this to quickly mount my flash drives onto `/mnt/f`.
Full on desktop environments like GNOME, KDE, LXDE, etc. usually have services
to automatically handle removable storage, but I use a minimal DWM setup (btw),
so this is how I `mount /mnt/f` as part of my daily workflow.

By setting the filesystem type to `auto`, the kernel will figure out on its own
what type of filesystem this is (ntfs, ext4, btrfs, exfat, etc). I set `uid` and
`gid` as options to automatically grant user and group 1000 (both corresponding
to my user) full permissions over a permissionless filesystem like vfat.

```
/dev/sdb1 /mnt/f auto noauto,nosuid,nodev,nofail,uid=1000,gid=1000 0 0
```



This is my TeMPorary FileSystem, where data is stored in RAM/swap, and cleared
when the computer shuts down. I personally prefer to put my downloads here to
reduce SSD wear cycles (though this is minor) and to have them automatically
removed after I'm done, since my files usually get shared somewhere else if I do
need them.
```
tmpfs /tmp tmpfs defaults,nosuid,nodev 0 0
```

This is the EFI variables filesystem! I use this for when I'm tinkering around
with EFI variables (as the name suggests), but also to make `os-prober` on GRUB
automatically add a `UEFI Firmware Settings` option to my boot menu, so I can
mash my down arrow instead of my escape key to get to my UEFI menu :D
```
efivarfs /sys/firmware/efi/efivars/ efivarfs defaults 0 0
```

This is a swapfile, which is literally just a file pretending to be a block
device. It was created by running `dd if=/dev/zero of=/swapfile.sys`, and then
using the `mkswap` command on it.
```
/swapfile.sys swap swap defaults 0 0
```

That's all the interesting lines in my fstab I wanted to talk about today!

Take a look at your own fstab, and see if there's anything interesting you find!
