import { useState, useContext, useRef, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { products } from "../../data/Products";

export default function TrendingProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const productsPerPage = 12;
  const gridRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  
  // Get unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];
  
  // Filter products by category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Scroll triggers disabled on purpose

  const handlePageChange = (newPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (newPage > totalPages) {
        setCurrentPage(1);
      } else if (newPage < 1) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(newPage);
      }
      setIsTransitioning(false);
    }, 150);
  };

  const handleCategoryChange = (category) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setCurrentPage(1);
      setIsTransitioning(false);
    }, 150);
  };

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
    const swipeThreshold = 50; // minimum distance for swipe
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swiped left - go to next page
        if (currentPage < totalPages) {
          setCurrentPage(prev => prev + 1);
        }
      } else {
        // Swiped right - go to previous page
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
      }
    }
  };

  return (
    <div className="trending-products">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
        Trending
      </h2>

      {/* Category Filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ touchAction: 'pan-x' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-[#f0c14b] text-gray-800 shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Shopify-style Grid - Smaller Cards with Touch Navigation */}
      <div 
        ref={gridRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
        className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 transition-all duration-300 ease-out ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {currentProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
          >
            {/* Image */}
            <div 
              className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer" 
              onClick={() => {
                setIsModalAnimating(true);
                setSelectedProduct(product);
              }}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Quick Actions */}
              <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => addToWishlist(product)}
                  className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-[#f0c14b] transition-colors shadow-md"
                >
                  <ion-icon name="heart-outline" class="text-sm"></ion-icon>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-2">
              {/* Title */}
              <h3 className="text-xs font-medium text-gray-800 line-clamp-1 mb-1">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm font-bold text-[#f0c14b]">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <del className="text-[9px] text-gray-400">
                    ₹{product.oldPrice}
                  </del>
                )}
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-[#8b9a8b] hover:bg-[#6d7d6d] text-white text-[10px] font-bold py-1.5 rounded transition-colors"
              >
                Add Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            ←
          </button>
          
          <span className="text-xs font-medium text-gray-700">
            {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            →
          </button>
        </div>
      )}

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Full Screen Product View Modal */}
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
            className={`bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform ${
              isModalAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Image */}
              <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[#f0c14b] font-semibold text-sm uppercase mb-2">{selectedProduct.category}</p>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {selectedProduct.name}
                  </h1>

                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-3xl font-bold text-[#f0c14b]">
                      ₹{selectedProduct.price}
                    </p>
                    {selectedProduct.oldPrice && (
                      <del className="text-lg text-gray-400">
                        ₹{selectedProduct.oldPrice}
                      </del>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    High-quality product with excellent features and durability. Perfect choice for your needs.
                  </p>

                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">In Stock</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Free Delivery</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setIsModalAnimating(false);
                      setTimeout(() => setSelectedProduct(null), 150);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300"
                  >
                    Add Cart
                  </button>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setIsModalAnimating(false);
                      setTimeout(() => setSelectedProduct(null), 150);
                    }}
                    className="flex-1 bg-[#8b9a8b] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#6d7d6d] transition-all duration-300"
                  >
                    Buy Now
                  </button>
                </div>

                <button 
                  onClick={() => {
                    setIsModalAnimating(false);
                    setTimeout(() => setSelectedProduct(null), 150);
                  }}
                  className="mt-4 w-full text-gray-600 hover:text-gray-800 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
