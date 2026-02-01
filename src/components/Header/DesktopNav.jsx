export default function DesktopNav() {
  const menuItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { name: 'Categories', href: '#', hasDropdown: true },
    { name: "Men's", href: '/mens', hasDropdown: false },
    { name: "Women's", href: '/womens', hasDropdown: false },
    { name: 'Jewelry', href: '/jewelry', hasDropdown: false },
    { name: 'Perfume', href: '/perfume', hasDropdown: false },
    { name: 'Blog', href: '/blog', hasDropdown: false },
    { 
      name: 'Hot Offers', 
      href: '/offers', 
      hasDropdown: false,
      highlight: true 
    }
  ];

  return (
    <nav className="hidden md:block bg-white border-b border-gray-100 shadow-sm sticky top-[72px] z-30">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center items-center gap-8 lg:gap-10">
          {menuItems.map((item) => (
            <li key={item.name} className="group relative">
              <a 
                href={item.href}
                className={`
                  relative flex items-center gap-1.5 text-gray-700 text-sm lg:text-[15px] font-semibold 
                  uppercase py-4 transition-all duration-300 hover:text-[#f0c14b]
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 
                  after:h-[3px] after:bg-gradient-to-r after:from-[#f0c14b] after:to-[#f0c14b] 
                  after:scale-x-0 after:origin-left after:transition-transform after:duration-300 
                  hover:after:scale-x-100
                  ${item.highlight ? 'text-[#f0c14b] animate-pulse-slow' : ''}"
                `}
              >
                {item.name}
                {item.hasDropdown && (
                  <ion-icon 
                    name="chevron-down-outline" 
                    class="text-sm group-hover:rotate-180 transition-transform duration-300"
                  ></ion-icon>
                )}
              </a>

              {/* Dropdown Menu - Example for Categories */}
              {item.hasDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-3 px-4 min-w-[200px]">
                    <ul className="space-y-2">
                      {['Fashion', 'Home & Living', 'Sports'].map((category) => (
                        <li key={category}>
                          <a 
                            href="#"
                            className="block py-2 px-3 text-sm text-gray-600 hover:text-[#f0c14b] hover:bg-gray-50 rounded-md transition-all duration-200"
                          >
                            {category}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
}
