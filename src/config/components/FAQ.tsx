import { useState } from 'react'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is a Lightning Address?',
      answer:
        'A Lightning Address is like an email address for Bitcoin. It allows people to send you Bitcoin instantly over the Lightning Network. Popular providers include Alby, Strike, and CashApp.',
    },
    {
      question: 'Are there any fees?',
      answer:
        'Our widget is completely free to use. However, your Lightning wallet provider may charge small fees for receiving payments. Check with your wallet provider for their specific fee structure.',
    },
    {
      question: 'How fast do I receive tips?',
      answer:
        "Lightning payments are instant! You'll receive the Bitcoin in your wallet within seconds of someone sending a tip.",
    },
    {
      question: 'Is this safe to use on my website?',
      answer:
        'Yes, the widget is completely safe. It only displays a tip button and QR code - no sensitive information is processed through us. All payments go directly to your Lightning wallet.',
    },
    {
      question: 'Can I customize the widget appearance?',
      answer:
        "Yes! You can customize the button color and text. The widget is designed to blend seamlessly with your website's design.",
    },
    {
      question: 'Do I need to create an account?',
      answer:
        "No account needed! Just enter your Lightning address, customize your widget, and copy the embed code. It's that simple.",
    },
    {
      question: "What if I don't have a Lightning wallet?",
      answer:
        "You'll need a Lightning wallet to receive tips. We recommend starting with Alby (web), Strike (mobile), or CashApp (US only) as they're beginner-friendly and provide Lightning addresses.",
    },
    {
      question: 'Can I use this on multiple websites?',
      answer:
        'Absolutely! You can embed the same widget on as many websites as you want. Each site will use the same Lightning address to send tips to your wallet.',
    },
  ]

  return (
    <section id="faq" className="py-20" style={{ backgroundColor: '#181b1f' }}>
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
                className="w-full text-left bg-[#24292e] hover:bg-[#2f353b] rounded-lg p-6 transition-colors"
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
