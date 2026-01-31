import { useEffect, useRef, useState } from "react";
import BannerSlide from "./BannerSlide";
import banner1 from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";


export default function Banner() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;


  const slides = [
    {
      img: banner1,
      subtitle: "Trending item",
      title: "Women's latest fashion sale",
      price: "20.00"
    },
    {
      img: banner2,
      subtitle: "Trending accessories",
      title: "Modern sunglasses",
      price: "15.00"
    },
    {
      img: banner3,
      subtitle: "Sale Offer",
      title: "New fashion summer sale",
      price: "29.99"
    }
  ];


  // Auto-play functionality - Always ON
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [totalSlides]);


  // Smooth scroll to slide
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: slideWidth * currentSlide,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);


  const goToSlide = (index) => {
    setCurrentSlide(index);
  };


  return (
    <div className="banner my-4 md:my-6 lg:my-4">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Slider Container */}
          <div 
            className="
              slider-container 
              flex items-center 
              gap-0 
              rounded-xl overflow-hidden 
              snap-x snap-mandatory 
              scroll-smooth shadow-lg
              bg-gray-50
            "
            style={{ overscrollBehaviorInline: 'contain' }}
            ref={sliderRef}
            role="region"
            aria-label="Featured banners carousel"
            aria-live="polite"
          >
            {slides.map((slide, index) => (
              <BannerSlide
                key={index}
                img={slide.img}
                subtitle={slide.subtitle}
                title={slide.title}
                price={slide.price}
              />
            ))}
          </div>


          {/* Progress Dots/Indicators Only */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  transition-all duration-300 rounded-full
                  ${currentSlide === index 
                    ? 'bg-gradient-to-r from-[#f0c14b] to-[#f0c14b] w-6 sm:w-8 h-2 sm:h-2.5 shadow-md' 
                    : 'bg-white/70 hover:bg-white w-2 sm:w-2.5 h-2 sm:h-2.5 hover:scale-125'
                  }
                `}
                aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
              />
            ))}
          </div>


          {/* Slide Counter - Accessibility */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Slide {currentSlide + 1} of {totalSlides}
          </div>
        </div>
      </div>
    </div>
  );
}
