import { useContext } from "react";
import { UIContext } from "../../context/UIContext";
import clothesIcon from "../../assets/images/icons/dress.svg";
import footwearIcon from "../../assets/images/icons/shoes.svg";
import jewelryIcon from "../../assets/images/icons/jewelry.svg";
import perfumeIcon from "../../assets/images/icons/perfume.svg";
import cosmeticsIcon from "../../assets/images/icons/cosmetics.svg";
import glassesIcon from "../../assets/images/icons/glasses.svg";
import bagsIcon from "../../assets/images/icons/bag.svg";
import shoe3 from '../../assets/images/products/shoe-3.jpg';
import clothes2 from '../../assets/images/products/clothes-2.jpg';
import clothes3 from '../../assets/images/products/clothes-3.jpg';
import clothes4 from '../../assets/images/products/clothes-4.jpg';

export default function Sidebar() {
  const { activeAccordion, setActiveAccordion, isSidebarOpen, setSidebarOpen, setSelectedCategory } = useContext(UIContext);

  const toggle = (id) => setActiveAccordion(activeAccordion === id ? null : id);
  const closeSidebar = () => setSidebarOpen(false);

  const categories = [
    {
      id: "clothes",
      title: "Clothes",
      icon: clothesIcon,
      items: [
        { name: "Shirt", count: 300 },
        { name: "Shorts", count: 60 },
        { name: "Jacket", count: 50 },
        { name: "Dress & Frock", count: 87 }
      ]
    },
    {
      id: "footwear",
      title: "Footwear",
      icon: footwearIcon,
      items: [
        { name: "Sports", count: 45 },
        { name: "Formal", count: 75 },
        { name: "Casual", count: 35 },
        { name: "Safety Shoes", count: 26 }
      ]
    },
    {
      id: "jewelry",
      title: "Jewelry",
      icon: jewelryIcon,
      items: [
        { name: "Earrings", count: 46 },
        { name: "Couple Rings", count: 73 },
        { name: "Necklace", count: 61 }
      ]
    },
    {
      id: "perfume",
      title: "Perfume",
      icon: perfumeIcon,
      items: [
        { name: "Clothes Perfume", count: 12 },
        { name: "Deodorant", count: 60 },
        { name: "Body Spray", count: 50 },
        { name: "Luxury Perfume", count: 87 }
      ]
    },
    {
      id: "cosmetics",
      title: "Cosmetics",
      icon: cosmeticsIcon,
      items: [
        { name: "Shampoo", count: 68 },
        { name: "Sunscreen", count: 46 },
        { name: "Body Wash", count: 79 },
        { name: "Makeup Kit", count: 23 }
      ]
    },
    {
      id: "glasses",
      title: "Glasses",
      icon: glassesIcon,
      items: [
        { name: "Sunglasses", count: 50 },
        { name: "Lenses", count: 48 }
      ]
    },
    {
      id: "bags",
      title: "Bags",
      icon: bagsIcon,
      items: [
        { name: "Shopping Bag", count: 62 },
        { name: "Gym Backpack", count: 35 },
        { name: "Purse", count: 80 },
        { name: "Wallet", count: 75 }
      ]
    }
  ];

  const bestSellers = [
    { id: 'bs-1', name: 'Baby Fabric Shoes', image: shoe3, price: 400, oldPrice: 500, rating: 5 },
    { id: 'bs-2', name: "Men's Hoodies T-Shirt", image: clothes2, price: 700, oldPrice: 1700, rating: 4 },
    { id: 'bs-3', name: 'Girls T-Shirt', image: clothes3, price: 300, oldPrice: 500, rating: 5 },
    { id: 'bs-4', name: 'Woolen Hat for Men', image: clothes4, price: 1200, oldPrice: 1500, rating: 4 }
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        className="fixed bottom-6 right-6 bg-black text-white py-3 px-5 rounded-lg z-50 flex items-center gap-2 text-sm font-semibold shadow-lg lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <ion-icon name="options-outline"></ion-icon>
        Filters
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-[100] lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          bg-white fixed lg:sticky top-0 left-0 h-full w-[300px] max-w-[85vw] 
          overflow-y-auto z-[101] shadow-lg transition-transform duration-300
          lg:top-[30px] lg:max-w-[260px] lg:shadow-none lg:translate-x-0 lg:mb-[30px]
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center lg:hidden">
          <h2 className="text-base font-semibold">Filters</h2>
          <button onClick={closeSidebar}>
            <ion-icon name="close-outline" class="text-2xl"></ion-icon>
          </button>
        </div>

        {/* Categories */}
        <div className="p-4 border-b">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase">
            Categories
          </h2>

          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className="w-full flex justify-between items-center py-2 px-3 text-sm hover:bg-gray-50 rounded"
                  onClick={() => toggle(category.id)}
                >
                  <div className="flex items-center gap-2">
                    <img src={category.icon} alt="" className="w-5 h-5 opacity-60" />
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <ion-icon
                    name={activeAccordion === category.id ? "chevron-up" : "chevron-down"}
                    class="text-gray-400"
                  ></ion-icon>
                </button>

                <ul className={`overflow-hidden transition-all ${activeAccordion === category.id ? 'max-h-[300px] pt-1 pb-2' : 'max-h-0'}`}>
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory(item.name);
                          closeSidebar();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full flex justify-between items-center py-1.5 px-3 ml-7 text-sm text-gray-600 hover:text-gray-900"
                      >
                        <span>{item.name}</span>
                        <span className="text-xs text-gray-400">{item.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Best Sellers */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">
            Best Sellers
          </h3>

          <div className="space-y-3">
            {bestSellers.map((product) => (
              <a 
                href="#"
                className="flex gap-3 hover:bg-gray-50 p-2 rounded" 
                key={product.id}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded" 
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                    {product.name}
                  </h4>

                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <del className="text-xs text-gray-400">
                      ₹{product.oldPrice}
                    </del>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="sticky bottom-0 bg-white p-4 border-t lg:hidden">
          <button
            onClick={closeSidebar}
            className="w-full bg-gray-900 text-white py-2.5 rounded text-sm font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </aside>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
