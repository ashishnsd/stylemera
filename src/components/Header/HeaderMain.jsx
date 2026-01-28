import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { UIContext } from "../../context/UIContext";
import SearchBar from "./SearchBar";
import logo from "../../assets/images/logo/logo.svg";

export default function HeaderMain() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { setCartOpen } = useContext(UIContext);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo */}
          <a 
            href="/" 
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
            aria-label="Homepage"
          >
            <img 
              src={logo} 
              alt="StyleMera logo" 
              width="120" 
              height="36"
              className="h-8 md:h-9 w-auto"
            />
          </a>

          {/* Search Bar - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* User Account */}
            <button 
              className="group relative p-2 md:p-2.5 text-gray-700 hover:text-[#f0c14b] transition-all duration-300 hover:bg-gray-50 rounded-lg"
              aria-label="User account"
            >
              <ion-icon 
                name="person-outline" 
                class="text-2xl md:text-[28px] group-hover:scale-110 transition-transform duration-300"
              ></ion-icon>
            </button>

            {/* Wishlist */}
            <button 
              className="group relative p-2 md:p-2.5 text-gray-700 hover:text-[#f0c14b] transition-all duration-300 hover:bg-gray-50 rounded-lg"
              aria-label={`Wishlist with ${wishlistItems.length} items`}
            >
              <ion-icon 
                name={wishlistItems.length > 0 ? "heart" : "heart-outline"}
                class={`text-2xl md:text-[28px] group-hover:scale-110 transition-transform duration-300 ${
                  wishlistItems.length > 0 ? 'text-[#f0c14b]' : ''
                }`}
              ></ion-icon>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-gradient-to-r from-[#f0c14b] to-[#f0c14b] text-white text-[10px] md:text-xs font-bold rounded-full px-1.5 shadow-md animate-pulse">
                  {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button 
              className="group relative p-2 md:p-2.5 text-[#f0c14b] hover:text-[#f0c14b] transition-all duration-300 hover:bg-yellow-50 rounded-lg active:scale-95 cursor-pointer"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart with ${cartItems.length} items`}
            >
              <ion-icon 
                name="bag-handle"
                class="text-2xl md:text-[28px] group-hover:scale-110 transition-transform duration-300 text-[#f0c14b]"
              ></ion-icon>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-gradient-to-r from-[#8b9a8b] to-[#6d7d6d] text-white text-[10px] md:text-xs font-bold rounded-full px-1.5 shadow-md animate-bounce-subtle">
                  {cartItems.length > 99 ? '99+' : cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle (Optional) */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-[#f0c14b] transition-colors duration-300"
              aria-label="Open menu"
            >
              <ion-icon name="menu-outline" class="text-2xl"></ion-icon>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Shows only on mobile */}
        <div className="md:hidden mt-3">
          <SearchBar />
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
      `}</style>
    </div>
  );
}
