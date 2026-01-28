# CSSC Webring

A webring for friends and collaborators. A webring links personal websites in a circular way, letting visitors discover new people by navigating through the ring.

## Current Members

| Name | Year | Website |
|------|------|---------|
| Jordan Moreno | 2026 | [jordanmoreno.me](https://jordanmoreno.me/) |
| Rian Corcino | 2026 | [rian.corcino.net](https://rian.corcino.net/) |

## How to Join

1. **Add the widget to your site** (see below)
2. **Fork this repository**
3. **Add your info** to the `siteData` array in `data.js`
4. **Submit a pull request**

### Widget Code

Add this to your site's footer:

```html
<div class="webring">
  <a href="https://YOUR-WEBRING-URL/#YOUR-SITE?nav=prev">&larr;</a>
  <a href="https://YOUR-WEBRING-URL/">webring</a>
  <a href="https://YOUR-WEBRING-URL/#YOUR-SITE?nav=next">&rarr;</a>
</div>
```

Replace:
- `YOUR-WEBRING-URL` with the actual webring domain (once deployed)
- `YOUR-SITE` with your site's URL (without `https://`)

**Example for jordanmoreno.me:**
```html
<a href="https://webring.example.com/#jordanmoreno.me?nav=prev">&larr;</a>
<a href="https://webring.example.com/">webring</a>
<a href="https://webring.example.com/#jordanmoreno.me?nav=next">&rarr;</a>
```

## How Navigation Works

The webring uses URL hash fragments for navigation:
- `#your-site.com?nav=next` → redirects to the next site in the ring
- `#your-site.com?nav=prev` → redirects to the previous site in the ring

The ring is circular, so navigating past the last site brings you back to the first.

## Deploying

This is a static site. Deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

## Files

- `index.html` - Main page
- `styles.css` - Minimalist dark theme styling
- `data.js` - Member data (edit this to add members)
- `webring.js` - Navigation logic (prev/next)
- `script.js` - Homepage rendering
