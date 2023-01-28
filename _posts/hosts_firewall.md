# Using the `hosts` file as an adblocker

Hey all! This guide will walk you through installing the hosts file on Linux systems, and automating updates to it using cron!

## The hosts file

On most operating system, there is a system `hosts` file that serves to turn domain-name requests into IPs based on a local file table. This table lookup is usually done before checking online with a Domain Name Server (DNS), so it can be used against online domains and for local names like `localhost`.

On Linux, this file is traditionally in `/etc/hosts` (see the man page for `hosts` for more information).

If you open up this file in your favorite text editor, you'll typically find something with definitions for localhost, like this (Void Linux):

```
#<ip-address>           <hostname.domain.org>   <hostname>
127.0.0.1               localhost.localdomain   localhost
::1                     localhost.localdomain   localhost ip6-localhost
```

Using this file, you can already override DNS to block nasty ad domains like googleadservices.com, but why go through all that work of manually editing when you can...

## Download an aggregated hosts file

The [StevenBlack hosts repository](https://github.com/StevenBlack/hosts) is one of the best host file indices out there, with ads/trackers being included in all file sets, and other extensions being available for things like reducing exposure to social media!

You can simply use the "raw hosts" links to download the latest hosts file set, and copy it to `/etc/hosts`!
That will provide you with plenty of protection from ads, along with anything else you might choose!

However, here at Stuy Linux, we like to take things a little further, by ...

## Automating hosts file updates

Why spend 1 minute doing something manually when you can spend 100 automating it?

The first thing you'll need to do is [install and enable an implementation of cron on your system](cron), and then you can `sudo crontab -e` (You can run from `doas` if you're based, or run straight from a root shell if you're feeling frisky), to edit the `root` user crontab, which will have full access to edit the hosts file.

You can now set up a cron job ([crontab guru](https://crontab.guru/#0_0_1_*_*)) can help you determine what time settings to use, for example monthly, with a command like the following (replace the URL with the edition you want to use):

```
curl -L https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts > /tmp/hosts.new && sed '/^# Custom host records/r/etc/hosts.custom' /tmp/hosts.new > /etc/hosts && rm /tmp/hosts.new
```

Note that we use `sed` to write the final hosts file, and this is to allow you to manually put in entries in `/etc/hosts.custom`, and have those persist when the hosts file is updated.

That's all! Enjoy your system-wide ad-blocked internet! (If you'd like to go even further beyond, try installing [uBlock Origin](https://ublockorigin.com/) on your browser of choice!

### Date Published: 2023_01_17 (YYYY_MM_DD)

### Written by: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
