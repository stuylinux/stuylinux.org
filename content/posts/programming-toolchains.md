---
title: Installing Programming Language Toolchains
date: 2023-11-24
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---
Plenty of programmers use Linux because it's super simple to set up tooling for pretty much any programming language you'd need!

We'll look at getting set up with a few common languages.

# Python
Python is such a ubiquitous programming language, most Linux distros come with it preinstalled, or even use it for their package manager!

To install Python on an Alpine image, run
```
apk install python3
```

You can run python with the `python` command.

Usually, .py files are used for Python scripts, but you can name your script with any file name you want.

## Making an executable script
Shebang #!/usr/bin/env python3 

## Installing Python packages
Python is used for data science and A, due to the avalablilty of libraries, packages of pre-made code for some useful fucntions, like making graphs via matplotlib.

To install matplotlib:

# C(++)
C is one of the most significant systems programming languages, with the original Unix kernel's main advantage being written in C.

C is still used nowadays for the Linux kernel, along with tools like the GNU coreutil, cURL, DOOM, and many of your favorite programs.

C++ is (amlmost) a superset of C, which adds an object-oriented programming (OOP) paradigm, and a standard library full of premade datastructures. This is a favorite of competitve programmers for its C-like speed, while also offering compartmentalization that makes it useful for game engines like the Unreal Engine, and forks of the Cube engine.

Because C and CC are such important programming languages integrated tightly with the OS, effectively all Linux distributes provide a libc, for C standard functions like file handling. They also disribute the GNU Compiler Collection (GCC) which supports C via the `gcc` command and C++ via `g++`.

To install the GCC:

## Installing libraries
Getting set up with libraries is a bit unintuitive for a newcomer, but once you've tried it out, it'll be super simple, barely an inconvenience!

Libcaca? Libcurl?

# Fortran

# Rust
cargo and rustup and stuff

# Go

# Nim
Nim is an interesting programming language because it it made for automatic translation to C and JavaScript, sodelpoying Nim is as simple as having one of these common languages available.

# Java
Java is everyone's favorite Minecraft edition, and a virtual machine based proramming language. Programs are compiled with `javac` for the instruction set of the Java Virtual Machine (JVM), which is a program set up to trnslate JVM bytecode for execution on whatever CPU Java is being run on.

To install Java:
```
```

# JavaScript
There are a variety of runtimes out there, each with their own merits. Lenny knows more about this part so I'll probably have him write it...

Honestly this one is more boring  than necessary

# Elixir

# Racket

# Netlogo
nah.

