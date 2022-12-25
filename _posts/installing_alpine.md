# Installing Alpine Linux

This tutorial will be showing how to install [Alpine Linux](https://www.alpinelinux.org/) in a virtual machine (specifically, in a QEMU+KVM virtual machine through virt-manager) but these steps should be the same or similar on bare metal or other platforms.

1. Create the VM.

![Prompt to create a new virtual machine](/img/posts/installing_alpine/1.png)

2. Select the alpine linux installation ISO. The ISO we need is the standard edition for our CPU architechture, and it can be downloaded [here](https://www.alpinelinux.org/downloads/).  Also, specify the virtual machine type as generic linux.

![Prompt to select your installation ISO](/img/posts/installing_alpine/2.png)

3. Select the resources that you would like to allocate.

Alpine Linux is EXTREMELY light, and since this tutorial is installing Alpine without a desktop environment, 512mb of ram would be enough. Alpine achieves this by being extremely light on system services and using OpenRC as its init system instead of SystemD.
 
![Terminal output](/img/posts/installing_alpine/3.png)

And Alpine only installs the bare minimum amount of programs, so allocating 10 gigabytes for the machine's disk is more than enough. 
![Terminal output](/img/posts/installing_alpine/4.png)

4. Give your VM a name. 

Also, see the network adapter chosen. The default interface, NAT, works best. 

![Terminal output](/img/posts/installing_alpine/5.png)

5. After creating your VM, boot it up.

Notice how the VM will boot into the installation ISO, as Alpine isn't installed to our disk yet. 

![Terminal output](/img/posts/installing_alpine/6.png)

Login in with the user *root*. 

The user shouldn't need a password. 

![Terminal output](/img/posts/installing_alpine/7.png)

Welcome to the root user shell!

6. Run the *setup-alpine* command to launch the installer. 

Select your keyboard layout and variant. For a virtual machine, "us" and "us" works best, and for those installing on bare metal in the USA, "us" and "us" is fine as well. 

![Terminal output](/img/posts/installing_alpine/8.png)

Enter a system hostname and select the network interface that you would like to initialize. For the VM, the virtual ethernet interface "eth0" is what we need to select (and it's the default and only interface available anyways). For bare metal users, the interface may be called something else. 

![Terminal output](/img/posts/installing_alpine/9.png)

Next, select dhcp to automatically handle IP address configuration, and select "n" to any further advance network configuration. Our network interface will be initialized automatically. 

![Terminal output](/img/posts/installing_alpine/10.png)

Set a root password.
 
![Terminal output](/img/posts/installing_alpine/11.png)

Select your time zone. For people using the Eastern time zone (east coast of the USA), *America/New_York* is what we should enter. For others, browse the time zones and select the most accurate region. 

![Terminal output](/img/posts/installing_alpine/12.png)

Now let's choose which Alpine linux mirror we will be using. You could choose the mirror manually, but at the bottom of the mirror list, we can choose to run a test on the mirrors and add the fastest mirror. So, press *f* .

A ping test will be ran on every mirror, and the fastest is chosen. For me, this was mirrors.edge.kernel.org, but this will probably be different for you. 

![Terminal output](/img/posts/installing_alpine/13.png)

![Terminal output](/img/posts/installing_alpine/14.png)

Now let's add a user by typing in a lowercase login name. Name the user whatever you would like, but a a general convention is to keep it short and sweet. 

Give this user a password as well.

Select openssh as the ssh server.

![Terminal output](/img/posts/installing_alpine/15.png)

Now is the "scariest" part. Configuring and partitioning disks.

To simply select an entire disk to wipe and install Alpine too, type that disks name and press enter.

In a VM, that will USUALLY be "vda", but on bare metal it could be sda or sdb or nvme0n1 or anything else.

This disk will be wiped and all data will be lost, so make sure you select the correct disk and proceed with caution.

Select "sys" to install the operating system onto this disk, in a simple way without disk encryption. See "crypt" to install Alpine with encryption.

![Terminal output](/img/posts/installing_alpine/16.png)

Press "y" to proceed with wiping this disk and installing Alpine.

Installing...

![Terminal output](/img/posts/installing_alpine/17.png)

When the installation is finished, the setup-alpine command will terminate and you will be back at your root shell. But we are still booted from the installation medium. So, we need to 

Run the *reboot* command, and unplug the installation medium drive if you are on bare metal. For VM users, you don't have to do anything, as virt-manager will never mount this installation ISO again. 

![Terminal output](/img/posts/installing_alpine/18.png)

7. ## WELCOME TO ALPINE

When prompted, log in with the user that we created earlier.
This should launch the user's shell. Alpine is now installed, and now that you're logged in, this tutorial is done!

You can do whatever you'd like. Install and setup any programs as you wish, or keep following around with this tutorial for some quick tips and tweaks. 


In the following photo, I'm enabling an additional apk repository to add support for more software. 

I achieve this by using vi to edit my */etc/apk/repositories* config file. Uncomment (remove the #) for any line that ends with /alpine/vXX.X/community.

```bash
doas vi /etc/apk/repositories
```

![Terminal output](/img/posts/installing_alpine/19.png)

Then, update the package cache and upgrade the system's packages with apk upgrade.

```bash
doas apk upgrade
```

Install packages that you would like with *apk add*.

Example:

```bash
doas apk add neofetch
```

![Terminal output](/img/posts/installing_alpine/20.png)

![Terminal output](/img/posts/installing_alpine/21.png)

By default, Alpine uses ash instead of bash for the shell. Bash has slightly more features and is the linux standard, so you may want to enable it. 

To set bash as the default shell for the root and current user, simply edit the /etc/passwd file. Find the lines that correspond to the root user and the current user, and edit the final part (the part that has /bin/ash) to /bin/bash 

![Terminal output](/img/posts/installing_alpine/22.png)

Then, reboot your system and notice that the shell you are placed into is now bash!

![Terminal output](/img/posts/installing_alpine/23.png)

### Date Published: 2022_12_23 (YYYY_MM_DD)

### Written by: Lenny Metlitsky [@leomet07](https://github.com/leomet07)
