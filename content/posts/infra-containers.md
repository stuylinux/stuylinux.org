---
title: "Stuy Linux Infrastructure: Orange you glad we got a Pi?"
date: 2024-09-03
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
description: Let's talk about at the web of software that runs our SSH network!
---

One of the staples of our meetings is the Orange Pi single-board computer, 
which hosts the virtual containers that provide fully-featured Linux 
environments to our members.

Since we just reworked the way the system works, I suppose now is a Pretty Good
Time to document how it all works!

## Containing our constrained resources
Instead of provisioning full-sized virtual machines, which — for a room of 
10-ish members — would fill up our RAM and use all 8 cores, we use Linux 
containers, a feature in the kernel that allows for sharing memory/hardware 
with isolated environments running different userspace programs. This way, we 
don't have the overhead of N Linux kernels and simulating N full sets of 
hardware (processor, memory, display, keyboard, etc.), and can run more 
containers on a smaller SBC!

For our operations, we use ~~LXD~~ 
[Incus](https://linuxcontainers.org/incus/)[^1], a management interface for 
Linux containers. Incus's [image 
repositories](https://images.linuxcontainers.org/) come with pre-built images 
that can instantly install most Linux distros (even Funtoo! and Void!). 
Containers are also the technology underpinning software like Docker (or 
Lenny's preferred alternative, Podman), since they also use isolated Linux 
environments, usually with different "operating system" userspace software, for 
many services.

[^1]: [1] Incus is a fork of LXD, the original manager for LXC (Linux 
Containers), which Canonical (of Ubuntu fame) took over. As with many things in 
the FOSS world, this motivated people enough to go (make a) fork themselves.

Since each container gets its own network interface and local `10.0.0.0/8` IP 
address, we install and run an SSH server on each container to allow for access 
to these containers from whatever terminal a member chooses.

The trick now is just to have a way to connect all these individual SSH 
servers, which are all on a network internal to the Pi, to _The Outernet_[^2]...

[^2]: [2] normal people call this something like "the Internet", or a "wide 
access network"

### Why so ~~serious~~ complicated?
We can use an SSH server on the host Linux system of the Pi to provide shell 
access, but this process is Kinda Clunky because members have to run _two_ 
separate `ssh` commands, one to connect to the Pi, then another one to get to 
your container.

To spice it up even further, at our meetings we usually cannot give a direct 
LAN connection to the Pi, so we need a proxy to _The Outernet_. We achieve this 
using an Outernet-connected VPS, which the Pi automagically proxies itself to 
using an SSH tunnel spawned by an automatic system service[^3].

[^3]: [3] Originally, this was a [SystemD service](/posts/services-systemd/) 
for when the Pi was running the manufacturer's Arch-based distro, but we now 
use Void Linux's `runit` instead, expect a blogpost soon:tm:...

In the end, a typical member still has to run 2 SSH commands to get to their 
shell: one command to go to the VPS that proxies to the Pi, and another for 
their container specifically. We can do better...

## SSH Proxies
It is easy to do HTTP (web) proxies because of the standard 
[`Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host) 
header, which, in plaintext[^4], specifies exactly which site the user is 
trying to browse.  [NGINX](/posts/ssl_websockets/) matches the `Host` with a 
`server_name` to distinguish the traffic for different HTTP sites, even though 
they all go to the same IP address.

[^4]: [4] or encrypted with TLS/SSL, but that is usually handled by NGINX, not 
the HTTP service being proxied.

Although SSH does not have a direct analog to the `Host` header, something we 
can use instead is the "username" (login name) to distinguish different 
"destinations" on one IP address. If we had an "SSH server" that could serve as 
a "man in the middle" that converts encrypted messages from the client and the 
container's SSH server, it would be able to both interpret the login name and 
provide one-command access to a container!

### Warpgate[^5]
[^5]: [5] This is in fact not a controversy involving the use of warps...
[Warpgate](https://github.com/warp-tech/warpgate) is the first option we tried. 
It tries to be a secure proxy server ("bastion") that provides external 
authentication (whether that be regular passwords or something fancier, like 
OpenID single-sign on and RFC 6238 timed one-time passwords).

It is written in Rust, and has a beautiful web UI for managing connections and 
viewing session logs. However, they handle multiple "users" that can connect to 
the same "server" using `:` colons in the login name, which has a tendency to 
confuse some programs like `scp` and `rsync`, and this complexity makes their 
interface inconvenient to use when setting up a large mass of containers. We 
used Warpgate for our GWC TechTalk in June, but these downsides were too big to 
ignore. We need to try something else...

# sshpiper
[`sshpiper`](https://github.com/tg123/sshpiper) has a lovely logo: an adorable 
yellow pufferfish reminiscent of OpenBSD/OpenSSH with a metal pipe in its 
mouth. This simple design extends itself to the software too; even though it is 
written in Go, `sshpiper` remains performant and feature-rich with various 
authentication and routing plugins.

Because our containers are all configured similarly, with only slight 
modifications for usernames, `sshpiper`'s [YAML configuration 
plugin](https://github.com/tg123/sshpiper/tree/master/plugin/yaml)[^6] makes it 
easy for us to programatically generate routing information for our containers, 
and the results are stunningly readable to boot!

```yaml
version: "1.0"
pipes:
- from:
    - username: "example"
  to:
    host: 10.222.222.222:22
    username: "root"
    ignore_hostkey: true

```

With a configuration like this, it is possible to have `ssh 
example@ssh.stuylinux.org` directly take you to the container at 
`10.222.222.222`, and it becomes even easier to make sure every member gets 
this same convenience!

[^6]: [6] I used to be a YAML skeptic, since it was just "yet another markup 
language", but it has grown on me after seeing it used to make elegant 
configurations for so many things, from GitHub Actions to Docker Compose. Keep 
an eye out for a YAML fanboy blogpost...
