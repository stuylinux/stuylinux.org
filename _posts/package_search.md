# Searching for Packages
After your first taste of the conveniences of a package manager (probably by 
installing a browser more easily than _some_ people can), you might hit a 
roadblock when you want something specific, like a certain code library or 
program.

Typing in the exact name to the package manager might work, but in the case it 
doesn't, due to the package name being in a different format, you might feel 
lost or frustrated.

However, the package manager has you covered there too, since it can tell you 
what packages it knows about, and let you search for what you need.
Most Linux distributions also offer a search website, which we will also link, 
but the command line is still the fastest way to go, without breaking your flow.

## Search Commands in different distros
This varies from distro to distro depending on what package manager you use, 
and here are the commands for some common distros/package managers:

### apt - Debian, Ubuntu, Mint, Pop!, Kali
For distros using `apt` and the `dpkg` (.deb) package format, you can use one 
of the following commands:
```sh
apt search <package>
# for more options, try apt-cache
apt-cache search --names-only  # shorter, simpler listings
apt-cache search --full  # long listings with dependencies
```
- Debian offers package search via 
[https://packages.debian.org/index](https://packages.debian.org/index).
- Ubuntu's search is at 
[https://packages.ubuntu.com/](https://packages.ubuntu.com/).
- Mint offers search at 
[http://packages.linuxmint.com/](http://packages.linuxmint.com/). As of the 
time of writing, this subdomain is NOT secured with HTTPS. Use at your own 
risk. Package names should be similar, if not identical to Ubuntu or Debian.
- Pop! unfortunately does not have a web interface yet, but there is [this open 
issue about it](https://github.com/pop-os/website/issues/19).
- Kali has search at [https://pkg.kali.org/](https://pkg.kali.org/).

### dnf - Fedora, RHEL (emphasis on the L), CentOS, Rocky
For distros using `dnf` and the `rpm` package format, you can use one of the 
following commands:
```sh
dnf search <package>  # has extremely helpful search detail headers!
yum search <package>  # this is the same thing, just used if you're on an 
ancient distro without dnf
```
Fedora offers web search for package repositories 
[https://packages.fedoraproject.org/](https://packages.fedoraproject.org/).

### zypper - SUSE
For distros using `zypper` and the `rpm` package format, as is typical of the 
SUSE family:
```sh
zypper search <package>
zypper se <package>  # this is a shorter alias
```

The SUSE web search is at 
[https://software.opensuse.org/search](https://software.opensuse.org/search), 
and it includes support for some APT and DNF-based distros, like Debian, 
Ubuntu, and Fedora, based on their [Open Build 
Service](https://openbuildservice.org/) (OBS) that supports all of them!

### pacman - Arch (btw), Endeavour, Manjaro
For distros using `pacman`:
```sh
pacman -Ss <package>
# not to be confused with -Qs, which only Queries local packages
```
Your AUR helper may provide its own options in addition.

Arch's official repositories can be browsed at 
[https://archlinux.org/packages/](https://archlinux.org/packages/), and the AUR 
can be seen at 
[https://aur.archlinux.org/packages](https://aur.archlinux.org/packages).

In addition, the [Arch Wiki](https://wiki.archlinux.org/title/Pacman/Rosetta) 
has a splendid "Rosetta" table that lets you translate common tasks into 
various distro-isms!

### xbps - Void
Disclaimer: I use Void btw. 
```sh
xbps-query -Rs <package>  # to search for a package in the Repositories, 
without -R, you're only searching through installed packages
```

For web searches, try 
[https://voidlinux.org/packages/](https://voidlinux.org/packages/).

### Others
For web-based package searching across distros, try 
[Repology](https://repology.org/projects/) - which also makes those cool 
package listing displays that people embed in README. Another option is 
[pkgs.org](https://pkgs.org/).

That's it! Have fun installing whatever you need!

### Date Published: 2023_06_25 (YYYY_MM_DD)

### Written by: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
