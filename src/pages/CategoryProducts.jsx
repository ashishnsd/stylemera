import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/Products";

export default function CategoryProducts() {
  const { category } = useParams();
  
  // Decode the category name and format it for matching
  const categoryName = category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Filter products by category
  const filteredProducts = products.filter(
    p => p.category?.toLowerCase() === categoryName.toLowerCase()
  );

  const categoryIcons = {
    "Dress": "👗",
    "Glasses": "👓",
    "T-Shirts": "👕",
    "Jacket": "🧥",
    "Watch": "⌚",
    "Hats": "🎩",
    "Shoes": "👞",
    "Jewelry": "💎",
    "Perfume": "🧴",
    "Cosmetics": "💄",
    "Bags": "👜",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{categoryIcons[categoryName] || "📦"}</span>
            <h1 className="text-4xl font-bold text-gray-900">{categoryName}</h1>
          </div>
          <p className="text-gray-600">
            Showing <span className="font-bold text-[#f0c14b]">{filteredProducts.length}</span> products in {categoryName}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <a
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image Container */}
                  <div className="relative bg-gray-100 aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-[#f0c14b] text-gray-900 text-xs font-bold px-2 py-1 rounded">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Discount */}
                    {product.oldPrice && (
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        Save ₹{product.oldPrice - product.price}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-12">
              <button className="bg-[#f0c14b] text-gray-900 font-bold px-8 py-3 rounded-full shadow hover:bg-yellow-400 transition">
                Load More Products
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
