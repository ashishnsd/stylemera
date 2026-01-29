import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

function ProductCard({
  id,
  image,
  title,
  price,
  description,
  badge,
  rating,
  oldPrice,
  category,
  onImageClick
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, title, price, image, category, oldPrice });
  };

  const handleImageClick = () => {
    if (onImageClick) {
      setIsAnimating(true);
      onImageClick({ id, title, price, image, category, oldPrice, description });
    }
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden flex h-36 sm:h-44 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer hover:border-[#f0c14b]"
      onClick={handleImageClick}
    >

      {/* Image */}
      <div 
        className="relative w-36 sm:w-44 flex-shrink-0 bg-gray-50 overflow-hidden transition-all duration-300"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 ease-out hover:scale-110"
          loading="lazy"
        />

        {badge && (
          <span className="absolute top-1 left-1 bg-black text-white text-[9px] px-1.5 py-0.5 transition-all duration-300 ease-out">
            {badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full text-xs flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-md"
        >
          {isLiked ? "♥" : "♡"}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col transition-all duration-300 ease-out">
        <div className="flex-1 flex flex-col">
          {category && (
            <span className="text-[9px] sm:text-[10px] text-gray-500 transition-all duration-300 ease-out">
              {category}
            </span>
          )}

          <h3 className="text-xs sm:text-sm font-semibold line-clamp-2 mt-1 transition-all duration-300 ease-out">
            {title}
          </h3>

          <p className="text-[9px] sm:text-[10px] text-gray-600 mt-1 line-clamp-2 flex-1 transition-all duration-300 ease-out">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-baseline gap-1 transition-all duration-300 ease-out">
            <span className="text-sm sm:text-base font-bold text-[#f0c14b] transition-colors duration-300 ease-out">
              ₹{price}
            </span>
            {oldPrice && (
              <span className="text-[9px] sm:text-[10px] text-gray-400 line-through transition-colors duration-300 ease-out">
                ₹{oldPrice}
              </span>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="bg-[#8b9a8b] hover:bg-[#6d7d6d] text-white text-[10px] sm:text-[11px] px-3 py-1.5 rounded transition-all duration-300 ease-out flex-shrink-0 hover:shadow-md hover:scale-105"
          >
            Add Cart
          </button>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ProductCard;
