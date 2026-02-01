import React from "react";
import { useParams } from "react-router-dom";
import { categories } from "../components/Category/CategoryScroller";

export default function CategoryProducts() {
  const { category } = useParams();
  const cat = categories.find(c => c.title.toLowerCase().replace(/\s+/g, "-") === category);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{cat ? cat.title : "Category"} Products</h1>
      {/* Show more products and suggestions here */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
        {/* Example placeholder cards */}
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src={cat?.icon} alt={cat?.title} className="w-16 h-16 mb-2" />
            <span className="font-semibold">{cat?.title} Product {i}</span>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Suggestions</h2>
      <div className="flex gap-4 flex-wrap">
        {categories.filter(c => c.title !== cat?.title).slice(0, 4).map(sug => (
          <a href={`/category/${sug.title.toLowerCase().replace(/\s+/g, "-")}`}
             key={sug.title}
             className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#f0c14b]/30 transition">
            <img src={sug.icon} alt={sug.title} className="w-8 h-8" />
            <span className="font-medium">{sug.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
