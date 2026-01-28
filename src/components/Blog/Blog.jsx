import { useEffect, useRef, useState } from "react";
import blog1 from "../../assets/images/blog-1.jpg";
import blog2 from "../../assets/images/blog-2.jpg";
import blog3 from "../../assets/images/blog-3.jpg";
import blog4 from "../../assets/images/blog-4.jpg";

const blogs = [
  {
    id: 1,
    title: "Clothes Retail KPIs 2021 Guide for Clothes Executives",
    category: "Fashion",
    date: "Apr 04, 2021",
    image: blog1
  },
  {
    id: 2,
    title: "Curbside Fashion Trends: How to Win the Pickup Battle",
    category: "Clothes",
    date: "Jan 18, 2021",
    image: blog2
  },
  {
    id: 3,
    title: "EBT Vendors: Claim Your Share of SNAP Online Revenue",
    category: "Shoes",
    date: "Feb 10, 2021",
    image: blog3
  },
  {
    id: 4,
    title: "Modern Shopping Experience: Future of Retail",
    category: "Electronics",
    date: "Mar 15, 2021",
    image: blog4
  }
];

export default function Blog() {
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(3); // mobile shows 3
  const [gap, setGap] = useState(12); // px
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setSlidesToShow(3);
        setGap(12);
      } else if (w < 1024) {
        setSlidesToShow(2);
        setGap(20);
      } else {
        setSlidesToShow(3);
        setGap(20);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    const viewportWidth = sliderRef.current.clientWidth;
    const itemWidth = (viewportWidth - gap * (slidesToShow - 1)) / slidesToShow;
    sliderRef.current.scrollTo({
      left: currentIndex * (itemWidth + gap),
      behavior: "smooth",
    });
  }, [currentIndex, slidesToShow, gap]);

  const maxIndex = Math.max(0, blogs.length - slidesToShow);
  const next = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="w-full">
      {/* Neo-Brutalism Header */}
      <div className="flex items-center justify-center mb-5 bg-yellow-300 border-4 border-black p-[0.5px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-[0.15em] flex items-center gap-3">
            <span className="inline-block w-2 sm:w-2.5 h-8 sm:h-10 bg-gradient-to-b from-[#f0c14b] via-[#f0c14b]/80 to-transparent rounded-full shadow-lg shadow-[#f0c14b]/30" aria-hidden="true"></span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent relative">
              Latest Blog
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent opacity-50"></span>
            </span>
            <span className="flex-1 h-0.5 bg-gradient-to-r from-[#f0c14b]/30 to-transparent"></span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 ml-8 font-medium tracking-wide">Insights and trends</p>
        </div>

      {/* Slider viewport */}
      <div className="relative">
        {/* Navigation arrows removed per request */}

        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ gap }}
        >
          {blogs.map((blog, index) => {
            const width = `calc((100% - ${gap}px * ${slidesToShow - 1}) / ${slidesToShow})`;
            return (
              <div
                key={blog.id}
                className="snap-start"
                style={{ width, flex: `0 0 ${width}` }}
              >
                <a href="#" className="block group">
                  <div
                    className={`relative overflow-hidden border-4 border-black mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ${
                      index % 4 === 0
                        ? "bg-yellow-200"
                        : index % 4 === 1
                        ? "bg-pink-200"
                        : index % 4 === 2
                        ? "bg-cyan-200"
                        : "bg-purple-200"
                    }`}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full aspect-video object-cover border-b-4 border-black"
                    />
                  </div>
                </a>

                <div>
                  <a
                    href="#"
                    className={`inline-block px-2 py-0.5 rounded-fullborder-2 border-black text-black text-xs font-black uppercase mb-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all ${
                      index % 3 === 0
                        ? "bg-yellow-400"
                        : index % 3 === 1
                        ? "bg-pink-400"
                        : "bg-cyan-400"
                    }`}
                  >
                    {blog.category}
                  </a>

                  <a href="#">
                    <h3 className="text-black text-sm font-black leading-tight mb-0 uppercase tracking-tight line-clamp-2 hover:text-pink-600 transition-colors">
                      {blog.title}
                    </h3>
                  </a>

                  <div className="flex items-center gap-1 bg-white border-3 border-black px-1 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-purple-400 border-2 border-black flex items-center justify-center">
                        <ion-icon name="person" class="text-xs"></ion-icon>
                      </div>
                      <cite className="not-italic text-black font-bold text-[10px]">ADMIN</cite>
                    </div>
                    <span className="text-black font-black">•</span>
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-yellow-400 border-2 border-black flex items-center justify-center">
                        <ion-icon name="calendar" class="text-xs"></ion-icon>
                      </div>
                      <time className="text-black font-bold text-[10px]" dateTime={blog.date}>
                        {blog.date}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 border-2 border-black rounded-full ${
                i === currentIndex ? "bg-black" : "bg-white"
              } shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
              aria-label={`Go to slide ${i + 1}`}
            />
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
        /* hide scrollbar utility */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
