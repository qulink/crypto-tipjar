interface StepProps {
  number: string
  title: string
  description: string
}

export function HowItWorksStep({ number, title, description }: StepProps) {
  return (
    <div className="bg-[#24292e] rounded-xl px-8 py-6 text-justify h-full flex flex-col w-full max-w-[320px] mx-auto">
      <div className="bg-[#DCE546] text-black rounded-full w-10 h-10 flex items-center justify-center text-base font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-display font-semibold mb-3 text-center">{title}</h3>
      <p className="font-body text-white/80 leading-relaxed flex-grow text-center sm:text-justify">
        {description}
      </p>
    </div>
  )
}
