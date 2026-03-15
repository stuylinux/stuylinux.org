---
title: "Meeting 2 Notes: picoCTF"
author: Matthew Gultom [@WindwardIsland](https://github.com/WindwardIsland), Axel Stahl [@axelKeizoStahl](https://github.com/axelKeizoStahl)
date: 2026-02-22
description: Ending off the 2025 year by completing picoCTF challenges!
---

Even though 2025 wasn't the Year of the Linux Desktop[^1] (while [we had some hope](https://stuylinux.org/posts/2024/)), it was still a great year for Stuy Linux nonetheless, so we decided to end it off with some picoCTF challenges (plus, we didn't really have any other meeting ideas)!

[^1]: The "Year of the Linux Desktop" is a long-running sarcastic joke that's been around since Linux's inception that basically pokes fun at a particular year when Linux as a desktop OS will become mainstream (which realistically has never happened).

## CTF vs picoCTF
It's important to note what "CTF" even means in order to understand how picoCTF challenges work. "CTF" stands for "capture the flag", which has two meanings. In the traditional sense, ["capture the flag"](https://en.wikipedia.org/wiki/Capture_the_flag) is a physical outdoor sport played by two or more teams that each have a flag. The goal is to capture the other team's flag from their "base" (which can even be hidden sometimes!) and bring it back to their own base safely. 

In the [cybersecurity](https://en.wikipedia.org/wiki/Capture_the_flag_(cybersecurity)) sense (which plays on the original sport that's been around for decades), CTFs are puzzles that involve text strings ("flags") well hidden inside programs that require extensive CS/cybersecurity knowledge to find. These puzzles can come in the form of competitions, such as attack/defense-style CTFs (where players steal flags from other players), jeopardy-style CTFs (where players steal flags from the CTF organizers instead), etc. 

[picoCTF](https://picoctf.org/) is a competition hosted by CyLab of Carnegie Mellon University mainly geared towards high schoolers (like us!) to help teach cybersecurity skills. However, they also provide [practice challenges](https://play.picoctf.org/practice) that can be completed at our own pace, which is what we did.

## Getting Started
You must register for an account at the official [picoCTF website](https://picoctf.org) in order to complete practice challenges or play in competitions. For our purposes, when registering:
- 18+ is fine for the age group to bypass parent verification
- `10282` (Stuy's postal code) can be used as the postal code
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
After downloading the `server.log` file, we can now start solving this picoCTF challenge.

The first thing that would make sense to do is to check out the contents of the file itself. You can run `less server.log` to scroll through the text in the log.

After looking at it, we can realize it is way too long to look through by hand, so instead we'll have to search for text. This should remind you of the command appropriate for this task: `grep`!

Since we know the key must start with "picoCTF", we can run `grep picoCTF server.log` to look for the string "picoCTF" in the log file. We get the following output:
```
[1990-08-09 10:00:10] INFO FLAGPART: picoCTF{us3_
[1990-08-09 11:04:27] INFO FLAGPART: picoCTF{us3_
[1990-08-09 11:04:29] INFO FLAGPART: picoCTF{us3_
[1990-08-09 11:04:37] INFO FLAGPART: picoCTF{us3_
[1990-08-09 12:19:23] INFO FLAGPART: picoCTF{us3_
[1990-08-09 12:19:29] INFO FLAGPART: picoCTF{us3_
[1990-08-09 12:19:32] INFO FLAGPART: picoCTF{us3_
```
We can see that these all have the string "FLAGPART". This leads us to believe the other lines with parts of the flag have the same "FLAGPART" label. We can use `grep` again using "FLAGPART" as our search/regular expression pattern to match:
```
$ grep FLAGPART server.log
[1990-08-09 10:00:10] INFO FLAGPART: picoCTF{us3_
[1990-08-09 10:02:55] INFO FLAGPART: y0urlinux_
[1990-08-09 10:05:54] INFO FLAGPART: sk1lls_
[1990-08-09 10:05:55] INFO FLAGPART: sk1lls_
[1990-08-09 10:10:54] INFO FLAGPART: cedfa5fb}
[1990-08-09 10:10:58] INFO FLAGPART: cedfa5fb}
[1990-08-09 10:11:06] INFO FLAGPART: cedfa5fb}
[1990-08-09 11:04:27] INFO FLAGPART: picoCTF{us3_
[1990-08-09 11:04:29] INFO FLAGPART: picoCTF{us3_
[1990-08-09 11:04:37] INFO FLAGPART: picoCTF{us3_
[1990-08-09 11:09:16] INFO FLAGPART: y0urlinux_
[1990-08-09 11:09:19] INFO FLAGPART: y0urlinux_
[1990-08-09 11:12:40] INFO FLAGPART: sk1lls_
[1990-08-09 11:12:45] INFO FLAGPART: sk1lls_
[1990-08-09 11:16:58] INFO FLAGPART: cedfa5fb}
[1990-08-09 11:16:59] INFO FLAGPART: cedfa5fb}
[1990-08-09 11:17:00] INFO FLAGPART: cedfa5fb}
[1990-08-09 12:19:23] INFO FLAGPART: picoCTF{us3_
[1990-08-09 12:19:29] INFO FLAGPART: picoCTF{us3_
[1990-08-09 12:19:32] INFO FLAGPART: picoCTF{us3_
[1990-08-09 12:23:43] INFO FLAGPART: y0urlinux_
[1990-08-09 12:23:45] INFO FLAGPART: y0urlinux_
[1990-08-09 12:23:53] INFO FLAGPART: y0urlinux_
[1990-08-09 12:25:32] INFO FLAGPART: sk1lls_
[1990-08-09 12:28:45] INFO FLAGPART: cedfa5fb}
[1990-08-09 12:28:49] INFO FLAGPART: cedfa5fb}
[1990-08-09 12:28:52] INFO FLAGPART: cedfa5fb}
```
Removing the duplicated text, we can now make out our answer as `picoCTF{us3_y0urlinux_sk1lls_cedfa5fb}`. As a bonus, we can use `grep`, other command-line tools, and the magic of piping if we want the output to be a bit cleaner (i.e. no duplications).

We don't necessarily care about the timestamp for each line of the output. The only relevant information is the "FLAGPART" label and the string afterwards. A useful regular expression we can use is `FLAGPART.*`, where `.*` means to match *zero or more* occurrences of any character. The `-o` output of `grep` will also come in handy as we *only* want the output of the matched regular expression. Running the command `grep -o "FLAGPART.*" server.log` gives us the following output:
```
FLAGPART: picoCTF{us3_
FLAGPART: y0urlinux_
FLAGPART: sk1lls_
FLAGPART: sk1lls_
FLAGPART: cedfa5fb}
FLAGPART: cedfa5fb}
FLAGPART: cedfa5fb}
FLAGPART: picoCTF{us3_
FLAGPART: picoCTF{us3_
FLAGPART: picoCTF{us3_
FLAGPART: y0urlinux_
FLAGPART: y0urlinux_
FLAGPART: sk1lls_
FLAGPART: sk1lls_
FLAGPART: cedfa5fb}
FLAGPART: cedfa5fb}
FLAGPART: cedfa5fb}
FLAGPART: picoCTF{us3_
FLAGPART: picoCTF{us3_
FLAGPART: picoCTF{us3_
FLAGPART: y0urlinux_
FLAGPART: y0urlinux_
FLAGPART: y0urlinux_
FLAGPART: sk1lls_
FLAGPART: cedfa5fb}
FLAGPART: cedfa5fb}
FLAGPART: cedfa5fb}
```
`uniq` is a command-line utility that by default with no other options, gets rid of duplicated lines that are adjacent to each other. We can use the `|` symbol to take the output from our previous `grep` command and pass that as the input to the `uniq` command, giving us this output now:
```
FLAGPART: picoCTF{us3_
FLAGPART: y0urlinux_
FLAGPART: sk1lls_
FLAGPART: cedfa5fb}
FLAGPART: picoCTF{us3_
FLAGPART: y0urlinux_
FLAGPART: sk1lls_
FLAGPART: cedfa5fb}
FLAGPART: picoCTF{us3_
FLAGPART: y0urlinux_
FLAGPART: sk1lls_
FLAGPART: cedfa5fb}
```

We can now see that our complete flag is the first four lines of the output. If we wanted to clean it up a bit more so that we don't get the repeated flag afterwards, we can use the `head` command with the `-n` option to print only the first # of lines of the output. In this case, we only want the first four lines, so piping the command again into `head -n 4` gives us this now:
```
FLAGPART: picoCTF{us3_
FLAGPART: y0urlinux_
FLAGPART: sk1lls_
FLAGPART: cedfa5fb}
```

### Try it yourself!
We encourage you to explore these challenges. Start on the easy ones and work your way up!

A nice one to try is [Riddle Registry](https://play.picoctf.org/practice/challenge/530) (make sure you're logged in to picoCTF first!). 

A hint for this one is *metadata*.
<br>
A second hint is that many of these problems have the final answers encrypted. So if you see a random string of letters, don't be scared. Two common encryptions for these would be *ROT13* or *Base64*.

If you don't know what any of those are or the commands to use them, you should Google[^2] it. The point of these CTFs are for you to learn, so looking things up and forming your plan from there is a great thing to do.

[^2]: generic term not specific to Google itself
