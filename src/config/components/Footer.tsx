export function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 sm:px-12 md:px-16">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Branding and description */}
          <div className="md:max-w-md">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-display font-bold">Kryptip</span>
            </div>
            <p className="font-body text-gray-400">
              The easiest way to accept Bitcoin tips on your website. <br />
              No signup required, completely free to use.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-gray-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#get-a-tipjar" className="hover:text-white transition-colors">
                  Get a Tipjar
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="font-body">2025 Kryptip. Powered by ⚡ Lightning Network.</p>
        </div>
      </div>
    </footer>
  )
}
