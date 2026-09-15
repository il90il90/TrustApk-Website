export default function PhoneFrame({ src, alt, scanning = false }) {
  return (
    <div className="relative mx-auto w-full max-w-[248px] sm:max-w-[270px]">
      <div className="relative rounded-[2.2rem] border-[7px] border-[#0b1118] bg-[#0b1118] shadow-2xl ring-1 ring-white/10">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-4 w-20 rounded-b-xl bg-[#0b1118]" />
        <div className="relative overflow-hidden rounded-[1.7rem] aspect-[9/19.5] bg-black">
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
          {scanning && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-brand/30 to-transparent animate-scan" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
