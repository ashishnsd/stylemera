import { useState, useRef, useEffect, useContext } from "react";
import logo from "../../assets/images/logo/logo.svg";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { products } from "../../data/Products";
import { CartContext } from "../../context/CartContext";
import { UIContext } from "../../context/UIContext";
import flyToCartFromElement from "../../utils/flyToCart";

export default function ProductGrid({ title = "New Products" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { selectedCategory, selectedFilters, showFilters, setShowFilters } = useContext(UIContext);
  const gridRef = useRef(null);
  const moreProductsRef = useRef(null);
  const filterPanelRef = useRef(null);
  const filterToggleRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  // Filter products by category and selected filters
  let filteredProducts = selectedCategory 
    ? products.filter(p => p.category?.toLowerCase().includes(selectedCategory.toLowerCase()))
    : products;

  // Apply category filters
  if (selectedFilters.category?.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      selectedFilters.category.some(categoryId =>
        p.category?.toLowerCase().replace(/\s+/g, "-") === categoryId
      )
    );
  }

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

  // Apply badge filters
  if (selectedFilters.badge?.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      selectedFilters.badge.some(badgeId =>
        p.badge?.toLowerCase().replace(/\s+/g, "-") === badgeId
      )
    );
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

  // Close filters on outside click & prevent background scroll
  useEffect(() => {
    // Prevent background scroll when filters open
    if (showFilters) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    if (!showFilters) return;

    const handleOutsideClick = (event) => {
      const panel = filterPanelRef.current;
      const toggle = filterToggleRef.current;

      if (!panel || !toggle) return;
      if (panel.contains(event.target) || toggle.contains(event.target)) return;

      setShowFilters(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.body.classList.remove('overflow-hidden');
    };
  }, [showFilters, setShowFilters]);

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
        <div id="new-products-section" className="mb-8">
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
            ref={filterToggleRef}
            onClick={() => setShowFilters(!showFilters)}
            className={`
              inline-flex items-center gap-2.5
              px-6 sm:px-8 py-2.5 sm:py-3
              rounded-lg font-semibold text-sm
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-md hover:shadow-lg
              ${
                showFilters
                  ? "bg-[#f0c14b] text-gray-900 hover:bg-yellow-300"
                  : "bg-white text-gray-900 hover:bg-[#f0c14b]"
              }
            `}
          >
            <ion-icon 
              name={showFilters ? "chevron-up" : "chevron-down"} 
              class={`text-lg transition-all duration-300 ease-out ${showFilters ? 'rotate-0' : 'rotate-180'}`}
              style={{
                transform: showFilters ? 'rotate(0deg)' : 'rotate(180deg)',
                transformOrigin: 'center'
              }}
            ></ion-icon>
            <span>{showFilters ? "Hide Filters ↑" : "Filters →"}</span>
          </button>
          {Object.values(selectedFilters).some(arr => arr.length > 0) && (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold animate-in fade-in zoom-in duration-300">
              {Object.values(selectedFilters).flat().length} Active
            </span>
          )}
        </div>

        {/* Filter Bar - With Backdrop for Better UX */}
        {showFilters && (
          <div>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
            />
            <div 
              ref={filterPanelRef}
              id="filter-bar-section"
              className={`fixed left-0 top-0 w-full max-w-md sm:max-w-lg z-40 bg-white shadow-2xl overflow-y-auto border-r-2 border-yellow-100 transition-transform duration-500 ease-[cubic-bezier(.77,0,.175,1)] will-change-transform
                ${showFilters ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
              style={{
                boxShadow: '8px 0 32px 0 rgba(0,0,0,0.10)',
                borderTopRightRadius: '2rem',
                borderBottomRightRadius: '2rem',
                maxHeight: '90vh',
                minHeight: 'auto',
                marginTop: '2.5rem',
                background: 'linear-gradient(135deg, #fffbe6 0%, #fff 100%)',
                transformOrigin: 'left center'
              }}
            >
              <div className="p-4 sm:p-6 pt-0">
                <FilterBar />
                <div className="flex flex-col gap-3 mt-10 px-2 pb-2">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full flex items-center justify-center gap-2 text-base sm:text-lg font-bold text-gray-900 bg-gradient-to-r from-[#ffe082] to-[#f0c14b] hover:from-[#f0c14b] hover:to-[#ffe082] rounded-2xl py-3 shadow-md transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] border border-yellow-200"
                    aria-label="Close filters"
                  >
                    <ion-icon name="arrow-back-outline" class="text-xl sm:text-2xl mr-1 opacity-80"></ion-icon>
                    <span>Back</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!showFilters && (
          <div 
            ref={filterPanelRef}
            id="filter-bar-section"
            className="overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 mb-0 invisible"
          />
        )}

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
            id="more-products-section"
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
                    onClick={(e) => {
                      e.stopPropagation && e.stopPropagation();
                      flyToCartFromElement(e.currentTarget);
                      addToCart(selectedProduct);
                      setIsModalAnimating(false);
                      setTimeout(() => setSelectedProduct(null), 150);
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Add Cart
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation && e.stopPropagation();
                      flyToCartFromElement(e.currentTarget);
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

