---
title: Linux is everywhere, including optical networks!
date: 2024-09-06
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
description: My Linux skills came in very handy for my work on next-generation communications networks!
---

These past two summers, I've had the honor of working in the open-access
[COSMOS wireless testbed](https://www.cosmos-lab.org/), where researchers can
remotely access radio and networking hardware in NYC and beyond! One of my
assignments this year was to troubleshoot an unresponsive [Calient S320 Optical
Switch](https://www.calient.net/).

## Diagnosing the Issue

As it would turn out, the embedded controller system ran an embedded Linux
distro, with [U-Boot](https://en.wikipedia.org/wiki/Das_U-Boot) to boot!

We found this out after plugging in a serial adapter from the manufacturer, and
using [PuTTY](https://en.wikipedia.org/wiki/PuTTY) to interact with the serial
console. From the console, we found out that the FPGA image used by the switch
could not be found, and that the kernel image disappeared.

## Recovery

We ran [TFTP](https://en.wikipedia.org/wiki/Trivial_File_Transfer_Protocol) and
[NFS](https://en.wikipedia.org/wiki/Network_File_System)[^1] servers on a
laptop connected to the same network as the optical switch, which provided
system files we got from a manufacturer tarball.

[^1]: [1] Not to be confused with the [NSF](https://www.nsf.gov/), which funds
our research!

### TFTP
The Trivial File Transfer Protocol (TFTP), by virtue of its simplicity, is used
in the bootloader stages for loading the FPGA image. It uses UDP port 69 to
provide read/write access to files on the server.

On our TFTP server, we loaded the FPGA image so U-Boot could access it.

### NFS
The Network File System (NFS) is used to share access to a server computer's
files (read access, write access, along with other metadata) across multiple
client computers. It is supported by the Linux kernel as one of its many
mountable filesystems, so by running an NFS share off of an ext4 partition, we
can run the optical switch's OS[^2] from the laptop's disk!

[^2]: The OS turned out to be [MontaVista
Linux](https://en.wikipedia.org/wiki/MontaVista), an embedded systems distro.

### Execution
Using the serial connection, we could then configure the U-Boot environment
variables to indicate that the path of the FPGA image to download over TFTP,
and that the OS should be booted off of NFS.

Thanks to this setup, we were able to bring the optical switch back online,
with the system working just like new!
