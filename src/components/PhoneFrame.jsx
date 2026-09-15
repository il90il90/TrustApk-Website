// A premium device frame. Responsive width, subtle metallic edge, side buttons,
// pill camera cutout, and an optional scanning overlay.
export default function PhoneFrame({ src, alt, scanning = false, glow = false }) {
  // src is e.g. './shots/dashboard.jpg'; frames use the smaller -sm variants.
  const base = src.replace(/\.jpg$/, '')
  return (
    <div className="relative mx-auto w-full max-w-[248px] sm:max-w-[264px]">
      {/* side buttons */}
      <span className="absolute -left-[3px] top-[22%] h-9 w-[3px] rounded-l bg-[#243244]" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[33%] h-14 w-[3px] rounded-l bg-[#243244]" aria-hidden="true" />
      <span className="absolute -right-[3px] top-[26%] h-16 w-[3px] rounded-r bg-[#243244]" aria-hidden="true" />

      <div
        className={`relative rounded-[2.4rem] p-[3px] bg-gradient-to-b from-[#2a3a4d] via-[#0e151e] to-[#2a3a4d] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ${
          glow ? 'ring-1 ring-brand/30' : ''
        }`}
      >
        <div className="relative rounded-[2.2rem] border-[6px] border-[#080c12] bg-[#080c12]">
          {/* camera pill */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-[18px] w-[64px] rounded-full bg-black/90 flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1b2836]" />
            <span className="h-1 w-1 rounded-full bg-[#22303f]" />
          </div>
          <div className="relative overflow-hidden rounded-[1.7rem] aspect-[9/19.5] bg-black">
            <picture>
              <source type="image/webp" srcSet={`${base}-sm.webp`} />
              <img
                src={`${base}-sm.jpg`}
                alt={alt}
                loading="lazy"
                decoding="async"
                width="520"
                height="1214"
                className="h-full w-full object-cover object-top"
              />
            </picture>
            {scanning && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-brand/30 to-transparent animate-scan" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
