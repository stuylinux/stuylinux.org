# Running Minecraft quickly and easily using a free and open source client (Prism Launcher_

Sure, the official Minecraft launcher supports GNU/Linux, but to be honest, if I didn't give you [the link](https://www.minecraft.net/en-us/download), you'd spend a good minute looking for the download page on the website...

Let's use something more convenient, that also supports your favorite mods!


## What is Prism Launcher?
[Prism Launcher](https://prismlauncher.org/) is a free and open source Minecraft launcher, with built in multi-account, multi-instance, and modding support!
It uses QT for its UI, so if you're a KDE user, you'll feel just at home! If you use something else, never fear! QT works on practically all desktop platforms, and it's quite lightweight!

### Downloading Java
Minecraft runs on Java, so we'll need to install it first!

For the longest time, Minecraft has used Java 8, but with 1.17, it has updated to Java 17.
Thus, you will need to install the Open Java Development Kit (OpenJDK) Java Runtime Environment (JRE_ to run these versions of Java.
Thankfully, OpenJDK is packaged in most Linux distros, as the OpenJDK is *the* standard Java implementation, and open source under the GPL.

On Ubuntu and friends (Mint, Pop!_OS, etc. etc.), you can simply invoke:
```shell
$ sudo apt install openjdk-17-jre openjdk-8-jre
```
Feel free to omit one or the other if you intend to only play old versions of Minecraft, or only play the latest,

For instructions on other distros, check out [PrismLauncher's official guide](https://prismlauncher.org/wiki/getting-started/installing-java/#java-on-linux).

## Downloading Prism Launcher
Head to their [downloads page](https://prismlauncher.org/download/linux/), where they have detailed instructions on installing Prism Launcher on most distros!

For simplicity, we'll use the AppImage, which requires very minimal setup!

### Downloading Prism Launcher - the command line way!
Copy the AppImage URL off of the downloads page.

Then, run `wget [URL]. For example:
```shell
$ wget https://github.com/PrismLauncher/PrismLauncher/releases/download/6.3/PrismLauncher-Linux-6.3-x86_64.AppImage
--2023-04-13 22:59:32--  https://github.com/PrismLauncher/PrismLauncher/releases/download/6.3/PrismLauncher-Linux-6.3-x86_64.AppImage
Resolving github.com (github.com)... 140.82.114.4
Connecting to github.com (github.com)|140.82.114.4|:443... connected.
HTTP request sent, awaiting response... 302 Found
...
Saving to: ‘PrismLauncher-Linux-6.3-x86_64.AppImage’

PrismLauncher-Linux-6.3-x86_64.AppImage                  100%[=================================================================================================================================>] 123.83M  31.8MB/s    in 4.0s

2023-04-13 22:59:37 (31.3 MB/s) - ‘PrismLauncher-Linux-6.3-x86_64.AppImage’ saved [129840320/129840320]
```

Now, we have the file, and we can` chmod +x [PrismLauncher AppImage]` to make it eXecutable, and run it right there!
```shell
$ chmod +x PrismLauncher-Linux-6.3-x86_64.AppImage
$ ./PrismLauncher-Linux-6.3-x86_64.AppImage
```

## Using Prism Launcher
If you've installed it in a different way than we discussed here, just run the `prismlauncher` program, either via command line or in your application list!


### Logging into Minecraft
PrismLauncher isn't a piracy tool! You still need to own Minecraft to use it!

### Installing a Vanilla Version

### Installing Performance Mods
#### Optifine

#### Chem Lab
> *honestly at this point fabric jar with lithium and phosphor*
\- pcao#2918


### Date Published: 2023_04_1X (YYYY_MM_DD)

### Written by: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
### Written by: {gus} [@thegu5](https://github.com/thegu5)

