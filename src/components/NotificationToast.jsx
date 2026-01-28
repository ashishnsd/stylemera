import { useContext, useEffect, useState } from "react";
import { UIContext } from "../context/UIContext";
import productImg1 from "../assets/images/products/jewellery-1.jpg";
import productImg2 from "../assets/images/products/shoe-1.jpg";
import productImg3 from "../assets/images/products/watch-1.jpg";
import productImg4 from "../assets/images/products/jacket-1.jpg";

const products = [
  { name: "Rose Gold Earrings", image: productImg1 },
  { name: "Sports Sneakers", image: productImg2 },
  { name: "Smart Watch", image: productImg3 },
  { name: "Winter Jacket", image: productImg4 }
];

export default function NotificationToast() {
  const { isToastOpen, setToastOpen } = useContext(UIContext);
  const [progress, setProgress] = useState(100);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [position, setPosition] = useState({ top: '20%', left: '5%' });
  const [randomTime, setRandomTime] = useState(2);

  // Auto-show toast at random intervals with different products and positions
  useEffect(() => {
    const showToast = () => {
      // Random position on screen (mobile-safe)
      const randomTop = Math.random() * 50 + 10; // 10% to 60%
      const randomLeft = Math.random() * 40 + 5; // 5% to 45%
      setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
      
      // Random time 1-9 minutes
      const time = Math.floor(Math.random() * 9) + 1;
      setRandomTime(time);
      
      setToastOpen(true);
      setCurrentProductIndex((prev) => (prev + 1) % products.length);
    };

    // Show first toast after random delay (5-15 seconds)
    const initialDelay = Math.random() * 10000 + 5000;
    const initialTimer = setTimeout(() => {
      showToast();
    }, initialDelay);

    // Then show at random intervals (10-60 seconds)
    let intervalTimer;
    const scheduleNext = () => {
      const randomDelay = Math.random() * 50000 + 10000; // 10-60 seconds
      intervalTimer = setTimeout(() => {
        showToast();
        scheduleNext();
      }, randomDelay);
    };
    
    scheduleNext();

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(intervalTimer);
    };
  }, [setToastOpen]);

  // Auto-hide toast with progress bar
  useEffect(() => {
    if (isToastOpen) {
      setProgress(100);
      
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 2.5, 0)); // 100/40 = 2.5 per 100ms (4 seconds)
      }, 100);

      const hideTimer = setTimeout(() => {
        setToastOpen(false);
      }, 4000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(hideTimer);
      };
    }
  }, [isToastOpen, setToastOpen]);

  const currentProduct = products[currentProductIndex];

  return (
    <div 
      className={`md:hidden fixed bg-white max-w-[200px] rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 overflow-hidden transition-all duration-500 ease-out border border-gray-100 ${
        isToastOpen ? 'translate-y-0 opacity-100 scale-100 visible' : 'translate-y-8 opacity-0 scale-95 invisible'
      }`}
      style={{ top: position.top, left: position.left }}
    >
      {/* Progress bar */}
      <div className="h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
      
      <div className="p-1.5 flex items-start gap-1.5">
        {/* Product image with gradient border */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded blur-sm opacity-50" />
          <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-50 border border-white shadow-md">
            <img 
              src={currentProduct.image} 
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-3">
          {/* Badge */}
          <div className="inline-flex items-center gap-0.5 bg-green-50 text-green-600 text-[7px] font-semibold px-1 py-0.5 rounded-full mb-0.5">
            <ion-icon name="checkmark-circle" class="text-[8px]"></ion-icon>
            <span>Sale</span>
          </div>
          
          <p className="text-gray-800 font-semibold text-[10px] mb-0 leading-tight truncate">
            {currentProduct.name}
          </p>
          
          <p className="text-gray-500 text-[7px] flex items-center gap-0.5 truncate">
            <ion-icon name="time-outline" class="text-[10px]"></ion-icon>
            <span>Purchased {randomTime} min ago</span>
          </p>
        </div>

        {/* Close button */}
        <button
          className="absolute top-0.5 right-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200"
          onClick={() => setToastOpen(false)}
          aria-label="Close notification"
        >
          <ion-icon name="close-outline" class="text-xs"></ion-icon>
        </button>
      </div>
    </div>
  );
}
