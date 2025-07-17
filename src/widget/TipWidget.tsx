import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { bech32 } from 'bech32'

interface TipWidgetProps {
  lnAddress: string
  buttonText?: string
  buttonColor?: string
}

export function TipWidget({
  lnAddress,
  buttonText = 'Tip Me',
  buttonColor = '#f97316',
}: TipWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showThanks, setShowThanks] = useState(false)

  // Defensive check: show nothing if lnAddress is completely empty
  if (!lnAddress) return null

  // Try to generate the LNURL only if lnAddress is in valid format
  const [name, domain] = lnAddress.split('@')
  let lightningUrl: string | null = null

  if (name && domain) {
    try {
      const url = `https://${domain}/.well-known/lnurlp/${name}`
      const words = bech32.toWords(Buffer.from(url, 'utf8'))
      const lnurl = bech32.encode('lnurl', words)
      lightningUrl = `lightning:${lnurl}`
    } catch (err) {
      console.error('LNURL generation failed:', err)
      lightningUrl = null
    }
  }

  const handleOpenWallet = () => {
    setShowThanks(true)
    setTimeout(() => {
      setShowThanks(false)
      setIsOpen(false)
    }, 3000)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
      setShowThanks(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: buttonColor }}
        className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
      >
        ⚡ {buttonText}
      </button>

      {isOpen && lightningUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
            {showThanks ? (
              <div className="text-center">
                <div className="text-6xl mb-4">🙏</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600">Your support means everything</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Send Lightning Tip</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                  <QRCodeSVG value={lightningUrl} size={200} className="mx-auto" />
                </div>

                <p className="text-sm text-gray-600 mb-4">Scan with your Lightning wallet</p>

                <a
                  href={lightningUrl}
                  onClick={handleOpenWallet}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Open in Wallet
                </a>

                <p className="text-xs text-gray-500 mt-4">Powered by Lightning Network</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && !lightningUrl && (
        <div className="text-center text-red-500 mt-4">⚠️ Invalid Lightning address</div>
      )}
    </>
  )
}
