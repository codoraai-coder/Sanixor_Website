import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import sanixorMark from "@/assets/sanixor-mark.png";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(location.pathname === "/");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // If not on the main home page, disable loader immediately
    if (location.pathname !== "/") {
      setIsLoading(false);
      return;
    }

    if (isMobile) {
      // Mobile animation timer since video is not playing
      const mobileTimer = setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      return () => clearTimeout(mobileTimer);
    } else {
      // Safety fallback in case video fails to load or play
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1, y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // elegant shutter curve
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#05010a] via-[#0d0216] to-[#1a0530] lg:bg-none lg:bg-[#f4f4f5]"
          >
            {/* Mobile background designs */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] lg:hidden" />
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[300px] bg-purple-600/20 blur-[100px] rounded-full z-0 pointer-events-none lg:hidden" />

            {!isMobile && (
              <video
                src="/sanixor.mp4"
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-10 opacity-100"
                onEnded={() => setIsLoading(false)}
              />
            )}

            {isMobile && (
              <motion.div className="flex flex-col items-center justify-center z-10 w-full px-8">
                <div className="relative flex flex-col items-center">
                  {/* Glowing background behind text & logo */}
                  <motion.div
                    className="absolute inset-0 bg-purple-600/40 blur-[50px] rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Company Logo Animation */}
                  <motion.img
                    src={sanixorMark}
                    alt="Sanixor Logo"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain relative z-10 mb-6 rounded-2xl drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                    initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.1 }}
                  />

                  <motion.div
                    className="flex overflow-hidden relative z-10 items-center justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.08, delayChildren: 0.3 },
                      },
                    }}
                  >
                    {"SANIXOR AI".split("").map((char, index) => {
                      if (char === " ") {
                        return <span key={index} className="w-3 sm:w-5"></span>;
                      }

                      const isAi = index >= 8;

                      return (
                        <motion.span
                          key={index}
                          className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text ${
                            isAi
                              ? "bg-gradient-to-br from-purple-400 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                              : "bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                          }`}
                          variants={{
                            hidden: { y: 60, opacity: 0, rotateX: -90 },
                            visible: {
                              y: 0,
                              opacity: 1,
                              rotateX: 0,
                              transition: { type: "spring", damping: 12, stiffness: 150 },
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Modern progress line */}
                <motion.div
                  className="w-full max-w-[240px] h-[2px] bg-white/10 mt-12 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "easeInOut", delay: 1 }}
                  />
                </motion.div>

                {/* Cyberpunk subtext */}
                <motion.div
                  className="mt-6 font-mono text-xs text-purple-300/70 tracking-[0.4em] uppercase font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    Initializing System
                  </motion.span>
                </motion.div>
              </motion.div>
            )}

            {/* Modern Loading for desktop (overlaid on video) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-16 flex flex-col items-center justify-center z-10 w-full"
              >
                {/* Modern progress line */}
                <motion.div
                  className="w-full max-w-[300px] h-[2px] bg-white/20 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 10, ease: "linear" }}
                  />
                </motion.div>

                {/* Cyberpunk subtext */}
                <motion.div
                  className="mt-5 font-mono text-[11px] text-purple-600 tracking-[0.4em] uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    Initializing System
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
