import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../../context/UIContext";
import HeaderTop from "./HeaderTop";
import HeaderMain from "./HeaderMain";
import DesktopNav from "./DesktopNav";
import MobileBottomNav from "./MobileBottomNav";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";

export default function Header() {
  const { showSearchBar, setShowSearchBar } = useContext(UIContext);
  const [showSearchInNav, setShowSearchInNav] = useState(false);
  const rafRef = useRef(null);
  const lastStateRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        let shouldShow = lastStateRef.current;

        // Larger hysteresis: Show at 850px, hide at 700px
        if (scrollY > 850) {
          shouldShow = true;
        } else if (scrollY < 700) {
          shouldShow = false;
        }
        
        // Only update if state changed
        if (shouldShow !== lastStateRef.current) {
          lastStateRef.current = shouldShow;
          setShowSearchInNav(shouldShow);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Hide the sticky search bar when the floating icon drops into the nav
  useEffect(() => {
    if (showSearchInNav) {
      setShowSearchBar(false);
    }
  }, [showSearchInNav, setShowSearchBar]);

  return (
    <>
      <header>
        <HeaderTop />
        <HeaderMain />
        <DesktopNav />
        <MobileBottomNav showSearchIcon={showSearchInNav} />
        <MobileNav />
      </header>
      
      {/* Sticky Search Bar - Shutter close before hiding on mobile */}
      <div
        className={`sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm overflow-hidden transition-[max-height,opacity] duration-700 ${
          showSearchBar
            ? 'block max-h-20 opacity-100'
            : 'md:block hidden max-h-0 opacity-0 md:opacity-100 md:max-h-20 pointer-events-none md:pointer-events-auto'
        }`}
        style={{ transitionDelay: showSearchBar ? '320ms' : '0ms' }}
      >
        <div className="container mx-auto px-4 py-2">
          <div
            className={`origin-left transform transition-transform duration-300 ${
              showSearchBar ? 'scale-x-100' : 'scale-x-0'
            }`}
          >
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}
