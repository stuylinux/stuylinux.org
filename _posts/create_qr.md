# Creating QR Codes with `qrencode`

I was working on promotional materials for our presence at the Spring Clubs Pubs Fair (this Thursday and Friday, March 16 and 17!), and needed to generate a few QR codes.
Needless to say, I turned to FOSS command-line tools!

## Installing `qrencode`
Technically, I *lied* to all of you!! The project is actually `libqrencode`.

- On Debian/Ubuntu (dpkg) based systems, you can use `apt install qrencode`.
- On Arch/Artix (pacman) based systems, you can use `pacman -S qrencode`.
- On Alpine (apk) based systems, you can use `apk add libqrencode`.
- On Void (xbps) based systems, you can use `xbps-install qrencode`.

The library has minimal dependencies, with only libpng for writing PNG, and SDL for test suites, and both are optional.

Thus, on most Unix-based systems, like GNU/Linux, you should easily be able to compile `libqrencode` yourself from the [project homepage](https://fukuchi.org/works/qrencode/), you mainly need autoconf and make tooling, along with [basic compiling tools](install_gcc).

The homepage also mentions a Windows port, and a MacOS homebrew package.

## Using `qrencode`
Using `qrencode` is super simple, barely an inconvenience!

```shell
qrencode -o [FILE] [text]
```

For example, to generate a QR code reading `https://stuylinux.org`, `-o`utputted to `qr.png`, I would run 
```shell
qrencode -o qr.png https://stuylinux.org
``` 

If you type `qrencode` with no arguments, it will print a helpful summary of the optioins available. Play around with them!

## Reading the outputted QR code
Most smartphones nowadays come with QR code scanners embedded in their Camera apps (usually, it is suboptimal to use a third-party app, as they usually are proprietary and contain privacy-invading advertisements).

A helpful cross-platform tool to scan QR codes with is [zbar](https://zbar.sourceforge.net/), which is usually installed with the [package named `zbar`](https://repology.org/project/zbar/versions).

To scan the QR code from the terminal, run
```shell
zbarimg [image]
```
or
```shell
zbarimg --quiet --raw [image]
```
to obtain the unedited output, with no extraneous warnings.

That's all for this blog entry, see you around (maybe at the Fair)!

### Date Published: 2023_03_11 (YYYY_MM_DD)

### Written by: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
