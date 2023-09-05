---
title: Using NPKILL
date: 2023-01-27
author: Lenny Metlitsky [@leomet07](https://github.com/leomet07)
---

## What is NPKILL?

npkill is a command line tool that searches for all instances of those clunky and bloated `node_modules/` folders and then offers you a convientient TUI (terminal user interface) to select and delete them.

## Running NPKILL

NPKILL doesn't have to be installed on its own, as you can just use NPX to install and run it for you.

NPX should already be installed if you have nodejs and npm installed.

```bash
npx npkill
```

That's it!

But if you would like to install npx yourself (and permanently), use npm to install it globally.

```
npm install -g npkill
```

## Usage

Run npkill from the root of whichever directory you would like to scan for `node_modules/` folders, and use arrow keys to navigate and space to delete `node_modules/` that are unused or not needed.

In this example, as well as for most users, this will probably be the home folder

![Terminal output](/posts/using_npkill/main.png)

Note: Some `node_modules/` will be found from apps that require them to work (ie: Discord), so npkill will display a ⚠️ to inform you of this. Generally, you shouldn't delete these.
