import { TipWidget } from '../../widget/TipWidget'
import { useState } from 'react'
import { StarryBackground } from './StarryBackground'
import { validateLightningAddress, validateBolt12Offer } from '../../common/utils'
import { supabase } from '../../lib/supabase'

interface GetATipjarProps {
  lnAddress: string
  setLnAddress: (value: string) => void
  bolt12Offer: string
  setBolt12Offer: (value: string) => void
  buttonText: string
  setButtonText: (value: string) => void
  buttonColor: string
  setButtonColor: (value: string) => void
  fontColor: string
  setFontColor: (value: string) => void
  customImageUrl: string
  setCustomImageUrl: (value: string) => void
}

export function GetATipjar({
  lnAddress,
  setLnAddress,
  bolt12Offer,
  setBolt12Offer,
  buttonText,
  setButtonText,
  buttonColor,
  setButtonColor,
  fontColor,
  setFontColor,
  customImageUrl,
  setCustomImageUrl,
}: GetATipjarProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const isValidAddress = validateLightningAddress(lnAddress)
  const isValidBolt12 = validateBolt12Offer(bolt12Offer)
  const hasValidPaymentMethod = isValidAddress || isValidBolt12

  const codeSnippet = `<link rel="stylesheet" href="https://kryptip.xyz/embed.css" />
<div
  id="tipjar"
  ${lnAddress ? `data-lnaddress="${lnAddress}"` : ''}
  ${bolt12Offer ? `data-bolt12="${bolt12Offer}"` : ''}
  data-button="${buttonText}"
  data-color="${buttonColor}"
  data-fontcolor="${fontColor}"
  ${customImageUrl ? `data-customimage="${customImageUrl}"` : ''}
></div>
<script async src="https://kryptip.xyz/embed.js"></script>`

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
      // Fallback to alert if clipboard API fails
      alert('Code copied to clipboard!')
    }
  }

  const validateImageFile = (file: File): string | null => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
    const maxSize = 500 * 1024 // 500KB

    if (!validTypes.includes(file.type)) {
      return 'Please upload a PNG, JPG, GIF, or WEBP image file.'
    }

    if (file.size > maxSize) {
      return 'File size must be less than 500KB.'
    }

    return null
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateImageFile(file)
    if (validationError) {
      setUploadError(validationError)
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      // Generate a unique filename with timestamp and random string
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExtension = file.name.split('.').pop()
      const fileName = `${timestamp}-${randomString}.${fileExtension}`

      const { data, error } = await supabase.storage.from('button-uploads').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

      if (error) {
        console.error('Supabase upload error:', error)
        if (error.message.includes('row-level security policy')) {
          setUploadError(
            'Storage bucket needs RLS policies. Please run the SQL commands provided in the console.'
          )
        } else {
          setUploadError(`Upload failed: ${error.message}`)
        }
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('button-uploads')
        .getPublicUrl(data.path)

      setCustomImageUrl(publicUrlData.publicUrl)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const clearCustomImage = async () => {
    if (!customImageUrl) return

    try {
      // Extract filename from the public URL
      const urlParts = customImageUrl.split('/')
      const fileName = urlParts[urlParts.length - 1]

      if (fileName) {
        const { error } = await supabase.storage.from('button-uploads').remove([fileName])

        if (error) {
          console.warn('Failed to delete file from storage:', error)
        }
      }
    } catch (error) {
      console.warn('Error during file deletion:', error)
      // Don't show error to user - still clear the UI
    }

    setCustomImageUrl('')
    setUploadError('')
  }

  return (
    <section id="get-a-tipjar" className="py-20 relative" style={{ backgroundColor: '#000000' }}>
      <StarryBackground />
      <div className="container mx-auto px-6 sm:px-12 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Create Your Tipjar</h2>
          <p className="text-xl font-body text-white/80 max-w-2xl mx-auto">
            Configure and generate your Kryptip widget in seconds
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {/* Configuration Panel */}
          <div className="bg-[#181b1f] rounded-xl p-8 text-white">
            <h3 className="text-2xl font-display font-semibold mb-6">Configure Your Widget</h3>

            <div className="space-y-6">
              <div className="mb-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <p className="text-sm font-body text-blue-200">
                  <strong>Required:</strong> Enter at least one payment method (Lightning Address{' '}
                  <strong>or</strong> Bolt12 Offer <strong>or</strong> both)
                </p>
              </div>

              <div>
                <label className="block text-sm font-body font-medium mb-2">
                  Lightning Address
                </label>
                <input
                  type="text"
                  value={lnAddress}
                  onChange={(e) => setLnAddress(e.target.value)}
                  placeholder="your@example.com"
                  className="w-full px-4 py-3 border border-gray-600 bg-[#24292e] rounded-lg text-white focus:outline-none focus:border-transparent relative"
                  style={
                    {
                      '--tw-ring-color': 'transparent',
                    } as React.CSSProperties
                  }
                  onFocus={(e) => {
                    e.target.style.border = '2px solid transparent'
                    e.target.style.backgroundImage =
                      'linear-gradient(#24292e, #24292e), linear-gradient(45deg, #38C5FE, #FA98F8)'
                    e.target.style.backgroundOrigin = 'border-box'
                    e.target.style.backgroundClip = 'padding-box, border-box'
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgb(75 85 99)'
                    e.target.style.backgroundImage = 'none'
                    e.target.style.backgroundOrigin = 'initial'
                    e.target.style.backgroundClip = 'initial'
                  }}
                />
                {lnAddress && !isValidAddress ? (
                  <p className="text-sm font-body text-red-400 mt-2">
                    Please enter a valid Lightning Address (e.g., user@domain.com)
                  </p>
                ) : (
                  <p className="text-sm font-body text-white/60 mt-2">
                    Compatible with custodial wallets like Wallet of Satoshi, Misty Breez, etc.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-body font-medium mb-2">Bolt12 Offer</label>
                <input
                  type="text"
                  value={bolt12Offer}
                  onChange={(e) => setBolt12Offer(e.target.value)}
                  placeholder="lno1qcp4256wyldmurn..."
                  className="w-full px-4 py-3 border border-gray-600 bg-[#24292e] rounded-lg text-white focus:outline-none focus:border-transparent relative"
                  style={
                    {
                      '--tw-ring-color': 'transparent',
                    } as React.CSSProperties
                  }
                  onFocus={(e) => {
                    e.target.style.border = '2px solid transparent'
                    e.target.style.backgroundImage =
                      'linear-gradient(#24292e, #24292e), linear-gradient(45deg, #38C5FE, #FA98F8)'
                    e.target.style.backgroundOrigin = 'border-box'
                    e.target.style.backgroundClip = 'padding-box, border-box'
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgb(75 85 99)'
                    e.target.style.backgroundImage = 'none'
                    e.target.style.backgroundOrigin = 'initial'
                    e.target.style.backgroundClip = 'initial'
                  }}
                />
                {bolt12Offer && !isValidBolt12 ? (
                  <p className="text-sm font-body text-red-400 mt-2">
                    Please enter a valid Bolt12 offer (starts with lno1)
                  </p>
                ) : (
                  <p className="text-sm font-body text-white/60 mt-2">
                    Compatible with certain modern wallets like Phoenix. Provides enhanced privacy.
                  </p>
                )}
              </div>

              {!hasValidPaymentMethod && (lnAddress || bolt12Offer) && (
                <div className="p-3 bg-red-900/30 rounded-lg border border-red-500/30">
                  <p className="text-sm font-body text-red-200">
                    ⚠️ Please enter at least one valid payment method (Lightning Address or Bolt12
                    offer)
                  </p>
                </div>
              )}

              {/* Button Customization Section */}
              <div className="bg-[#24292e] rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-display font-semibold text-white mb-4">Button Appearance</h4>
                <p className="text-sm font-body text-white/70 mb-6">Choose between a text button or custom image</p>
                
                {/* Text Button Options */}
                <div className="mb-6">
                  <h5 className="text-md font-body font-medium text-white mb-3">Text Button (Default)</h5>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-body font-medium mb-2 text-white/90">Button Text</label>
                      <input
                        type="text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        placeholder="Donate Bitcoin"
                        maxLength={50}
                        className="w-full px-4 py-3 border border-gray-600 bg-[#181b1f] rounded-lg text-white focus:outline-none focus:border-transparent relative"
                        style={
                          {
                            '--tw-ring-color': 'transparent',
                          } as React.CSSProperties
                        }
                        onFocus={(e) => {
                          e.target.style.border = '2px solid transparent'
                          e.target.style.backgroundImage =
                            'linear-gradient(#181b1f, #181b1f), linear-gradient(45deg, #38C5FE, #FA98F8)'
                          e.target.style.backgroundOrigin = 'border-box'
                          e.target.style.backgroundClip = 'padding-box, border-box'
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgb(75 85 99)'
                          e.target.style.backgroundImage = 'none'
                          e.target.style.backgroundOrigin = 'initial'
                          e.target.style.backgroundClip = 'initial'
                        }}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <div></div>
                        <span
                          className={`text-xs font-body ${
                            buttonText.length >= 50 ? 'text-red-400' : 'text-white/60'
                          }`}
                        >
                          {buttonText.length}/50
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Button Color */}
                      <div className="flex flex-col w-full sm:w-1/2">
                        <label className="block text-sm font-body font-medium mb-2 text-white/90">Button Color</label>
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
                            placeholder="#38C5FE"
                            className="flex-1 px-4 py-3 border border-gray-600 bg-[#181b1f] rounded-lg text-white focus:outline-none focus:border-transparent relative"
                            style={
                              {
                                '--tw-ring-color': 'transparent',
                              } as React.CSSProperties
                            }
                            onFocus={(e) => {
                              e.target.style.border = '2px solid transparent'
                              e.target.style.backgroundImage =
                                'linear-gradient(#181b1f, #181b1f), linear-gradient(45deg, #38C5FE, #FA98F8)'
                              e.target.style.backgroundOrigin = 'border-box'
                              e.target.style.backgroundClip = 'padding-box, border-box'
                            }}
                            onBlur={(e) => {
                              e.target.style.border = '1px solid rgb(75 85 99)'
                              e.target.style.backgroundImage = 'none'
                              e.target.style.backgroundOrigin = 'initial'
                              e.target.style.backgroundClip = 'initial'
                            }}
                          />
                        </div>
                      </div>

                      {/* Font Color */}
                      <div className="flex flex-col w-full sm:w-1/2">
                        <label className="block text-sm font-body font-medium mb-2 text-white/90">Font Color</label>
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
                            className="flex-1 px-4 py-3 border border-gray-600 bg-[#181b1f] rounded-lg text-white focus:outline-none focus:border-transparent relative"
                            style={
                              {
                                '--tw-ring-color': 'transparent',
                              } as React.CSSProperties
                            }
                            onFocus={(e) => {
                              e.target.style.border = '2px solid transparent'
                              e.target.style.backgroundImage =
                                'linear-gradient(#181b1f, #181b1f), linear-gradient(45deg, #38C5FE, #FA98F8)'
                              e.target.style.backgroundOrigin = 'border-box'
                              e.target.style.backgroundClip = 'padding-box, border-box'
                            }}
                            onBlur={(e) => {
                              e.target.style.border = '1px solid rgb(75 85 99)'
                              e.target.style.backgroundImage = 'none'
                              e.target.style.backgroundOrigin = 'initial'
                              e.target.style.backgroundClip = 'initial'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Image Option */}
                <div className="border-t border-gray-600 pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h5 className="text-md font-body font-medium text-white">Custom Image Button</h5>
                    <div className="relative group">
                      <svg className="w-4 h-4 text-white/60 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-64 z-10">
                        <div className="text-center">
                          <p className="mb-2"><strong>Important:</strong> Always configure the text button above as a fallback option.</p>
                          <p className="mb-2">Only upload appropriate images and respect copyright restrictions.</p>
                          <p>Custom images override text buttons when properly configured.</p>
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-body text-white/60 mb-3">
                    Upload a custom image for your tip button (PNG, JPG, GIF, WEBP - max 500KB)
                  </p>

                {customImageUrl ? (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={customImageUrl}
                        alt="Custom button"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <button
                      onClick={clearCustomImage}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div
                      className={`border-2 border-dashed border-gray-600 rounded-lg p-6 text-center transition-colors ${isUploading ? 'opacity-50' : 'hover:border-gray-500'}`}
                    >
                      {isUploading ? (
                        <div className="text-white/60">
                          <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full mx-auto mb-2"></div>
                          Uploading...
                        </div>
                      ) : (
                        <div className="text-white/60">
                          <svg
                            className="w-8 h-8 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          Click to upload image
                        </div>
                      )}
                    </div>
                  </div>
                )}

                  {uploadError && (
                    <p className="text-sm font-body text-red-400 mt-2">{uploadError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview + Code */}
          <div className="bg-[#24292e] rounded-xl p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-display font-semibold">Preview</h3>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Show Code</label>
                <button
                  onClick={() => hasValidPaymentMethod && setShowCode(!showCode)}
                  disabled={!hasValidPaymentMethod}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showCode && hasValidPaymentMethod
                      ? 'bg-gradient-to-r from-[#38C5FE] to-[#FA98F8]'
                      : hasValidPaymentMethod
                        ? 'bg-gray-600'
                        : 'bg-gray-800 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      showCode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center min-h-[100px] flex items-center justify-center">
              {hasValidPaymentMethod ? (
                <TipWidget
                  lnAddress={lnAddress}
                  bolt12Offer={bolt12Offer}
                  buttonText={buttonText}
                  buttonColor={buttonColor}
                  fontColor={fontColor}
                  customImageUrl={customImageUrl}
                />
              ) : (
                <p className="font-body text-white/60">
                  Enter a Lightning address or Bolt12 offer to see preview
                </p>
              )}
            </div>

            {showCode && (
              <div className="mt-6 relative">
                <pre className="bg-[#181b1f] text-white text-sm p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  {codeSnippet}
                </pre>
                <button
                  onClick={copyCode}
                  className="absolute top-2 right-2 p-2 text-white hover:text-gray-300 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <span className="text-sm font-medium text-green-400">Copied</span>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
