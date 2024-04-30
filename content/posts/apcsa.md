---
title: APCSAAA
date: 2024-04-26
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
description: It's almost AP season, so let's review the entire AP curriculum! (and make fun of the exam guidelines)
---

It's almost AP season, so let's review the entire APCSA curriculum! (and make fun of the exam guidelines)

We'll be using the Course and Exam Description on the [College Board website for APCSA](https://apcentral.collegeboard.org/courses/ap-computer-science-a).

Most complete code snippets in this article can be pasted into to `jshell` to verify. Lone boolean expressions are designed to be `true` when first run, so their meaning is always clear to the reader.

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
are effectively equivalent.

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
3 + 2 == 5;
4 / 3 == 1;
4.0 / 3 == 1.3333333333333333;  // you can set at least one double value in the expression to get out a double
(double) 4 / 3 == 1.3333333333333333;  // because (double) 4 tells Java to convert it to a double variable "4.0"
```

Refer to the `Math` class for additional operations that are available.

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
5 / 0;
```

When dividing doubles, division by `0` (or 0.0) will not throw an error, as this is defined by the IEEE to return `Infinity`, a special value.
```java
5 / 0.0;
5 / -0.0;
```

##### Casting
If you want to use floating point numbers, but only have an `int` to start, you can cast it to `double` like so:
```java
int a = 1;
(double) a == 1.0;
a == 1.0;  // this also works, because `int`s are automatically cast to `double` when needed
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
1 + 9 / 3 == 4;
(1 + 9) / 3 == 3;  // 10 / 3
6 * 2 / 6 == 2;
2 / 6 * 6 == 0;  // note that 2 / 6 == 0
5 % 3 * 4 == 8;
```

## Unit 2+5 - Using Objects & Writing Classes
Unit 2 is really using functions, which are associated with objects because Java:tm:

Unit 9, Inheritance, may also be relevant, scroll down for more.

### Method Signatures and Overloading
A signature specifies the name of a function (such as a constructor), the list of (formal) parameters (type + name), and the return type. When calling a function, the actual parameters (arguments) are given. Primitives are passed by value, a copy is made and modifying the parameter within the function will not propagate outwards. However, mutable reference types, such as ArrayList (note that `String`s are immutable), will have changes propagate out of a function.

Functions that return `void` return nothing. Functions that return something else can be used in expressions/variable assignments.

Functions that have an empty parameter list exist, usually because they are not `static`, and thus depend on data from within a class.

Executing a function means that the computer will first run all the code in the function, then continue from right after where it left off.

#### Overloading
Overloading is when one function name has multiple possible signatures (distinguished by **formal parameter type** __only__).

### Classes
~~Those things you have at school.~~ The definitions or (as the CED calls it) "formal implementation, or blueprint, of the attributes and behaviors of an object."

They contain methods, which are functions containing code, that describe various behaviors.

Attributes of the class that are `public` can be used or viewed in any context, such as from a calling functions. `private` parts can only be accessed within the context of the class, nobody else should be able to touch these. By default, attributes are `public` unless designated `private`.

#### Constructors
Classes we want to use should be designated `public`. Similarly, constructors are usually `public` for general usage.

Constructors take in parameters and assign instance variables values. If unset, the instance variables default to values like `0` and `null`. Mutable parameters (reference types) should be __copied__.

```java
// class names work like variables, just that we conventionally use UpperCamelCase and Nouns
public class Coordinate {
	private int x,y;

	public Coordinate(int x) {
		this.x = x;
		// this.y is implicitly 0
	}
	// public Coordinate(int y) CANNOT exist, because its signature is the same as above (takes one `int`)
	public Coordinate(int x, int y) {
		this.x = x;
		this.y = y;
	}
}
```

Constructors do not have a `return` type, nor do they `return` anything. Instead, they are called with the `new` keyword (see later section).

If no constructor is specified, an empty constructor is autogenerated, with instance variables left at default values.
```java
public class Coordinate {
	// bla bla bla
}
```
and
```java
public class Coordinate {
	// bla bla bla
	public Coordinate() {}
}
```
are the same.

#### Instance Variables
We **always** (even if it is stupid and leads to redundant code :P) make instance variables `private`, with `public` getters/setters (also called mutators) instead. This allows a programmer to control how and when these instance variables are used or changed.

`private` portions """encapsulate""" implementation details such as instance variables so the user does not have to worry about them.

College Board calls the relationship between object and instance variables as a "has-a" relationship.

Instance variables are defined in the body of a class, outside of methods/constructors.
```java
public class Coordinate {
	private int x;  // don't forget the private !
	private int y = 10;  // default values can be specified
	// bla bla bla
}
```

#### Methods
Methods can be `public` or `private` depending on what the developer intends.

Methods are just a fancy term for procedure (functions) associated with an object.

Non-`static` methods can use the `this` keyword to specifically refer to instance variables/methods specific to `this` copy of the object.

##### Local Variables
These are variables defined within methods (formal parameters too). They are never `public`/`private`, and can only be used within that method's body.

In the case that the name of a local variable is the same as an instance variable, the local variable gets priority (see the `setY()` example).

##### Accessor Methods
These methods act as a medium between the `public` outside world and viewing the `private` instance variables. They are usually non-`void` because they return data. For primitives, they return by (a copy of) value, but for reference types (other objects, arrays), they return a copy of the __reference__ to the data.

An accessor method for the `Coordinate` class with instance variables as described earlier may be
```java
	public int getX() {
		return x;
	}
```

`String toString()` is a special method in all Objects that will be called when `System.out.print(obj);` is called.

A toString method for the `Coordinate` class with instance variables as described earlier may be
```java
	public String toString() {
		return "(" + x + ", " + y + ")";
	}
```

##### Mutator Methods
These methods allow the `public` world to change the `private` variables. They are usually `void` because they do not return data, but instead take data from the parameter to update the instance variable.

An mutator method for the `Coordinate` class with instance variables as described earlier may be
```java
	public void setY(int y) {
		this.y = y;
	}
```

For primitive parameters, you only get a copy of the value, so the variable `y` could be changed with no consequences outside of this method. For reference types, you get the full reference, so altering the reference variable would affect the outside world.
The College Board says
> It is good programming practice to not modify mutable objects that are passed as parameters unless required in the specification.
so you may wish to copy reference types such as arrays.

##### Static Methods
`static` methods are based on the class, and have no ties to a specific method (so they cannot use instance variables, only `static` variables, which are shared among **all** copies of the class).

We saw `static` methods earlier with the `Math` class.

An example:
```java
public class CocaCola {
	public static boolean addictive = true;
	private static String secretIngredient = "C17H21NO4";

	public static void doCompanySponsoredScientificStudy() {
		addictive = secretIngredient.equals("C17H21NO4");
		if (addictive) {
			secretIngredient = "C6H12O6";
			addictive = false;
		}
	}
}
```

You can then run this code outside of the `CocaCola` class:
```java
CocaCola canInStore = new CocaCola();
CocaCola canAtFactory = new CocaCola();

canInStore.addictive == true;  // oh no!
canAtFactory.doCompanySponsoredScientificStudy();  // CocaCola Co. is on the case!
canInStore.addictive == false;  // oh we're good, Trust Me Bro

CocaCola.secretIngredient;  // errors, Pepsi manufacturers are malding right now
```
Notice that a change based on the `canAtFactory` will automagically affect the `canInStore`. (also for this case, I didn't even need to make instances of `CocaCola`)

#### A Complete Class
```java
public class Coordinate {
	private int x,y;

	public Coordinate(int x) {
		this.x = x;
		// this.y is implicitly 0
	}
	// public Coordinate(int y) CANNOT exist, because its signature is the same as above (takes one `int`)
	public Coordinate(int x, int y) {
		this.x = x;
		this.y = y;
	}

	public int getX() {
		return x;
	}
	public int getY() {
		return this.y;
	}

	public void setX(int newX) {
		x = newX;
	}
	public void setY(int y) {
		this.y = y;
	}

	public String toString() {
		return "(" + x + ", " + y + ")";
	}
}
```

### Objects
Keeping with the "blueprint" analogy, objects are the constructed buildings made _from_ the blueprints. Based on the definitions in the blueprints, you know exactly what features the building has, and you can construct as many copies of that building as you want ([William J. Levitt](https://en.wikipedia.org/wiki/Levittown) wants to know your location).

Classes can be used just like types to declare variables, and so you can define a Calculator variable like so:

#### Calling Constructors
The `new` keyword can be used to call a constructor function.
```java
Coordinate pointA = new Coordinate(5, 6);
Coordinate pointB = new Coordinate(7);

System.out.println(pointA);  // (5, 6)
System.out.println(pointB);  // (7, 0)
```
By default, if you do not initialize a class variable, it will resolve to `null`. Trying to reference data from a `null` class variable will lead to the `NullPointerException` (the [Billion Dollar Mistake](https://en.wikipedia.org/wiki/Null_pointer#History)!).

### Strings
The `String` class is defined in `java.lang`, making it available by default as part of the Java language. The College Board wants me to tell you that Application Programming Interfaces and documentation (to describe the APIs) help you simplify tasks by abstracting away behaviors into functions and whatnot.

`String` literals are in the form `"of having quotes around them\nand maybe escape characters like the newline"`.

You can also call the String constructor using `String("this is another string...")` to make a new instance of the string.
```java
String a = "hello world!";
String b = new String(a);
String c = a;

a != b;
a == c;
// even though all show "hello world!"
System.out.println(a);
System.out.println(b);
System.out.println(c);
```
This new string has its own space in memory, and so, like any reference type where the variable points to a different location, will NOT be equal to the original.

`String`s are immutable, meaning that "changing" a string involves making a `new String`.

#### Escape Sequences
An escape sequence is started with a backslash `\` and ends with another character specifying what data to actually put into the string.

The College Board only cares about three escape sequences:
```java
System.out.println("a quote: \"");
System.out.println("a backslash: \\");
System.out.println("and\n a newline");
```

#### Concatenation
By using `+` (or `+=`) with a `String`, any other values are implicitly converted `toString()`, then added on.

Take note of operator precedence.

```java
System.out.println("there are " + 3 * 4 + " people here, i expected " + -1);
```

#### String Methods
Because a `String` represents an array of characters (letters), it is 0-indexed, with the last character being at `length - 1`. Anything outside of this range, such as `-1`, will result in a `StringIndexOutOfBoundsException`.

All of the `String` methods College Board mentions are non-`static`, they must be called with an instance of a `String`:
- `int length()`: returns the length of a string
- `String substring(int from, int to)`: grabs a slice of the String with indices `[from, to)`. `to` is EXCLUDED, so it is okay for `to == length()` as seen below.
	- `String substring(int from)` equivalent to `str.substring(from, str.length())`.
	- `substring(index,index+1)` is a common idiom to get the letter/character at a certain position.
- `int indexOf(str)`: returns the position that a substring starts at within a bigger string
- `boolean equals(String other)`: checks if two strings are equal in content (usually what you expect)
- `int compareTo(String other)`: returns the difference in either the length of the strings, or the difference between the first two differing characters (see example).

```java
String main = "hello world!";
main.length() == 12;
String sub = main.substring(1,5);
sub.equals("ello");  // notice that 5 - 1 == 4, the length of the substring
// these are different instances of `String`
sub != "ello";
sub != main.substring(1,5);

// making a brand new value for `sub`
main.indexOf("wor") == 6;
sub = main.substring(main.indexOf("wor"));  // want to find `wor`ld
sub.equals("world!");
sub.substring(sub.length() - 1, sub.length()).equals("!");

sub.compareTo("world") == 1;  // sub.length() - "world".length()
sub.compareTo("apple") == 22;  // 'w' in "world!" is 22 letters after 'a' in "apple", lower is earlier in the alphabetical order

sub.substring(-1, 0);  // StringIndexOutOfBoundsException
```

### Wrapper Classes
If you ever wanted to box your primitives into a class for stuff like `ArrayList<T>`, where the `T` __must__ be a reference Type, you can use the `Integer` and `Double` class (other classes exist for other primitives, the AP does not care).

```java
int a = 123;
Integer i = new Integer(a);  // deprecated code, due to autoboxing (where Java takes care of this part for you) but it is on the CED/Java Quick Reference

a == i.intValue();  // returns the primitive integer value
a == i;  // also true, due to automatic unboxing...

// helpful `public static final` constants defined in the Integer class, discussed earlier
Integer.MIN_VALUE
Integer.MAX_VALUE
```

### The `Math` class
The `Math` class only has public static methods for us to access, which implement various helpful math operations. `Math` also comes from `java.lang`, so it is always available by default.

It is illegal to make a [`new Math()`](https://www.youtube.com/watch?v=UIKGV2cTgqA).

- `int abs(int x)` and `double abs(double x)` return the absolute value
- `double pow(double base, double exponent)` returns base^exponent
- `double sqrt(double x)` returns the square root

#### `Math.random()`
`Math.random()` generates random `double` values from `[0, 1)`, 1 excluded.

A common idiom for generating random integers from `[a, b]` is
```java
(int) (Math.random() * (b - a + 1)) + a
```
Notice that we have to add `1` to compensate for the fact that `1` is not within the range of `Math.random()`.

## Unit 3 - Boolean Expressions and `if` Statements
### Boolean Statements
`boolean`s are either `true` or `false`.

Common boolean operators include
- `a == b` and `a != b` to check if two (primitives) are equal or non-equal.
	- For reference types, you may want to use an `equals()` method if available.
	- However, if two reference variables refer to **exactly the same object**, they are equal, or "aliases" in AP terminology.
	- Similarly, if both are `null`, you can use a comparison to check this.
- `<`, `>`, `<=`, and `>=` to compare primitives, mainly numbers. 
	- For reference types, you may want to use a `compareTo()` method if available.
- `! a` (NOT) to negate a statement
- `a && b` (AND) to only be true if both statements are true. Due to short-circuit evaluation, if `a` is false, `b` is *skipped*.
- `a || b` (OR) to only be true if either statement is true. If `a` is true, the statement short-circuits.

```java
int[] A, B;  // integer arrays are reference types
A == null;
B == null;
A == B;

A = new int[]{1, 2};
B = A;
A == B;  // both refer to the same object
// and so changes in one affect both
A[0] = -1;  // A = B = [-1, 2]
B[0] == -1;

// BUT if B were a `new int[]` ... 
B = new int[]{1, 2};
A != B;
```

#### Truth Tables
When you get a question that asks which two boolean statements are equivalent, you can draw out a [truth table](https://runestone.academy/ns/books/published/csawesome/Unit3-If-Statements/topic-3-6-DeMorgan.html?mode=browsing#truth-tables) that considers all possible cases (usually 2^2 = 4) and their results. This is usually very tedious. Below are some simplifying rules.

##### DeMorgan's Laws
You might remember this from the logic unit from Geometry class, this is literally that.

From CSAwesome:
> - `!(a && b)` is equivalent to `!a || !b`
> - `!(a || b)` is equivalent to `!a && !b`

##### Inverses of Operators
From CSAwesome:
> - `!(c == d)` is equivalent to `c != d`
> - `!(c != d)` is equivalent to `c == d`
> - `!(c < d)` is equivalent to `c >= d`
> - `!(c > d)` is equivalent to `c <= d`
> - `!(c <= d)` is equivalent to `c > d`
> - `!(c >= d)` is equivalent to `c < d`

### If Statements
`if` statements will execute their body when the given boolean statement is true, otherwise, they skip to the `else` case if one is available. To account for more than 2 possibilities, you can chain statements using `else if`. The following two functions are equivalent.

```java
public String positiveNegativeZero(int a) {
	if (a > 0) {return "Positive";}
	else {
		if (a < 0) { return "Negative"; }
		else { return "Zero"; }
	}
}
```
```
public String positiveNegativeZero(int a) {
	if (a > 0) return "Positive";
	else if (a < 0) return "Negative";
	else return "Zero";
}
```
Notice that if only one statement is executed in the "body" of a conditional/loop, the `{}` braces are optional.

You can nest `if` statements if you want more complicated logic.

## Unit 4 - Iteration
You can put loops inside of loops.

Topic 4.5, "Informal Code Analysis" requires the use of advanced counting methods to "determine the number of times a code segment will execute."

### `while` loops
A `while` loop runs "while" the boolean expression is `true`. 

To skip one cycle of the loop, the `continue` keyword is used. To end a loop, the `break` keyword is used, or you can `return` to end the function as a whole. (Technically the AP only mentions `return`).

Thus, `while (true)` is an idiom for a forever loop.
```java
// real stuy linux meeting script
while(true) {
	System.out.println("yap yap yap");
}
// HINT: press Ctrl-C, notated ^C to Cancel this command in terminal
```

However, `while (false)`, or any loop that starts with a `false` condition, will be skipped:
```java
while(false) {
	System.out.println("destroying the world!");
}
// ... nothing happened
```

### `for` Loops
For loops generally come with the following form
```java
for (int i = 0; i < length; i++) {
	// stuff
}
```
The first portion is the "initialization", which usually sets up a loop increment variable. (This step can actually be left empty if desired.)

The second portion is the boolean expression, which must be `true` for the statement to evaluate. If you are starting at `0`, `i < length` will run the loop `length` times. If you are starting at `1`, `i <= length` will run the loop `length` times.

The third portion is the increment/decrement statement, which is intended to help us eventually meet the `false` case for the boolean expression.

`for` loops are really just fancy `while` loops.

### AP Algorithms
> There are standard algorithms to:
> - Identify if an integer is or is not evenly divisible by another integer
> - Identify the individual digits in an integer
> - Determine the frequency with which a specific criterion is met
> - Determine a minimum or maximum value
> - Compute a sum, average, or mode

> There are standard algorithms that utilize `String` traversals to:
> - Find if one or more substrings has a particular property
> - Determine the number of substrings that meet specific criteria
> - Create a new string with the characters reversed

## Unit 6 - Array
Arrays are used to make multiple values accessible under one variable. Once created, they have a fixed size, and default to values such as `0`, `0.0`, `false`, and `null`.

To access values, bracket notation is used, with an index within the range `[0, length - 1]`. Anything else will given an `ArrayIndexOutOfBoundsException`.

### Initializing an Array
To initialize an array, the `new` keyword is used:
```java
String[] lines = new String[10];  // array of 10 strings, all `null` to begin
String linens[] = new String[10];  // equivalent
```

It is also possible to give an initializer list to provide values off the bat:
```java
boolean data[] = new boolean[]{ true, false, true };
data[1] == false;  // the "second" element is index 1
data[3];  // ArrayIndexOutOfBoundsException
```

### Iteration through an Array
You can use `for`/`while` loops, a conventional example is:
```java
public void printArray(int[] a) {
	for (int i = 0; i < a.length; i++) {
		System.out.print(a[i] + " ");
	}
	System.out.println();  // add a newline
}
```

There is also the "for-each" or "enhanced" for loop, which is simpler, but you cannot directly edit the values in the array:
```java
public void printArray(int[] a) {
	for (int i: a) {
		System.out.print(i + " ");
	}
	System.out.println();  // add a newline
}
```

### AP Algorithms
> There are standard algorithms that utilize array traversals to:
> - Determine a minimum or maximum value
> - Compute a sum, average, or mode
> - Determine if at least one element has a particular property
> - Determine if all elements have a particular property
> - Access all consecutive pairs of elements
> - Determine the presence or absence of duplicate elements
> - Determine the number of elements meeting specific criteria
> - Shift or rotate elements left or right
> - Reverse the order of the elements

## Unit 7 - ArrayList
`ArrayList<E>` is a class (imported with the line `import java.util.ArrayList;`) that implements helpful methods that allow us to more easily edit "Arrays". The `E` stands for the element's type, so an `ArrayList` of `Integer`s (cannot be `int`, a primitive) would be `ArrayList<Integer>` or an `ArrayList` of `String`s would be `ArrayList<String>`.

`ArrayList<Integer> numbers = new ArrayList<Integer>()` constructs an empty `ArrayList`.

### `ArrayList` methods
- `int size()`: returns the number of elements
- `boolean add(E obj)`: adds an element of type `E` to the end of the array
- `void add(int index, E obj)`: adds an element to position `index` in the array, shifting everything from `[index, size() - 1]` to the new positions `[index+1, size()]`. (`size()` being the old size)
- `E get(int index)`: returns the element at a position, analogous to `arr[index]`
- `E set(int index, E obj)`: sets the given element to be at the position, *returns the old element*, analogous to `arr[index] = obj`.
- `E remove(int index)`: removes/returns the element at spot `index`, shifts everything to the right of it left.

### Traversing ArrayLists
Be careful! Deleting or inserting elements into an ArrayList while you are in a loop may make you skip/repeat certain elements! This is why enhanced `for` loops actually forbid modification of an ArrayList in the loop body, leading to a `ConcurrentModificationException`.

### AP Algorithms
> There are standard `ArrayList` algorithms that utilize traversals to:
> - Insert elements
> - Delete elements
> - Apply the same standard algorithms that are used with 1D arrays

> There are standard algorithms for searching.
> - Sequential/linear search algorithms check each element in order until the desired value is found or all elements in the array or `ArrayList` have been checked.
#### Sorting
The AP exam only requires two basic iterative sorting algorithms, selection sort and insertion sort (bubble sort fans are crying right now). You should also be well versed in kindergarten-level counting, in order to do an informal run-time comparison.

##### Selection Sort
1. Find the smallest value in the unsorted list.
2. Swap it to the start.
3. Rinse and repeat until all elements are in the sorted list.

##### Insertion Sort
1. Save the leftmost value in the unsorted list into a buffer.
2. Check if the element immediately to the left is `<=` to the current value.
3. If it is, or we are at the very front of the array, place the leftmost value there. Otherwise, shift the left value to the right (it is okay to overwrite since we have saved the value from before).

### Ethical Issues Around Data Collection
This is topic 7.7, required course content that is not tested at all. :P

The "essential knowledge" in this section is that
> When using the computer, personal privacy is at risk. Programmers should attempt to safeguard personal privacy.
> Computer use and the creation of programs have an impact on personal security. These impacts can be beneficial and/or harmful.

As stated before, The Official Stuy Linux solution:tm: is just to be FOSS. :3

## Unit 8 - 2D Array
This is the longest unit of all time (a whole 2 topics!).

2D arrays are just arrays of arrays. Although they *can* have varying lengths, the AP has this big, bold **EXCLUSION STATEMENT** stating that
> 2D array objects that are not rectangular are outside the scope of the course and AP Exam.

The specification of a 2D array is somewhat opinionated, and it is up to the programmer to determine what convention they prefer. However, College Board dictates that
> For the purposes of the exam, when accessing the element at `arr[first][second]`, the first index is used for rows, the second index is used for columns.
I like to think of this as a variation on the X-Y plane, where the X-axis points downwards, and the Y-axis points rightwards.

A 2D array works mostly like a 1D array, except that it is 2D. By this I mean that you can store equivalent information in both (an `int[n][m]` and `int[n*m]` hold the same data), just that the indices you use are "2 dimensional" for the former case.

For a 2D array, you must use nested iteration statements (2 for loops?!?!). There are two conventional styles of iterating through a 2D array, row-major order, where you scroll through each row one by one, and column-major order, where you scroll through each column one by one. The AP seems to prefer row-major order.


```java
final int ROWS = 3;
final int COLS = 4;
int[][] grid = new int[ROWS][COLS];  // new int[3][4];

System.out.println("Assigning values in row-major order");
for (int x = 0; x < grid.length; x++) {
	for (int y = 0; y < grid[x].length; y++) {
		grid[x][y] = COLS*x + y;
		System.out.println(grid[x][y] + " at " + x + ", " + y);
	}
}
// same as saying
grid = new int[][]{ { 0, 1, 2, 3 }, { 4, 5, 6, 7 }, { 8, 9, 10, 11 } };  // notice how similar this looks to the indices of arrays

System.out.println("Reading values in col-major order");
for (int y = 0; y < COLS; y++) {  
	for (int x = 0; x < ROWS; x++) {
		System.out.println(grid[x][y] + " at " + x + ", " + y);
	}
}

System.out.println("Printing values in row-major order, using enhanced `for` loops");
for (int[] row: grid) {
	for (int i: row) {
		System.out.print(i + " ");
	}
	System.out.println();
}
```

## Unit 9 - Inheritance
Related classes can share attributes/behaviors in a superclass. The classes based on the superclass are called subclasses, and have an "is-a" relationship with the superclass ("an Apple is-a Fruit"). Notice that interfaces are not in the AP.

All classes are subclasses of `Object` (from `java.lang`). This is why they all have a default `toString()` if you did not write one. The `equals()` method is also inherited from `Object`, but it may be incorrect.

A class can specify that it inherits from a superclass with the `extends SuperClass` keyword. It may only inherit from one and only one superclass.

Constructors are not inherited, instead, the subclass's constructor must call the `super()` constructor at the start of its own constructor.

By default, a subclass will "inherit" any `public` methods from the superclass. The subclass can replace methods from the superclass by overriding the method (defining a method with the **same** signature as a method in the superclass). The subclass can always access the super class's public methods by accessing them in the form `super.method()`.

The subclass usually defines additional methods/instance variables when "extending" the superclass.

Superclass variables can hold instances of subclasses, which is especially useful for arrays and ArrayLists.

### Polymorphism
Polymorphism in Java just means that different methods can be called by the same (non-`static`) method call.

### Example
```java
public class Composition {
	String[] notes;
	int time = 0;

	public Composition(String[] notes) {
		this.notes = notes;
	}
	public void play() {
		while (time < notes.length) {
			playNext();
			System.out.println();
			time++;
		}
	}
	public void playNext() {
		System.out.print(notes[time]);
	}
	public int getTime() {
		return time;
	}
	public void rewind() {
		time = 0;
	}
}
```

```java
public class Song extends Composition {
	String[] lyrics;

	public Song(String[] notes, String[] lyrics) {
		super(notes);
		this.lyrics = lyrics;
	}
	// play() is inherited
	public void playNext() {  // overrides the original
		super.playNext();  // show the note first
		System.out.print(" " + lyrics[this.getTime()]);  // equivalent to super.getTime();
	}
	public String getLyrics() {
		String ret = "";
		for (String line: lyrics)
			ret += line + '\n';
		return ret;
	}
}
```

```
Composition[] tracks = new Composition[2];
tracks[0] = new Composition(new String[]{"A", "B", "C"});
Song song = new Song(new String[]{"B", "A", "G"}, new String[]{"hot", "cross", "buns"});
tracks[1] = song;

tracks[0].play();
tracks[1].play();  // due to polymorphism, playNext() with the lyrics is called
tracks[1].rewind();
song.play();

song.getLyrics();  // works

tracks[1].getsLyrics();  // compile error, getLyrics() is **not** defined in `Composition`s
```

## Unit 10 - Recursion
Ooh! This one is going to be crazy right!? It's gotta have QuickSort and TimSort and JimSort and BFS and DFS and NTFS and all that good stuff, right !?

...

...

It's just binary search and merge sort... and the AP even goes so far as to say this:
> **EXCLUSION STATEMENT**: Writing recursive program code is outside the scope of the course and AP Exam.

The "essential knowledge" about recursion goes as follows:
- Recursive methods call themselves (in at least one spot), and should have at least one base case (where the recursion stops).
	- This is helpful because each call gets its own local variables and formal parameters, instead of having to manually allocate more space.
	- The parameters track the progress of the recursion, and progress towards the base case, just like the index of a loop tracks the progress towards its terminating case. (The AP also wants to emphasize that "Any recursive solution can be replicated through the use of an iterative approach." and proceeds to drive this point home by forcing you to use recursion for `String`/array/`ArrayList` traversal).

### Binary Search
If you have a **sorted** array/`ArrayList`, you can use binary search to find the location of an element (more efficiently than a straight linear search).

You start in the middle, then eliminate the left or right half (depending on whether your target is `>` or `<` your middle pivot), and proceed to the new "middle". This repeats until you either find the right value (`==`) or until you're out of choices, and so this element is not in the array.

This is an O(log n) algorithm, as opposed to O(n) linear search, but the AP does not care. It also doesn't actually care about recursion and insists, once again, that "The binary search algorithm can be written either iteratively or recursively."

### Merge Sort
This is all the AP has to say about Merge Sort:
> Merge sort is a recursive sorting algorithm that can be used to sort elements in an array or `ArrayList`.
And that is the end of the curriculum!

In Merge Sort, you recursively split an array into smaller and smaller pieces, until you get arrays of size `1`, which are definitely sorted. Then, you merge together the sorted sub-arrays by building a new array that takes the smallest element at the "front" of the two arrays, until you run out of elements in one array, and can just copy the rest from the second.

If that made no sense to you, feel free to observe the examples at [CSAwesome](https://runestone.academy/ns/books/published/csawesome/Unit10-Recursion/topic-10-2-recursive-search-sort.html?mode=browsing#merge-sort),

And that is the actual end of what I have to say about the curriculum!

# Instructional Approaches
The little activity recommendations here aren't too bad, though the tooling is Pretty Interesting...

They recommend Java 7, with a minimum of Java 6, and explicitly exclude everything from Java 8+. This is entirely valid given that the core language hasn't changed much over the years (this *is* Java after all), but it is definitely interesting how AP Java requires a version released [almost a year before I was even born](https://www.jcp.org/en/jsr/detail?id=270).

As for IDEs, they have some fairly normal recommendations like IntelliJ, NetBeans, and repl.it (RIP), but also wonderful tools like [Dr Java](https://en.wikipedia.org/wiki/DrJava) (the link they gave is incorrect), which only supports Java 8, and [GreenFoot](https://greenfoot.org/door), which is apparently not a GNOME project, but a Scratch-like Java environment.

# The Exam
Part I, worth 50% of the exam, is 40 MCQ in 90 minutes.

Part II, worth 50% total, is 4 FRQ, also in 90 minutes.
1. A generic FRQ on making objects, calling methods, and general code *stuff*.
2. A Class based FRQ on writing your own class, and writing more code *stuff* to fit their little word problem.
3. An Array/`ArrayList` problem.
4. A 2D Array problem.

This is all fine and dandy given what you get in the curriculum, but what may be more interesting is the penalty point system (and the many exceptions).

There are some fair penalties for
- confusing brackets/`.get()`
- extraneous prints/incorrect precondition checks (you don't need them!)
- forgetting to declare *any* variables
- destroying data that shouldn't be (namely from reference-type parameters)
- returning a value in `void`/constructor methods

And some rather generous non-penalties
- unambiguous spelling/case mistakes
- missing `public` for a class/constructor (totally okay for real code, since Java actually defaults to `public`)
- confusing `=` and `==` (this is a common mistake that you'll see me grumble about solely because I like using `=` in my conditions, but I suppose fair enough since it isn't taught about)
- confusing `length`/`size`
- putting `private`/`public` on a private variable
- missing an unambiguous `;`, `{}`, and `()` in `if`/`while`.
- confusing `[]`, `()`, and `<>`
- putting `int[size] nums = new int[size];`
There are similar exceptions in the scoring criteria ("Responses still earn the point even if they...") for missing the final step (e.g. `return`ing the value).


But there are also some interesting non-penalties:
- forgetting to declare a variable, but remembering to declare other variables somewhere else (apparently you only need to remember one time???)
- using normal math symbols instead of their code equivalents (the thought of writing a division sign in code shivers my timbers)
- using `[i,j]` instead of `[i][j]`, which to me seems like treating 2D array access like a weird `.get()` function instead of understanding that the 2D array is just an array of arrays, which may be a bigger issue than *just* mixing up `[]`/`.get()`...
- missing `()` for methods/constructors without parameters, which just seems like the student doesn't understand function calling.

There was also a specific case where the guidelines had to specify for the grader that it is okay to return `true`/`false` without an `if` statement, which makes me mildly question how skillful the AP graders may be...

In the end, these are all here to help (or hurt) the student in the ways the College Board sees fit, and what you should take away from this section are common ways the student/scorer may screw up, and how you may be able to avoid such issues.

If you've actually read this far, you must be very dedicated! Great going and good luck on your exam! :)
