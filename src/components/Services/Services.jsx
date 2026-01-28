export default function Services() {
  const services = [
    {
      icon: "boat-outline",
      title: "Worldwide Delivery",
      description: "For Order Over ₹1000",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "rocket-outline",
      title: "Next Day Delivery",
      description: "Orders Before 6PM",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "call-outline",
      title: "Best Online Support",
      description: "Hours: 8AM - 11PM",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: "arrow-undo-outline",
      title: "Return Policy",
      description: "Easy & Free Return",
      gradient: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[280px] flex flex-col">
      <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-3 uppercase tracking-wider">Our Services</h2>

      <div className="flex-1 flex items-stretch">
        <div className="w-full">
          <div className="group relative py-8 px-4 md:p-6 rounded-3xl text-center transition-all duration-700 ease-out h-full flex flex-col justify-center overflow-hidden hover:-translate-y-2"
            style={{
              background: 'linear-gradient(135deg, #fdf4ff 0%, #fef3fb 50%, #fff5f7 100%)',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.1), 0 2px 8px rgba(147, 51, 234, 0.08)'
            }}
          >
            {/* Gradient Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05), transparent 70%)'
              }}
            />
            
            <div className="relative z-10 flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-4">
              {services.map((service, index) => (
                <div key={index} className="group/item flex items-start gap-4 md:flex-col md:items-center md:gap-3 p-4 md:p-3 rounded-2xl transition-all duration-500 hover:bg-white/60 hover:shadow-lg hover:-translate-y-1">
                  <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-2xl md:text-3xl flex-shrink-0 transition-all duration-500 group-hover/item:scale-110 group-hover/item:rotate-6 shadow-lg`}
                    style={{
                      boxShadow: '0 8px 24px rgba(236, 72, 153, 0.2)'
                    }}
                  >
                    <ion-icon name={service.icon}></ion-icon>
                    {/* Icon glow */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="flex-1 text-left md:text-center">
                    <h3 className="text-gray-800 text-sm md:text-sm font-bold mb-1.5 md:mb-2 leading-tight tracking-wide group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-pink-600 group-hover/item:to-purple-600 transition-all duration-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-xs leading-tight font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
