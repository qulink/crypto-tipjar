import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { GetATipjar } from './components/GetATipjar'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

function App() {
  const [lnAddress, setLnAddress] = useState('')
  const [bolt12Offer, setBolt12Offer] = useState('')
  const [buttonText, setButtonText] = useState('Donate Bitcoin')
  const [buttonColor, setButtonColor] = useState('#38C5FE')
  const [fontColor, setFontColor] = useState('#FFFFFF')
  const [customImageUrl, setCustomImageUrl] = useState('')

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        <Hero />
        <HowItWorks />
        <GetATipjar
          lnAddress={lnAddress}
          setLnAddress={setLnAddress}
          bolt12Offer={bolt12Offer}
          setBolt12Offer={setBolt12Offer}
          buttonText={buttonText}
          setButtonText={setButtonText}
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
          fontColor={fontColor}
          setFontColor={setFontColor}
          customImageUrl={customImageUrl}
          setCustomImageUrl={setCustomImageUrl}
        />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}

export default App
