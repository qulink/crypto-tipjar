import React from 'react'
import ReactDOM from 'react-dom/client'
import { TipWidget } from './TipWidget'
import { ErrorBoundary } from './ErrorBoundary'
import { validateLightningAddress, sanitizeButtonText, validateBolt12Offer, isValidHexColor } from '../common/utils'
import { logError } from '../common/config'
import '../index.css'

const mountedWidgets = new WeakMap<HTMLElement, ReactDOM.Root>()

function initTipWidget() {
  const containers = document.querySelectorAll('[id="tipjar"]')

  containers.forEach((container) => {
    const element = container as HTMLElement
    
    if (mountedWidgets.has(element)) return
    
    const rawLnAddress = element.dataset.lnaddress
    const rawBolt12 = element.dataset.bolt12
    const rawButtonColor = element.dataset.color
    const rawButtonText = element.dataset.button
    const rawFontColor = element.dataset.fontcolor
    const rawCustomImage = element.dataset.customimage
    
    const lnAddress = rawLnAddress && validateLightningAddress(rawLnAddress) ? rawLnAddress : undefined
    const bolt12Offer = rawBolt12 && validateBolt12Offer(rawBolt12) ? rawBolt12 : undefined
    const buttonColor = rawButtonColor && isValidHexColor(rawButtonColor) ? rawButtonColor : '#DCE546'
    const buttonText = sanitizeButtonText(rawButtonText || '')
    const fontColor = rawFontColor && isValidHexColor(rawFontColor) ? rawFontColor : '#FFFFFF'
    const customImageUrl = rawCustomImage && rawCustomImage.startsWith('https://') ? rawCustomImage : undefined

    if (lnAddress || bolt12Offer) {
      try {
        const root = ReactDOM.createRoot(element)
        mountedWidgets.set(element, root)
        
        root.render(
          <React.StrictMode>
            <ErrorBoundary>
              <TipWidget 
                lnAddress={lnAddress}
                bolt12Offer={bolt12Offer}
                buttonColor={buttonColor}
                buttonText={buttonText}
                fontColor={fontColor}
                customImageUrl={customImageUrl}
              />
            </ErrorBoundary>
          </React.StrictMode>
        )
      } catch (error) {
        logError('Failed to mount TipWidget', error as Error)
      }
    }
  })
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTipWidget)
} else {
  initTipWidget()
}

let observer: MutationObserver | null = null

function startObserver() {
  if (observer) return
  
  observer = new MutationObserver((mutations) => {
    let shouldReinit = false
    
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          if (element.id === 'tipjar' || element.querySelector('[id="tipjar"]')) {
            shouldReinit = true
          }
        }
      })
    })
    
    if (shouldReinit) {
      initTipWidget()
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

function cleanup() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

startObserver()

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', cleanup)
}
