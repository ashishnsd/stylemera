import { useContext, useEffect, useState } from "react";
import { UIContext } from "../context/UIContext";
import newsletterImg from "../assets/images/newsletter.png";

export default function Modal() {
  const { isModalOpen, setModalOpen } = useContext(UIContext);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(true);
      setShowAnimation(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-500 ${
        showAnimation ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className="absolute inset-0" 
        onClick={() => setModalOpen(false)} 
      />

      <div 
        className={`relative max-w-[600px] w-full h-[500px] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-700 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <img 
            src={newsletterImg} 
            alt="newsletter background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 hover:rotate-90 border border-white/30"
          onClick={() => setModalOpen(false)}
          aria-label="Close modal"
        >
          <ion-icon name="close" class="text-2xl"></ion-icon>
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-10 sm:p-8">
          <div className="text-center mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs font-bold uppercase px-5 py-2 rounded-full mb-5 shadow-2xl">
              <ion-icon name="flash" class="text-base"></ion-icon>
              <span>Limited Time Offer</span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              <span className="block sm:hidden">Get 20% Off<br/>First Order</span>
              <span className="hidden sm:block">Get 20% Off<br/>Your First Order</span>
            </h3>
            
            <p className="text-white/90 text-lg mb-8 drop-shadow-lg max-w-md mx-auto">
              Join our exclusive community and unlock special deals & early access to new collections
            </p>
          </div>

          {/* Form */}
          <div className="max-w-md mx-auto w-full px-2">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                className="flex-1 text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-5 rounded-lg sm:rounded-xl bg-white/95 backdrop-blur-sm border-2 border-white/50 transition-all duration-300 focus:outline-none focus:bg-white focus:border-yellow-400 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.2)] placeholder:text-gray-500"
                placeholder="Enter your email"
              />
              <button 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-sm sm:text-base font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(251,191,36,0.5)] hover:-translate-y-1 whitespace-nowrap w-full sm:w-auto"
              >
                Subscribe
              </button>
            </div>

            <p className="text-center text-xs text-white/70 px-2">
              🔒 Your privacy is protected. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
