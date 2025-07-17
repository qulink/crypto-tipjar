import { TipWidget } from '../../widget/TipWidget'
import { useState } from 'react'

interface GetATipjarProps {
  lnAddress: string
  setLnAddress: (value: string) => void
  buttonText: string
  setButtonText: (value: string) => void
  buttonColor: string
  setButtonColor: (value: string) => void
  fontColor: string
  setFontColor: (value: string) => void
}

export function GetATipjar({
  lnAddress,
  setLnAddress,
  buttonText,
  setButtonText,
  buttonColor,
  setButtonColor,
  fontColor,
  setFontColor,
}: GetATipjarProps) {
  const [showCode, setShowCode] = useState(false)

  const codeSnippet = `
<script src="https://cdn.kryptip.com/widget.js"></script>
<kryptip-button
  address="${lnAddress}"
  text="${buttonText}"
  color="${buttonColor}"
  font="${fontColor}"
></kryptip-button>`

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeSnippet)
    alert('Code copied to clipboard!')
  }

  return (
    <section id="get-a-tipjar" className="py-20" style={{ backgroundColor: '#181b1f' }}>
      <div className="container mx-auto px-6 sm:px-12 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Create Your Tipjar</h2>
          <p className="text-xl font-body text-white/80 max-w-2xl mx-auto">
            Configure and generate your Kryptip widget in seconds
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {/* Configuration Panel */}
          <div className="bg-[#24292e] rounded-xl p-8 text-white">
            <h3 className="text-2xl font-display font-semibold mb-6">Configure Your Widget</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-body font-medium mb-2">
                  Lightning Address *
                </label>
                <input
                  type="text"
                  value={lnAddress}
                  onChange={(e) => setLnAddress(e.target.value)}
                  placeholder="your@getalby.com"
                  className="w-full px-4 py-3 border border-gray-600 bg-[#181b1f] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#DCE546] focus:border-transparent"
                />
                <p className="text-sm font-body text-white/60 mt-2">
                  Don't have one? Get started with{' '}
                  <a
                    href="https://getalby.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium"
                    style={{ color: '#DCE546' }}
                  >
                    Alby
                  </a>{' '}
                  .
                </p>
              </div>

              <div>
                <label className="block text-sm font-body font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Tip Me"
                  className="w-full px-4 py-3 border border-gray-600 bg-[#181b1f] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#DCE546] focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Button Color */}
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="block text-sm font-body font-medium mb-2">Button Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        placeholder="#DCE546"
                        className="flex-1 px-4 py-3 border border-gray-600 bg-[#181b1f] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#DCE546] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Font Color */}
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="block text-sm font-body font-medium mb-2">Font Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1 px-4 py-3 border border-gray-600 bg-[#181b1f] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#DCE546] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview + Code */}
          <div className="bg-[#24292e] rounded-xl p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-display font-semibold">Live Preview</h3>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Show Code</label>
                <input
                  type="checkbox"
                  checked={showCode}
                  onChange={() => setShowCode(!showCode)}
                  className="w-5 h-5 text-[#DCE546] border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center min-h-[100px] flex items-center justify-center">
              {lnAddress ? (
                <TipWidget
                  lnAddress={lnAddress}
                  buttonText={buttonText}
                  buttonColor={buttonColor}
                />
              ) : (
                <p className="font-body text-white/60">Enter a Lightning address to see preview</p>
              )}
            </div>

            {showCode && (
              <div className="mt-6 relative">
                <pre className="bg-[#181b1f] text-white text-sm p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  {codeSnippet}
                </pre>
                <button
                  onClick={copyCode}
                  className="absolute top-2 right-2 bg-[#DCE546] text-black font-medium px-3 py-1 text-xs rounded-md hover:bg-yellow-300"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
