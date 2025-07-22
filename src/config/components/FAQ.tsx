import { useState } from 'react'
import { StarryBackground } from './StarryBackground'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What do I need to receive tips?',
      answer:
        'You need a Bitcoin wallet that supports the Lightning Network. You can either use a custodial wallet that gives you a Lightning Address (like Wallet of Satoshi or Misty Breez), or a non-custodial wallet that gives you a Bolt12 offer (like Phoenix). You can enter either or both when creating your widget.',
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
      question: 'Can I customize the widget appearance?',
      answer:
        'Yes! You can change the button text and colors to match your website’s look and feel. You’ll see a live preview as you customize it.',
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
    </section>
  )
}
