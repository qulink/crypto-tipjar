// Utility functions shared between widget and config

export function validateLightningAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  
  const trimmed = address.trim()
  if (trimmed.length === 0 || trimmed.length > 320) return false
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(trimmed)) return false
  
  const [localPart, domain] = trimmed.split('@')
  if (localPart.length > 64 || domain.length > 253) return false
  
  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) return false
  if (domain.startsWith('-') || domain.endsWith('-') || domain.includes('..')) return false
  
  return true
}

export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

export function sanitizeButtonText(text: string): string {
  if (!text || typeof text !== 'string') return 'Donate Bitcoin'
  
  const sanitized = text
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
  
  return sanitized.length > 0 && sanitized.length <= 50 ? sanitized : 'Donate Bitcoin'
}

export function validateBolt12Offer(offer: string): boolean {
  if (!offer || typeof offer !== 'string') return false
  
  const trimmed = offer.trim()
  if (trimmed.length < 10 || trimmed.length > 2000) return false
  
  return /^lno1[a-z0-9]+$/.test(trimmed)
}

