import { useState } from 'react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Container with Focus Ring */}
      <div 
        className={`relative flex items-center transition-all duration-300 ${
          isFocused 
            ? 'ring-2 ring-[#f0c14b]/40 shadow-lg shadow-[#f0c14b]/10' 
            : 'shadow-sm'
        } rounded-lg overflow-hidden bg-white border ${
          isFocused ? 'border-[#f0c14b]' : 'border-gray-200'
        }`}
      >
        {/* Search Icon - Left */}
        <div className="pl-4 pr-2 flex items-center text-gray-400">
          <ion-icon 
            name="search-outline" 
            class={`text-xl transition-colors duration-300 ${
              isFocused ? 'text-[#f0c14b]' : 'text-gray-400'
            }`}
          ></ion-icon>
        </div>

        {/* Input Field */}
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 py-3 px-2 text-[15px] text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-400 placeholder:transition-all placeholder:duration-300 focus:placeholder:text-gray-300"
          placeholder={isFocused ? "Search products, brands, categories..." : "What are you looking for?"}
          aria-label="Search products"
          autoComplete="off"
        />

        {/* Clear Button - Shows when typing */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="px-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 animate-fadeIn"
            aria-label="Clear search"
            type="button"
          >
            <ion-icon name="close-circle" class="text-xl"></ion-icon>
          </button>
        )}

        {/* Search Button - Right */}
        <button 
          className="px-4 py-3 bg-gradient-to-r from-[#f0c14b] to-[#f0c14b] text-white transition-all duration-300 hover:from-[#f0c14b] hover:to-[#f0c14b] hover:shadow-md active:scale-95 flex items-center gap-2 group"
          aria-label="Submit search"
          type="submit"
        >
          <span className="hidden sm:inline text-sm font-medium">Search</span>
          <ion-icon 
            name="search-outline" 
            class="text-lg sm:group-hover:scale-110 transition-transform duration-300"
          ></ion-icon>
        </button>
      </div>

      {/* Optional: Search Suggestions Hint */}
      {isFocused && !searchValue && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-100 animate-slideDown z-10">
          <p className="text-xs text-gray-500 mb-2 font-medium">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {['Smartphones', 'Laptops', 'Headphones', 'Watches'].map((term) => (
              <button
                key={term}
                className="px-3 py-1.5 bg-gray-50 hover:bg-[#f0c14b]/10 hover:text-[#f0c14b] text-gray-600 rounded-full text-xs transition-all duration-200 border border-transparent hover:border-[#f0c14b]/30"
                onClick={() => setSearchValue(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        .search-field::-webkit-search-cancel-button {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
