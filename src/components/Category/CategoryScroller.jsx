import dress from "../../assets/images/icons/dress.svg";
import coat from "../../assets/images/icons/coat.svg";
import glasses from "../../assets/images/icons/glasses.svg";
import shorts from "../../assets/images/icons/shorts.svg";
import tee from "../../assets/images/icons/tee.svg";
import jacket from "../../assets/images/icons/jacket.svg";
import hat from "../../assets/images/icons/hat.svg";
import watch from "../../assets/images/icons/watch.svg";
import shoes from "../../assets/images/icons/shoes.svg";
import jewelry from "../../assets/images/icons/jewelry.svg";
import perfume from "../../assets/images/icons/perfume.svg";
import cosmetics from "../../assets/images/icons/cosmetics.svg";
import bag from "../../assets/images/icons/bag.svg";

const categories = [
  { title: "Dress", count: 53, icon: dress },
  { title: "Winter", count: 58, icon: coat },
  { title: "Glasses", count: 68, icon: glasses },
  { title: "Jeans", count: 84, icon: shorts },
  { title: "T-Shirts", count: 155, icon: tee },
  { title: "Jacket", count: 48, icon: jacket },
  { title: "Watch", count: 73, icon: watch },
  { title: "Hats", count: 39, icon: hat },
  { title: "Shoes", count: 92, icon: shoes },
  { title: "Jewelry", count: 61, icon: jewelry },
  { title: "Perfume", count: 34, icon: perfume },
  { title: "Cosmetics", count: 125, icon: cosmetics },
  { title: "Bags", count: 88, icon: bag },
];

export default function CategoryScroller() {
  return (
    <div className="py-6 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Simple Header */}
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Categories
        </h3>

        {/* Connected Dots Scroller */}
        <div className="relative">
          
          {/* Connecting Line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-gray-200"></div>

          <div className="flex gap-8 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat, index) => (
              <a
                href="#"
                key={cat.title}
                className="group flex-shrink-0 relative"
              >
                {/* Dot */}
                <div className="relative flex flex-col items-center">
                  
                  {/* Circle */}
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#f0c14b] flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm group-hover:shadow-md">
                    <img 
                      src={cat.icon} 
                      alt={cat.title}
                      className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Title */}
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 font-medium transition-colors duration-300">
                    {cat.title}
                  </span>

                  {/* Count */}
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    {cat.count}
                  </span>
                </div>

                {/* Active Indicator */}
                <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#f0c14b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
