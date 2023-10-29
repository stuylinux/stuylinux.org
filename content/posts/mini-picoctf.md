---
title: Mini CTF (and PicoCTF!)
date: 2023-10-29
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---

This is a summary of our 2023-10-27 meeting, with explanations of what we did :)

For Meeting #2, we set up a 
[tarball](https://eggsbps.eastus.cloudapp.azure.com/slinux/docs.tar.gz) with 
four common (and perhaps familiar... [(spoilers)](https://xkcd.com/936)) words 
as flags.

## Downloading and extracting the payload
To download and extract the tarball, we ran the following commands:
```
curl -O https://eggsbps.eastus.cloudapp.azure.com/slinux/docs.tar.gz
file docs.tar.gz
gunzip docs.tar.gz
tar xvf docs.tar
```

`curl` downloads a file, and the `-O` (aka `--remote-name`) flag tells it to 
save that file to a folder, instead of writing it to terminal output (stdout).

`file` can be used to examine what type of data is in a file. In this case, it 
was `gzip` compressed data, which meant we had to use `gunzip` to unzip it!

`tar` is used to extract "tape archives," which are effectively folders in a 
file (not unlike a .zip!). `x` is for `eXtract` and `f` is to read from a 
`File` instead of stdin (standard keyboard/pipe input). `v` is optional, and 
tells it to `Verbosely` print out all file names.

To skip the gunzip part, you can run `tar xzf docs.tar.gz` (z for `gZip`), or 
`tar xf docs.tar.gz` in modern `tar` versions.

Alternatively, this one liner was possible to have `curl` write to a pipe, and 
then for tar to read and extract from that pipe!
```
curl https://eggsbps.eastus.cloudapp.azure.com/slinux/docs.tar.gz | tar xz 
docs.tar.gz
```

## The hunt begins!

We practiced using the `cd` and `ls` command to traverse through the 
directories, but one member also installed `tree` (`apk add tree` on Alpine) to 
more quickly list out the tree of files and folders!

From here, each main folder would have little puzzles to reveal the word 
(solutions below):
1. graphics
- To find word 1, we had to read the `pictures` file, either by running `cd 
graphics; cat pictures`, or just `cat graphics/pictures`.
2. apcsa
- To find the `Vault.java`, you would have to `cd`, `ls`, and `cat` around to 
look for it. Hopefully, you were pressing `Tab` to autocomplete filenames!
3. systems
- This one was tricky! The flag was encoded in hex inside a C file that would 
print it out. You had to [install GCC with development 
libraries](https://wiki.alpinelinux.org/wiki/GCC) and then compile the code 
with `gcc hi.c`. Then you had to run the executable from that folder, `./a.out` 
(`./` tells the shell to look in the folder you `cd`ed to), and score your 
flag. 
4. introcs
- Another hard one! Looking at the weirdly capitalized letters, they spell out 
`ls -t`, which LiSts out files by Timestamp order. Perhaps it's more insightful 
to run it as `ls -lt` to give us a cleaner listout?

There's another secret nobody found in the introcs folder, but maybe you'll be 
the one?

### Bonus Exercise!
You might have noticed a `pain` file in the apcsa folder. There are thousands 
of `*`, and one `.` character. What line number is the `.` on? Some potentially 
helpful programs include: `vi` and `grep` (`find` was a red herring :P).

## PicoCTF
We signed up for [PicoCTF practice](https://play.picoctf.org/practice) and 
tried out some of their challenges, ranging from simple things like downloading 
and catting files to SSHing into their own servers! PicoCTF also offers their 
own Linux webshell that you can try out for yourself when `ssh.stuylinux.org` 
is inactive.
