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
            className="container mx-auto px-4 py-12 bg-gray-50"
          >
            <h2 className="text-2xl font-bold mb-2">{cat.title}</h2>
            <p className="text-gray-600 mb-6">Total products: {filteredProducts.length}</p>
            
            {/* Suggestions Section */}
            <h3 className="text-lg font-bold mb-4">Popular Products</h3>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
                {filteredProducts.slice(0, 12).map(sug => (
                  <a href={`/product/${sug.id}`}
                     key={sug.id}
                     className="bg-white rounded-lg shadow p-3 flex flex-col items-center hover:shadow-lg transition min-w-0">
                    <img src={sug.image} alt={sug.title} className="w-16 h-16 mb-2 object-cover rounded" />
                    <span className="font-semibold text-xs text-center line-clamp-2">{sug.title}</span>
                    <span className="text-[11px] text-gray-700 font-bold mt-1">₹{sug.price}</span>
                    {sug.badge && <span className="text-[10px] bg-[#f0c14b] text-gray-900 px-1.5 py-0.5 rounded-full mt-1 font-bold">{sug.badge}</span>}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-6">No products found in this category.</p>
            )}
            
            <div className="flex justify-center">
              <a href={`/category/${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                 className="bg-[#f0c14b] text-gray-900 font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-400 transition">
                View All Products
              </a>
            </div>
          </div>
        ) : null;
      })}
    </>
  );
}
