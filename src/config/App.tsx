import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { GetATipjar } from './components/GetATipjar'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

function App() {
  const [lnAddress, setLnAddress] = useState('')
  const [buttonText, setButtonText] = useState('Tip Me')
  const [buttonColor, setButtonColor] = useState('#f97316')

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <Hero />
        <HowItWorks />
        <GetATipjar
          lnAddress={lnAddress}
          setLnAddress={setLnAddress}
          buttonText={buttonText}
          setButtonText={setButtonText}
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
        />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  )
}

export default App