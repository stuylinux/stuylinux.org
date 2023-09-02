---
title: Copying to the clipboard from the terminal
date: 2022-12-17
author: Lenny Metlitsky [@leomet07](https://github.com/leomet07)
---

## The clipboard that we all use

To copy any output from any command, simply pipe the command output into xclip.

Example:

```bash
echo "stuy linux is cool" | xclip -selection c
```

Note: For most users, it is recommended to use the -selection c flag, as this copies to the clip board (X11 selection area) that most desktop environments allow you to access via CONTROL+C and CONTROL+V. This clipboard is called "XA_CLIPBOARD"

## A different clipboard

It is also possible to copy any output to the "PRIMARY" X11 selection area (which, ironically, is NOT what is used when users use CONTROL+C and CONTROL+V on most distros). Simply use xclip without specyfing the given X11 selection area.

```bash
echo "stuy linux is cool" | xclip
```

To paste from this X11 selection area, use the middle mouse click (on mice) or triple finger click (on trackpads).

## Pasting IMAGES from the terminal

```bash
xclip -selection c -t image/png input_file.png
```

Note: That command is for PNG files. For other files, change the image/TYPE to be whatever the file type is (ex: image/jpg).
