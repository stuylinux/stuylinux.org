# Welcome to the Stuy Linux Blog

This is the first post for the Stuy Linux Blog (or posts page??).

We don't know. But this is going to be our page for making write-ups, tutorials, updates, and general posts.

This page that you're viewing is actually just rendered markdown files (.md).

They're in the Stuy Linux site's [github repository](https://github.com/stuylinux/site), under the _\_posts/_ directory. Since each post is just a text file, you can see the changes, progress, and history with git.

## The tech stack used to build this blog

It builds off the existing NEXTjs site (React that is server side rendered), and adds a new dynamic route under /posts/.

During build time, all the posts in the local _\_posts/_ directory are scanned and statically generated. After build time, even requests to the dynamic /posts/ route are still as fast as the rest of the static site.

The only limitations of this approach is that every new page or change must be committed to the git repository and the site must be rebuilt/ redeployed. That is fine, as every page is committed and pushed to the repository anyway.

The Markdown is rendered via a a simple library, remark and remark-html.

When I (lenny) created this blog, I tried to use minimal extra libraries and keep the solution as simple and "de-bloated" as possible.

### Date Published: 10/9/22

### Written by: Lenny Metlitsky [@leomet07](https://github.com/leomet07)
