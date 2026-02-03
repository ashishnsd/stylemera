import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import bottle from "../assets/images/IMAGES/img/IMG12.png";
import logo from "../assets/images/logo/logo.svg";

const PerfumeLanding = () => {
  const ref = useRef(null);
  const centerLogoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [targetX, setTargetX] = useState(-180);
  const [logoLocked, setLogoLocked] = useState(false);

  useEffect(() => {
    // Simulate loading time (3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

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
      {/* Loading Screen */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Logo */}
            <motion.img
              src={logo}
              alt="Logo"
              className="h-20 w-auto mx-auto mb-8"
              style={{ filter: "brightness(0) invert(1)" }}
              initial={{ scale: 3, opacity: 0, y: 0, rotate: 0 }}
              animate={{ 
                scale: [3, 1, 0.7],
                opacity: [0, 1, 1],
                y: [0, -160, -260],
                rotate: [0, 360, 360]
              }}
              transition={{ 
                scale: { duration: 3.5, times: [0, 0.5, 1], ease: [0.25, 0.1, 0.25, 1] },
                y: { duration: 3.5, times: [0, 0.5, 1], ease: [0.33, 1, 0.68, 1] },
                opacity: { duration: 2, times: [0, 0.5, 1], ease: "easeOut" },
                rotate: { duration: 3.5, times: [0, 0.5, 1], ease: [0.33, 1, 0.68, 1] }
              }}
            />
            
            {/* Loading Text */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white text-2xl font-bold tracking-widest"
            >
              PERFUME
            </motion.h2>
            
            {/* Loading Dots */}
            <motion.div
              className="flex justify-center gap-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: isLoading ? 0 : 0 }}
        className="h-[200vh] bg-black flex items-center justify-center relative overflow-hidden"
      >
        {/* Sticky Logo (center, then scrolls left) */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 0.7, x: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              x: logoLocked ? targetX : logoX,
              scale: logoLocked ? 0.6 : 0.7
            }}
            transition={{
              x: logoLocked ? { type: "spring", stiffness: 120, damping: 18 } : { type: "spring", stiffness: 80, damping: 18 },
              scale: { duration: 0.5, ease: "easeOut" }
            }}
            style={{ x: logoLocked ? targetX : logoX, scale: logoLocked ? 0.6 : 0.7 }}
            className="fixed top-3 md:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <img
              ref={centerLogoRef}
              src={logo}
              alt="Logo"
              className="h-7 md:h-10 w-auto"
              style={{ filter: "brightness(0) invert(1)", willChange: "transform" }}
            />
          </motion.div>
        )}



        {/* Background Text */}
        <motion.h1
          style={{ opacity: scrollYProgress }}
          className="absolute text-[6rem] md:text-[12rem] font-bold text-white/5"
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
