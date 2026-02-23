---
title: "Meeting 2 Notes: picoCTF"
author: Matthew Gultom [@WindwardIsland](https://github.com/WindwardIsland), Axel Stahl [@axelKeizoStahl](https://github.com/axelKeizoStahl)
date: 2026-02-22
description: Ending off the 2025 year by completing picoCTF challenges!
---

Even though 2025 wasn't the Year of the Linux Desktop[^1] (while [we had some hope](https://stuylinux.org/posts/2024/)), it was still a great year for Stuy Linux nonetheless, so we decided to end it off with some picoCTF challenges (plus, we didn't really have any other meeting ideas)!

[^1]: The "Year of the Linux Desktop" is a long-running sarcastic joke that's been around since Linux's inception that basically pokes fun at a particular year when Linux as a desktop OS will become mainstream (which realistically has never happened).

## CTF vs picoCTF
It's important to note what "CTF" even means in order to understand how PicoCTF challenges work. "CTF" stands for "capture the flag", which has two meanings. In the traditional sense, ["capture the flag"](https://en.wikipedia.org/wiki/Capture_the_flag) is a physical outdoor sport played by two or more teams that each have a flag. The goal is to capture the other team's flag from their "base" (which can even be hidden sometimes!) and bring it back to their own base safely. 

In the [cybersecurity](https://en.wikipedia.org/wiki/Capture_the_flag_(cybersecurity)) sense (which plays on the original sport that's been around for decades), CTFs are puzzles that involve text strings ("flags") well hidden inside programs that require extensive CS/cybersecurity knowledge to find. These puzzles can come in the form of competitions, such as attack/defense-style CTFs (where players steal flags from other players), jeopardy-style CTFs (where players steal flags from the CTF organizers instead), etc. 

[picoCTF](https://picoctf.org/) is a competition hosted by CyLab of Carnegie Mellon University mainly geared towards high schoolers (like us!) to help teach cybersecurity skills. However, they also provide [practice challenges](https://play.picoctf.org/practice) that can be completed at our own pace, which is what we did.

## Getting Started
You must register for an account at the official [picoCTF website](https://picoctf.org) in order to complete practice challenges or play in competitions. For our purposes, when registering:
- 18+ is fine for the age group to bypass parent verification
- 10282 (Stuy's postal code) can be used as the postal code
- Middle/High School student can be used for the player type

Once registered, you can then start playing some practice challenges! However, here are a few things to keep in mind.

- You can choose the difficulty of the challenges, their category (from a plethora of cybersecurity subfields), or what picoCTF event they were made for.
- When you click on a challenge, you will be presented with the following:
    - A description of the challenge (with a link to the necessary files where the flag is located)
    - An input box where your flag goes (notice the syntax of the flag is specifically "picoCTF{FLAG}", where FLAG is a placeholder)
    - Some hints, although it's recommended that you take some time to make progress on your own before resorting to these for extra help
- Some challenges will be marked as "browser webshell solvable". The webshell is a terminal built into picoCTF, which is very useful. It allows you to use many terminal programs to assist in finding the flag. You can launch the webshell from the top right corner or visit https://webshell.picoctf.org to launch it in a new tab. You can then run the following command to get more information on useful terminal commands to utilize (such as `wget`): `less ~/README.txt`
- Regarding links in the challenge description, if you click them, the files will download on your local system. While you can do this, it's best to download them instead in the webshell. Simply right click on the link and select "Copy Link". Then, go to the webshell and type `wget`, followed by the pasted link (you can paste in the webshell with `Ctrl-Shift-V` or by right-clicking and selecting "Paste").

With that said, we'll show how to complete a couple of picoCTF challenges we've selected!

## Completing Challenges

### Log Hunt
