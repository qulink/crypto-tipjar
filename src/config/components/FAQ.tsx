import { useState } from 'react'
import { StarryBackground } from './StarryBackground'
import { KryptipTipjar } from './KryptipTipjar'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What do I need to receive tips?',
      answer:
        'You need a Bitcoin wallet that supports the Lightning Network. You can either use a custodial wallet that gives you a Lightning Address (like Wallet of Satoshi or Misty Breez), or a wallet that gives you a Bolt12 offer (like the non-custodial wallet by Phoenix). You can enter either or both when creating your widget.',
    },
    {
      question: 'What is a Lightning Address?',
      answer:
        'A Lightning Address looks like an email (e.g., you@walletofsatoshi.com) and allows you to receive Bitcoin over the Lightning Network. It’s easy to use and works with most custodial wallets.',
    },
    {
      question: 'What is a Bolt12 offer?',
      answer:
        'A Bolt12 offer is a reusable string (starting with lno1...) that lets people send you Bitcoin tips over the Lightning Network. It’s supported by wallets like Phoenix and doesn’t require a server or third-party service.',
    },
    {
      question: 'What’s the difference between a Lightning Address and a Bolt12 offer?',
      answer:
        'A Lightning Address is easier for humans to read and is powered by a server on the internet, making it ideal for custodial wallets. Bolt12 offers are more technical but privacy-friendly and don’t require a server, which makes them ideal for non-custodial wallets. Both can be used to receive Lightning payments.',
    },
    {
      question: 'What’s the difference between a custodial and non-custodial wallet?',
      answer:
        'A custodial wallet is managed by a third party who holds your funds and keys for you—easy to use but with less control. A non-custodial wallet gives you full control of your keys and funds, offering more privacy and sovereignty but requiring more responsibility. Both can support Lightning payments.',
    },
    {
      question: 'Can I customize the widget appearance?',
      answer:
        'Yes! You can change the button text and colors to match your website’s look and feel. You’ll see a live preview as you customize it. You can also upload your own image — like a logo, emoji, or sticker — to use as the button instead of text. Supported formats are PNG, JPG, GIF, and WEBP, with a file size limit of 500KB. Please only upload appropriate images and make sure you have the rights to use them — avoid copyrighted or restricted content. Even if you upload a custom image, we recommend setting a button text and color as a fallback in case the image fails to render on your site.',
    },
    {
      question: 'Which code snippet should I use — HTML, React TSX, or React JSX?',
      answer:
        'We provide three types of embed snippets to match your tech stack.\n\n' +
        'If you’re embedding the widget into a static site or any regular HTML file (like Wordpress, Notion, or a personal blog), use the HTML snippet. You can paste it directly into your HTML code.\n\n' +
        'If your project is built with React JavaScript (files ending in .js or .jsx and not using TypeScript), use the React JSX snippet.\n\n' +
        'If your project uses TypeScript (files ending in .ts or .tsx), use the React TSX snippet.\n\n' +
        'The React snippet can be used as a standalone component. You can paste the code into a new file (e.g., KryptipTipjar.jsx or KryptipTipjar.tsx), then import and render it as <KryptipTipjar /> anywhere in your app.',
    },
    {
      question: 'Are there any fees?',
      answer:
        'The Kryptip widget is free to use. However, your wallet provider might charge small network or routing fees when receiving payments. These are typically very low on the Lightning Network.',
    },
    {
      question: 'How fast do I receive tips?',
      answer:
        'Lightning payments are near-instant. Once someone sends you a tip, the funds will arrive in your wallet in seconds.',
    },
    {
      question: 'Can I use this on multiple websites?',
      answer:
        'Yes, you can embed the same Kryptip widget on as many websites as you want. All tips will go to the wallet address or offer you configured.',
    },
    {
      question: 'Is this safe to use on my website?',
      answer:
        'Absolutely. The Kryptip widget only displays a tip button and a QR code. It doesn’t collect personal data or handle your payments — all tips go directly to your wallet.',
    },
    {
      question: 'Do I need to create an account?',
      answer:
        'Nope! Kryptip is account-free. Just paste your wallet info, customize your widget, and you’re ready to go.',
    },
  ]

  return (
    <section id="faq" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
      <StarryBackground />
      <div className="container mx-auto px-6 sm:px-12 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl font-body text-white/80 max-w-2xl mx-auto">
            Everything you need to know about the Kryptip widget
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-[#181b1f] hover:bg-[#2f353b] rounded-lg p-6 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-display font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-white transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="font-body text-white/80 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      <KryptipTipjar />
    </section>
  )
}
