import { useContext } from "react";
import { UIContext } from "../../context/UIContext";

export default function MobileBottomNav() {
  const { setMobileMenuOpen } = useContext(UIContext);

  return (
    <div className="mobile-bottom-navigation md:hidden bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] mx-auto flex justify-around items-center py-[5px] shadow-[0_0_10px_hsla(0,0%,0%,0.25)] z-[5] rounded-t-md">
      <button 
        className="action-btn relative text-[26px] text-gray-800 p-2.5"
        onClick={() => setMobileMenuOpen(true)}
      >
        <ion-icon name="menu-outline"></ion-icon>
      </button>

      <button className="action-btn relative text-[26px] text-gray-800 p-2.5">
        <ion-icon name="bag-handle-outline"></ion-icon>
        <span className="count absolute top-0 right-0 bg-[#f0c14b] text-white text-xs font-medium leading-none py-[2px] px-1 rounded-full">
          0
        </span>
      </button>

      <button className="action-btn relative text-[26px] text-gray-800 p-2.5">
        <ion-icon name="home-outline"></ion-icon>
      </button>

      <button className="action-btn relative text-[26px] text-gray-800 p-2.5">
        <ion-icon name="heart-outline"></ion-icon>
        <span className="count absolute top-0 right-0 bg-[#f0c14b] text-white text-xs font-medium leading-none py-[2px] px-1 rounded-full">
          0
        </span>
      </button>

      <button 
        className="action-btn relative text-[26px] text-gray-800 p-2.5"
        onClick={() => setMobileMenuOpen(true)}
      >
        <ion-icon name="grid-outline"></ion-icon>
      </button>
    </div>
  );
}
