export default function BannerSlide({ img, subtitle, title, price }) {
  return (
    <div className="
      relative 
      min-w-full 
      snap-start 
      flex items-center justify-center
      h-[200px] sm:h-[260px] md:h-[320px] lg:h-[360px]
      bg-gradient-to-br from-gray-50 to-gray-100
      overflow-hidden
    ">
      {/* Background Image with object-cover - Fills container with slight cropping */}
      <img
        src={img}
        alt={title}
        className="
          w-full h-full 
          object-cover
          transition-all duration-700
        "
      />
      
      {/* Content Overlay with Better Visibility */}
      <div className="
        absolute inset-0
        bg-gradient-to-t from-black/80 via-black/30 to-transparent
        flex flex-col justify-end
        p-3 sm:p-4 md:p-6 lg:p-8
      ">
        <div className="max-w-xl">
          <p className="
            text-white/95 
            text-xs sm:text-sm md:text-base 
            font-medium 
            mb-1 sm:mb-2
            tracking-wide
            uppercase
          ">
            {subtitle}
          </p>
          
          <h2 className="
            text-white 
            text-lg sm:text-2xl md:text-3xl lg:text-4xl 
            font-bold 
            mb-2 sm:mb-3 
            leading-tight
            drop-shadow-lg
          ">
            {title}
          </h2>
          
          <p className="
            text-white 
            text-base sm:text-xl md:text-2xl 
            font-semibold 
            mb-3 sm:mb-4
          ">
            Starting at <span className="text-[#f0c14b]">₹{price}</span>
          </p>
          
          <button className="
            bg-white hover:bg-[#f0c14b] 
            text-gray-900 hover:text-white
            px-4 sm:px-8 py-2 sm:py-3 
            rounded-lg 
            font-semibold 
            text-xs sm:text-sm md:text-base
            transition-all duration-300
            hover:scale-105 
            active:scale-95
            shadow-lg hover:shadow-xl
            w-fit
          ">
            Shop Now →
          </button>
        </div>
      </div>
    </div>
  );
}
