---
title: System Services with Systemd
date: 2023-11-24
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---
One of the core features of any Linux distribution's init system is the ability to automatically start services, which can be daemons for system functions ([cron](/posts/cron) for automatic script running, D-Bus for inter-process communication, desktop greeters like GDM and SDDM to launch your GUI/login screen, etc.), but also servers for things like databases, [websites](/posts/ssl_websockets), and SSH connections (SSHD). Usually, a software package will come with a system service pre-made and ready to activate, but you can also write your own services for custom scripts!

We now use this functionality for our own meetings to automatically get the Orange Pi connected to ssh.stuylinux.org!

## systemd/system
To get a sense of the extent of what systemd services are running on your system, just run `systemctl`.
You'll see userspace services like `mysql.service` and `sshd.service` for the servers we know and love, but also tons of important system functions, like `hwclock.service`, `dev-*.mount` for tons of the special virtual devices in `/dev/`, `systemd-udevd.service` to make `/dev` work as it does, `systemd-journald.service` for logs, `systemd-networkd.service` for networking, and many many others (some would argue too many...).

There are also `.target` files like `getty.target` for login prompts on TTY, `cryptsetup.target` for encrypted disks, `local-fs.target` to make sure your local filesystems are mounted, and most importantly `multi-user.target`, which specifies the userspace services that should be run when the system is booted up.

To see how these services are defined, look in subfolders of `/usr/lib/systemd/` (pre-installed services) and `/etc/systemd/` (customized services and more). By convention, the `/etc/systemd/system/` directory is where we will be writing our service.

## Making our own service
Before we can do anything, we need to have some code that can serve as our service. Copy this busy loop into a file (something like `busy.sh`) and run `chmod +x busy.sh` to mark it executable.

```sh
#!/bin/sh
while [ true ]
do
        echo hi
        sleep 1
done
```

To test that this works, try running `./busy.sh`.

To turn this into a systemd service file, write a `.service` file into `/etc/systemd/system/` using your favorite text editor.

For this case, we'll just write a `/etc/systemd/system/busy.service` file.
```
[Unit]
Description=Sample busy loop.

[Service]
ExecStart=/bin/sh /root/busy.sh  # replace this with your file location
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=multi-user.target
```

If you'd like your service to automatically restart when it crashes, you can use the `Restart=on-failure` directive to tell systemd to do so. It is recommended to set a `RestartSec` interval so systemd doesn't repeatedly spam your system with a buggy process.

In order for systemd to automatically start your service when the rest of the system is ready, you need to set the WantedBy block as shown below.
```
[Install]
WantedBy=multi-user.target
```

One interesting directive you make like to have, in case your service depends on something else (like networking), is the `After` directive.
For the Official Stuy Linux SSH.StuyLinux.Org Starting Service:tm:, we use `After=sshd.service` to make sure the SSH server is ready for forwarding.

### Activating the service
To have systemd rescan all of the service files, run
```
systemctl daemon-reload
```
and now you can run
```
systemctl enable busy.service
```
to start the service!

Run `systemctl status busy` to check on how your service is running.

To temporarily stop the service, run
```
systemctl stop busy
```
or to disable it... run
```
systemctl disable busy
```

To restart the service, you can run
```
systemctl restart busy
```
or if you want to start but *not reset* the service, you can instead just run
```
systemctl start busy
```

And now you're a real systemd system admin!


## Oh, just one more thing...

You might have noticed that you've seen this type of syntax before, and you're not wrong! [Systemd syntax is inspired by `.ini` files on... Windows](https://www.freedesktop.org/software/systemd/man/latest/systemd.syntax.html).
