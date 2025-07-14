# ⚡ Crypto Tip Jar

An embeddable Lightning tip widget for content creators.

## Development

```bash
# Install dependencies
npm install

# Start development server (configurator site)
npm run dev

# Build everything
npm run build

# Build only widget
npm run build:widget

# Build only site
npm run build:site
```

## Usage

Generate your embed code at the configurator site, then embed like this:

```html
<link rel="stylesheet" href="https://tipjar.vercel.app/embed.css">
<div id="tipjar" 
     data-lnaddress="your@getalby.com" 
     data-color="#f97316" 
     data-button="Tip Me"></div>
<script async src="https://tipjar.vercel.app/embed.js"></script>
```

## Project Structure

- `src/widget/` - Embeddable widget code
- `src/config/` - Configurator site
- `src/common/` - Shared utilities
- `dist/` - Build output