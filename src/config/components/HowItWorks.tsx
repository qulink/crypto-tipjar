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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 lg:gap-x-1 lg:px-12">
          <HowItWorksStep
            number="1"
            title="Get a Lightning Address"
            description="Sign up for a wallet like Wallet of Satoshi, or Misty Breez — these support Lightning Addresses. You can also search for other Bitcoin wallets with Lightning support."
          />

          <HowItWorksStep
            number="2"
            title="Find Your Address"
            description="If you already have a Lightning-enabled wallet, check the app’s settings, profile page, or receive tab. Look for something that resembles an email address — that’s your Lightning Address."
          />

          <HowItWorksStep
            number="3"
            title="Customize Your Widget"
            description="Enter your Lightning Address, pick your button text and color to match your brand or aesthetic. You’ll instantly see a live preview of your widget."
          />

          <HowItWorksStep
            number="4"
            title="Copy the Code"
            description="You’ll receive a small snippet of HTML code. Copy this code and paste it into your website. If you're using platforms like WordPress, use a custom HTML block or embed widget. If your platform doesn’t support embeds, you can still link to a standalone tip page."
          />

          <HowItWorksStep
            number="5"
            title="Test Your Tipjar"
            description="Open your site and click the button. You should see a QR code and Lightning prompt. If everything works, you're ready to share it with the world."
          />

          <HowItWorksStep
            number="6"
            title="Receive Tips Instantly"
            description="Visitors can click the button or scan the QR code. They’ll be prompted to enter the amount they want to tip before completing the payment. Once sent, you'll receive the Bitcoin instantly via Lightning."
          />
        </div>
      </div>
    </section>
  )
}
