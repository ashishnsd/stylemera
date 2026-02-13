export default function HeaderTop({ isPerfumeLanding = false }) {
  return (
    <div className={`${isPerfumeLanding ? 'border-b' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'} overflow-hidden`} style={isPerfumeLanding ? { background: 'transparent' } : undefined}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-2 md:py-3 gap-3 md:gap-0">
          
          {/* Social Links - Hidden on mobile, visible on tablet+ */}
          <ul className="hidden md:flex items-center gap-2">
            {[
              { name: 'logo-facebook', label: 'Facebook', color: 'hover:bg-[#1877f2]' },
              { name: 'logo-twitter', label: 'Twitter', color: 'hover:bg-[#1da1f2]' },
              { name: 'logo-instagram', label: 'Instagram', color: 'hover:bg-gradient-to-r hover:from-[#f58529] hover:to-[#dd2a7b]' },
              { name: 'logo-linkedin', label: 'LinkedIn', color: 'hover:bg-[#0077b5]' }
            ].map((social) => (
              <li key={social.name}>
                <a 
                  className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300 ${isPerfumeLanding ? 'bg-transparent text-white/90' : 'bg-white text-gray-600'} ${social.color} hover:text-white hover:scale-110 hover:shadow-md`}
                  href="#" 
                  aria-label={social.label}
                >
                  <ion-icon name={social.name} class="text-lg"></ion-icon>
                </a>
              </li>
            ))}
          </ul>

          {/* Parallax Scrolling Text Banner */}
          <div className="flex-1 relative overflow-hidden">
            <div className="parallax-text-wrapper">
              <div className="parallax-text">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#f0c14b] to-[#f0c14b] text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm">
                  <ion-icon name="gift-outline" class="text-base"></ion-icon>
                  Free Shipping
                </span>
                <span className={`${isPerfumeLanding ? 'text-white/90' : 'text-gray-700'} ml-2 text-xs md:text-sm`}>This Week Order Over <strong className="text-[#f0c14b]">₹499</strong></span>
                <span className="mx-3 text-[#f0c14b]">•</span>
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#f0c14b] to-[#f0c14b] text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm">
                  <ion-icon name="gift-outline" class="text-base"></ion-icon>
                  Free Shipping
                </span>
                <span className={`${isPerfumeLanding ? 'text-white/90' : 'text-gray-700'} ml-2 text-xs md:text-sm`}>This Week Order Over <strong className="text-[#f0c14b]">₹499</strong></span>
                <span className="mx-3 text-[#f0c14b]">•</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .parallax-text-wrapper {
          width: 100%;
          overflow: hidden;
        }
        
        .parallax-text {
          display: inline-flex;
          white-space: nowrap;
          animation: scrollText 20s linear infinite;
        }
        
        @keyframes scrollText {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
