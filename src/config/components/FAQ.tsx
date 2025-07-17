import { useState } from 'react'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is a Lightning Address?",
      answer: "A Lightning Address is like an email address for Bitcoin. It allows people to send you Bitcoin instantly over the Lightning Network. Popular providers include Alby, Strike, and CashApp."
    },
    {
      question: "Are there any fees?",
      answer: "Our widget is completely free to use. However, your Lightning wallet provider may charge small fees for receiving payments (typically 1-3%). Check with your wallet provider for their specific fee structure."
    },
    {
      question: "How fast do I receive tips?",
      answer: "Lightning payments are instant! You'll receive the Bitcoin in your wallet within seconds of someone sending a tip."
    },
    {
      question: "Is this safe to use on my website?",
      answer: "Yes, the widget is completely safe. It only displays a tip button and QR code - no sensitive information is processed through our servers. All payments go directly to your Lightning wallet."
    },
    {
      question: "Can I customize the widget appearance?",
      answer: "Yes! You can customize the button text, color, and size. The widget is designed to blend seamlessly with your website's design."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account needed! Just enter your Lightning address, customize your widget, and copy the embed code. It's that simple."
    },
    {
      question: "What if I don't have a Lightning wallet?",
      answer: "You'll need a Lightning wallet to receive tips. We recommend starting with Alby (web), Strike (mobile), or CashApp (US only) as they're beginner-friendly and provide Lightning addresses."
    },
    {
      question: "Can I use this on multiple websites?",
      answer: "Absolutely! You can embed the same widget on as many websites as you want. Each site will use the same Lightning address to send tips to your wallet."
    }
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl font-body text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Lightning tip widgets
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-6 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-display font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="font-body text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="#footer" 
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  )
}