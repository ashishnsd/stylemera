import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";

export default function CartNotification() {
  const { cartItems } = useContext(CartContext);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const notificationRef = useRef(null);

  useEffect(() => {
    if (cartItems.length > 0) {
      const lastItem = cartItems[cartItems.length - 1];
      setNotification(lastItem);
      setSelectedProduct(null);
    }
  }, [cartItems]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragStart]);

  if (!notification) return null;

  return (
    <>
      {/* Sticky Cart Notification - Movable */}
      <div 
        ref={notificationRef}
        className="fixed bottom-6 right-6 bg-white border-2 border-[#f0c14b] rounded-lg shadow-2xl p-4 cursor-move hover:shadow-lg transition-shadow z-50 max-w-xs select-none touch-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={() => !isDragging && setSelectedProduct(notification)}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img 
              src={notification.image} 
              alt={notification.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Added to Cart</p>
            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
              {notification.name}
            </h4>
            <p className="text-sm font-bold text-[#f0c14b] mt-1">
              ₹{notification.price}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNotification(null);
            }}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        <p className="text-[10px] text-gray-500 mt-2 text-center">Tap to view details</p>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {selectedProduct.name}
              </h2>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-[#f0c14b]">
                  ₹{selectedProduct.price}
                </span>
                {selectedProduct.oldPrice && (
                  <del className="text-gray-400">₹{selectedProduct.oldPrice}</del>
                )}
              </div>

              {selectedProduct.description && (
                <p className="text-sm text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>
              )}

              <button className="w-full bg-[#8b9a8b] hover:bg-[#6d7d6d] text-white font-bold py-3 rounded-lg transition-colors">
                BUY
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
