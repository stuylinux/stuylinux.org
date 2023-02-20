# RAM compression with `zram`

## What's a zram?
[Zram](https://www.kernel.org/doc/html/latest/admin-guide/blockdev/zram.html) is the RAM compression feature of the Linux kernel.

It generates virtual block devices backed by your system memory, but with compression, so your CPU is running an algorithm to fit more data in less space on your system's memory.

These virtual block devices can be used just like physical block devices, both for files and for swap (stashing data in RAM somewhere else to free up more RAM capacity).

By installing zram and using a tool like [zramctl](https://man7.org/linux/man-pages/man8/zramctl.8.html) (or if you're a "minimalist", direct interaction with `/sys`), you can create virtual "block devices" that can act as a temporary hard drive for you to store data on, both system memory (swap) and files!  

## Creating a zram disk
We will be using `zramctl` to interact with the kernel's zram facilities. This program comes with `util-linux`, which comes standard on most distros.   

`sudo zramctl --find -s 1.5G` will find (or create) an inactive `/dev/zramX` block device, and create it with 1.5 gigabyte of capacity.

If you want to edit a zram drive's size, you can instead run `sudo zramctl -s 1.5G /dev/zramX`, with X being the ID of the zram device you want to edit.

Feel free to verify that these commands worked using `lsblk`, another feature of `util-linux`.


If we did not specify a size, it would be created with 0 size.

## Downloading more ram
To enable swapping (relocation of inactive pages in RAM to a block device, in this case the zram device), we can use `mkswap` and `swapon`.

First, set up the block device for swapping using `mkswap`: (warning: this will wipe any data you had on the device before!)
```shell
sudo mkswap /dev/zramX
```

Then, tell the system to swap on said device:
```shell
sudo swapon /dev/zramX
```

You're done! Enjoy the extra RAM you've just downloaded!

## Using the zram block device for files
Because the kernel treats block devices about the same, whether they're physical (on disk) or virtual (in memory, like zram), you can put a filesystem on a zram device for temporary file storage!

Let's first turn off the swap on our zram device:
```shell
sudo swapoff /dev/zramX
```

And let's MaKe a FileSystem, in this case a typical Linux ext4 filesystem:
```shell
sudo mkfs.ext4 /dev/zramX
```
After reading them, tap yes to the prompts.

Because everything is physically in RAM, this operation will complete super quickly.

Now, we can mount the device on a mount point (basically a specific folder for the filesystem's contents). For this example, we will use /mnt/a, but you can use any folder:
```shell
sudo mount /dev/zramX /mnt/a
```
You can actually omit the target (`/mnt/a`) if you have this device pre-configured in `/etc/fstab`, but that's a blog post for another day!

The filesystem will start out owned by root, so you may have to run this command (replace `egg` with your own username, and `/mnt/a` with the folder you want to take ownership of):
```shell
sudo chown -R egg:egg /mnt/a
```

Now that you own the folder, you can do anything you want in it.

To unmount (eject) the drive, you can type
```shell
sudo umount /mnt/a
```
Note that you have to mention the mount point the drive is on.

Enjoy your fast, ephemeral storage!


## Sources/Further Reading
- [zramctl man page](https://man7.org/linux/man-pages/man8/zramctl.8.html)
- [zramen: manage zram swap space (for runit systems like Void Linux)](https://github.com/atweiden/zramen)
- [ArchWiki - zram](https://wiki.archlinux.org/title/Zram)
- [Debian Wiki - ZRam](https://wiki.debian.org/ZRam)
- [Gentoo Wiki - zram](https://wiki.gentoo.org/wiki/Zram)
- [Linux Kernel Documentation - zram](https://www.kernel.org/doc/html/latest/admin-guide/blockdev/zram.html)
- [Wikipedia - zram](https://en.wikipedia.org/wiki/Zram)


### Date Published: 2023_02_20 (YYYY_MM_DD)

### Written by: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
