# HYROX Coach as a Home Screen app

This folder turns the app into a real iPhone Home Screen app: no Safari bars, full screen, its own storage so you stay signed in, and ready for notifications. Your Google Sheet stays the server. Nothing here costs money.

## 1. Update the Sheet app first (once)

In the Apps Script editor paste the latest **PASTE-into-Code.gs.txt** over `Code.gs` and **PASTE-into-Index.html.txt** over `Index`, then **Deploy → Manage deployments → New version**. The deployment must have access set to **Anyone**. Copy the `/exec` link; you'll paste it into the app.

## 2. Put these files online (free)

GitHub Pages is the simplest: free, no card, nothing to install.

1. Create a free account at github.com if you don't have one.
2. Create a new repository called `hyrox-coach` and tick **Public**.
3. On the repository page choose **Add file → Upload files** and upload everything in this folder: `index.html`, `manifest.webmanifest`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`. Commit.
4. Open **Settings → Pages**, under Build and deployment choose **Deploy from a branch**, branch **main**, folder **/ (root)**, Save.
5. After a minute your app is at `https://YOURNAME.github.io/hyrox-coach/`.

Any other static host works the same way (Cloudflare Pages, Netlify). Only the address changes.

## 3. Add it to your iPhone

1. Open the address in **Safari** (not Chrome).
2. The app asks for your Sheet link. Paste the `/exec` link and tap **Connect**. It checks the link and remembers it.
3. Tap the Share button, then **Add to Home Screen**, then **Add**.
4. Open it from the Home Screen. It runs full screen with no browser bars, keeps you signed in, and starts offline (your data syncs when you're back online).

Share the same address with your crew. Each person connects it to the same Sheet link and signs in with their own name and PIN.

## Updating later

Upload a new `index.html` to the repository. The app picks it up on the next open. If a change doesn't appear, close the app from the app switcher and open it again.

## Notifications

The service worker is ready for push. iOS allows push for Home Screen web apps, but sending a push needs a small sender service with its own keys. That is a second step; ask when you want it and it can run free on Cloudflare Workers.
