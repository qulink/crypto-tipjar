interface StepProps {
  number: string
  title: string
  description: string
}

export function HowItWorksStep({ number, title, description }: StepProps) {
  return (
    <div className="relative group w-full max-w-[320px] mx-auto">
      {/* Glowing gradient background */}
      <div
        className="absolute -inset-1 rounded-xl blur opacity-100"
        style={{
          background: 'linear-gradient(45deg, #38C5FE, #FA98F8)',
        }}
      ></div>

      {/* bg-gradient-to-br from-[#38C5FE] to-[#FA98F8] */}
      {/* Card content */}
      <div className="relative bg-[#181b1f] rounded-xl px-8 py-6 text-justify h-full flex flex-col">
        <div className="bg-[#24292e] text-white rounded-full w-10 h-10 flex items-center justify-center text-base font-black mx-auto mb-4">
          {number}
        </div>

        <h3 className="text-xl font-display font-semibold mb-3 text-center text-white">{title}</h3>
        <p className="font-body text-white/80 leading-relaxed flex-grow text-center ">
          {description}
        </p>
      </div>
    </div>
  )
}
