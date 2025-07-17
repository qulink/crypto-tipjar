export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Get a Lightning Address',
      description:
        'Sign up for a Lightning wallet like Alby, Strike, or CashApp to get your Lightning address (looks like email@domain.com)',
      icon: '⚡',
    },
    {
      number: '2',
      title: 'Configure Your Widget',
      description:
        'Enter your Lightning address, customize the button text and color to match your brand',
      icon: '🎨',
    },
    {
      number: '3',
      title: 'Copy & Paste Code',
      description:
        "Copy the generated embed code and paste it anywhere on your website – it's just 3 lines of HTML",
      icon: '📋',
    },
    {
      number: '4',
      title: 'Receive Tips Instantly',
      description:
        'Your audience can tip you Bitcoin instantly by scanning a QR code or clicking to open their wallet',
      icon: '🎉',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-20 relative text-white"
      style={{
        backgroundColor: '#181b1f',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-xl font-body text-white/80 max-w-2xl mx-auto">
            Get your Lightning tip widget running in under 5 minutes. No technical knowledge
            required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{step.title}</h3>
              <p className="font-body text-white/80 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#get-a-tipjar"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-display font-semibold transition-colors inline-block"
          >
            Start Now – It's Free
          </a>
        </div>
      </div>
    </section>
  )
}
