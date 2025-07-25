// Environment and configuration utilities

export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD

export const config = {
  widget: {
    maxButtonTextLength: 50,
    maxLnAddressLength: 320,
    maxBolt12Length: 2000,
    maxDataAttributeLength: 200,
    qrCodeSize: 200,
  },
  security: {
    allowedProtocols: ['https:', 'lightning:'],
    sanitizeInput: true,
    validateDomains: true,
  },
  performance: {
    enableStrictMode: isProduction,
    debounceMs: 100,
  },
} as const

export function logError(message: string, error?: Error) {
  if (isDevelopment) {
    console.error(`[TipWidget] ${message}`, error)
  }
  
  // In production, you might want to send to error tracking service
  if (isProduction && typeof window !== 'undefined') {
    // Example: window.errorTracker?.captureException(error)
  }
}

export function logWarning(message: string) {
  if (isDevelopment) {
    console.warn(`[TipWidget] ${message}`)
  }
}