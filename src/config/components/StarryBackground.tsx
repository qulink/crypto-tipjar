export function StarryBackground() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(2px 2px at 20% 30%, #fff, transparent),
          radial-gradient(2px 2px at 40% 70%, #fff, transparent),
          radial-gradient(1px 1px at 90% 40%, #fff, transparent),
          radial-gradient(1px 1px at 50% 50%, #fff, transparent),
          radial-gradient(2px 2px at 10% 60%, #fff, transparent),
          radial-gradient(1px 1px at 70% 20%, #fff, transparent),
          radial-gradient(2px 2px at 85% 80%, #fff, transparent),
          radial-gradient(1px 1px at 25% 90%, #fff, transparent),
          radial-gradient(1px 1px at 60% 10%, #fff, transparent),
          radial-gradient(2px 2px at 75% 55%, #fff, transparent),
          radial-gradient(1px 1px at 15% 80%, #fff, transparent),
          radial-gradient(1px 1px at 95% 65%, #fff, transparent),
          radial-gradient(2px 2px at 30% 25%, #fff, transparent),
          radial-gradient(1px 1px at 80% 90%, #fff, transparent),
          radial-gradient(1px 1px at 5% 45%, #fff, transparent),
          radial-gradient(2px 2px at 65% 75%, #fff, transparent),
          radial-gradient(1px 1px at 35% 15%, #fff, transparent),
          radial-gradient(1px 1px at 55% 85%, #fff, transparent),
          radial-gradient(2px 2px at 45% 35%, #fff, transparent),
          radial-gradient(1px 1px at 85% 25%, #fff, transparent)
        `,
        backgroundSize: '200px 200px, 300px 300px, 150px 150px, 250px 250px, 180px 180px, 220px 220px, 160px 160px, 280px 280px, 190px 190px, 240px 240px, 170px 170px, 210px 210px, 260px 260px, 140px 140px, 200px 200px, 230px 230px, 180px 180px, 250px 250px, 160px 160px, 220px 220px',
        opacity: 0.6
      }}
    />
  )
}