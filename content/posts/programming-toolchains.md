---
title: Installing Programming Language Toolchains
date: 2023-11-24
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---
Plenty of programmers use Linux because it's super simple to set up tooling for pretty much any programming language you'd need!

We'll look at getting set up with a few common languages.

# Python
Python is such a ubiquitous programming language, most Linux distros come with it preinstalled, or even use it for their package manager!

## Installing Python
To install Python on an Alpine image, run
```
apk add python3
```

## Running Python
You can run python with the `python3` command.

Usually, .py files are used for Python scripts, but you can name your script with any file name you want.

## Making an executable script
If you want to be able to run your Python script as a program, perhaps in your terminal or for [a cron job](/posts/cron), you can do that with just a little bit of configuration.

At the very first line of your script, you need to add this comment:
```
#!/usr/bin/env python3
```
This tells the `env` program to run the appropriate copy of `python3` (which matters when you have tons of different versions, each with different libraries, ask how I know...) against this script file.

You then need to tell Linux that this file is executable by running
```
chmod +x [script.py]
```
and that will be all! You can now simply run `./script.py` instead of `python3 script.py`!

# C(++)
C is one of the most significant systems programming languages, with the original Unix kernel's main advantage being written in C.

C is still used nowadays for the Linux kernel, along with tools like the GNU coreutil, cURL, DOOM, and many of your favorite programs.

C++ is (almost) a superset of C, which adds an object-oriented programming (OOP) paradigm, and a standard library full of premade datastructures. This is a favorite of competitve programmers for its C-like speed, while also offering compartmentalization that makes it useful for game engines like the [Unreal Engine](https://www.unrealengine.com/en-US), and [forks of the Cube engine (shameless plug)](https://github.com/project-imprimis/).

Because C is such a crucial programming languages integrated with the Unix/POSIX system, effectively all Linux distributes provide a libc, for C standard functions like file handling. To provide C++ functions to build with, `libstdc++`, is often also provided. They also disribute the GNU Compiler Collection (GCC) which supports C via the `gcc` command and C++ via `g++`. The LLVM project's `clang` and `clang++` are alternatives.

## Installing GCC
We've already written [a brief reference](/posts/install_gcc) on installing essential (GCC) build tools on a couple common distros, but neglected to include Alpine.

To install the GCC and development libraries on Alpine, run
```
apk add build-base
```

## Compiling C code
Let's start with a sample of C code you [might have seen before](/posts/mini-picoctf), put this in a file called `hi.c`:
```c
#include <stdio.h>

int main(void) {
        // part 3
        char secret[] = {0x42, 0x41, 0x54, 0x54, 0x45, 0x52, 0x59, 0x0};
        printf("%s\n", secret);
        return 0;
}
```


To compile C code, simply run
```
gcc hi.c
```
which will output the executable binary to `./a.out` (not to be confused for the archaic A.OUT format!).

If you want to set a custom output filename, such as `hi`, you can say 
```
gcc -o hi hi.c
```

Congratulations! You are now officially a "C programmer"!

## Compiling C++ code
For C++ code, you should invoke `g++` instead of `gcc`.

# Rust
[Rust](https://www.rust-lang.org/learn/get-started) is a modern systems language with advanced compile-time checking to ensure memory safety and other mitigations against common software snafus.

Its package manager is called cargo, and installing it will also bring along the compiler, `rustc`, and the rest of the toolchain.

To install it, run
```
apk add cargo
```

## Starting a new Rust project
To set up a directory for a Rust project, run
```
cargo new [project_name]
```

This sets up a git repository with a few unadded files, such as `Cargo.toml` to manage this project's packages.

If you want to compile one file, `gcc` style, you can run
```
rustc [file.rs]
```

If you want to compile a whole project,
```
cargo build
```
takes care of it all, and will leave a binary nestled in the `target` folder.

Welcome to the land of zero cost abstractions and blazingly fast code, along with the lingering smell of [crab](https://rustacean.net/).
