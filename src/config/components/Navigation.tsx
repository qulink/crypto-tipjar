import { useEffect, useState } from 'react'

export function Navigation() {
  const [isHoveringZone, setIsHoveringZone] = useState(false)
  const [isHoveringNav, setIsHoveringNav] = useState(false)
  const [scrolledPastHero, setScrolledPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      setScrolledPastHero(scrollY > heroHeight - 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const expanded = isHoveringZone || isHoveringNav || scrolledPastHero

  return (
    <>
      {/* Transparent hover zone (behind the navbar) */}
      <div
        className="fixed top-0 left-0 w-full h-24 z-40"
        onMouseEnter={() => setIsHoveringZone(true)}
        onMouseLeave={() => setIsHoveringZone(false)}
      />

      {/* Actual navbar (on top, but not full width!) */}
      <nav
        className={`fixed z-50 top-6 left-1/2 transform -translate-x-1/2
          h-16 rounded-full bg-[#000000]
          transition-all duration-300 ease-in-out px-4 overflow-hidden
          flex items-center
          ${expanded ? 'w-[320px] gap-4 justify-start' : 'w-16 justify-center'}
        `}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
      >
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 md:h-12 aspect-square rounded-full object-cover block"
          style={{ border: 'none', padding: 0 }}
        />

        {/* Nav Links */}
        <div
          className={`
            flex items-center gap-6 text-white text-sm md:text-base font-semibold
            transition-all duration-500 ease-in-out
            ${expanded ? 'opacity-100 max-w-screen-md scale-100 ml-2' : 'opacity-0 max-w-0 scale-95'}
            overflow-hidden whitespace-nowrap
          `}
        >
          <a href="#how-it-works" className="transition-colors duration-300 hover:text-white/70">
            HOW TO
          </a>
          <a href="#get-a-tipjar" className="transition-colors duration-300 hover:text-white/70">
            GET
          </a>
          <a href="#faq" className="transition-colors duration-300 hover:text-white/70">
            FAQ
          </a>
        </div>
      </nav>
    </>
  )
}
