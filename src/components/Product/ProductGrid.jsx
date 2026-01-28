import { useState, useRef, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import { products } from "../../data/Products";
import { CartContext } from "../../context/CartContext";
import { GradientHeading } from "../Headings";

export default function ProductGrid({ title = "New Products" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const { addToCart } = useContext(CartContext);
  const gridRef = useRef(null);
  const moreProductsRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const displayProducts = products.slice(0, 4);
  const remainingProducts = products.slice(4);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMore(true);
        }
      },
      { threshold: 0.1 }
    );

    if (moreProductsRef.current) {
      observer.observe(moreProductsRef.current);
    }

    return () => {
      if (moreProductsRef.current) {
        observer.unobserve(moreProductsRef.current);
      }
    };
  }, []);

  // Handle swipe/touch navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    touchEndY.current = e.changedTouches[0].screenY;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && selectedIndex < remainingProducts.length - 1) {
        setSelectedIndex(prev => prev + 1);
      } else if (diffX < 0 && selectedIndex > 0) {
        setSelectedIndex(prev => prev - 1);
      }
    }
  };

  return (
    <div className="product-main flex-1">
      <div className="product-grid">
        <GradientHeading subtitle="Discover our latest collection">
          {title}
        </GradientHeading>

        {/* First 4 Products - List View */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {displayProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              {...p} 
              onImageClick={(product) => {
                setIsModalAnimating(true);
                setSelectedProduct(product);
              }}
            />
          ))}
        </div>

        {/* Main Slider with Thumbnail Navigation */}
        {remainingProducts.length > 0 && (
          <div 
            ref={moreProductsRef}
            className={`mt-8 transition-all duration-700 ease-out transform ${
              showMore 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">More Products</h3>
            
            {/* Main Product Display */}
            <div 
              ref={gridRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="mb-6 transition-all duration-500 ease-out cursor-pointer"
              style={{
                opacity: 1,
                transform: 'scale(1)'
              }}
            >
              <ProductCard 
                {...remainingProducts[selectedIndex]} 
                onImageClick={(product) => {
                  setIsModalAnimating(true);
                  setSelectedProduct(product);
                }}
              />
            </div>

            {/* Thumbnail Navigation */}
            <div className="relative px-1">
              <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-hide">
                {remainingProducts.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-3 transition-all duration-300 ease-out snap-center ${
                      selectedIndex === index 
                        ? 'border-[#f0c14b] ring-4 ring-[#f0c14b] ring-opacity-30 scale-110 shadow-lg' 
                        : 'border-gray-300 hover:border-gray-400 hover:shadow-md hover:scale-105'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {selectedIndex === index && (
                      <div className="absolute inset-0 border-2 border-[#f0c14b] rounded-xl pointer-events-none"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Full View Modal */}
        {selectedProduct && (
          <div 
            className={`fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
              isModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={() => {
              setIsModalAnimating(false);
              setTimeout(() => setSelectedProduct(null), 150);
            }}
          >
            <div 
              className={`bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform ${
                isModalAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Product Details</h3>
                <button
                  onClick={() => {
                    setIsModalAnimating(false);
                    setTimeout(() => setSelectedProduct(null), 150);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl text-gray-600">×</span>
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {selectedProduct.category && (
                  <span className="inline-block text-xs text-gray-500 mb-2">
                    {selectedProduct.category}
                  </span>
                )}

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {selectedProduct.title}
                </h2>

                {selectedProduct.description && (
                  <p className="text-gray-600 mb-4">
                    {selectedProduct.description}
                  </p>
                )}

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-[#f0c14b]">
                    ₹{selectedProduct.price}
                  </span>
                  {selectedProduct.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{selectedProduct.oldPrice}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setIsModalAnimating(false);
                      setTimeout(() => setSelectedProduct(null), 150);
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Add Cart
                  </button>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setIsModalAnimating(false);
                      setTimeout(() => setSelectedProduct(null), 150);
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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

