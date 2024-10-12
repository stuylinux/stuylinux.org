---
title: "Meeting 0 Notes: Terminal Navigation"
author: Axel Stahl [@axelKeizoStahl](https://github.com/axelKeizoStahl)
date: 2024-10-12
---

# Meeting 0, First Meeting of the 2024-2025 School Year!
The first meeting was a success, and we were glad to see some new (and old) faces.


## Member Specific Containers On Our Server
You may have heard of a Virtual Machine before (basically a program that simulates a computer in software).
We have something similar to that for each member, as they are each systems with isolated environments (we use containers, [here](https://stuylinux.org/posts/infra-containers/) is a blog post with more details on our setup).
During this meeting, we made containers for our new members so they can enjoy full root access to a Linux system.

### Using Your Container
When we setup our server before a meeting starts, a member can access their account on the server using a simple command entered into a terminal:
    `ssh <member_name>@ssh.stuylinux.org -p 2221`.

`ssh` is the command used, which means "secure shell", and it lets you run shell commands on a remote machine. For example, when you want to access a stuycs server from home, you could use `ssh jdoe60@homer.stuy.edu`.

To run the `ssh` command, you would provide the remote machine `ssh.stuylinux.org` on `port 2221`, and your username.

### Good Practices For Your Container
When you log onto your container, it is usually a good idea to update the system. To update your container, you can use the command `apk upgrade`.

You should also change your password from the default password. To change your password, use the `passwd` command.


## Terminal Usage
Besides running commands and hacking into servers, the main usage of the terminal is to interact with the filesystem.
"Interacting with the filesystem" can basically be split into a couple different methods.

### `pwd`: Seeing Your Current Directory
To see where what directory you are currently located in (aka your current *working directory*), use the `pwd` (Print Working Directory) command.

### `cd`: Moving Around
To change directories, use the `cd` command followed by where you would like to go.

If I am currently in the directory `/home/user/Downloads`, and I want to go to `/home/user/Downloads/folder`, I would run `cd /home/user/Downloads/folder`, or just `cd folder`.

Important note:

In a terminal, there are a couple shorthands to make your life a bit easier:
- `.` means "this directory" (in this context). Hence, if I ran `cd .`, nothing would change because I would be in the same directory as before.
- `..` means "the directory immediately before the current working directory." Meaning if I am in `/home/user` and I want to go to `/home`, I would run `cd ..`

### `ls`: Listing Contents of Directories
To list all the contents of a directory, use the `ls` command.
If you provide a path to a directory, you can list the contents of that directory.
If you just run `ls`, you would list the contents of the current working directory.
If you add an argument, running `ls -l`, you would list out the files in your current working directory in list format. See `ls --help` for more options.


If I am in `/home` and I want to list the contents in `/home/user/Downloads`, I can run `ls /home/user/Downloads` or `ls user/Downloads`.

### `cat`: Printing a File's Contents
To print a file's contents to the terminal, you can run `cat` followed by a filename/path to a file.

If I am in `/home` and I want to "cat" (print out) `/home/info.txt`, I would run `cat /home/info.txt`, or `cat info.txt`.

### `file`: Checking a File's Type
Because file extensions are not always accurate (or present!), it is useful to be able to check what type of file you are handling.

If I have a file `mystery` in my current working directory, I would run `file mystery` to get more information about the file.
