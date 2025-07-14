import React from 'react'
import ReactDOM from 'react-dom/client'
import { TipWidget } from './TipWidget'
import '../index.css'

// Widget entry point for embedding
function initTipWidget() {
  const containers = document.querySelectorAll('[id="tipjar"]')
  
  containers.forEach((container) => {
    const element = container as HTMLElement
    const lnAddress = element.dataset.lnaddress
    const buttonColor = element.dataset.color || '#f97316'
    const buttonText = element.dataset.button || 'Tip Me'
    
    if (lnAddress) {
      const root = ReactDOM.createRoot(element)
      root.render(
        <React.StrictMode>
          <TipWidget
            lnAddress={lnAddress}
            buttonColor={buttonColor}
            buttonText={buttonText}
          />
        </React.StrictMode>
      )
    }
  })
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTipWidget)
} else {
  initTipWidget()
}

// Also initialize on dynamic content changes
const observer = new MutationObserver(() => {
  initTipWidget()
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})