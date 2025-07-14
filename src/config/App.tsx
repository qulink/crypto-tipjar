import { useState } from 'react'
import { TipWidget } from '../widget/TipWidget'
import { CodeGenerator } from './pages/CodeGenerator'

function App() {
  const [lnAddress, setLnAddress] = useState('')
  const [buttonText, setButtonText] = useState('Tip Me')
  const [buttonColor, setButtonColor] = useState('#f97316')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ⚡ Crypto Tip Jar
          </h1>
          <p className="text-lg text-gray-600">
            Generate an embeddable Lightning tip widget for your website
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Configure Your Widget</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lightning Address
                </label>
                <input
                  type="text"
                  value={lnAddress}
                  onChange={(e) => setLnAddress(e.target.value)}
                  placeholder="your@getalby.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Don't have one? Get started with{' '}
                  <a href="https://getalby.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                    Alby
                  </a>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Color
                </label>
                <input
                  type="color"
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Preview & Code Generation */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Preview</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {lnAddress ? (
                  <TipWidget
                    lnAddress={lnAddress}
                    buttonText={buttonText}
                    buttonColor={buttonColor}
                  />
                ) : (
                  <p className="text-gray-500">Enter a Lightning address to see preview</p>
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
    </div>
  )
}

export default App