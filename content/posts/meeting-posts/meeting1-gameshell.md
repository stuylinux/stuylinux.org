---
title: "Meeting 1 Notes: Terminal Basics (GameShell)"
author: Axel Stahl [@axelKeizoStahl](https://github.com/axelKeizoStahl)
date: 2026-02-22
---

While there are some really cool, wacky software that we will explore in this club, it's important to be confident in our basic terminal skills.
Hence, it's our first (sorta) meeting is on terminal basics.
And what better way to learn than by playing a game!

First, we'll learn a couple basic commands. Then, we'll use those skills and some more we'll pick up on the way to play GameShell a terminal based game.

## Terminal Usage
A terminal is a text based interface to talk directly to your computer. Usually, you click buttons and use a graphical user interface (GUI), but here, you type commands.
Commands are simply programs that can be run. For example, the `firefox` command will run the `firefox` program and launch firefox.
When you enter something into the terminal's prompt (where you type stuff), it sends the text to a program called the *shell*. 
The shell will look for the command and run what it finds, or say what you typed was wrong or some error. 
Most of the commands used on a day to day basis will do stuff like create files, move data, and run programs that someone made.


### `pwd`: Seeing Your Current Directory
The terminal always has a location inside the file system of the computer. 
To see where what directory (a folder) you are currently located in (aka your current *working directory*), use the `pwd` (Print Working Directory) command.

### `cd`: Moving Around
To change directories, use the `cd` command followed by where you would like to go.

If I am currently in the directory `/home/user/Downloads`, and I want to go to `/home/user/Downloads/folder`, I would run `cd /home/user/Downloads/folder`, or just `cd folder`.


**Important note**:

In a terminal, there are a couple shorthands to make your life a bit easier:
- `.` means "this directory" (in this context). Hence, if I ran `cd .`, nothing would change because I would be in the same directory as before
- `..` means "the directory immediately before the current working directory. Meaning if I am in `/home/user` and I want to go to `/home`, I would run `cd ..`

### `ls`: Listing Contents of Directories
To list all the contents of a directory, use the `ls` command.
If you provide a path to a directory, you can list the contents of that directory.
If you just run `ls`, you would list the contents of the current working directory, same as `ls .`.
If you add an argument, running `ls -l`, you would list out the files in your current working directory in list format. See `ls --help` for more options.

If I am in `/home` and I want to list the contents in `/home/user/Downloads`, I can run `ls /home/user/Downloads` or `ls user/Downloads`.


**Important note**:

Commands usually need some sort of input or maybe a certain option describing how it is to be run.

Commands usually follow the simple pattern: 

`command` + `options` + `arguments`

`command` is the name of the command, like `ls`.
`options` are settings (flags) describing how to run the command. For example, ls's flag `-a` will list files, including hidden ones (files that start with a `.`).

### `cat`: Printing a File's Contents
To print a file's contents to the terminal, you can run `cat` followed by a filename/path to a file.

If I am in `/home` and I want to "cat" (print out) `/home/info.txt`, I would run `cat /home/info.txt`, or `cat info.txt`.

### `man`: Reading the Manual
For most commands, there are a lot of flags and interesting quirks.
It's hard to know all these commands, so check the `man` page for the command, most have one.

`man command`, where `command` is the name of the command will show info on the command.

### `file`: Checking a File's Type
Because file extensions are not always accurate (or present!), it is useful to be able to check what type of file you are handling.

If I have a file `mystery` in my current working directory, I would run `file mystery` to get more information about the file.



## [GameShell](https://github.com/phyver/GameShell)
[GameShell](https://github.com/phyver/GameShell) is an terminal game made to teach students bash basics.
Here is some history of GameShell from its github page:

```
Teaching first-year university students or high schoolers to use a Unix shell is not always the easiest or most entertaining of tasks. GameShell was devised as a tool to help students at the Université Savoie Mont Blanc to engage with a real shell, in a way that encourages learning while also having fun.

The original idea, due to Rodolphe Lepigre, was to run a standard bash session with an appropriate configuration file that defined "missions" which would be "checked" in order to progress through the game.
```

### Getting Started
If this does not work right away, read the bottom of the [GameShell gitub page](https://github.com/phyver/GameShell).

The command to start are these two here:
(note, in most cases on the web, lines starting with `$` means enter this command as your use, so you dont include the `$` in your command)

```
$ wget https://github.com/phyver/GameShell/releases/download/latest/gameshell.sh
$ bash gameshell.sh
```

You can also clone the Repo and run `./start.sh`


### First Steps
Follow the steps shown on screen.
It's useful to read the directions/explanations shown on the scroll.

As shown on the screen use run `gsh goal` to see the first goal, to go to the top of the main tower in the castle.
Also note that there is a list of commands. As you go on, you will see commands you may not know. Using this explanation and the man pages will be very useful.

First, running `ls` shows us there is a `Castle` directory.

`cd Castle`, then `ls` shows there is a `Main_tower`.

Continuing this brings us to `Top_of_the_tower`.

Then, we run `gsh check` and see that we have completed this mission. 

Now, we can move on to the rest of these missions.

## Enjoy Your Playing!!!
