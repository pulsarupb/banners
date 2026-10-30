# DRIFT banners

A3 landscape banner for [driftlab.ro](https://driftlab.ro).

- `banner.html`: editable source
- `assets/`: logos, fonts and images
- `drift-banner-a3.pdf`: exported PDF
- `drift-banner-preview.png`: preview

## Export

Edit `banner.html`, then run:

```sh
npm install
npm run export
```

Requires Node.js and Chrome. Set `CHROME_PATH` if Chrome is not at `/usr/bin/google-chrome`.

Print at A3 landscape, 100% scale, with no margins.
