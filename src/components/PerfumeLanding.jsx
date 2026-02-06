import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import bottle from "../assets/images/IMAGES/img/IMG12.png";
import logo from "../assets/images/logo/logo.svg";

const PerfumeLanding = () => {
  const ref = useRef(null);
  const centerLogoRef = useRef(null);
  // Remove loading state
  const [targetX, setTargetX] = useState(-180);
  const [logoLocked, setLogoLocked] = useState(false);



  useEffect(() => {
    const updateTarget = () => {
      if (typeof window === "undefined") return;
      // Calculate target position (left side with padding)
      const leftPadding = window.innerWidth < 768 ? 16 : 32; // 4 or 8 in tailwind
      const centerX = window.innerWidth / 2;
      if (centerLogoRef.current) {
        const logoWidth = centerLogoRef.current.getBoundingClientRect().width;
        setTargetX(-(centerX - leftPadding - logoWidth / 2));
      } else {
        setTargetX(-(centerX - leftPadding - 50));
      }
    };

    updateTarget();
    window.addEventListener("resize", updateTarget, { passive: true });
    return () => window.removeEventListener("resize", updateTarget);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.4]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  const logoX = useTransform(scrollYProgress, [0, 1], [0, targetX]);
  // Smoothly move logo from center to top
  // Always start from center and move up as you scroll
  const logoY = useTransform(scrollYProgress, [0, 0.2, 1], ["50vh", "0vh", "0vh"]);

  // Lock logo when it reaches left position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 0.95 && !logoLocked) {
        setLogoLocked(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, logoLocked]);

  return (
    <>


      {/* Main Content */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="h-[200vh] bg-black flex items-center justify-center relative overflow-hidden"
      >
        {/* Sticky Logo (center, then scrolls left) */}
        {
          // Animate logo from center to top as user scrolls
          <div
            className="fixed top-3 left-3 z-50 pointer-events-none"
            style={{ transition: 'none' }}
          >
            <img
              ref={centerLogoRef}
              src={logo}
              alt="Logo"
              className="h-6 w-auto"
              style={{ filter: "brightness(0) invert(1)", willChange: "auto", transition: 'none' }}
            />
          </div>
        }



        {/* Background Text */}
        <motion.h1
          style={{ opacity: scrollYProgress }}
          className="absolute text-[6rem] md:text-[12rem] font-bold text-white"
        >
          PERFUME
        </motion.h1>

        {/* Bottle */}
        <motion.img
          src={bottle}
          alt="Perfume Bottle"
          style={{ scale, y, rotate }}
          className="w-[150px] sm:w-[200px] md:w-[300px] z-10"
        />
      </motion.section>
    </>
  );
};

export default PerfumeLanding;
