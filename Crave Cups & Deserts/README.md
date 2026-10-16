# Crave Cups — Website Demo

A premium, responsive, five-page static website for a Sydney dessert-cup brand. Built with plain HTML, CSS and vanilla JavaScript.

## Pages
- `index.html` — Home
- `menu.html` — Filterable sample dessert menu
- `events.html` — Events, catering and enquiry form
- `gallery.html` — Responsive gallery and accessible lightbox
- `contact.html` — Contact details and enquiry form

## Project structure
```text
crave-cups/
├── index.html
├── menu.html
├── events.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── main.js
├── assets/
│   └── images/
└── README.md
```

## Preview locally
Open `index.html` in a modern browser. For best results, use VS Code with the Live Server extension. The page styles, scripts and navigation use relative paths and are compatible with static hosting.

## Owner configuration before launch
Open `js/config.js` and replace:
- `whatsappNumber` with the owner's international phone number using digits only (no `+`, spaces or dashes).
- `email` with the confirmed business email.
- `instagramUrl` with the correct public Instagram URL.
- `address`, `serviceArea`, and `openingHours` with confirmed details.
- Set `demoMode` to `false` only when owner-approved content has replaced all placeholders and the site is ready to publish.

Replace sample dessert names, images and prices with the actual approved menu. Replace inspiration gallery photos with images the owner has permission to use. Do not publish invented testimonials or unverified business claims.

## Ordering and forms
This is a frontend-only demonstration:
- Dessert buttons and enquiry forms create a pre-filled WhatsApp message.
- A valid owner WhatsApp number must be set in `js/config.js` for the WhatsApp link to open.
- Forms validate required fields in the browser. No data is stored in a database or emailed automatically.
- Customers must review and send the prepared message in WhatsApp. This does not confirm a booking or order.

If the owner needs enquiries to be saved, emailed automatically, or processed through online checkout, connect a trusted form provider or add a backend with appropriate privacy and security controls.

## Static hosting
Upload the entire folder to GitHub and enable GitHub Pages for the repository's selected branch/root, or deploy the folder to another static host. Keep all files and folders together so relative paths work.

## Quality checks
- Open all five pages and test navigation links.
- Test the mobile navigation at narrow widths.
- Test menu category filters.
- Test event and contact forms with valid and invalid values.
- Configure a test WhatsApp number to check message formatting, then restore the placeholder until the owner provides the real number.
- Test the gallery lightbox using mouse, keyboard Escape, and close button.
- Check that images load and that there is no horizontal overflow at mobile widths.
- Test with reduced-motion preferences enabled.
