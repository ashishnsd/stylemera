import { useContext, useState } from "react";
import logo from "../../assets/images/logo/logo.svg";
import { UIContext } from "../../context/UIContext";
import { products } from "../../data/Products";

export default function FilterBar() {
  const { selectedFilters, setSelectedFilters } = useContext(UIContext);
  const [clearAnim, setClearAnim] = useState(false);

  const categoryOptions = Array.from(
    new Set(products.map(p => p.category).filter(Boolean))
  ).map(category => ({
    id: category.toLowerCase().replace(/\s+/g, "-"),
    label: category
  }));

  const badgeOptions = Array.from(
    new Set(products.map(p => p.badge).filter(Boolean))
  ).map(badge => ({
    id: badge.toLowerCase().replace(/\s+/g, "-"),
    label: badge
  }));

  const filterGroups = {
    category: categoryOptions,
    price: [
      { id: "budget", label: "₹0 - ₹500", range: [0, 500] },
      { id: "midrange", label: "₹500 - ₹2000", range: [500, 2000] },
      { id: "premium", label: "₹2000+", range: [2000, Infinity] }
    ],
    badge: badgeOptions
  };


  // Generic filter handler for future extensibility
  const handleFilterChange = (filterType, filterId) => {
    setSelectedFilters(prev => {
      const current = prev[filterType] || [];
      const updated = current.includes(filterId)
        ? current.filter(id => id !== filterId)
        : [...current, filterId];
      return { ...prev, [filterType]: updated };
    });
  };

  const clearAllFilters = () => {
    setClearAnim(true);
    setSelectedFilters({ category: [], price: [], badge: [] });
    setTimeout(() => setClearAnim(false), 400);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] p-6 sm:p-7 mb-8 transition-all duration-300 ease-out">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/60 via-white to-gray-50/60 pointer-events-none"></div>
      <div className="absolute -top-16 -right-12 w-40 h-40 rounded-full bg-[#f0c14b]/15 blur-2xl"></div>

      {/* Header + Extra Features */}
      <div className="relative flex items-center mb-6">
        <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.2em] text-gray-900 flex items-center gap-3">
          <span className="w-2 h-6 bg-gradient-to-b from-[#f0c14b] to-yellow-300 rounded-full shadow-sm"></span>
          Filters
        </h3>
      </div>
      {/* Clear All Button at Bottom */}
      {Object.values(selectedFilters).some(arr => arr.length > 0) && (
        <div className="flex justify-center mt-8">
          <button
            onClick={clearAllFilters}
            className={`text-base sm:text-lg font-bold uppercase tracking-wide px-8 py-3 rounded-full border-2 border-[#f0c14b] bg-[#fffbe6] text-yellow-900 shadow-lg hover:bg-[#f0c14b] hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] ${clearAnim ? 'animate-pulse scale-105' : ''}`}
            style={clearAnim ? { boxShadow: '0 0 0 6px #f0c14b44' } : {}}
          >
            <ion-icon name="close-circle" class="text-xl mr-2 align-middle"></ion-icon>
            Clear All
          </button>
        </div>
      )}


      {/* Category Filters */}
      <div className="relative mb-6">
        <h4 className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-widest mb-3">Category</h4>
        <div className="flex flex-wrap gap-2.5">
          {filterGroups.category.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange("category", filter.id)}
              className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-out border ${
                selectedFilters.category?.includes(filter.id)
                  ? "bg-gray-900 text-white border-gray-900 shadow-md shadow-black/10"
                  : "bg-white/90 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Centered Logo Layer below Category */}
      <div className="flex justify-center my-6">
          {/* Logo as card background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img
              src={logo}
              alt="Brand Logo Background"
              className="w-3/4 max-w-[320px] opacity-25"
              draggable="false"
            />
          </div>
      </div>

      {/* Price Filters */}
      <div className="relative mb-6">
        <h4 className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-widest mb-3">Price Range</h4>
        <div className="flex flex-wrap gap-2.5">
          {filterGroups.price.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange("price", filter.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-out border ${
                selectedFilters.price?.includes(filter.id)
                  ? "bg-[#f0c14b] text-gray-900 border-yellow-300 shadow-md shadow-yellow-300/30"
                  : "bg-white/90 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                selectedFilters.price?.includes(filter.id)
                  ? "bg-gray-900"
                  : "bg-gray-300"
              }`}></span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Badge Filters */}
      {filterGroups.badge.length > 0 && (
        <div className="relative">
          <h4 className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-widest mb-3">Offers</h4>
          <div className="flex flex-wrap gap-2.5">
            {filterGroups.badge.map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange("badge", filter.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-out border ${
                  selectedFilters.badge?.includes(filter.id)
                    ? "bg-gray-900 text-white border-gray-900 shadow-md shadow-black/10"
                    : "bg-white/90 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  selectedFilters.badge?.includes(filter.id)
                    ? "bg-[#f0c14b]"
                    : "bg-gray-300"
                }`}></span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
