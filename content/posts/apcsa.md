---
title: APCSAAA
date: 2024-04-26
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
description: It's almost AP season, so let's review the entire AP curriculum! (and make fun of the exam guidelines)
---

It's almost AP season, so let's review the entire APCSA curriculum! (and make fun of the exam guidelines)

We'll be using the Course and Exam Description on the [College Board website for APCSA](https://apcentral.collegeboard.org/courses/ap-computer-science-a).

# The Course
First things first, why did they put Legos as the cover image of the manual?? I thought APCSP was the one with block coding...

> Determine an appropriate program design to solve a problem or accomplish a task (not assessed)
Oh and it turns out actually knowing how to program isn't a skill that matters to the AP exam...

There's also a "required" "big idea" about the "impact of computing" which is **entirely untested** and basically just tells you to follow the law and be ""ethical""...
The Official Stuy Linux solution is just to be FOSS, you'll get enough people bikeshedding in your issue tracker to take care of all that for you :P


## Unit 1 - Primitive Types
The primitive types (relevant to APCSA) are:
- `int` - stores signed integer numbers in a 32-bit (4-byte) space, thus the limits are
	- `Integer.MIN_VALUE` = -2147483648 = -(2^31)
	- `Integer.MAX_VALUE` = 2147483647 = 2^31-1
	- If an expression goes out of bounds, it will cause an __integer overflow__, where the number wraps around, potentially producing unexpected behavior. (example: `2147483647 + 1 == -2147483648`)
- `double` - stores "floating point" numbers, which have decimal points
	- [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) 64-bit
- `boolean` - stores one of two values `true` or `false`

Variables can be declared with or without an initial value:
```java
int i,j;
i = 1;
j = 2;
```
and
```java
int i = 1;
int j = 2;
```
are equivalent.

Note that variable names may not start with digits, or be a reserved keyword (type/function/"command" already defined to be something else). Conventionally, variables use `camelCase`.

Unlike reference types (more on that in Units 2, 6-9), each primitive type variable is guaranteed its own space in memory. Thus:
```java
double d = 3.14;
double e = d;
e = 2.718;

System.out.println(d);
// prints 3.14, `e` was initialized with the *value* of d, 3.14, but this is a separate copy, so changing `e` does NOT change `d`.
```

When you specify the value of a variable in code, such as `-123`, `1.414`, `false`, you are using a literal.

Notice that unlike math, the `=` sign means "take the value on the right and store it in the variable (label) on the left".

### Math
Math can only be done with `int` and `double` variables.

When doing math with integers, the result will *always* be an integer, even if you wanted to include the fractional part. Thus:
```java
3 + 2 == 5
4 / 3 == 1
4.0 / 3 == 1.3333333333333333  // you can set at least one double value in the expression to get out a double
(double) 4 / 3 == 1.3333333333333333  // because (double) 4 tells Java to convert it to a double variable "4.0"
```

#### Operators
The basic arithmetic operators are `+`, `-`, `*`, `/`, `%`.

`%` is the "remainder" (or commonly "modulo") operator; it returns the (signed) remainder of the left number divided by the right.

Common applications of `%` include
- Checking if a number is even or odd `num % 2`
	- `odd % 2 == 1`
	- `even % 2 == 1`
- Getting the last digit of a number `num % 10`
	- `123 % 10 == 3`
	- pairs well with `num / 10` because then you can work on the next digit (`123 / 10 == 12`, `123 / 10 % 10 == 2`).


For these arithmetic operators, there are also compound assignment operators:
```java
int a = 5;
a -= 3;  // same as a = a - 3
System.out.println(a);  // 2

a *= 2;  // same as a = a * 2
System.out.println(a);  // 4
```

And for `+` and `-`, there are even more compact shortcuts:
```java
int a = 5;
a --;  // same as a -= 1
System.out.println(a);  // 4

a++;  // same as a += 1
System.out.println(a);  // 5
```

##### Dividing by Zero
When dividing an integer by `0`, an `ArithmeticException` is thrown. The following code will throw an `ArithmeticException`, crashing your program if it does not have error handling.
```java
5 / 0
```

When dividing doubles, division by `0` (or 0.0) will not throw an error, as this is defined by the IEEE to return `Infinity`, a special value.

##### Casting
If you want to use floating point numbers, but only have an `int` to start, you can cast it to `double` like so:
```java
int a = 1;
(double) a == 1.0;
```

Alternatively, if you want to store only the integral part of a `double`, you can case it to `int` like so:
```java
double b = 1.6;
int a = (int) b;  // a = 1
```

Astute readers will notice that this acts as a floor function. If one wants to round instead, they can use this idiom.
```java
double b = 1.6;
int a = (int) (b + .5);  // a = 2
```
or for negative numbers
```java
double b = -2.5;
int a = (int)(b - .5);  // a = -3
```
Casts have highest precedence, and will apply to the value immediately to the right of them, which is why we must use the parenthesis.

##### Operator Precedence
Java will use [its version of the order of operations](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html) to evaluate an expression. Operators on the same level are evaluated left to right.

For the basic arithmetic expressions, this is effectively an extended PEMDAS.

You can add parenthesis to specify that you want a certain section to be evaluated first.

Examples:
```java
1 + 9 / 3 == 4
(1 + 9) / 3 == 3   // 10 / 3
6 * 2 / 6 == 2
2 / 6 * 6 == 0   // note that 2 / 6 == 0
5 % 3 * 4 == 8
```

## Unit 2+5+9 - Using Objects & Writing Classes & Inheritance
Unit 2 is really using functions, which are associated with objects because Java:tm:

### Method Signatures and Overloading
I prefer [prototypes](https://en.wikipedia.org/wiki/Function_prototype), which adds in the name of the function defined.

### Classes
~~Those things you have at school.~~ The definitions or (as the CED calls it) "formal implementation, or blueprint, of the attributes and behaviors of an object."



#### Constructors
Constructors are just functions that use side effects to define how a new instance of the class will be made. Constructors does not have a `return` type, nor does it `return` anything. Instead, they are called with the `new` keyword.



#### A Complete Class
```java
public class Calculator {  // valid names work like variables, just conventionally use UpperCamelCase and Nouns


}
```



### Objects
Keeping with the "blueprint" analogy, objects are the constructed buildings made _from_ the blueprints. Based on the definitions in the blueprints, you know exactly what features the building has, and you can construct as many copies of that building as you want ([William J. Levitt](https://en.wikipedia.org/wiki/Levittown) wants to know your location).

Classes can be used just like types to declare variables, and so you can define a String variable like so:

#### Calling Constructors
```java

```



### Wrapper Classes

#### Helpful Functions
#### Autoboxing

### Co


The `new` keyword can be used to call a constructor function.

## Unit 3 - Boolean Expressions and `if` Statements

## Unit 4 - Iteration

## Unit 6 - Array

## Unit 7 - ArrayList

## Unit 8 - 2D Array

## Unit 10 - Recursion
Ooh! This one is going to be crazy right!? It's gotta have QuickSort and TimSort and Tim's QuickSort and BFS and DFS and NTFS and all that good stuff, yeah !?

...

...

It's just binary search...
