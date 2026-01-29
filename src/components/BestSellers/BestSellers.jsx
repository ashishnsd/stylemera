import shoe3 from '../../assets/images/products/shoe-3.jpg';
import clothes2 from '../../assets/images/products/clothes-2.jpg';
import clothes3 from '../../assets/images/products/clothes-3.jpg';
import clothes4 from '../../assets/images/products/clothes-4.jpg';

export default function BestSellers() {
  const bestSellers = [
    {
      id: 'bs-1',
      name: 'Baby Fabric Shoes',
      image: shoe3,
      price: 400,
      oldPrice: 500,
      rating: 5
    },
    {
      id: 'bs-2',
      name: "Men's Hoodies T-Shirt",
      image: clothes2,
      price: 700,
      oldPrice: 1700,
      rating: 4
    },
    {
      id: 'bs-3',
      name: 'Girls T-Shirt',
      image: clothes3,
      price: 300,
      oldPrice: 500,
      rating: 5
    },
    {
      id: 'bs-4',
      name: 'Woolen Hat for Men',
      image: clothes4,
      price: 1200,
      oldPrice: 1500,
      rating: 4
    }
  ];

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="relative mb-6">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-[0.15em] flex items-center gap-3">
              <span className="inline-block w-2 sm:w-2.5 h-8 sm:h-10 bg-gradient-to-b from-[#f0c14b] via-[#f0c14b]/80 to-transparent rounded-full shadow-lg shadow-[#f0c14b]/30" aria-hidden="true"></span>
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent relative">
                Best Sellers
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent opacity-50"></span>
              </span>
              <span className="flex-1 h-0.5 bg-gradient-to-r from-[#f0c14b]/30 to-transparent"></span>
            </h2>
            <p className="text-sm text-gray-500 mt-2 ml-8 font-medium tracking-wide">Top rated products</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map((product) => (
            <a 
              href="#" 
              key={product.id}
              className="group flex sm:flex-col gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-20 h-20 sm:w-full sm:h-48 bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center sm:justify-start">
                <h4 className="text-sm font-semibold text-gray-900 mb-1 capitalize line-clamp-2 group-hover:text-gray-700">
                  {product.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <ion-icon 
                      key={i} 
                      name={i < product.rating ? "star" : "star-outline"}
                      class={`text-xs ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    ></ion-icon>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <del className="text-xs text-gray-400">
                    ₹{product.oldPrice}
                  </del>
                  <span className="text-xs text-green-600 font-semibold">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
