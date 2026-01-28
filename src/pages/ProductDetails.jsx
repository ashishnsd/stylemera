import { useParams, useRef } from "react-router-dom";
import { products } from "../data/Products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const mainRef = useRef(null);

  if (!product) return <p>Product not found</p>;

  return (
    <main className="w-full px-2 sm:px-4 py-0 md:py-4" ref={mainRef}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden shadow-lg p-6">

          {/* Image Section */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden min-h-[400px]">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[#f0c14b] font-semibold text-sm uppercase mb-2">{product.category}</p>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <p className="text-4xl font-bold text-[#f0c14b]">
                  ₹{product.price}
                </p>
                {product.oldPrice && (
                  <del className="text-xl text-gray-400">
                    ₹{product.oldPrice}
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

            <button className="w-full bg-[#8b9a8b] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#6d7d6d] transition-all duration-300 shadow-md hover:shadow-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
