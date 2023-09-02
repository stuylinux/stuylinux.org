---
title: MAC address spoofing
date: 2023-09-01
author: Lenny Metlitsky [@leomet07](https://github.com/leomet07)
---

While on vacation, I've needed to periodically change, or spoof, my laptop's MAC address, which is an identifying value for a computer's network card. Ask me why :)

Here are the two methods I've used for MAC address spoofing:

For my [Artix linux](https://artixlinux.org) install, I used the following method, which works for systems without NetworkManager (so, generally, anything that isn't GNOME or KDE).

For systems that use NetworkManager, including any systems using GNOME and KDE, should proceed to the second method, which I used for my Fedora+GNOME install.

## For systems not using NetworkManager

1. First install `macchanger`, it's a simple package that is available through the package manager of most distros.

```bash
apt install macchanger

dnf install macchanger

pacman -S macchanger
```

2. Next run `ip addr`, which is a preinstalled utility that retrieves network device information. Note the name of the network interface that you are using (there is generally only one or two). It will probably eth0, wlan0, or something along those lines.

Here is an example from my machine, redacted for privacy:

```bash
leo@artix ~$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: wlp0s20f3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether XX:XX:XX:XX:XX:XX brd ff:ff:ff:ff:ff:ff permaddr WW:WW:WW:WW:WW:WW
    inet 123.123.123.123/18 brd 123.123.321.123 scope global dynamic noprefixroute wlp0s20f3
       valid_lft XXXXXsec preferred_lft XXXXXXsec
    inet6 1234::1234:1234:1234:1234/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

3. Next, run the following command to view the current MAC address. (which is probably the network card's permanent address)

```bash
macchanger --show <YOUR_NETWORK_CARD_NAME>
```

Here is some sample output:

```
leo@artix ~$  macchanger --show wlp0s20f3
Current MAC:   11:11:11:11:11:11 (unknown)
Permanent MAC: 11:11:11:11:11:11 (unknown)
```

4. Now, disconnect from any network connection (wifi or ethernet),

Make sure to turn off wifi as well.

5. We can now finally change to a new random MAC address.

Run the following:

```bash
sudo macchanger --random YOUR_NETWORK_CARD
```

It will output the previous current MAC address, the new current MAC address, and your network card's permanent MAC address.

6. (Re)Connect to a network.

Enable networking again and/or turn WiFi back on.

7. You're now using a different MAC address!

## For systems using NetworkManager

At first, I thought this would be a pain to do with NetworkManager, as it manages most aspects of networking itself, overriding the changes of simple tools like `macchanger`.

However, NetworkManager DOES support MAC address spoofing now (even with multiple types!), and it's even simpler to use than the previous method.

See [this Arch wiki post](https://wiki.archlinux.org/title/NetworkManager#Configuring_MAC_address_randomization) for more in-depth information about NetworkManager and MAC address randomization, but here are some simple steps that I used to turn on MAC address randomization.

1. Create a new config file in `/etc/NetworkManager/conf.d/`.

I recommend calling it `/etc/NetworkManager/conf.d/wifi_rand_mac.conf`

2. Open it as root with any text editor.

I'm using nano, with `sudo nano /etc/NetworkManager/conf.d/wifi_rand_mac.conf`

3. Specify the necessary config

I'm going to set every wifi connection, both new ones and previously known ones, to use a new random MAC address every time.

Add the following lines:

```
[connection-mac-randomization]
wifi.cloned-mac-address=random
```

For the same to occur with ethernet connections, add this line:
`ethernet.cloned-mac-address=random`

And, if you want every new connection to have a random MAC address BUT while having it be associated with that connection for the future, replace `random` with `stable`

4. Restart NetworkManager (or just reboot)

```bash
sudo systemctl restart NetworkManager
```

5. Enjoy, your system is now using a random MAC address for every connection!

To view and verify the new random MAC addresses, you can use `macchanger` as detailed in steps 1-3 of the first method.
