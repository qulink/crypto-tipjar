import { TipWidget } from '../../widget/TipWidget'
import { CodeGenerator } from '../pages/CodeGenerator'

interface GetATipjarProps {
  lnAddress: string
  setLnAddress: (value: string) => void
  buttonText: string
  setButtonText: (value: string) => void
  buttonColor: string
  setButtonColor: (value: string) => void
}

export function GetATipjar({
  lnAddress,
  setLnAddress,
  buttonText,
  setButtonText,
  buttonColor,
  setButtonColor
}: GetATipjarProps) {
  return (
    <section id="get-a-tipjar" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Create Your Tipjar
          </h2>
          <p className="text-xl font-body text-gray-600 max-w-2xl mx-auto">
            Configure and generate your Lightning tip widget in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Configuration Panel */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-display font-semibold mb-6 text-gray-900">Configure Your Widget</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-body font-medium text-gray-700 mb-2">
                  Lightning Address *
                </label>
                <input
                  type="text"
                  value={lnAddress}
                  onChange={(e) => setLnAddress(e.target.value)}
                  placeholder="your@getalby.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-sm font-body text-gray-500 mt-2">
                  Don't have one? Get started with{' '}
                  <a href="https://getalby.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">
                    Alby
                  </a>
                  {' or '}
                  <a href="https://strike.me" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">
                    Strike
                  </a>
                </p>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Tip Me"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-gray-700 mb-2">
                  Button Color
                </label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    placeholder="#f97316"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Code Generation */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-display font-semibold mb-6 text-gray-900">Live Preview</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[100px] flex items-center justify-center">
                {lnAddress ? (
                  <TipWidget
                    lnAddress={lnAddress}
                    buttonText={buttonText}
                    buttonColor={buttonColor}
                  />
                ) : (
                  <p className="font-body text-gray-500">Enter a Lightning address to see preview</p>
                )}
              </div>
            </div>

            {/* Code Generation */}
            <CodeGenerator
              lnAddress={lnAddress}
              buttonText={buttonText}
              buttonColor={buttonColor}
            />
          </div>
        </div>
      </div>
    </section>
  )
}