---
title: "Meeting 3 Notes: Super Tux Kart LAN Party #1"
author: Matthew Gultom [@WindwardIsland](https://github.com/WindwardIsland)
date: 2026-02-22
description: Ending off the fall semester by playing a FOSS game! (SuperTuxKart)
---

We decided that a great way to end off finals week (as well as the fall semester) would be to introduce everyone to a fun FOSS game through our LAN party (SuperTuxKart)!

## Introduction
[SuperTuxKart](https://supertuxkart.net/Main_Page.html) is one of the many FOSS games out there that's available to play! It is largely inspired by the popular Nintendo game, [Super Mario Kart](https://en.wikipedia.org/wiki/Super_Mario_Kart), where many people can play as certain characters and compete with each other in a simulated race environment. However, SuperTuxKart uses mascots popular in the Linux community (such as the [GNU gnu](https://en.wikipedia.org/wiki/GNU#Logo), [KDE Konqi](https://en.wikipedia.org/wiki/KDE#Mascot), and of course, the iconic [Tux penguin](https://en.wikipedia.org/wiki/Tux_(mascot))) in lieu of Mario characters.

SuperTuxKart can be downloaded and played on Windows, macOS, Linux, and the Nintendo Switch using Homebrew.

## Getting Started
When downloaded from the website, SuperTuxKart comes in a tarball (a type of file archive). To extract the contents from the tarball, the `tar` command can be used, like so:
```
$ tar xzvf SuperTuxKart-[current version]-linux-x86_64.tar.gz
```

We can now use the following commands to start the game:
```
$ cd SuperTuxKart-[current version]-linux-x86_64/
$ ./run_game.sh
```

### How To Play
When loaded, SuperTuxKart has an option in the bottom of the GUI where you can play the tutorial. Here are the keybindings you should know in order to be a successful SuperTuxKart player.

- Arrow Keys: move your kart
- `B`: this gives you a rear-view perspective
- `Space`: this fires weapons towards other players (which can be obtained by driving into gift boxes along the way)
    - **NOTE**: Holding `B` and pressing `Space` at the same time can fire weapons *behind* you towards other players
- `N`: this gives you a nitro boost (after they have collected nitro bottles along the way)
- `V`: this allows you to skid in order to handle sharp curves along the way
- `Backspace`: this respawns you if you end up going off the path

In addition, you should avoid bananas as well as other weapons fired by other players along the way.

### SuperTuxKart Modes
In addition, the landing screen will present you with a variety of options to choose from:
- **Story Mode**: This is a single-player overworld where you (as a FOSS mascot) have to save Gnu from the villain, Nolok. You complete challenges first, and then compete in a final race with Nolok in order to defeat them.
- **Singleplayer**: This is where you can compete in races or a variety of challenges with AI karts.
- **Splitscreen Multiplayer**: This is where at least two people can compete with each other with a split screen on a single monitor. Since this operates on a single SuperTuxKart instance, individual players have to be configured in the settings, as well as the controllers they will use.
    - This mode is actually what we used to show the game at our Fall Clubs+Pubs fair stand!
- **Online**: This is where you can play with others locally on a LAN server, globally on the internet (WAN), or create their own SuperTuxKart account for the purpose of playing online.
- **Addons**: This is where addons (custom karts, tracks, and arenas) made *outside* of the game's included defaults can be downloaded and installed for a more customized player experience!

### Creating A Server
From the "Online" option, you can easily create your own local server for everyone connected to the same network to join. You can customize the name, maximum number of players, an optional password, difficulty, game mode (normal, time trial, battle, soccer), and number of AI karts (if any, at all). However, you can't increase the maximum number of players to more than eight. This is an issue if you have more than eight players who want to join! So, here is the workaround:

You can start a *separate* process of SuperTuxKart that runs in the background with the following options:
```
$ ./run_game.sh --lan-server="[server name]" --max-players=[insert number]
```

Note that this does not open the GUI, so if you want to join and play as well, you have to open that separately.

### Joining A Server & Playing
From the "Online" option, you can also join either a local server or an online server. For this meeting, we had all members join the centralized local server. They are able to chat with others in a chat session between completed race sessions. In this chat session, players can kick others from the server if they're being disruptive. The person running the server can then start the race at any time. They can also exit or completely end the race at any time.

All players (including the person running the server) have 30 seconds to choose their kart and decide together what racetrack should they play on. There's a plethora of karts and racetracks players can choose from (although some tracks are locked; there's a way to unlock all of these which will be explained later). My personal favorite is Wilbur (the mascot for [GIMP](https://www.gimp.org/)) as it has a high nitro boost and high initial acceleration. The person running the server also has controls over how many laps there should be per race session.

After the race is over, a leaderboard is presented on the screen, and the person running the server has the option to start a different race or completely end gameplay altogether.

### Unlocking Features
Usually, features are unlocked by completing story mode. However, there's a cheater way in order to unlock more difficulties and racetracks without having to do that.

First, go to wherever the configuration folder is for SuperTuxKart using the `cd` command (usually in `~/.config/supertuxkart/config-0.10`). Then, use a text editor to edit the `players.xml` file. Replace all instances of "none" with "hard". Save the file and relaunch SuperTuxKart. You now have all the features you've ever wanted unlocked!

## Conclusion
After our gameplay sessions were over, we ended off the meeting by mentioning that members will be encouraged to host their own meetings in the future (after all, me and Axel are graduating this year :'))! These meetings will hopefully be paired with blog posts (like this one and many others) that will be written by them, so stay tuned on this blog for those!
