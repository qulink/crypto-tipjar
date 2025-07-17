import { useState } from 'react'

interface CodeGeneratorProps {
  lnAddress: string
  buttonText: string
  buttonColor: string
}

export function CodeGenerator({ lnAddress, buttonText, buttonColor }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false)

  const embedCode = `<link rel="stylesheet" href="https://tipjar.vercel.app/embed.css">
<div id="tipjar" 
     data-lnaddress="${lnAddress}" 
     data-color="${buttonColor}" 
     data-button="${buttonText}"></div>
<script async src="https://tipjar.vercel.app/embed.js"></script>`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-display font-semibold mb-6">Embed Code</h2>
      
      {lnAddress ? (
        <div className="space-y-4">
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-body transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-display font-semibold text-blue-900 mb-2">How to use:</h3>
            <ol className="text-sm font-body text-blue-800 space-y-1">
              <li>1. Copy the code above</li>
              <li>2. Paste it into your website's HTML</li>
              <li>3. That's it! Your tip widget is ready</li>
            </ol>
          </div>
        </div>
      ) : (
        <p className="font-body text-gray-500">Enter a Lightning address to generate embed code</p>
      )}
    </div>
  )
}