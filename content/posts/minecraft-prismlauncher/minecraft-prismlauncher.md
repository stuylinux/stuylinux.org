---
title: Installing and Modding Minecraft with Prism Launcher
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27), Gus [@thegu5](https://github.com/thegu5)
date: 2023-04-22
---

Sure, the official Minecraft launcher supports GNU/Linux, but to be honest, if I didn't give you [the link](https://www.minecraft.net/en-us/download), you'd spend a good minute looking for the download page on the website...

Let's use something more convenient and free and open source, while also making it easy to install your favorite mods!

## What is Prism Launcher? {#downloading-java}

[Prism Launcher](https://prismlauncher.org/) is a free and open source Minecraft launcher, with built in multi-account, multi-instance, and modding support!
It uses QT for its UI, so if you're a KDE user, you'll feel just at home! If you use something else, never fear! QT works on practically all desktop platforms, and it's quite lightweight!

### Downloading Java

Minecraft runs on Java, so we'll need to install it first!

For the longest time, Minecraft has used Java 8, but with 1.17, it has updated to Java 17.
Thus, you will need to install the Open Java Development Kit (OpenJDK) Java Runtime Environment (JRE\_ to run these versions of Java.
Thankfully, OpenJDK is packaged in most Linux distros, as the OpenJDK is _the_ standard Java implementation, and open source under the GPL.

On Ubuntu and friends (Mint, Pop!\_OS, etc. etc.), you can simply invoke:

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

Then, run `wget [URL]`. For example:

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
When you first launch PrismLauncher, you'll be asked to set up your language and Java version.
The OpenJDK installations we installed [earlier](#user-content-downloading-java) should appear. If not, hit "Refresh".
Select the Java 17 versions if you wish to play modern Minecraft, or Java 8 if you're going for a nostalgia trip. More memory allocated is better, but the default settings are usually good enough.
![The PrismLauncher prompt for picking a Java installation](/img/posts/minecraft-prismlauncher/java.png)

### Logging into Minecraft

PrismLauncher isn't a piracy tool! You still need to own Minecraft to use it!

Click the accounts button in the top-right corner and head to "Manage Accounts":

![Menu that appears when "Accounts" - denoted with a gray Steve face icon, is clicked. There is No Default Account, and an option to Manage Accounts.](/img/posts/minecraft-prismlauncher/acc.png)

![The Account Settings menu. It reads "Welcome! If you're new here, you can click the "Add" button to add your Mojang or Minecraft account.](/img/posts/minecraft-prismlauncher/account-settings.png)

Use the sign in options on the right-hand side of the menu to sign in with your Minecraft (Microsoft) account. Although an option for Mojang accounts is provided, they have been phased out - so if you still have one, follow [this guide from Microsoft](https://help.minecraft.net/hc/en-us/articles/4403181904525).

If you're using a Microsoft account, note that "Sign in with GitHub" might not work due to redirecting you to the wrong place.

Once you're done, you should be able to see your Minecraft account in the top-right corner.

### Installing a Vanilla Version

To install an instance of Minecraft, go to the "Add Instance" button in the top-left corner of Prism Launcher.

It will then open a menu where you can choose your version of Minecraft.

![Add Instance - Vanilla](/img/posts/minecraft-prismlauncher/vanilla.png)

Scroll down to pick the version you want, and hit OK.
You do not need to select a mod loader just yet, but if you know what you're doing, you can enable one here.

You can select it and hit the play button, and then it will download the Minecraft date from Mojang, and launch it!

### Installing Performance Mods

#### OptiFine

OptiFine is a bit of a pain to install, and there are much more convenient (and FLOSS) options nowadays. See [below](#user-content-chem-lab).

Head to the [OptiFine download page](https://optifine.net/downloads) (hint: click "Show all versions" for older versions of Minecraft).
Click "(Mirror)" (the download button leads to an ad link), and download the jar.

Run the jar:

```shell
$ java -jar Optifine_blablabla.jar
```

Run the "Extract" command - note that you'll need to have the official Minecraft launcher install and run that version of Minecraft first, which is quite inconvenient.

Then, you will get an `Optifine_blablabla_MOD.jar` in the same folder as your original jar.

Right-click your Minecraft instance, and hit "Edit".

![A Minecraft instance is right clicked.](/img/posts/minecraft-prismlauncher/rc.png)

In the "Version" tab, hit "Add to Minecraft.jar". Select your `Optifine_blablabla_MOD.jar`.

![The Version tab. "Add to Minecraft.jar" is highlighted.](/img/posts/minecraft-prismlauncher/add.png)

You are done, and can now launch with OptiFine.

#### Chem Lab {#chem-lab}

> _honestly at this point fabric jar with lithium and phosphor_ > \- pcao#2918

A modern way to optimize Minecraft is to use the Fabric mod loader with tools like Sodium, Lithium, and Phosphor, along with Iris Shaders to provide compatibility with OptiFine shaders.
In fact, these are some of the top mods on [modrinth](https://modrinth.com/mods).

Prism Launcher makes our lives easy by giving us an easy way to install Fabric and mods off of modrinth.

First, right-click and edit the instance settings.

Head to Version, and click "Install Fabric". (While you're here, remove or uncheck OptiFine).

![Fabric has been installed in the Version menu. "Install Fabric" is still highlighted.](/img/posts/minecraft-prismlauncher/fabric.png)

Alternatively, you can also hit "Add Instance", and select "Fabric" for the Mod Loader.
![Creating a new instance with Fabric selected](/img/posts/minecraft-prismlauncher/newinstance.png)

Now, head to Mods. Click on "Download Mods".

![We have moved to the Mods menu. "Download Mods" is highlighted.](/img/posts/minecraft-prismlauncher/mods.png)

Click on the mods you want (in this case, we are grabbing Sodium, Lithium, and Iris Shaders), and click "Select mod for download" on each one's page.
The mod's name in the list will be bolded and underlined to show that it is selected.

![The Sodium mod page is open. "Select mod for download" is on the bottom-left corner. Lithium and Iris Shaders are underlined.](/img/posts/minecraft-prismlauncher/select.png)

We can use the search bar on top to search for a mod, in this case, Phosphor, and we can select it like the others.

![The Phosphor mod page is open. "Select mod for download" is on the bottom-left corner.](/img/posts/minecraft-prismlauncher/phosphor.png)

To download the mods, click "Review and confirm". The review page will let you uncheck mods you no longer want.

![The Review window is open. Iris Shaders, Lithium, Phosphor, and Sodium are checked.](/img/posts/minecraft-prismlauncher/review.png)

Prism Launcher will then download the mods, and handle installing them for you!

You can now launch the game, and enjoy your boosted performance!

Have fun!
