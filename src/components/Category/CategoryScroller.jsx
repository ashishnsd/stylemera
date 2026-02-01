import React, { useState } from "react";
import { products } from "../../data/Products";
// Category representative product images
import dressImg from "../../assets/images/products/clothes-1.jpg";
import glassesImg from "../../assets/images/products/clothes-2.jpg";
import tshirtImg from "../../assets/images/products/shirt-1.jpg";
import jacketImg from "../../assets/images/products/jacket-1.jpg";
import watchImg from "../../assets/images/products/watch-1.jpg";
import hatImg from "../../assets/images/products/hat_cutout_fancy_simple.png";
import shoeImg from "../../assets/images/products/shoe-1.jpg";
import jewelryImg from "../../assets/images/products/jewellery-1.jpg";
import perfumeImg from "../../assets/images/products/perfume.jpg";
import cosmeticsImg from "../../assets/images/products/christianlouboutin-rougelouboutin-velvet-matte.png";
import bagImg from "../../assets/images/products/bag-tote_bag_spacious_and_perfect_for.jpg";

const categories = [
  { title: "Dress", count: 53, icon: dressImg },
  { title: "Glasses", count: 68, icon: glassesImg },
  { title: "T-Shirts", count: 155, icon: tshirtImg },
  { title: "Jacket", count: 48, icon: jacketImg },
  { title: "Watch", count: 73, icon: watchImg },
  { title: "Hats", count: 39, icon: hatImg },
  { title: "Shoes", count: 92, icon: shoeImg },
  { title: "Jewelry", count: 61, icon: jewelryImg },
  { title: "Perfume", count: 34, icon: perfumeImg },
  { title: "Cosmetics", count: 125, icon: cosmeticsImg },
  { title: "Bags", count: 88, icon: bagImg },
];

export default function CategoryScroller() {
  const [activeSection, setActiveSection] = useState(null);
  return (
    <>
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          {/* Simple Header */}
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Categories
          </h3>
          {/* Connected Dots Scroller */}
          <div className="relative" style={{ zIndex: 10, position: 'relative' }}>
            {/* Connecting Line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-gray-200"></div>
                <div className="flex gap-8 overflow-x-auto pb-2 hide-scrollbar justify-center items-center"
                  style={{ position: 'relative', left: '0', top: '0', zIndex: 20, boxShadow: '0 8px 32px -8px rgba(240,193,75,0.15), 0 2px 8px -2px rgba(0,0,0,0.08)', paddingLeft: '32px', marginLeft: '-16px', paddingTop: '12px', paddingRight: '32px', marginRight: '-16px' }}>
              {categories.map((cat, index) => (
                <a
                  href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}-section`}
                  key={cat.title}
                  className={`group flex-shrink-0 relative${activeSection === cat.title ? ' ring-2 ring-[#f0c14b]' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    setActiveSection(cat.title);
                    setTimeout(() => {
                      const section = document.getElementById(`${cat.title.toLowerCase().replace(/\s+/g, '-')}-section`);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                  }}
                >
                  {/* Dot */}
                  <div className="relative flex flex-col items-center">
                    {/* Circle */}
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#f0c14b] flex items-center justify-center mb-2 transition-all duration-300 ease-out group-hover:scale-105 relative z-10 shadow-sm group-hover:shadow-lg overflow-hidden">
                      <img 
                        src={cat.icon} 
                        alt={cat.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-110"
                      />
                    </div>
                    {/* Title */}
                    <span className="text-xs text-gray-600 group-hover:text-gray-900 font-medium transition-all duration-300 ease-out">
                      {cat.title}
                    </span>
                    {/* Count */}
                    <span className="text-[10px] text-gray-400 mt-0.5 transition-colors duration-300 ease-out">
                      {cat.count}
                    </span>
                  </div>
                  {/* Active Indicator */}
                  <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#f0c14b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
      {/* Category Sections - Only show active */}
      {categories.map(cat => {
        const filteredProducts = products.filter(p => p.category?.toLowerCase() === cat.title.toLowerCase());
        return activeSection === cat.title ? (
          <div
            key={cat.title}
            id={`${cat.title.toLowerCase().replace(/\s+/g, '-')}-section`}
            className="container mx-auto px-4 py-12"
          >
            {/* Neo-Brutalism Header */}
            <div className="flex items-center justify-center mb-8 bg-yellow-300 border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-[0.15em] flex items-center gap-3">
                  <span className="inline-block w-2 sm:w-2.5 h-8 sm:h-10 bg-gradient-to-b from-[#f0c14b] via-[#f0c14b]/80 to-transparent rounded-full shadow-lg shadow-[#f0c14b]/30" aria-hidden="true"></span>
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent relative">
                    {cat.title}
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent opacity-50"></span>
                  </span>
                  <span className="flex-1 h-0.5 bg-gradient-to-r from-[#f0c14b]/30 to-transparent"></span>
                </h2>
                <p className="text-sm text-gray-500 mt-2 ml-8 font-medium tracking-wide">Total products: {filteredProducts.length}</p>
              </div>
            </div>
            
            {/* Products Grid - Blog Style */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mb-8">
                {filteredProducts.slice(0, 12).map((product, index) => (
                  <a 
                    href={`/product/${product.id}`}
                    key={product.id}
                    className="block group"
                  >
                    <div
                      className={`relative overflow-hidden border-4 border-black mb-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ${
                        index % 4 === 0
                          ? "bg-yellow-200"
                          : index % 4 === 1
                          ? "bg-pink-200"
                          : index % 4 === 2
                          ? "bg-cyan-200"
                          : "bg-purple-200"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-square object-cover border-b-4 border-black"
                      />
                    </div>

                    <div>
                      {product.badge && (
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full border-2 border-black text-black text-xs font-black uppercase mb-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all ${
                            index % 3 === 0
                              ? "bg-yellow-400"
                              : index % 3 === 1
                              ? "bg-pink-400"
                              : "bg-cyan-400"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}

                      <h3 className="text-black text-sm font-black leading-tight mb-1 uppercase tracking-tight line-clamp-2 hover:text-pink-600 transition-colors">
                        {product.title}
                      </h3>

                      <div className="flex items-center justify-between gap-2 bg-white border-3 border-black px-2 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-sm line-through text-gray-500">₹{product.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-6 text-center">No products found in this category.</p>
            )}
            
            <div className="flex justify-center">
              <a 
                href={`/category/${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block bg-yellow-400 border-4 border-black px-8 py-3 text-black font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                View All Products
              </a>
            </div>
          </div>
        ) : null;
      })}
    </>
  );
}
