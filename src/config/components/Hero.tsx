export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full bg-gray-900 text-white"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '130vh',
      }}
    >
      {/* Content */}
      <div className="w-full max-w-7xl h-full mx-auto px-4 pt-40 md:pt-32 pb-20">
        <div className="sticky top-24">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start md:pl-12">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                Turn Gratitude Into Sats
              </h1>

              <p className="text-lg md:text-2xl mb-8 max-w-xl text-gray-200 font-body px-4 sm:px-6 md:px-0">
                Kryptip lets you receive Bitcoin tips instantly via Lightning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#get-a-tipjar"
                  className="text-gray-900 px-6 py-3 rounded-lg text-base font-display font-semibold uppercase transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                  style={{
                    backgroundColor: '#E375E2',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = '#FA98F8'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = '#E375E2'
                  }}
                >
                  Create Your Tipjar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fade to black gradient */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent, #000000)',
        }}
      />
    </section>
  )
}
