---
title: "BTRFS: A Better FS?"
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
date: 2023-08-05
---

Lately, I've been using BTRFS for my root filesystem for better deduplication
and filesystem compression (all those Proton prefixes for my games add up...)
flawlessly, despite all those warnings from forum posts about what happens when
you have a full disk.

A friend of mine ran out of space on BTRFS, proceeding to lose a few files he
generated and ending up with an unbootable system because bootloader updates
were failing when trying to write to disk.

Perhaps BTRFS melts like butter in this case, but it has a few helpful tricks to
delay the inevitable fate of storage crunch!

## Filesystem Compression

> If Windows/NTFS can do it, why not Linux?

BTRFS, through the `btrfs filesystem` command, supports online defragmentation,
which includes compression! You can Recursively Compress `/` with ZSTD with the
following command (**as root, such as with `sudo` or `doas`**):

```
btrfs filesystem defragment -r -czstd /
```

There are a few options for compression algorithm, `zlib`, `lzo`, and `zstd`.
Generally, zstd is the most performant option with great ratios; I went from
using 134/150 GiB to 91/150 on my main disk just by running this command!

You can also set a specific file to have a certain compression algorithm:

```
btrfs property set <file> compression [algorithm]
```

The algorithms are the same as above.

### Applying compression at `mount`

You can use the `mount -o` command to provide options. For compression with
zstd, you can call:

```
mount -o compress=zstd [filesystem]
```

Alternatively, if you would like this to always be applied when your filesystem
is mounted, you can set this in your `/etc/fstab` file (blogpost pending!):

```
/dev/sda2 / btrfs defaults,compress=zstd 0 1
```

## Deduplication

One of the biggest features of ~~butterFS~~ BTRFS is that it implements
Copy-on-Write (CoW), where you can make a copy of a file that doesn't use extra
storage until one of the files gets written to, thus changing the data. This is
done like so:

```
cp --reflink
```

Even for large files, the "copy" happens nearly instantly, because only metadata
is being written to disk.

This works similarly to a hard-link (blogpost also pending!), where your
filesystem has 2 file names point to the same data on disk, but you can safely
write to one as if it were a distinct file, keeping the other one untouched!

### `duperemove`

In addition to making your own reflinks, the `duperemove` command can read
filesystem extents, blocks of data for the file, and hash them to determine
where there might be duplicates. This can be due to identical files, but also
due to similar data such as headers, like the Windows PE headers in the
executables on a Wine prefix.

To Recursively scan files in a folder for duplicated data, and print out file
size numbers in a Human-readable format, use

```
duperemove -rh <folder>
```

and to actually Deduplicate any found extents (on BTRFS or XFS filesystems), add
the -d argument:

```
duperemove -drh <folder>
```

If you intend to repeatedly run `duperemove` on a folder, such as your Steam
files, you can even save the hashes duperemove makes into a hashfile, allowing
it to only rehash files that have changed since the last time you ran it. When I
deduplicate files in my personal Steam folder, which includes Proton prefixes, I
usually run:

```
duperemove --hashfile=steam-hashfile -drh ~/.local/share/Steam/
```

Enjoy the extra space ~~and delayed, but always looming threat of running out...~~

## Further reading

-   [Btrfs compression and how to use it | Forza's Ramblings](https://wiki.tnonline.net/w/Btrfs/Compression)
-   [Btrfs - Arch Wiki](https://wiki.archlinux.org/title/Btrfs#Configuring_the_file_system)
-   [BTRFS Documentation](https://btrfs.readthedocs.io)
-   [Duperemove by markfasheh](https://markfasheh.github.io/duperemove/)
