// Utility functions shared between widget and config

export function validateLightningAddress(address: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(address)
}

export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

export function sanitizeButtonText(text: string): string {
  return text.replace(/[<>]/g, '').trim() || 'Tip Me'
}