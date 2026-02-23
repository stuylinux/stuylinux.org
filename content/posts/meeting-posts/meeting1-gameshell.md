---
title: "Meeting 1 Notes: Terminal Basics (GameShell)"
author: Axel Stahl [@axelKeizoStahl](https://github.com/axelKeizoStahl)
date: 2026-02-22
description: Introducing the shell and terminal with our second meeting of the year!
---

While there's some really cool and wacky software that we will explore in this club, it's important to have basic terminal skills.
<br>
Hence, our first (technically second) meeting is on terminal basics.
<br>
And what better way to learn than by playing a game!

First, we'll learn a couple basic commands. Then, we'll use those skills (and some more we'll pick up on the way) to play [GameShell](https://github.com/phyver/GameShell), a terminal-based game specifically designed for learning the terminal!

## Terminal Usage
A terminal is a text based interface to talk directly to your computer. Usually, you click buttons and use a graphical user interface (GUI), but here, you type commands.
Commands are simply programs that can be run. For example, the `firefox` command will run the `firefox` program and launch the Firefox browser.
When you enter something into the terminal's prompt (where you type stuff), it sends the text to a program called the *shell*. 
The shell will look for the command and run what it finds, say what you typed was wrong, or some error. 
Most of the commands used on a day-to-day basis will complete tasks such as creating files, moving data, or running programs on your computer.

### `pwd`: Seeing Your Current Directory
The terminal always has a location inside the file system of the computer. 
To know what directory (a folder) you are currently located in (aka your current *working directory*), use the `pwd` (**p**rint **w**orking **d**irectory) command.

### `cd`: Moving Around
To change directories, use the `cd` command followed by the directory you would like to go to (as an argument).

If I am currently in the directory `/home/user/Downloads`, and I want to go to `/home/user/Downloads/folder`, I would run `cd /home/user/Downloads/folder`, or just `cd folder`.
<br>
    - The difference between the two is that the first is the *absolute* path. This is the full path to the directory starting from the root folder (`/`). The second is the *relative* path. This is the path to the directory relative to where you already are. If the directory is located somewhere close to where you are, you can just input the directories leading up to that instead of starting all the way from `/`.

**Important note**:
<br>
In the terminal, there are a couple shorthands to make your life a bit easier:
- `.` means "this directory" (in this context). Hence, if I ran `cd .`, nothing would change because I would be in the same directory as before
- `..` means "the directory immediately before the current working directory. Meaning if I am in `/home/user` and I want to go to `/home`, I would run `cd ..`

### `ls`: Listing Contents of Directories
To list all the contents of a directory, use the `ls` command.
- If you provide a path to a directory (as an argument), you can list the contents of that directory. For example, `ls /home/user` would list all the contents of that folder instead of the one I'm currently located in.
- If you just run `ls`, you would list the contents of the current working directory, same as `ls .`.
- If you add an additional option starting with `-` (such as `ls -l`), you would list out the files in your current working directory in list format. You can run `ls --help` to see more additional options.

If I am in `/home` and I want to list the contents in `/home/user/Downloads`, I can run `ls /home/user/Downloads` or `ls user/Downloads`.

**Important note**:
<br>
Commands usually need some sort of input or maybe a certain option describing how it is to be run.
<br>
They usually follow the simple pattern: 

`command` + `options` + `arguments`

- `command` is the name of the command, like `ls`.
- `options` are settings (flags) describing how to run the command. For example, `ls`'s flag `-a` will list files, including hidden ones (files that start with a `.`).

### `cat`: Printing a File's Contents
To print a file's contents to the terminal, you can run `cat` followed by a filename/path to a file, as an argument.

If I am in `/home` and I want to "cat" (print out) `/home/info.txt`, I would run `cat /home/info.txt`, or `cat info.txt`.

### `man`: Reading the Manual
For most commands, there are a lot of flags and interesting quirks.
<br>
It's hard to know all these commands, so check the `man` page for the command, as most have one.

By running `man command`, where `command` is the name of the command, a manual page with info on the command will now be shown in the terminal.

### `file`: Checking a File's Type
Because file extensions are not always accurate (or present!), it is useful to be able to check what type of file you are handling.

If I have a file `mystery` in my current working directory, I would run `file mystery` to get more information about the file.

## GameShell
As mentioned earlier, GameShell is the terminal game we'll be playing to teach members terminal basics.
Here is some history of GameShell from its GitHub page:

> Teaching first-year university students or high schoolers to use a Unix shell is not always the easiest or most entertaining of tasks. GameShell was devised as a tool to help students at the Université Savoie Mont Blanc to engage with a real shell, in a way that encourages learning while also having fun.
>
> The original idea, due to Rodolphe Lepigre, was to run a standard bash session with an appropriate configuration file that defined "missions" which would be "checked" in order to progress through the game.

### Getting Started
If this does not work right away, read the bottom of the [GameShell GitHub page](https://github.com/phyver/GameShell) for more info.

The commands to start are these two here:
<br>
(**NOTE**: In most cases on the web, lines starting with `$` means enter this command as your user, so you don't include the `$` in your command)
```
$ wget https://github.com/phyver/GameShell/releases/download/latest/gameshell.sh
$ bash gameshell.sh
```

You can also clone the repository and alternatively run the game with the following commands:
```
$ git clone https://github.com/phyver/GameShell
$ ./start.sh`
```

### First Steps
Follow the steps shown on screen.
<br>
It's useful to read the directions/explanations shown on the scroll.

As shown on the screen, run `gsh goal` to see the first goal. This is to go to the top of the main tower in the castle.
<br>
Also, note that there is a list of commands. As you go on, you will see commands you may not know. Using this explanation and the `man` pages for these commands will be very useful.

First, running `ls` shows us there is a `Castle` directory.

To go into the `Castle`, we can run `cd Castle`, and then running `ls` shows us there is a `Main_tower` directory we can go into.

Continuing this process brings us to the `Top_of_the_tower`.

Then, we run `gsh check` and see that we have completed this mission. Note that running `gsh check` while in any mission will check to see if you have completed the mission successfully.

Now, we can move on to the rest of these missions and enjoy playing the rest of the game!
