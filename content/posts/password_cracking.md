---
title: Rocking your World by Ripping through Passwords
date: 2023-12-10
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---

This week, we looked at ways to navigate through text files, along with password cracking using John the Ripper and the RockYou password list to rip and tear through some MD5 hashes!

(One day I'll figure out a ~~DOOM~~ Chex Quest meeting, one day...)

This meeting is very self-contained/asynchronous, and comes with 5 parts, solutions to which are detailed below:

# Part 1
Download and extract [part 1](https://eggsbps.eastus.cloudapp.azure.com/slinux/2023/12/08/part1.tar.gz).

As a reminder, you can download and immediately extract a tar.gz file by running this command:
```
curl [URL] | tar xvz
```

This will tell `tar` to e`x`ract a g`z`ipped file. 
The `v`erbose option will list out the files for you, sparing you the trouble of typing `ls`.

`part2.tar.gz.gpg` is [GPG symmetric encrypted](/posts/11-03#appendix%3A-symmetric-encryption), and you'll need to find a password to decrypt it.

Once you find my first password, call GPG ([install it](/posts/11-03#installing-gpg-and-a-key) if you haven't already)
```
gpg --decrypt part2.tar.gz.gpg > part2.tar.gz
```
and type in the password. The `>` tells GPG to output the data to a `part2.tar.gz` file, or you could replace that part with `| tar xvz` like we did before.

If you got the password wrong, you will see these errors:
```
gpg: decryption failed: Bad session key

gzip: stdin: unexpected end of file
tar: Child returned status 1
tar: Error is not recoverable: exiting now
```
In that case, make sure you didn't make a typo.

# Part 2
CS is a branch of applied math, and in math contest tradition, we'll be using the year, `2023`, as a reasonably large number!

Your task is to find the 2023rd line in a file.

My intended solution was to use a feature in my favorite text editor, `vim` (cue the flame war).

Solution: In `ex`-text editors like `vi`/`vim`, typing `:[n]`, replacing `[n]` with an integer, will jump to that specific line number.

# Part 3
Like any responsible teenager would, we're looking for memes!

Try using some text search feature to find the unique substring `meme`

Solution: In many text editors, and even text pagers like `less` (or `more`, though `more` is less useful...), you can type `/[text]` to search for a substring.

Alternatively, you can use `grep word file.txt` to look for the string `word` in file.txt

# Part 4
This is where the fun begins!

Instead of giving you plaintext passwords, which is [exactly what you shouldn't do](https://en.wikipedia.org/wiki/RockYou#Data_breach), I've given you MD5 checksums!

Checksums are meant to be uniformly-sized ways to encode the *identity* of some input data, without including the actual data within them. This is similar to how a sum in arithmetic is just one number that doesn't reveal its addends, but with more complex algorithms that should make it possible to immediately tell when a single bit is different from the original data that was checksummed.

The only way to reverse engineer these passwords is to guess and check, either incrementally by trying out every single combinations of letters possible (very slow), or to make educated guesses based on a wordlist of common passwords.

Fortunately for us, hackers have already released [a humongous list of plaintext passwords](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt), known as the RockYou list for the company it was obtained from, that we can use to make our guesses!

We can install one program specializing in the art of mass-guessing, [John the Ripper](https://www.openwall.com/john/) for our malicious purposes. (Note that we do not condone any illegal behavior, take care to report your exploits to make the world a more, not less, secure place!)
```
apk add john
```

If we run
```
john --wordlist=rockyou.txt --format=raw-md5 passwords.hashes
```
john will quickly run through our list and crack the passwords that correspond to the given hashes.

The `--wordlist` argument tells john to use the `rockyou.txt` file conveniently already in your directory as its basis for what to guess-and-check from, making things much faster!

One member forgot to include this argument, which left john running on incremental mode, where it tests every single possible character combination in order (needless to say, executing this was very... very... slow!).

The `--format=raw-md5` argument tells john to treat these hashes as MD5 checksums, though it supports a variety of other formats.


The passwords temporarily show up on screen, but you can also use 
```
john --format=raw-md5 --show passwords.hashes
```
to show all the passwords again. Perhaps you could pipe to one of the commands mentioned in Part 3 (instead of reading a file) to search for the substring...

# Part 5
You might have noticed that `tar` gave you a different error this time.

You'll have to run
```
gpg --decrypt part5.tar.__.gpg > part5.tar.xz
```
to read this file, perhaps using the [`file` command](/posts/mini-picoctf) to discern what type of compression is being used here?

Or if you're running any modern version of `tar`, just run `tar xf` on this file, and it'll automagically detect the compression format (way to spoil the fun >:().

This is the final part, and your challenge is to crunch through even more hashes! You can do it! I believe in you!

# Prize
You'll want to run this part on your local machine!

You need to look back at the first character of the first password in each list (e.g. `3` for part 1) to build up the URL.

Your output will be an mp4 file, which you can open in your favorite video player, preferably one launched from the CLI, like `ffplay` or `mpv`.

Congratulations! You've finished the challenge! I sure hope you had fun rocking and rolling with this challenge ;)

~~and yes i made this technically a 5-part meeting so we could have the number 5 to represent lenny's new raspberry pi 5, and our orange pi 5~~
