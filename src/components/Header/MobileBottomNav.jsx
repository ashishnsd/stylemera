import { useContext, useEffect, useRef, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../../context/UIContext";

export default function MobileBottomNav({ showSearchIcon = false, isPerfumeLanding = false }) {
  const { setMobileMenuOpen, setShowSearchBar } = useContext(UIContext);
  const { wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [dropProgress, setDropProgress] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [flutterOffset, setFlutterOffset] = useState(0);
  const [navSearchVisible, setNavSearchVisible] = useState(showSearchIcon);
  const [navSearchLeaving, setNavSearchLeaving] = useState(false);
  const [navPump, setNavPump] = useState(false);
  const navRef = useRef(null);
  const rafRef = useRef(null);
  const prevShowSearchRef = useRef(showSearchIcon);
  const hideTimeoutRef = useRef(null);
  const pumpTimeoutRef = useRef(null);

  const openSearchBar = () => {
    setShowSearchBar(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const searchInput = document.querySelector("[data-search-input]");
      if (searchInput) {
        searchInput.focus();
      }
    }, 360);
  };

  const goHome = () => {
    navigate('/');
    setMobileMenuOpen(false);
    setShowSearchBar(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (showSearchIcon) {
      setNavSearchVisible(true);
      setNavSearchLeaving(false);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    } else if (navSearchVisible) {
      setNavSearchLeaving(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setNavSearchVisible(false);
        setNavSearchLeaving(false);
        hideTimeoutRef.current = null;
      }, 220);
    }

    // Pump effect when search icon hides
    if (!showSearchIcon && prevShowSearchRef.current) {
      setNavPump(true);
      if (pumpTimeoutRef.current) {
        clearTimeout(pumpTimeoutRef.current);
      }
      pumpTimeoutRef.current = setTimeout(() => {
        setNavPump(false);
        pumpTimeoutRef.current = null;
      }, 420);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      if (pumpTimeoutRef.current) {
        clearTimeout(pumpTimeoutRef.current);
        pumpTimeoutRef.current = null;
      }
    };
  }, [showSearchIcon, navSearchVisible]);

  useEffect(() => {
    const wasVisible = prevShowSearchRef.current;
    if (!wasVisible && showSearchIcon) {
      setIsDropping(true);
      setDropProgress(0);

      const duration = 2600;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        // soft easeOutExpo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -8 * t);
        const flutterDamp = 1 - Math.min(t * 1.25, 1);
        const flutter = Math.sin(elapsed / 120) * 6 * flutterDamp; // feather-like float
        setDropProgress(eased);
        setFlutterOffset(flutter);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setIsDropping(false);
          setFlutterOffset(0);
        }
      };

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    // When scroll up and icon becomes false, hide everything immediately
    if (wasVisible && !showSearchIcon) {
      setIsDropping(false);
      setDropProgress(0);
      setFlutterOffset(0);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }

    prevShowSearchRef.current = showSearchIcon;

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [showSearchIcon]);

  // Calculate translateY based on progress - from top to nav bar
  const navRect = navRef.current?.getBoundingClientRect();
  const targetRect = navRef.current?.querySelector('[data-nav-search]')?.getBoundingClientRect();
  const fallingIconSize = 48; // text-5xl ~ 48px
  const endY = targetRect
    ? targetRect.top + (targetRect.height / 2) - (fallingIconSize / 2)
    : (navRect ? navRect.top + (navRect.height / 2) - (fallingIconSize / 2) : window.innerHeight - 120);
  const endX = targetRect
    ? targetRect.left + (targetRect.width / 2) - (fallingIconSize / 2)
    : (navRect ? navRect.left + navRect.width - 56 : window.innerWidth - 56);
  const translateYValue = Math.min((dropProgress * endY) + flutterOffset, endY);
  
  // Smooth absorb phase - starts at 80% progress
  const absorbProgress = Math.min(Math.max((dropProgress - 0.8) / 0.2, 0), 1);
  const absorbEase = 1 - Math.pow(1 - absorbProgress, 3);
  
  // Falling icon: shrink and fade as it absorbs
  const fallingScale = 1 - (absorbEase * 0.5);
  const fallingOpacity = 1 - (absorbEase * 0.6);
  
  // Color transition: stay yellow until near end, then turn black quickly
  const colorChangeStart = 0.9; // start color change at 90%
  const colorProgress = Math.max((dropProgress - colorChangeStart) / (1 - colorChangeStart), 0);
  const iconColor = colorProgress > 0 
    ? `rgb(${Math.round(240 - (240 * colorProgress))}, ${Math.round(193 - (193 * colorProgress))}, ${Math.round(75 - (75 * colorProgress))})`
    : '#f0c14b'; // yellow
  
  // Nav placeholder: grows from 0 to full size smoothly
  const placeholderScale = absorbEase * 1;
  const placeholderOpacity = absorbEase;
  const blurValue = 0;

  return (
    <>
      {/* Animation container - Full page visibility */}
      {isDropping && dropProgress > 0.08 && (
        <div className="fixed inset-0 pointer-events-none z-50" style={{ overflow: 'visible' }}>
          {/* Falling icon - shrinks and fades as it approaches nav */}
          <button 
            className="text-5xl pointer-events-auto absolute"
            style={{ 
              perspective: '1000px', 
              background: 'none',
              border: 'none',
              padding: '0',
              color: iconColor,
              left: `${endX}px`,
              top: '0px',
              transform: `translateY(${translateYValue}px) scale(${fallingScale})`,
              opacity: fallingOpacity,
              filter: 'none',
              transition: 'none',
              willChange: 'transform, opacity, color'
            }}
            onClick={openSearchBar}
            aria-label="Open search"
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
      )}
    
      <div ref={navRef} className={`mobile-bottom-navigation md:hidden ${isPerfumeLanding ? 'bg-[#0a0a0a]' : 'bg-white'} fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] mx-auto flex justify-around items-center py-[5px] shadow-[0_0_10px_hsla(0,0%,0%,0.25)] z-10 rounded-t-md transition-all duration-500 overflow-visible`} style={{ perspective: '1200px' }}>
        <button 
          className={`action-btn relative text-[26px] ${isPerfumeLanding ? 'text-white/90' : 'text-gray-800'} p-2.5 transition-all duration-300 ${navPump ? 'pump-icon' : ''}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <ion-icon name="menu-outline"></ion-icon>
        </button>

        <button 
          className={`action-btn relative text-[26px] ${isPerfumeLanding ? 'text-white/90' : 'text-gray-800'} p-2.5 transition-all duration-300 ${navPump ? 'pump-icon' : ''}`}
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <ion-icon name="cart-outline"></ion-icon>
          <span className="count absolute top-0 right-0 bg-[#f0c14b] text-white text-xs font-medium leading-none py-[2px] px-1 rounded-full">
            0
          </span>
        </button>

        <button 
          className={`action-btn relative text-[26px] ${isPerfumeLanding ? 'text-white/90' : 'text-gray-800'} p-2.5 transition-all duration-300 ${navPump ? 'pump-icon' : ''}`}
          onClick={goHome}
        >
          <ion-icon name="home-outline"></ion-icon>
        </button>

        <button 
          className={`action-btn relative text-[26px] ${isPerfumeLanding ? 'text-white/90' : 'text-gray-800'} p-2.5 transition-all duration-300 ${navPump ? 'pump-icon' : ''}`}
          onClick={() => navigate('/wishlist')}
          aria-label={`Wishlist with ${wishlistItems.length} items`}
        >
          <ion-icon name={wishlistItems.length > 0 ? "heart" : "heart-outline"} className={wishlistItems.length > 0 ? 'text-[#f0c14b]' : ''}></ion-icon>
          {wishlistItems.length > 0 && (
            <span className="count absolute top-0 right-0 bg-[#f0c14b] text-white text-xs font-medium leading-none py-[2px] px-1 rounded-full">
              {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
            </span>
          )}
        </button>



        {/* Search Icon Slot - hidden during drop, shown after it completes */}
        <div
          className="overflow-hidden"
          style={{
            width: isDropping ? '48px' : (navSearchVisible || navSearchLeaving ? '48px' : '0px'),
            transition: 'width 260ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <button
            className="action-btn relative text-[26px] text-black p-2.5"
            data-nav-search
            style={{
              opacity: isDropping ? 0 : (navSearchVisible ? (navSearchLeaving ? 0 : 1) : 0),
              transform: isDropping
                ? 'scale(0.85)'
                : (navSearchLeaving || !navSearchVisible ? 'scale(0.85)' : 'scale(1)'),
              transition: isDropping ? 'none' : 'opacity 220ms ease, transform 220ms ease',
              pointerEvents: isDropping ? 'none' : (navSearchVisible ? 'auto' : 'none')
            }}
            onClick={openSearchBar}
            aria-label="Open search"
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pump {
          0% { transform: scale(1); }
          40% { transform: scale(1.12); }
          70% { transform: scale(0.96); }
          100% { transform: scale(1); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-in-out forwards;
          animation-delay: 0s;
        }

        .pump-icon {
          animation: pump 0.42s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </>
  );
}
