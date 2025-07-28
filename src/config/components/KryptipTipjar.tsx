// KryptipTipjar.tsx
import { useEffect, useRef } from 'react'

interface KryptipTipjarProps {
  lnAddress?: string
  bolt12Offer?: string
  buttonText?: string
  buttonColor?: string
  fontColor?: string
  customImageUrl?: string
}

export function KryptipTipjar({
  lnAddress = 'airdog@breez.fun',
  bolt12Offer = 'lno1pgqppmsrse80qf0aara4slvcjxrvu6j2rp5ftmjy4yntlsmsutpkvkt6878s8rv39ytkfrtmcn40uqkqdqwn2f9smxvyj6ardr5pc9al677fwxhzqgpjcl3m3wdvueq0zha9fvw5jlnnk9mprfkmp5p5u4sedvsshxa9vccqx0jw074hxzh3nlvvrszjgyn8773795u88zs588s0zwyz0lax79ex9fagckr8agt57smdltg4uqjadkg4c2rsyq5qtsnh8h2n047kpcq50j2w4pjvl79ns828zpn5kj8zt5kvq946qqew6xgj2sguzfcyny7jd7d3qppr8tfgzm7hsq0atagv0q332knhnskjgwczgmc7jwkqmm5s2eue6y5ykl0s',
  buttonText = 'Donate Bitcoin',
  buttonColor = '#38c5fe',
  fontColor = '#ffffff',
  customImageUrl = 'https://xqygsqdprsvhrhymrjym.supabase.co/storage/v1/object/public/button-uploads/1753738221837-ylbo0qdaw1d.gif',
}: KryptipTipjarProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://kryptip.xyz/embed.css'
    document.head.appendChild(link)

    // Load Script
    const script = document.createElement('script')
    script.src = 'https://kryptip.xyz/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      id="tipjar"
      ref={ref}
      data-lnaddress={lnAddress}
      data-bolt12={bolt12Offer}
      data-button={buttonText}
      data-color={buttonColor}
      data-fontcolor={fontColor}
      data-customimage={customImageUrl}
    />
  )
}
