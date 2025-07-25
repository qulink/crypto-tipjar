import { useState, useCallback, useMemo } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { bech32 } from 'bech32'
import { validateBolt12Offer, validateLightningAddress, sanitizeButtonText } from '../common/utils'
import { config, logError } from '../common/config'

interface TipWidgetProps {
  lnAddress?: string
  bolt12Offer?: string
  buttonText?: string
  buttonColor?: string
  fontColor?: string
}

export function TipWidget({
  lnAddress,
  bolt12Offer,
  buttonText = 'Donate Bitcoin',
  buttonColor = '#38C5FE',
  fontColor = '#FFFFFF',
}: TipWidgetProps) {
  // Always sanitize button text regardless of source
  const safeButtonText = sanitizeButtonText(buttonText)
  const [isOpen, setIsOpen] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [selectedWalletType, setSelectedWalletType] = useState<'lnurl' | 'bolt12' | null>(null)

  const { lnurlUri, bolt12Uri, hasValidPayment } = useMemo(() => {
    let lnurlUri: string | null = null
    let bolt12Uri: string | null = null

    // Generate LNURL if valid Lightning Address is provided
    if (lnAddress && validateLightningAddress(lnAddress)) {
      const [name, domain] = lnAddress.split('@')
      if (name && domain) {
        const url = `https://${domain}/.well-known/lnurlp/${name}`
        const urlBytes = new TextEncoder().encode(url)
        const words = bech32.toWords(urlBytes)

        // Try to encode - if it exceeds bech32 limit, fallback to Lightning address
        try {
          const lnurl = bech32.encode('lnurl', words)
          lnurlUri = `lightning:${lnurl}`
        } catch (encodingErr) {
          // Bech32 encoding failed due to length, use Lightning address directly
          lnurlUri = `lightning:${lnAddress}`
        }
      }
    }

    // Validate Bolt12 offer if provided
    if (bolt12Offer && validateBolt12Offer(bolt12Offer)) {
      bolt12Uri = `lightning:${bolt12Offer}`
    }

    return {
      lnurlUri,
      bolt12Uri,
      hasValidPayment: !!(lnurlUri || bolt12Uri),
    }
  }, [lnAddress, bolt12Offer])

  // Defensive check: show nothing if no valid payment method is provided
  if (!hasValidPayment) return null

  const hasLnurl = !!lnurlUri
  const hasBolt12 = !!bolt12Uri
  const hasBothOptions = hasLnurl && hasBolt12

  const handleOpenWallet = useCallback(
    (walletType?: 'lnurl' | 'bolt12') => {
      if (walletType) {
        const uri = walletType === 'lnurl' ? lnurlUri : bolt12Uri
        if (uri) {
          try {
            window.open(uri, '_blank')
          } catch (error) {
            logError('Failed to open wallet', error as Error)
          }
        }
      }
      setShowThanks(true)
    },
    [lnurlUri, bolt12Uri]
  )

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
      setShowThanks(false)
      setSelectedWalletType(null)
    }
  }

  const handleWalletTypeSelection = (type: 'lnurl' | 'bolt12') => {
    setSelectedWalletType(type)
  }

  const getCurrentUri = () => {
    if (hasBothOptions) {
      return selectedWalletType === 'lnurl'
        ? lnurlUri
        : selectedWalletType === 'bolt12'
          ? bolt12Uri
          : null
    }
    return lnurlUri || bolt12Uri
  }

  const getCurrentWalletType = () => {
    if (hasBothOptions && selectedWalletType) {
      return selectedWalletType
    }
    return hasLnurl ? 'lnurl' : 'bolt12'
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: buttonColor, color: fontColor }}
        className="px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
      >
        {safeButtonText}
      </button>

      {isOpen && (hasLnurl || hasBolt12) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
            {showThanks ? (
              <div className="text-center relative">
                <button
                  onClick={() => {
                    setShowThanks(false)
                    setIsOpen(false)
                    setSelectedWalletType(null)
                  }}
                  className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
                <div className="text-6xl mb-4">🙏</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600">Your support means everything</p>
              </div>
            ) : hasBothOptions && !selectedWalletType ? (
              <div className="text-center">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Choose Wallet Type</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ×
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-6">Select your wallet compatibility:</p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleWalletTypeSelection('lnurl')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg transition-colors"
                  >
                    LNURL-compatible wallet
                    <div className="text-xs opacity-90 mt-1">
                      Wallet of Satoshi, Misty Breez, etc.
                    </div>
                  </button>
                  <button
                    onClick={() => handleWalletTypeSelection('bolt12')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg transition-colors"
                  >
                    Bolt12-compatible wallet
                    <div className="text-xs opacity-90 mt-1">Phoenix, etc.</div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Send Lightning Tip</h3>
                  <div className="flex gap-2">
                    {hasBothOptions && (
                      <button
                        onClick={() => setSelectedWalletType(null)}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                      >
                        ← Back
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {getCurrentUri() && (
                  <>
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <QRCodeSVG
                        value={getCurrentUri()!}
                        size={config.widget.qrCodeSize}
                        className="mx-auto"
                      />
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      Scan with your {getCurrentWalletType() === 'lnurl' ? 'LNURL' : 'Bolt12'}
                      -compatible wallet
                    </p>

                    <button
                      onClick={() => handleOpenWallet(getCurrentWalletType())}
                      className="inline-block bg-gradient-to-r from-[#38C5FE] to-[#FA98F8] hover:from-[#2AA9E0] hover:to-[#F26BC1] text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Open in Wallet
                    </button>

                    <p className="text-xs text-gray-500 mt-4">Powered by Lightning Network</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && !hasLnurl && !hasBolt12 && (
        <div className="text-center text-red-500 mt-4">⚠️ Invalid payment details</div>
      )}
    </>
  )
}
