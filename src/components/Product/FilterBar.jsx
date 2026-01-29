import { useContext } from "react";
import { UIContext } from "../../context/UIContext";

export default function FilterBar() {
  const { selectedFilters, setSelectedFilters } = useContext(UIContext);

  const filterGroups = {
    design: [
      { id: "solid", label: "Solid", icon: "🎨" },
      { id: "striped", label: "Striped", icon: "📊" },
      { id: "printed", label: "Printed", icon: "🖨️" },
      { id: "tie-dye", label: "Tie-Dye", icon: "🌀" },
      { id: "colorblock", label: "Color Block", icon: "🔲" },
      { id: "floral", label: "Floral", icon: "🌸" }
    ],
    color: [
      { id: "red", label: "Red", color: "#EF4444" },
      { id: "blue", label: "Blue", color: "#3B82F6" },
      { id: "black", label: "Black", color: "#1F2937" },
      { id: "white", label: "White", color: "#F3F4F6" },
      { id: "yellow", label: "Yellow", color: "#FBBF24" },
      { id: "green", label: "Green", color: "#10B981" }
    ],
    price: [
      { id: "budget", label: "₹0 - ₹500", range: [0, 500] },
      { id: "midrange", label: "₹500 - ₹2000", range: [500, 2000] },
      { id: "premium", label: "₹2000+", range: [2000, Infinity] }
    ]
  };

  const toggleFilter = (filterType, filterId) => {
    setSelectedFilters(prev => {
      const current = prev[filterType] || [];
      if (current.includes(filterId)) {
        return { ...prev, [filterType]: current.filter(id => id !== filterId) };
      } else {
        return { ...prev, [filterType]: [...current, filterId] };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({ design: [], color: [], price: [] });
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-6 mb-8 transition-all duration-300 ease-out">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#f0c14b] rounded"></span>
          Filters
        </h3>
        {Object.values(selectedFilters).some(arr => arr.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="text-sm font-semibold text-[#f0c14b] hover:text-yellow-600 transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Design Filters */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Design</h4>
        <div className="flex flex-wrap gap-2">
          {filterGroups.design.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter("design", filter.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                selectedFilters.design?.includes(filter.id)
                  ? "bg-[#f0c14b] text-gray-900 shadow-md scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
              }`}
            >
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filters */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Color</h4>
        <div className="flex flex-wrap gap-3">
          {filterGroups.color.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter("color", filter.id)}
              className={`w-10 h-10 rounded-full border-3 transition-all duration-200 ease-out hover:scale-110 ${
                selectedFilters.color?.includes(filter.id)
                  ? "border-[#f0c14b] scale-110 shadow-lg"
                  : "border-gray-300 hover:shadow-md"
              }`}
              style={{ backgroundColor: filter.color }}
              title={filter.label}
            ></button>
          ))}
        </div>
      </div>

      {/* Price Filters */}
      <div>
        <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Price Range</h4>
        <div className="flex flex-wrap gap-2">
          {filterGroups.price.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter("price", filter.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                selectedFilters.price?.includes(filter.id)
                  ? "bg-[#f0c14b] text-gray-900 shadow-md scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {Object.values(selectedFilters).some(arr => arr.length > 0) && (
        <div className="mt-6 pt-4 border-t border-gray-200 animate-in fade-in duration-300">
          <p className="text-xs font-semibold text-gray-600 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.design?.map(id => (
              <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium animate-in fade-in zoom-in duration-300">
                {filterGroups.design.find(f => f.id === id)?.label}
                <button onClick={() => toggleFilter("design", id)} className="hover:text-blue-900 transition-colors duration-200">✕</button>
              </span>
            ))}
            {selectedFilters.color?.map(id => (
              <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium animate-in fade-in zoom-in duration-300">
                {filterGroups.color.find(f => f.id === id)?.label}
                <button onClick={() => toggleFilter("color", id)} className="hover:text-green-900 transition-colors duration-200">✕</button>
              </span>
            ))}
            {selectedFilters.price?.map(id => (
              <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium animate-in fade-in zoom-in duration-300">
                {filterGroups.price.find(f => f.id === id)?.label}
                <button onClick={() => toggleFilter("price", id)} className="hover:text-purple-900 transition-colors duration-200">✕</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
