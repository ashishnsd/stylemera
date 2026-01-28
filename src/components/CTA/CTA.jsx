import ctaBanner from "../../assets/images/cta-banner.jpg";

export default function CTA() {
  return (
    <div className="group relative w-full h-full min-h-[500px] md:min-h-[280px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:-translate-y-2"
      style={{
        boxShadow: '0 10px 40px rgba(236, 72, 153, 0.15), 0 2px 8px rgba(147, 51, 234, 0.1)'
      }}
    >
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={ctaBanner} 
          alt="Summer Collection" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-pink-600/20 group-hover:from-pink-500/30 group-hover:via-purple-500/20 group-hover:to-pink-600/30 transition-all duration-700" />
      </div>

      {/* Top half - Default state */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 via-black/30 to-transparent flex items-center justify-center transition-all duration-700 group-hover:-translate-y-full px-4">
        <div className="text-center transform transition-all duration-700 group-hover:scale-110">
          <span className="inline-block bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 text-white text-xs md:text-base font-black uppercase px-4 md:px-6 py-2 md:py-3 rounded-full shadow-2xl animate-pulse"
            style={{
              boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            }}
          >
            🔥 25% Off
          </span>
        </div>
      </div>

      {/* Bottom half - Default state */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-center transition-all duration-700 group-hover:translate-y-full px-4">
        <h2 className="text-white text-xl md:text-2xl font-black mb-2 md:mb-3 tracking-tight drop-shadow-lg">
          Summer Collection
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-xs md:text-sm line-through">₹999</span>
          <span className="text-white text-base md:text-lg font-bold">From ₹499</span>
        </div>
      </div>

      {/* Center content - Revealed on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
        <div className="bg-white/98 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl max-w-[92%] md:max-w-[88%] transform scale-95 group-hover:scale-100 transition-all duration-700"
          style={{
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(236, 72, 153, 0.1)'
          }}
        >
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] md:text-xs font-bold uppercase px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 shadow-lg">
            ⚡ Hot Deal
          </div>
          
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-xl md:text-3xl font-black mb-2 md:mb-3">
            Summer Sale
          </h2>
          
          <p className="text-gray-600 text-xs md:text-base mb-4 md:mb-5 font-medium">
            Up to 25% off on all summer items
          </p>
          
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 text-xs md:text-sm uppercase relative overflow-hidden group/btn"
            style={{
              boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)'
            }}
          >
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
