import { useState } from 'react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Modern Pill Search */}
      <div
        className={`relative flex items-center gap-2 transition-all duration-300 ${isFocused ? 'ring-2 ring-yellow-300/40 shadow-2xl' : 'shadow-md'} rounded-full overflow-hidden bg-white/95 border ${isFocused ? 'border-yellow-200' : 'border-gray-100'}`}
      >
        {/* Left badge icon */}
        <div className={`ml-2 flex items-center justify-center w-11 h-11 rounded-full ${isFocused ? 'bg-yellow-50' : 'bg-gray-50'}`}>
          <div className="search-badge flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-inner">
            <ion-icon name="search-outline" class="text-lg"></ion-icon>
          </div>
        </div>

        {/* Input */}
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          data-search-input
          className="search-field flex-1 py-3 pr-2 pl-3 text-[15px] text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-400 transition-colors duration-200"
          placeholder={isFocused ? "Search products, brands, categories..." : "Search products, brands, categories"}
          aria-label="Search products"
          autoComplete="off"
        />

        {/* Clear Button (styled) */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="mr-2 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            aria-label="Clear search"
            type="button"
          >
            <ion-icon name="close" class="text-base"></ion-icon>
          </button>
        )}

        {/* Action Button */}
        <button
          className="mr-2 ml-1 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition-transform duration-200"
          aria-label="Submit search"
          type="submit"
        >
          <span className="hidden sm:inline">Search</span>
          <ion-icon name="search-outline" class="text-base"></ion-icon>
        </button>
      </div>

      {/* Suggestions */}
      {isFocused && !searchValue && (
        <div className="absolute top-full left-0 right-0 mt-3 p-3 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
          <p className="text-xs text-gray-500 mb-2 font-medium">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {['Smartphones', 'Laptops', 'Headphones', 'Watches'].map((term) => (
              <button
                key={term}
                className="px-3 py-1.5 bg-gray-50 hover:bg-yellow-50 text-gray-700 rounded-full text-xs transition-all duration-200 border border-transparent hover:border-yellow-100"
                onMouseDown={(e) => { e.preventDefault(); setSearchValue(term); }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .search-field::-webkit-search-cancel-button { display: none; }
        .search-badge { transform: translateZ(0); }

        @keyframes fadeInQuick { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeInQuick 200ms ease-out; }

        /* small focus pop */
        .ring-2 { box-shadow: 0 6px 24px rgba(244,196,71,0.12); }
      `}</style>
    </div>
  );
}
