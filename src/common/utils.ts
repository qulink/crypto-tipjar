// Utility functions shared between widget and config

export function validateLightningAddress(address: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(address)
}

export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

export function sanitizeButtonText(text: string): string {
  return text.replace(/[<>]/g, '').trim() || 'Donate Bitcoin'
}

export function validateBolt12Offer(offer: string): boolean {
  // Bolt12 offers start with 'lno1' and are always lowercase
  return /^lno1[a-z0-9]+$/.test(offer.trim())
}
