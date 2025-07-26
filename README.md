# KRYPTIP - The Crypto Tip Jar

**A simple, customizable Lightning tip widget for content creators.**  
Let your fans support you with Bitcoin, directly on your website — no backend needed.

## ✨ Features

- 💸 Accept Bitcoin tips over the Lightning Network
- ⚙️ Easily configurable with your Lightning Address or Bolt12 offer
- 🎨 Customizable button text and color to match your brand
- 📦 Lightweight embeddable widget (<20kB)
- 🚀 Zero server setup required — deploy and go!

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server for the configurator site
npm run dev

# Build both the widget and site
npm run build

# Build widget only
npm run build:widget

# Build site only
npm run build:site
```

## 💻 Usage

1. Visit the configurator site at [kryptip.xyz](https://kryptip.xyz)

2. Enter your Lightning Address or Bolt12 code

3. Choose your button text and color

4. Copy and paste the generated embed code into your site:

```html
<link rel="stylesheet" href="https://kryptip.xyz/embed.css" />
<div
  id="tipjar"
  data-lnaddress="your@example.com"
  data-bolt12="lno10000000000000000"
  data-button="Donate Bitcoin"
  data-color="#38C5FE"
  data-fontcolor="#FFFFFF"
></div>
<script async src="https://kryptip.xyz/embed.js"></script>
```

Supports any site or CMS that allows you to paste HTML.

## 📁 Project Structure

```bash
src/
├── widget/    # Code for the embeddable Lightning tip widget
├── config/    # Frontend site for generating embed codes
├── common/    # Shared components and utilities
dist/          # Production build output
```

## 🧠 How It Works

The configurator site helps users build their own widget by pasting a Lightning Address or Bolt12 offer. When embedded on a website, the widget fetches a payment request dynamically and displays a branded button that donors can click to tip in Bitcoin.

## 📬 Contact & Contributions

Pull requests and suggestions welcome.
Feel free to open issues or submit feature ideas.
Follow the Lightning revolution.

##

Made with ❤️ and ⚡ by Qulink
