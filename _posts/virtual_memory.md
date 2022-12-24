# Virtual Memory

## What is virtual memory?

There are two types of memory, physical memory and virtual memory.

Physical memory, as the name suggests, is the physical RAM on your motherboard.

Virtual memory is a way to manage memory that provides an "idealized abstraction of the storage resources that are actually available on a given machine" which "creates the illusion to users of a very large (main) memory".

## How does the Kernel map virtual memory?

The Kernel is in charge of mapping physical memory to virtual memory. Then the MMU (memory management unit (located in the cpu)) automatically translates the virtual memory to physical memory.

## Why?

Virtual memory enables a program to have a contiguous range of addresses.

It is also possible to map physical stress to two different virtual addresses. This is very, very useful.

#### For example, when reading a file:
FS and (process wanting to read a file) can have some shared memory.
FS writes to that memory for the file being read.
The process can then read that memory.

## How are maps stored?

Virtual memory maps are stored in page tables.

![alt text]([https://en.m.wikipedia.org/wiki/File:Virtual_address_space_and_physical_address_space_relationship.svg](https://upload.wikimedia.org/wikipedia/commons/3/32/Virtual_address_space_and_physical_address_space_relationship.svg))

## Permissions 

Virtual memory can NEVER be W/X.
For example, the executable is R/X and the stack is R/W.

### Date Published: 2022_12_24 (YYYY_MM_DD) 
   ### Written by: Orlin Dyankov [@biishop](https://github.com/biiishop)
