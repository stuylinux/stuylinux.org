---
title: "Meetings 4 & 5 Notes: Shell Scripting"
author: Matthew Gultom [@WindwardIsland](https://github.com/WindwardIsland)
date: 2026-03-15
description: Decoding an ASCII-encoded secret message using a shell script!
---

After our previous SuperTuxKart meeting, we decided to host a series of meetings called The Shell Saga, in which each meeting aims to explore a cool and interesting aspect of the Linux CLI and shell. To start off, we taught [shell scripting](https://en.wikipedia.org/wiki/Shell_script) over the course of two meetings!

## Introduction
A shell script in the basic sense is a file that contains a list of commands that can be run in a shell. These commands might be actual programs that are installed and can be run, or they might be syntax that the shell can interpret. The term "shell script" is generic and can be applied to many programs that can interpret and read syntax, such as Python. However, it mostly refers to a script made for the [BASH](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) shell, one of the many shells installed on Unix-like OSs such as Linux. Check out our [Meeting 1 blog post](https://stuylinux.org/posts/meeting1-gameshell) for more information and clarification about the shell, the terminal, and useful commands, as they are needed in order to create a shell script.

For this meeting (which was a repeat of a meeting we did last year), members had to download and extract a tarball archive, and then write a shell script to decode a secret message hidden in the directory structure!

## Getting Started
First, we need to address the inconsistencies in completing this challenge on different OSs. 

- If you're on Linux, great! Just open up a terminal and continue with this challenge.
- If you're on macOS, also great! You can also open up a terminal and continue on.
- If you're on Windows, you will have to install [Git BASH](https://gitforwindows.org/), a program that provides a BASH shell for Windows. When installing, just select all the defaults and a BASH terminal will open up by default after you've finished installing.

We can now run the following commands in the terminal to download the tarball and extract it:
```
wget https://files.stuylinux.org/stuylinux/2026/meeting-2026-02-27/gov_secrets.tar.gz
tar xzvf gov_secrets.tar.gz
```

There should now be a folder called `out` located wherever you extracted the tarball archive. From here, we can now explore the directory structure before creating our script.

### Exploring The Directory Structure
Running `cd out` and then `ls` gives us a list of folders that are consecutively numbered, from 1 to 180. Let's try going into the `1` folder and seeing what's there.

Inside the `1` folder (and all the other numbered folders as we later realize), there is a directory called `homeworks` and a file called `SECRET`. Before going into the `homeworks` folder, let's see what's inside the `SECRET` file first. Running `cat SECRET` gives us the following output:
```
Dm7qUGABZiYc2NHsi7sD
```

It's a string of random characters! Seems suspicious, right...? Let's go into the `homeworks` folder now by running `cd homeworks`, and then `ls`. It looks like there are `.txt` files that are labeled alphabetically, from a to z. Let's see what's inside the `a.txt` file, for example. Running `cat a.txt` gives us output containing a number, and then a string of random characters next to that number, for each line. Each string of random characters just also happens to appear *very similar* to the string inside the `SECRET` file. 

Our suspicion of the similarity of these random strings leads us to think that we should use a program to search for the string from `SECRET`, inside the `.txt` file. The program best for this purpose is `grep`! `grep` typically takes a regular expression (basically the search pattern that we want to match) and a file (or some output) as arguments, along with some other options. We can now run the following command which uses `grep` to search for the `SECRET` string in the file:
```
grep "Dm7qUGABZiYc2NHsi7sD" a.txt
```

However, no output was returned. Strange. So what do we do now?

### Brute Forcing?
You might think that if the string wasn't found in the file, then just check the next file, which in this case is `b.txt`. However, there are a few things to consider here:
- You don't know whether or not the string will be found in the file for sure until you run the command.
- There are 26 files to check in each `homeworks` folder, which would be a pain to do for every single one.
- Remember that there are *180* numbered folders to check (from back inside the `out` folder), which each have a `SECRET` file (that may or may not contain a completely different string), a `homeworks` folder, and another 26 files *inside* that `homeworks` folder. One can do the math (180 \* 26) and realize that they would have to check at least 4680 times to see if a single string is inside a file.
- You also don't know what the numbers to the left of the strings inside each alphabetically labeled file mean.

So, a solution to prevent us wasting lots of time and never making any significant progress on this challenge, would be to write a shell script! With a shell script, we can have the shell automate this process for us, so that we don't have to do any extra work.

## The Shell Scripting Fundamentals
Members were given an HTML file after the exploring stage of the challenge, which contained a cheat sheet for basic shell scripting syntax. Luckily, those reading have this blog post that they can refer to!

### The File
As mentioned earlier, a shell script is a file containing a list of commands. So, you need to create one first. You can use any text editor when initially creating and editing the file. 

The file's extension should be ".sh" (without the quotes). This lets your text editor and your system know that you're creating and editing a shell script (and if applicable, will give you helpful syntax highlighting!). Make sure that the output contains this when you run `file <name of script>.sh` (replace `<name of script>` with the actual name) in the terminal:
```
Bourne-Again shell script, ASCII text executable
```

This means that the file is officially recognized as a shell script!

### Shebang
The shebang is a line in your shell script that indicates which *program* will read and interpret the syntax in the file. In this case, we want the BASH shell to do that as 1) it is the most widely used and installed shell on most Linux distributions and 2) it implements some useful features that we can use in our script[^1]. Make sure to include this line at the top of the file:

[^1]: [1] BASH is a [POSIX](https://en.wikipedia.org/wiki/POSIX)-compliant shell, meaning that it can read and interpret standard shell syntax. However, BASH implements a few useful features called [bashisms](https://en.wikipedia.org/wiki/Bash_(Unix_shell)#POSIX_mode). One of these is double brackets (`[[...]]`). These support glob matching, regular expressions, and other things that standard shell scripting can't. It is important that you are explicit in your shebang about which program to use when reading and interpreting the syntax, as POSIX-strict shells such as `dash` and `mksh` can't interpret bashisms.
```
#!/usr/bin/env bash
```
As a bonus, the `env` program is used here to look wherever the `bash` executable program is located, as *we don't know* where it could be on every system. This makes this script system-agnostic.

### Variables
Just like in any programming or scripting language, we can use variables here in our shell script! The following syntax is used to declare and initialize a variable:

```
VARIABLE=value
```

The name of the variable is on the left of the `=` sign, while the value that the variable's assigned to is on the right. You can name the variable anything you think is appropriate for the script. The value can be a numerical value, a string, or even another variable. Typically, the variable naming convention for a shell script goes like this:

- Global variables (basically variables not inside a function) or [environment variables](https://en.wikipedia.org/wiki/Environment_variable) are SCREAMING_SNAKE_CASE (basically all caps, with spaces denoted by underscores)
- Local variables (variables inside a function) as preceded with the `local` keyword (such as `local var`) are regular snake_case (no caps)

To reference a variable in your script, you precede the variable name with a `$` sign, like `$VARIABLE` for example.

### Conditionals
Conditionals, as represented by if-else statements in most programming and scripting languages, are used to execute specific actions when specific conditions are met. Here's the syntax for those in a shell script:

```
if [[ var == some_value ]]; then
    # run your commands here
elif [[ var == some_other_value ]]; then
    # run your commands here
else
    # run your commands here
fi
```

You can also use operators (the syntax between the variable and the value being compared) other than `==`, such as:
- `!=`: basically the opposite of `==`, which is "not equal to"
- `=~`: this is used to compare a variable's value to a regular expression string
- these are operators for comparing *numerical values* (the previous ones *only* work with comparing strings):
    - `-eq`: compare two values and check if they're equal to each other
    - `-gt`: check if the variable on the left is *greater than* the value on the right
    - `-lt`: check if the variable on the left is *less than* the value on the right

By the way, you may have noticed that text that wouldn't be considered syntax is preceded by a `#`. This denotes a comment in a shell script. Comments can be used for additional context for specific syntax being used. (Did you notice that the shebang had a `#`? This is because our shebang isn't actual syntax that's being interpreted by the shell, so we "comment" it out.)

Note that spacing is very strict in a shell script (especially in conditionals and loops) so make sure you space your syntax correctly; otherwise, you will run into an error when you run your script.

### Loops
Loops (which typically are in the form of `for` and `while` loops) are used in most programming and scripting languages to either execute actions for each item in a sequence (`for`), or to continously execute actions *until* a certain condition is met (`while`).

#### For Loops
Here's the syntax for a `for` loop inside a shell script:

```
for i in list; do
    # run your commands here for each item in list (these can involve the "i" variable)
done
```

`i` is a variable that represents the current item in your list or sequence. It can be named anything you think is appropriate, however, most programmers/scripters typically use `i` as that represents the current index (a number associated with that current item).

`list` can either be a variable named `list` that's assigned a list of values (for example, the syntax in a shell script for creating a list would be `(values go here, separated by spaces)`), or it can be a command that outputs a list of values through command substitution (more on this later).

In most cases, the commands you run in the `for` loop should involve your index variable (in this case, `i`) in some way, but this is optional.

#### While Loops
Here's the syntax for a `while` loop inside a shell script:

```
i=0
while [[ i -lt 20 ]]; do
    echo $i
    ((i += 1))
done
```

Here's what we're doing in this `while` loop:
- We declare and initialize a variable called `i`, and we assign it the value of 0.
- Our `while` loop uses the same if-else statement syntax (double brackets) to denote a condition. In this case, we keep running the actions in the loop *while* `i` is less than 20. In other words, the loop will stop when `i` reaches 20 or greater.
- We print out the value of `i` each time using the `echo` command.
- We use the `((...))` syntax to perform arithmetic. In this case, we increase the value of the `i` variable by 1 each time.
- We close the loop with the `done` keyword.

### Command Substitution
Command substitution is a method that involves using the output of a command in your shell script. The following syntax is used for command substitution:

```
$(command)
```

Now this by itself is not very useful. We can set the output of this command to a variable (e.g. `VARIABLE=$(command)`), or we can use it in a loop, like so:

```
for i in $(command); do
    echo $i
done
```

In this case, we assume that the output when running `command` will give us a list of items. We iterate through that list using a `for` loop with the above syntax, and then print each item in that list using the `echo` command. This command substitution syntax can also be used in conditionals.

Note that if you know beforehand that the output of a command won't just return a numerical value, but a string of characters of some kind, then wrap the syntax in double quotes, like so:

```
"$(command)"
```

### Functions (with arguments)
Functions are used in programming and scripting to keep specific code in its own bundle, and then that bundle of code can be run afterwards. These are used for organization and readability purposes. Here's the syntax for defining a function and running it in a shell script:

```
function_that_does_stuff() {
    # run your commands here
}

function_that_does_stuff
```
You can also involve parameters/arguments in your functions! Here's the syntax for doing so:

```
function_that_does_stuff() {
    if [[ $1 == some_value ]]; then
        # run this command
    elif [[ $1 == some_other_value ]]; then
        # run this other command
    fi
}

function_that_does_stuff $some_value
function_that_does_stuff $some_other_value
```

In this case, `$1` is a variable that represents the first parameter/argument we pass to the function. We check whether our first argument is set to a specific value with the conditionals in our function. We then run the function a given amount of times, with the only difference being the argument we supply it. You can also use more than one parameter/argument by just using the corresponding variables, for example `$2` for a second argument, `$3` for a third argument, etc.

## Writing The Script
Let's now use our knowledge of shell scripting to complete this challenge! We'll use a text editor to create and edit our script. Let's call the script `decode.sh` since the purpose of this challenge is to decode a secret message.

### Iterating through `out`
First, we'll include our shebang, like so:

```
#!/usr/bin/env bash
```

Next, we need some way to iterate through each directory (there's 180 of them) in the `out` directory (for simplicity, our script will be located *outside* of the `out` folder). Luckily for us, we have the power of `for` loops! However, we need some sort of command to give us that list of directories that we can iterate through. For that, we have the power of command substitution!

Combining these two aspects of shell scripting gives us the following syntax:
```
#!/usr/bin/env bash
for dir in $(ls out | sort -n); do 

done
```

Here, our index variable for our `for` loop is set to `dir`. Then, we use command substitution to give us that list of directories. That command in this case was `ls out | sort -n`. `ls` lists the contents of a directory, in this case, `out`. However, we wanted a list such that each line was a directory name, followed by the next directory name numerically on its own line. That way, the output was more easier to iterate through. So, we used the `sort` command with the `-n` option to sort the output numerically.

### Retrieving The Secret
Going back into the directory structure, we know from before that there was a `SECRET` file that contained a string of random characters. Let's make use of that file in our script. 

We can use command substitution again to assign the contents of that `SECRET` file to a variable. Let's call this variable `secret`. We know that the file is located in `out` and then the numbered directory. The `cat` command can be used to look at the contents of a given file. So with that said, here's our newly modified shell script:

```
#!/usr/bin/env bash
for dir in $(ls out | sort -n); do 
    secret="$(cat out/$dir/SECRET)"    
done
```

We know that `dir` represents the current directory when iterating through `out`. So, why not just use that in our command to get the contents of the `SECRET` file for *every* numbered directory? Also, note that the command substitution is wrapped in quotes since the output is a string.

As a bonus, if you wanted to make sure that `secret` was always set to the contents of the `SECRET` file, you can add this to your script:

```
#!/usr/bin/env bash
for dir in $(ls out | sort -n); do 
    secret="$(cat out/$dir/SECRET)"    
    echo "$secret"
done
```

The referenced variable (as denoted by the preceded `$`) is wrapped in quotes since it's a string.

### Matching The Secret

We recall that there were `.txt` files labeled alphabetically inside the `homeworks` folder inside each numerically labeled folder. We also recall using the `grep` command to find the string from the `SECRET` file inside each of the `.txt` files. Why don't we just use that in our shell script now?

However, the issue is that we're currently iterating through each of the *numbered directories* inside `out`. But we also want to iterate through each of the *`.txt` files* inside `homeworks` (which themselves are inside a single numbered directory) to match that `SECRET` string. Why not use a nested for loop?

Nested for loops are used when you want to iterate through a list of items, and that list of items is part of a single item inside a larger list. Nested for loops, like in most programming/scripting languages, are supported in our shell script, so let's use them!

We know that `ls` will give us a list of the contents in a given directory. Let's use that for the `homeworks` directory. Command substitution to the rescue! Here's what our script looks like now:

```
#!/usr/bin/env bash
for dir in $(ls out | sort -n); do 
	secret="$(cat out/$dir/SECRET)"
	for txt in $(ls out/$dir/homeworks); do 
	    grep "$secret" out/$dir/homeworks/$txt
	done
done
```
Let's break down the nested for loop.

First, we need a variable to represent our current index when iterating through `homeworks`. Let's use `txt` for that. 
<br>
Next, we know the command `ls out/$dir/homeworks` is used to give us a list of all the `.txt` files inside `homeworks`. 
<br>
Finally, for each `.txt` file inside that directory, we then use the `grep` command to search our string (which is stored in the `secret` variable) inside them. Note the use of `$txt` to represent the current `.txt` file instead of manually naming them individually one by one.

### Running The Script
We're not completely done with the challenge, but since we have a functional shell script now, let's try running it! We'll save the file and exit our text editor. Then, we'll run the following command to run the script:

```
bash decode.sh
```

For readability purposes, the output won't be shown here, but for each line, there should be a number in the left column, and a random string of characters in the right column. You may notice that the string of characters repeats for some lines, but the number is completely different from the last. This means that we successfully found the `SECRET` strings in the files that they were contained in!

As a bonus, if you were curious to see in what specific directory and what specific `.txt` file the string was contained in, you can edit your script to the following:

```
#!/usr/bin/env bash
for dir in $(ls out | sort -n); do 
	secret="$(cat out/$dir/SECRET)"
	for txt in $(ls out/$dir/homeworks); do
		if grep "$secret" out/$dir/homeworks/$txt; then
			echo "^ Dir found: $dir"
			echo "^ txt found: $txt"
		fi
	done
done
```

Here, we can check to see if the `grep` command ran successfully (i.e. if the `SECRET` string was contained inside the `.txt` file and it's able to output it) with an `if` statement. The script then runs the command, outputs the matched line, and then prints out the numbered directory and `.txt` file it was located in.

### Decoding the Message
So, we have our script and the output with lots of numbers and strings of random characters. What now? Well, we still don't know what those numbers mean. Let's think. If we're trying to decode a message, that means the message must be encoded with some kind of cipher right? So, could those numbers actually be the individual characters of the secret message???

If you've thought about this for a while, and came to the conclusion that those are ASCII values, then you're right! Those numbers are actually [ASCII](https://en.wikipedia.org/wiki/ASCII) numbers that each translate to a specific character in the English alphabet. All we have to do is individually figure out what each ASCII value corresponds to, right...?

#### Brute Forcing? (yet again)
Just like when we brute forced `grep` in our directory structure before creating our script, it would take a long time for us to decode each individual ASCII value from our output. You *could* get away with doing just that by using a website like [this](https://www.duplichecker.com/ascii-to-text.php). However, we have a shell script. So why not use it to automate this process for us?

#### Decoding the ASCII
Having a look through the manual page for `grep` (by running `man grep` in the terminal) will show that `grep` unfortunately can't convert from ASCII to regular text. But never fear, we can use the `awk` command to our dismay!

`awk` is similar to `grep` in which you can search for a string in a given file or output. However, it's actually a full-fledged [programming language](https://en.wikipedia.org/wiki/AWK) with lots of features and can conveniently be run in the terminal![^2]

[^2]: [2] Maybe some day, Stuy Linux will have a meeting on `awk`. Some day...

We won't go over every single feature of `awk` here, but know that `awk` typically takes the following as arguments:
- a string to search, which would be wrapped by `//`, such as `/string/`
- some actions, such as printing the output
- a file or some output

We can now replace `grep` with `awk` in our script, like so:

```
#!/usr/bin/env bash
for dir in $(ls out | sort -n); do 
	secret="$(cat out/$dir/SECRET)"
	for txt in $(ls out/$dir/homeworks); do 
		awk '/'"$secret"'/ {printf("%c", $1)}' out/$dir/homeworks/$txt
	done
done
```

Here, we're searching for our `SECRET` string (stored in the `secret` variable)[^3] and then using `awk`'s `printf` program to convert the first column (in this case, our numbers) of the output (as denoted by `$1`) from ASCII to its corresponding character. We then pass the file we want `awk` to parse, in this case, our `.txt` file.

[^3]: [3] The wrapping of the referenced variable (`$secret`) in double quotes, and then single quotes is needed so that `awk` can actually interpret that the string inside `//` isn't a string itself, but rather a shell variable being used in a script.

Now, when we run the script in our terminal, we get the following output:

```
ynnel wehttam lexa divad xunilyuts zvcngnceeoeeo
```

That doesn't look right! You may not recognize the first four words in the output, but you will realize that the fifth word is supposed to spell out "stuylinux"! Hmm...

#### Going In Reverse?
One thing to keep in mind is that we iterate through each of the numbered directories in our script, from least to greatest. We also iterate through each of the alphabetically labeled `.txt` files in each of those, from a to z. Why don't we try iterating in reverse?

You may assume that iterating in reverse would be complicated in a for loop. However, we don't even need to touch that part of our script. Remember that the `ls` command gave us a list of directories/files we could iterate through. Why not have it give us that list in reverse?

Let's first try iterating through the *numbered directories* in reverse. Here's what our script looks like now:

```
#!/usr/bin/env bash
for dir in $(ls out | sort -nr); do 
	secret="$(cat out/$dir/SECRET)"
	for txt in $(ls out/$dir/homeworks); do 
		awk '/'"$secret"'/ {printf("%c", $1)}' out/$dir/homeworks/$txt
	done
done
```

Here, we pass the `-r` option to `sort` to sort the `ls` output in reverse. Let's see what the output is now when we run our script.

```
zvcngnceeoeeo xunilyuts divad lexa wehttam ynnel
```

That still doesn't look right! The words are still backwards, it's just that the order that they appear is now backwards. This doesn't necessarily matter, as we want each individual word to be printed forwards. Let's try iterating through the *`.txt` files* in reverse now. Our script:

```
#!/usr/bin/env bash
for dir in $(ls out | sort -n); do 
	secret="$(cat out/$dir/SECRET)"
	for txt in $(ls -r out/$dir/homeworks); do 
		awk '/'"$secret"'/ {printf("%c", $1)}' out/$dir/homeworks/$txt
	done
done
```

Here, we pass the `-r` option to `ls` to list the contents in reverse order.

Now, let's look at our output when running the script:

```
lenny matthew axel david stuylinux oeeoeecngncvz
```

Much better! Those who have been in the club for a while will recognize the four names in the output. And of course, "stuylinux" is printed correctly. However, there is a strange string of random characters afterwards. Maybe you'll be the one to figure that out, either manually or with a script...

Hint: the string is encoded using ROT13. Not sure what that is? Look it up and have fun!

### Bonus!
Nicolai (a fellow member of our club) managed to write his own decoding program in [Rust](https://en.wikipedia.org/wiki/Rust_(programming_language)) last year, which was very cool! Here it is:

```
use std::{
    collections::HashMap,
    fs::{self},
    time::Instant,
};

const GOV_SECRETS_PATH: &str = "../out";

fn main() {
    let start_time = Instant::now();

    let mut secrets_to_ascii_codes: HashMap<String, String> = HashMap::new();

    // these could be globs but I don't wanna require external crates
    let mut numbered_dirs = fs::read_dir(GOV_SECRETS_PATH)
        .unwrap()
        .map(|entry| entry.unwrap().path())
        .collect::<Vec<_>>();
    numbered_dirs.sort_by(|a, b| {
        a.to_str()
            .unwrap()
            .len()
            .cmp(&b.to_str().unwrap().len())
            .then_with(|| a.cmp(b))
    }); // proper number sorting
    let mut homework_paths = numbered_dirs
        .iter()
        .flat_map(|p| {
            fs::read_dir(p.join("homeworks"))
                .unwrap()
                .map(|entry| entry.unwrap().path())
        })
        .collect::<Vec<_>>();
    let secret_paths = numbered_dirs
        .iter()
        .map(|p| p.join("SECRET"))
        .collect::<Vec<_>>();
    homework_paths.sort_by(|a, b| b.cmp(a));

    // populates hashmap
    for path in homework_paths {
        let homework_text = fs::read_to_string(path).unwrap();

        for line in homework_text.split("\n") {
            if line.is_empty() {
                continue;
            }
            let (number, secret) = line.split_once(" ").unwrap();
            let ascii_char = number.parse::<i32>().unwrap() as u8 as char;
            secrets_to_ascii_codes
                .entry(secret.to_string())
                .and_modify(|ascii_codes| ascii_codes.push(ascii_char))
                .or_insert(ascii_char.to_string());
        }
    }
    // uses hashmap to find the secret
    let secrets = secret_paths
        .iter()
        .map(|path| fs::read_to_string(path).unwrap());
    let secret = secrets
        .filter_map(|secret| Some(secrets_to_ascii_codes.get(&secret)?.to_owned()))
        .collect::<String>();

    let elapsed = start_time.elapsed();

    println!(
        "gov secret: \x1b[96m{secret} \x1b[95m(found in {:.2}s)\x1b[0m",
        elapsed.as_secs_f32()
    );
}
```
