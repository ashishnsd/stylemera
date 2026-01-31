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

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setModalOpen(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-500 ${
        showAnimation ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onKeyDown={handleKeyDown}
      tabIndex="-1"
    >
      <div 
        className={`relative max-w-[600px] w-full h-[500px] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-700 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        } bg-white/10 backdrop-blur-xl border border-white/20`}
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
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 hover:rotate-90 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={() => setModalOpen(false)}
          aria-label="Close modal"
        >
          <ion-icon 
            name="close" 
            class="text-3xl text-white hover:text-yellow-400 transition-all duration-300 drop-shadow-lg"
          ></ion-icon>
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-10 sm:p-8">
          <div className="text-center mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs font-bold uppercase px-5 py-2 rounded-full mb-5 shadow-2xl">
              <ion-icon 
                name="flash" 
                class="text-lg text-yellow-500 drop-shadow-md"
              ></ion-icon>
              <span>Limited Time Offer</span>
            </div>

            <h3 id="modal-title" className="mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-[0_6px_18px_rgba(0,0,0,0.5)] leading-none">
                    20%
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Off
                  </span>
                </div>
                <span className="text-base sm:text-lg text-white/90 font-medium">
                  Get your first order
                </span>
              </div>
            </h3>
            
            <p id="modal-description" className="text-lg sm:text-xl mb-8 drop-shadow-sm max-w-md mx-auto font-medium text-white/90">
              Join our <span className="font-bold text-white">exclusive community</span> and unlock <span className="font-bold text-white">special deals</span> & early access to new collections
            </p>
          </div>

          {/* Form */}
          <div className="max-w-md mx-auto w-full px-2">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                className="flex-1 text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-5 rounded-lg sm:rounded-xl bg-white/95 backdrop-blur-sm border-2 border-white/50 transition-all duration-300 focus:outline-none focus:bg-white focus:border-yellow-400 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.2)] placeholder:text-gray-500"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-base font-extrabold px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl shadow-lg transition-transform duration-200 hover:-translate-y-0.5 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <ion-icon name="mail-open" class="text-xl text-white drop-shadow"></ion-icon>
                Subscribe
              </button>
            </div>

            <p className="text-center text-sm text-white/80 px-2 mb-2 font-semibold tracking-wide">
              Stay connected with us for <span className="text-yellow-300">exclusive updates</span>.
            </p>

            <p className="text-center text-xs text-white/70 px-2 italic">
              🔒 Your privacy is protected. <span className="text-pink-300">Unsubscribe anytime.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

<style>
  {`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 6s ease infinite;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
      20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    .animate-shake {
      animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    }
  `}
</style>
