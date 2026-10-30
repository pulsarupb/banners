# DRIFT — A3 banner

- **PDF:** `drift-banner-a3.pdf` — one A3 landscape page (420 × 297 mm).
- **HTML:** `banner.html` — editable source, with local fonts and images in `assets/`.
- **Preview:** `drift-banner-preview.png`.

Open the HTML in a browser to view it. To regenerate both exports:

```sh
npm install
npm run export
```

The exporter uses `/usr/bin/google-chrome`. Set `CHROME_PATH` to use another Chromium installation. It waits for fonts and images and checks for text overflow before exporting.

For manual printing, select A3 landscape, no margins, 100% scale, background graphics enabled, and headers/footers disabled. The PDF is a trim-size RGB document with no added bleed or crop marks.

## Brand sources

- DRIFT logo, vehicle illustrations, Science Gothic / IBM Plex Sans fonts, and colors: `/home/lazar/pulsar/drift-lab-website/public` and `src/styles/global.css`.
- CAMPUS badge: isolated C/building emblem from the website's `campus-logo.png`, rendered monochrome on a white circular field.
- FIMM badge: official emblem from `https://mecanica.upb.ro/wp-content/uploads/2026/01/sitWeb-templates.png`, rendered monochrome on a white circular field. Original artwork is retained in `assets/sources/`.
- QR destination: `https://driftlab.ro`.

The layout uses the website's English-language branding and charcoal / electric-lime palette, with Robotics, Autonomy, and Research as its three focus areas.
