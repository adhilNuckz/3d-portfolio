# Deploy to nighttime.online (Apache + Ubuntu)

## 1. Export the static build

Next.js is configured for static export (`output: "export"` in `next.config.ts`).

```bash
npm run build
cp public/cv.pdf out/cv.pdf
```

Output is in the `out/` directory.

---

## 2. Upload to the server

```bash
ssh root@<YOUR_SERVER_IP> "mkdir -p /var/www/html/nighttime.online"
scp -r out/* root@<YOUR_SERVER_IP>:/var/www/html/nighttime.online/
ssh root@<YOUR_SERVER_IP> "chown -R www-data:www-data /var/www/html/nighttime.online"
```

---

## 3. Apache virtual host

Your current config at `/etc/apache2/sites-enabled/nighttime.online.conf` is already correct.  
Optionally add compression and caching rules inside the `<Directory>` block:

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

Enable modules if not already:

```bash
a2enmod deflate expires
systemctl restart apache2
```

---

## 4. Verify

```bash
curl -I https://nighttime.online
```
