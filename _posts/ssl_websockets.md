# Setting up a site with WebSocket services on NGINX with SSL

This guide is based on my experiences from deploying  [among.stuylinux.org](https://among.stuylinux.org)  (GitHub: [stuylinux/webong\_us](https://github.com/stuylinux/webong_us)).

## Installing the HTTP site
Write a `server` directive in a file on `sites-available` with the `server_name` set to your intended domain name. For now, we will only listen to port 80, with unsecured HTTP.

under `location /`, add a `proxy_pass` to the http address (with port) to your local web service.
```
server {
  server_name among.stuylinux.org;

  listen 80;

  location / {
          proxy_pass http://127.0.0.1:5000;
  }

}
```

To enable this site config, head to `/etc/nginx/sites-enabled` and `ln -s ../sites-available/SITE` to LiNk it Symbolically (without making a hard file link/copy).

Don't forget to reboot NGINX! (`sudo systemctl restart nginx` on SystemD servers)

## Installing SSL via Certbot
Install [Certbot](https://certbot.eff.org/). Follow the prompts on their site to enable HTTPS.

For us, we needed to run `sudo certbot --nginx`, and followed the prompts to have our NGINX config get SSL.

Reboot NGINX. If SSL/HTTPS does not seem to be working when you visit your domain, try adding the below lines into the `server` configuration if they aren't already there.
```
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
```

## Adding the websockets service
Configure your website to request websockets at a **non-root path** if you wish to use the same domain. For instance, we request `wss://among.stuylinux.org/ws`, allowing us to only route `/ws` to the WebSockets server, while only using one subdomain.

To route `/ws`, use `location /ws` in your site config.

```
  location /ws {
    proxy_pass http://127.0.0.1:47777;
  }
```

If you want to use a different domain instead, simply make a new `server` block with `location /` being passed.

That's all! Unless...

## Proxying through CloudFlare
In your Cloudflare dashboard, create the A record pointing to your server, and flip the "Proxy status" switch to "Proxied"! Cloudflare supports WebSockets just like it does HTTPS, but only through the [allowed ports](https://developers.cloudflare.com/fundamentals/get-started/reference/network-ports/)!

You may want to go to your SSL/TLS settings and switch to "Full" to allow for HTTPS security between your server and Cloudflare!


### Date Published: 2022_12_25 (YYYY_MM_DD)

### Written by: David Chen [@TheEgghead27](https://github.com/TheEgghead27)
