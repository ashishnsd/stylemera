import { useState, useRef, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { products } from "../../data/Products";
import { CartContext } from "../../context/CartContext";
import { UIContext } from "../../context/UIContext";

export default function ProductGrid({ title = "New Products" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { selectedCategory, selectedFilters, showFilters, setShowFilters } = useContext(UIContext);
  const gridRef = useRef(null);
  const moreProductsRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  // Filter products by category and design filters
  let filteredProducts = selectedCategory 
    ? products.filter(p => p.category?.toLowerCase().includes(selectedCategory.toLowerCase()))
    : products;

  // Apply design filters (placeholder - add design field to products later)
  // Apply price filters
  if (selectedFilters.price?.length > 0) {
    const priceRanges = {
      budget: [0, 500],
      midrange: [500, 2000],
      premium: [2000, Infinity]
    };
    filteredProducts = filteredProducts.filter(p => {
      return selectedFilters.price.some(priceId => {
        const [min, max] = priceRanges[priceId];
        return p.price >= min && p.price <= max;
      });
    });
  }

  const displayProducts = filteredProducts.slice(0, 4);
  const remainingProducts = filteredProducts.slice(4);

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
        <div className="mb-8">
          <h2 className="title text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-[0.15em] flex items-center gap-3 relative group">
            <span className="inline-block w-2 sm:w-2.5 h-8 sm:h-10 bg-gradient-to-b from-[#f0c14b] via-[#f0c14b]/80 to-transparent rounded-full shadow-lg shadow-[#f0c14b]/30" aria-hidden="true"></span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent relative">
              {title}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent opacity-50"></span>
            </span>
            <span className="flex-1 h-0.5 bg-gradient-to-r from-[#f0c14b]/30 to-transparent ml-2"></span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 ml-8 font-medium tracking-wide">Discover our latest collection</p>
        </div>

        {/* Filter Toggle Button */}
        <div className="mb-6 flex items-center gap-3 animate-in fade-in duration-300">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#f0c14b] to-yellow-400 text-gray-900 font-bold text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out"
          >
            <ion-icon 
              name={showFilters ? "chevron-up" : "chevron-down"} 
              class={`text-lg transition-all duration-500 ease-out ${showFilters ? 'rotate-0' : 'rotate-180'}`}
              style={{
                transform: showFilters ? 'rotate(0deg)' : 'rotate(180deg)',
                transformOrigin: 'center'
              }}
            ></ion-icon>
            <span className="transition-all duration-300 ease-out">
              {showFilters ? "Hide Filters" : "Show Filters"}
            </span>
          </button>
          {Object.values(selectedFilters).some(arr => arr.length > 0) && (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold animate-in fade-in zoom-in duration-300">
              {Object.values(selectedFilters).flat().length} Active
            </span>
          )}
        </div>

        {/* Filter Bar - Smooth Height Animation */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-out ${
            showFilters 
              ? 'max-h-screen opacity-100 mb-6 visible' 
              : 'max-h-0 opacity-0 mb-0 invisible'
          }`}
        >
          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            <FilterBar />
          </div>
        </div>

        {/* Products Count */}
        {filteredProducts.length > 0 && (
          <p className="text-sm text-gray-600 mb-4 font-medium">
            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> products
          </p>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg font-medium mb-2">No products found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}

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
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-[#f0c14b] to-transparent rounded-full" aria-hidden="true"></span>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  More Products
                </span>
              </h3>
              <p className="text-sm text-gray-500 mt-1 ml-6 font-medium">Browse our full collection</p>
            </div>
            
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
            <div className="relative px-4">
              <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-hide pl-2">
                {remainingProducts.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden transition-all duration-300 ease-out snap-center ${
                      selectedIndex === index 
                        ? 'ring-4 ring-[#f0c14b] ring-opacity-50 shadow-lg' 
                        : 'hover:shadow-md hover:scale-105'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
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

