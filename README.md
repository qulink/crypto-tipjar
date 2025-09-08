# KRYPTIP - The Crypto Tip Jar

**A simple, customizable Lightning tip widget for content creators.**  
Let your fans support you with Bitcoin, directly on your website — no signup or backend needed.

## ✨ Features

- 💸 Accept Bitcoin tips over the Lightning Network
- ⚙️ Easily configurable with your Lightning Address or Bolt12 offer
- 🎨 Customizable button text and color to match your brand
- 🖼️ Custom button images - Upload your own PNG, JPG, GIF, or WEBP images
- 📦 Lightweight embeddable widget (<20kB)
- 🚀 Zero server setup required — deploy and go!
- 🛡️ Automatic fallback to text button if custom images fail to load

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

3. Customize your button:
   - **Text Button**: Choose your button text and colors
   - **Custom Image**: Upload your own button image (PNG, JPG, GIF, WEBP - max 500KB)

4. Choose your code format (HTML, React TSX, or React JSX)

5. Copy and paste the generated code into your site:

**HTML Example:**

```html
<link rel="stylesheet" href="https://kryptip.xyz/embed.css" />
<div
  id="tipjar"
  data-lnaddress="your@example.com"
  data-bolt12="lno10000000000000000"
  data-button="Donate Bitcoin"
  data-color="#38C5FE"
  data-fontcolor="#FFFFFF"
  data-customimage="https://your-image-url.com/button.png"
></div>
<script async src="https://kryptip.xyz/embed.js"></script>
```

**React JSX Example:**

```jsx
import { useEffect, useRef } from 'react'

export function KryptipTipjar({
  lnAddress = 'your@example.com',
  bolt12Offer = 'lno10000000000000000',
  buttonText = 'Donate Bitcoin',
  buttonColor = '#38C5FE',
  fontColor = '#FFFFFF',
  customImageUrl = 'https://your-image-url.com/button.png',
}) {
  const ref = useRef(null)

  useEffect(() => {
    // Load CSS and JS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://kryptip.xyz/embed.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://kryptip.xyz/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      id="tipjar"
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        padding: '16px 0',
      }}
      data-lnaddress={lnAddress}
      data-bolt12={bolt12Offer}
      data-button={buttonText}
      data-color={buttonColor}
      data-fontcolor={fontColor}
      data-customimage={customImageUrl}
    />
  )
}
```

**React TSX Example (TypeScript):**

```tsx
import { useEffect, useRef } from 'react'

interface KryptipTipjarProps {
  lnAddress?: string
  bolt12Offer?: string
  buttonText?: string
  buttonColor?: string
  fontColor?: string
  customImageUrl?: string
}

export function KryptipTipjar({
  lnAddress = 'your@example.com',
  bolt12Offer = 'lno10000000000000000',
  buttonText = 'Donate Bitcoin',
  buttonColor = '#38C5FE',
  fontColor = '#FFFFFF',
  customImageUrl = 'https://your-image-url.com/button.png',
}: KryptipTipjarProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load CSS and JS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://kryptip.xyz/embed.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://kryptip.xyz/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      id="tipjar"
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        padding: '16px 0',
      }}
      data-lnaddress={lnAddress}
      data-bolt12={bolt12Offer}
      data-button={buttonText}
      data-color={buttonColor}
      data-fontcolor={fontColor}
      data-customimage={customImageUrl}
    />
  )
}
```

Supports React as well as any site or CMS that allows you to paste HTML.

## 📁 Project Structure

```bash
src/
├── widget/    # Code for the embeddable Lightning tip widget
├── config/    # Frontend site for generating embed codes
├── common/    # Shared components and utilities
dist/          # Production build output
```

## 🧠 How It Works

The configurator site helps users build their own widget by entering a Lightning Address or Bolt12 offer. Users can customize their tip button with text styling or upload custom images, which are stored securely using Supabase Storage. When embedded on a website, the widget fetches payment requests dynamically and displays the customized button that donors can click to tip in Bitcoin.

### Custom Image Features

- **Secure Storage**: Images uploaded via Supabase Storage with proper access controls
- **Format Support**: PNG, JPG, GIF, and WEBP formats accepted
- **Size Limit**: Maximum 500KB per image for optimal performance
- **Smart Fallback**: Automatically falls back to text button if custom image fails to load

## 📬 Contact & Contributions

Pull requests and suggestions welcome.
Feel free to open issues or submit feature ideas.
Follow the Lightning revolution.

##

Made with ❤️ and ⚡ by Qulink
