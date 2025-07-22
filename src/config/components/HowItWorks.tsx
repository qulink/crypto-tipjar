import { HowItWorksStep } from './HowItWorksStep'
import { StarryBackground } from './StarryBackground'

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 relative text-white"
      style={{
        backgroundColor: '#000000',
        backgroundImage: 'linear-gradient(to top, #000000 80%, transparent 100%)',
      }}
    >
      <StarryBackground />
      <div className="container mx-auto px-6 sm:px-12 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-xl font-body text-white/80 max-w-2xl mx-auto">
            Get your Kryptip widget up and running in just a few steps — no coding skills needed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-x-12 lg:gap-x-8 xl:gap-x-6">
          <HowItWorksStep
            number="1"
            title="Choose Your Wallet"
            description="To receive tips, you'll need a Bitcoin wallet that supports Lightning. Custodial wallets like Wallet of Satoshi support Lightning Addresses. Wallets like Phoenix also support Bolt12 offers."
          />

          <HowItWorksStep
            number="2"
            title="Copy Your Tip Info"
            description="In your wallet’s receive tab, copy either your Lightning Address (it looks like an email), your Bolt12 offer (starts with 'lno1...'), or both if you have them."
          />

          <HowItWorksStep
            number="3"
            title="Customize Your Widget"
            description="Paste your Lightning address or Bolt12 code into the configurator. Pick your button text and color to match your brand. You’ll instantly see a live preview of your widget."
          />

          <HowItWorksStep
            number="4"
            title="Copy the Code"
            description="You’ll receive a small snippet of HTML code. Copy and paste it into your website. Platforms like WordPress support this via custom HTML blocks or embeds."
          />

          <HowItWorksStep
            number="5"
            title="Test Your Tipjar"
            description="Click the button on your site. You should see a QR code and be able to choose how to pay. If everything works, you're ready to start accepting tips."
          />

          <HowItWorksStep
            number="6"
            title="Receive Tips Instantly"
            description="Visitors can scan the QR code or click to pay. Depending on their wallet, they’ll use either your Lightning Address or Bolt12 offer to send you instant Bitcoin tips."
          />
        </div>
      </div>
    </section>
  )
}
