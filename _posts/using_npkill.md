# Using NPKILL

## What is NPKILL?

npkill is a command line tool that searches for all instances of those clunky and bloated _node_modules/_ folders and then offers you a convientient TUI (terminal user interface) to select and delete them.

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

Run npkill from the root of whichever directory you would like to scan for _node_modules/_ folders, and use arrow keys to navigate and space to delete _node_modules/_ that are unused or not needed.

In this example, as well as for most users, this will probably be the home folder

![Terminal output](/img/posts/using_npkill/main.png)

Note: Some _node_modules/_ will be found from apps that require them to work (ie: Discord), so npkill will display a ⚠️ to inform you of this. Generally, you shouldn't delete these.

### Date Published: 2023_01_27 (YYYY_MM_DD)

### Written by: Lenny Metlitsky [@leomet07](https://github.com/leomet07)
