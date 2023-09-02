---
title: Stopping Imposter Websites
date: 2023-04-11
author: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
---

Someone was suspicious of some strange websites they found among their search results for a website I help run, and when we investigated it, we found some imposters ඞ!

We won't be naming any actual domains here, so as to not give them any undue attention (or search engine ranking boosts, since we suspect they were trying to nab our SEO - search engine optimization - boost).

## Tracking the imposters down

First, to analyse one of the imposters we caught, I ran a `curl -v -k https://imposter.com`.

The `-v` stands for verbose (can be repeated as `vv` or `vvv` to get even more verbose), which gives me extra information about the web request, specifically their IP address (cue the "I have your IP address" memes):
The `-k` is short for `--insecure` (dunno they thought of that), and lets us bypass any warnings about an invalid HTTPS certificate (since they were even using our cert, even though it doesn't authorize their domain!).

```shell
$ curl -v -k https://imposter.com
*   Trying 64.190.63.111:443...
* Connected to imposter.com (64.190.63.111) port 443 (#0)
...
```

When I looked at the imposter site, I realized _it was going to the same IP address as our actual website_!

This meant that they set up DNS records (usually an `A` record for IPv4, or `AAAA` for IPv6), pointing their domain to our servers, so they could "run" a website while piggybacking off of _our_ resources!

A good friend of mine once showed me [a tool](https://dnslytics.com/reverse-ip) to check for DNS records leading to the same IP, so I turned to it and found that there are _so many_ sites, all coming from GoDaddy (a notoriously trashy domain registrar, so trashy they have a [whole Wikipedia page for controversies](https://en.wikipedia.org/wiki/List_of_controversies_involving_GoDaddy)!)...

## Putting a stop to this

To go into a little detail, I was using a nginx server on Debian to host this website.

Nginx does this interesting thing when processing requests, where (in the absence of an explicit default) it will default to the first service it can find for a port when it receives a request, regardless of the requested domain name.
This is why nginx displayed our main website on all those different domains.

However, there is a way to [reject unwanted HTTP (port 80) requests](https://nginx.org/en/docs/http/request_processing.html#how_to_prevent_undefined_server_names), using the nginx custom code `444`, and using the `default_server` parameter (`listen 80 default_server;`) will set a server as the default for that port.

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        location / {
                return 444;
        }
}
```

This solves our issue for port 80, but not 443, the HTTPS port.

### Stopping HTTPS ports

Intuitively, you'd think adding `listen 443 default_server;` would Just Work™, but this isn't the case!

`nginx -t` will give you an error about missing SSL certificates:

```
[TODO]
```

Instead, we need to [kill the SSL connection before nginx even thinks about serving a certificate](https://superuser.com/a/1626794).
This uses the (relatively new) `ssl_reject_handshake on;` directive, introduced in nginx 1.19.4. Since I was using Debian `bullseye`, which [only has nginx 1.18.0](https://packages.debian.org/search?keywords=nginx), I also needed to [update Debian to Bookworm](updating_debian).

After updating nginx, all I had to do was add a new server block with handshake rejects on! (reminds me of my social life... 🥲)

```
server {
        listen 443;
        listen [::]:443;
        ssl_reject_handshake on;
}
```

And now, trying to access the imposter's sites gives nothing but errors!

```shell
$ curl http://imposter.com/
curl: (52) Empty reply from server
$ curl -k https://imposter.com/
curl: (35) OpenSSL/1.1.1t: error:14094458:SSL routines:ssl3_read_bytes:tlsv1 unrecognized name
```

And thus, we have ejected the imposters from the web, and won this round!
