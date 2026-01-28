import testimonialImg from "../../assets/images/testimonial-1.jpg";
import quoteIcon from "../../assets/images/icons/quotes.svg";

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Fashion Enthusiast & Blogger",
      image: testimonialImg,
      description: "Amazing quality and fast delivery! The collection exceeded my expectations. Highly recommend this store for anyone looking for trendy fashion."
    }
  ];

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[280px] flex flex-col">
      <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-3 uppercase tracking-wider">Customer Testimonial</h2>

      <div className="flex-1 flex items-stretch">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="w-full"
          >
            <div className="group relative p-8 md:p-6 rounded-3xl text-center transition-all duration-700 ease-out h-full flex flex-col justify-center overflow-hidden hover:-translate-y-2"
              style={{
                background: 'linear-gradient(135deg, #fdf4ff 0%, #fef3fb 50%, #fff5f7 100%)',
                boxShadow: '0 10px 40px rgba(236, 72, 153, 0.1), 0 2px 8px rgba(147, 51, 234, 0.08)'
              }}
            >
              {/* Gradient Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(236, 72, 153, 0.08), transparent 70%)'
                }}
              />
              
              <div className="relative z-10">
                {/* Profile Image with Glow */}
                <div className="relative inline-block mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-pink-500/30 blur-xl group-hover:blur-2xl transition-all duration-700" />
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="relative w-[90px] h-[90px] md:w-[100px] md:h-[100px] rounded-full object-cover ring-4 ring-pink-200/50 ring-offset-4 ring-offset-white/50 transition-all duration-500 group-hover:scale-110 group-hover:ring-pink-300/70"
                    style={{
                      boxShadow: '0 15px 35px rgba(236, 72, 153, 0.2), 0 5px 15px rgba(147, 51, 234, 0.15)'
                    }}
                  />
                  {/* Verified Badge */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm ring-4 ring-white shadow-lg">
                    <ion-icon name="checkmark-sharp"></ion-icon>
                  </div>
                </div>

                <h3 className="font-bold text-gray-800 mb-1 text-base md:text-base tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-500">
                  {testimonial.name}
                </h3>

                <p className="text-pink-500/80 text-sm md:text-xs mb-6 font-medium tracking-wide">
                  {testimonial.title}
                </p>

                {/* Quote Icon with Gradient */}
                <div className="relative inline-block mb-5">
                  <img 
                    src={quoteIcon} 
                    alt="quotation" 
                    className="w-10 h-10 md:w-9 md:h-9 opacity-40 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ 
                      filter: 'drop-shadow(0 4px 12px rgba(236, 72, 153, 0.3)) brightness(0.8) saturate(1.5)',
                    }}
                  />
                </div>

                <p className="max-w-full mx-auto text-gray-600 text-base md:text-sm leading-relaxed md:leading-relaxed italic px-2">
                  "{testimonial.description}"
                </p>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mt-5">
                  {[...Array(5)].map((_, i) => (
                    <ion-icon 
                      key={i}
                      name="star" 
                      class="text-yellow-400 text-base md:text-sm"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3))' }}
                    ></ion-icon>
                  ))}
                </div>

                {/* Decorative Line */}
                <div className="mt-6 h-[2px] w-24 mx-auto rounded-full bg-gradient-to-r from-transparent via-pink-300 to-transparent group-hover:w-32 transition-all duration-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
