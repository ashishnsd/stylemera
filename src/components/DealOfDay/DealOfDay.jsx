import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import shampoo from '../../assets/images/products/shampoo.jpg';
import jewellery2 from '../../assets/images/products/jewellery-2.jpg';

export default function DealOfDay() {
  const { addToCart } = useContext(CartContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 360,
    hours: 24,
    minutes: 59,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-play slider
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2); // 2 deals
    }, 5000); // 5 seconds

    return () => clearInterval(autoPlayInterval);
  }, []);

  const deals = [
    {
      id: 'deal-1',
      name: 'shampoo, conditioner & facewash packs',
      image: shampoo,
      price: 150,
      oldPrice: 200,
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor',
      sold: 20,
      available: 40,
      rating: 3
    },
    {
      id: 'deal-2',
      name: 'Rose Gold diamonds Earring',
      image: jewellery2,
      price: 1990,
      oldPrice: 2000,
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor',
      sold: 15,
      available: 40,
      rating: 5
    }
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="title text-xl sm:text-2xl font-bold mb-6 text-gray-800">Deal of the Day</h2>

      {/* Mobile Slider */}
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {deals.map((deal) => (
              <div 
                className="w-full flex-shrink-0"
                key={deal.id}
              >
                <div 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setIsModalAnimating(true);
                    setSelectedDeal(deal);
                  }}
                >
                  <div className="flex flex-col gap-2 p-2">
                    {/* Image Section - Much Larger on mobile */}
                    <div className="w-full">
                      <img 
                        src={deal.image} 
                        alt={deal.name} 
                        className="w-full h-56 object-cover rounded" 
                      />
                    </div>

                    {/* Content Section - Ultra Compact */}
                    <div className="flex-1 flex flex-col">
                      {/* Rating & Title in one line */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <ion-icon 
                              key={i} 
                              name={i < deal.rating ? "star" : "star-outline"}
                              className="text-xs"
                            ></ion-icon>
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-green-600">
                          {Math.round(((deal.oldPrice - deal.price) / deal.oldPrice) * 100)}% OFF
                        </span>
                      </div>

                      {/* Title */}
                      <a href="#">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1 hover:text-[#f0c14b] transition-colors line-clamp-1">
                          {deal.name}
                        </h3>
                      </a>

                      {/* Price & Button in one line */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-bold text-[#f0c14b]">
                            ₹{deal.price.toFixed(2)}
                          </span>
                          <del className="text-xs text-gray-400">
                            ₹{deal.oldPrice.toFixed(2)}
                          </del>
                        </div>
                        <button 
                          className="bg-[#8b9a8b] hover:bg-[#6d7d6d] text-white text-xs font-bold uppercase px-3 py-1 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: deal.id,
                              name: deal.name,
                              price: deal.price,
                              image: deal.image
                            });
                          }}
                        >
                          Add Cart
                        </button>
                      </div>

                      {/* Stock Status - Minimal */}
                      <div className="mb-2">
                        <div className="flex justify-between items-center text-xs text-gray-700 mb-1">
                          <span>Sold: <strong>{deal.sold}</strong></span>
                          <span>Available: <strong>{deal.available}</strong></span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-[#f0c14b] h-1 rounded-full transition-all"
                            style={{ width: `${(deal.sold / (deal.sold + deal.available)) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Countdown Timer - Minimal */}
                      <div className="mt-auto">
                        <p className="text-xs font-semibold text-gray-800 uppercase mb-1">
                          ⏰ Ends In:
                        </p>
                        <div className="grid grid-cols-4 gap-1">
                          <div className="bg-gray-100 rounded p-1 text-center">
                            <p className="text-xs font-bold text-gray-800">{timeLeft.days}</p>
                            <p className="text-[7px] text-gray-600 uppercase">Days</p>
                          </div>
                          <div className="bg-gray-100 rounded p-1 text-center">
                            <p className="text-xs font-bold text-gray-800">{timeLeft.hours}</p>
                            <p className="text-[7px] text-gray-600 uppercase">Hours</p>
                          </div>
                          <div className="bg-gray-100 rounded p-1 text-center">
                            <p className="text-xs font-bold text-gray-800">{timeLeft.minutes}</p>
                            <p className="text-[7px] text-gray-600 uppercase">Min</p>
                          </div>
                          <div className="bg-gray-100 rounded p-1 text-center">
                            <p className="text-xs font-bold text-gray-800">{String(timeLeft.seconds).padStart(2, '0')}</p>
                            <p className="text-[7px] text-gray-600 uppercase">Sec</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#f0c14b] scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Slider */}
      <div className="hidden md:block relative">
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {deals.map((deal) => (
              <div 
                className="w-full flex-shrink-0"
                key={deal.id}
              >
                <div 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setIsModalAnimating(true);
                    setSelectedDeal(deal);
                  }}
                >
                  <div className="flex flex-row gap-4 p-4">
                    {/* Image Section */}
                    <div className="flex-shrink-0 w-1/3">
                      <img 
                        src={deal.image} 
                        alt={deal.name} 
                        className="w-full h-48 object-cover rounded" 
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col">
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                        {[...Array(5)].map((_, i) => (
                          <ion-icon 
                            key={i} 
                            name={i < deal.rating ? "star" : "star-outline"}
                          ></ion-icon>
                        ))}
                      </div>

                      {/* Title */}
                      <a href="#">
                        <h3 className="text-base font-semibold text-gray-800 mb-2 hover:text-[#f0c14b] transition-colors line-clamp-2">
                          {deal.name}
                        </h3>
                      </a>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {deal.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-[#f0c14b]">
                          ₹{deal.price.toFixed(2)}
                        </span>
                        <del className="text-sm text-gray-400">
                          ₹{deal.oldPrice.toFixed(2)}
                        </del>
                        <span className="text-sm font-semibold text-green-600 ml-auto">
                          {Math.round(((deal.oldPrice - deal.price) / deal.oldPrice) * 100)}% OFF
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button 
                        className="w-full bg-[#8b9a8b] hover:bg-[#6d7d6d] text-white text-sm font-bold uppercase py-2.5 rounded transition-colors mb-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: deal.id,
                            name: deal.name,
                            price: deal.price,
                            image: deal.image
                          });
                        }}
                      >
                        Add Cart
                      </button>

                      {/* Stock Status */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
                          <span>Sold: <strong>{deal.sold}</strong></span>
                          <span>Available: <strong>{deal.available}</strong></span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#f0c14b] h-2 rounded-full transition-all"
                            style={{ width: `${(deal.sold / (deal.sold + deal.available)) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className="mt-auto">
                        <p className="text-sm font-semibold text-gray-800 uppercase mb-2">
                          ⏰ Offer Ends In:
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-gray-100 rounded p-2 text-center">
                            <p className="text-lg font-bold text-gray-800">{timeLeft.days}</p>
                            <p className="text-[9px] text-gray-600 uppercase">Days</p>
                          </div>
                          <div className="bg-gray-100 rounded p-2 text-center">
                            <p className="text-lg font-bold text-gray-800">{timeLeft.hours}</p>
                            <p className="text-[9px] text-gray-600 uppercase">Hours</p>
                          </div>
                          <div className="bg-gray-100 rounded p-2 text-center">
                            <p className="text-lg font-bold text-gray-800">{timeLeft.minutes}</p>
                            <p className="text-[9px] text-gray-600 uppercase">Min</p>
                          </div>
                          <div className="bg-gray-100 rounded p-2 text-center">
                            <p className="text-lg font-bold text-gray-800">{String(timeLeft.seconds).padStart(2, '0')}</p>
                            <p className="text-[9px] text-gray-600 uppercase">Sec</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#f0c14b] scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Full View Modal */}
      {selectedDeal && (
        <div 
          className={`fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
            isModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
          }`}
          onClick={() => {
            setIsModalAnimating(false);
            setTimeout(() => setSelectedDeal(null), 150);
          }}
        >
          <div 
            className={`bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform ${
              isModalAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Deal Details</h3>
              <button
                onClick={() => {
                  setIsModalAnimating(false);
                  setTimeout(() => setSelectedDeal(null), 150);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl text-gray-600">×</span>
              </button>
            </div>

            <div className="p-6">
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-6">
                <img
                  src={selectedDeal.image}
                  alt={selectedDeal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedDeal.name}
              </h2>

              {selectedDeal.description && (
                <p className="text-gray-600 mb-4">
                  {selectedDeal.description}
                </p>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#f0c14b]">
                  ₹{selectedDeal.price}
                </span>
                {selectedDeal.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{selectedDeal.oldPrice}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    addToCart({
                      id: selectedDeal.id,
                      name: selectedDeal.name,
                      price: selectedDeal.price,
                      image: selectedDeal.image,
                      oldPrice: selectedDeal.oldPrice
                    });
                    setIsModalAnimating(false);
                    setTimeout(() => setSelectedDeal(null), 150);
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Add Cart
                </button>
                <button 
                  onClick={() => {
                    addToCart({
                      id: selectedDeal.id,
                      name: selectedDeal.name,
                      price: selectedDeal.price,
                      image: selectedDeal.image,
                      oldPrice: selectedDeal.oldPrice
                    });
                    setIsModalAnimating(false);
                    setTimeout(() => setSelectedDeal(null), 150);
                  }}
                  className="w-full bg-[#f0c14b] hover:bg-[#e0b83b] text-gray-800 font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
