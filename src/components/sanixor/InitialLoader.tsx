import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Only start the countdown once the video has buffered and is ready
    if (isLoading && isVideoReady) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 12000); // Massive 12 seconds delay to let it play as intended
      return () => clearTimeout(timer);
    }
  }, [isLoading, isVideoReady]);



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
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09090b] overflow-hidden"
          >
            <video 
              src="/sanixor.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover" 
              onCanPlayThrough={() => setIsVideoReady(true)}
            />
            
            {/* The loading text/dots placed over the GIF */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-16 flex flex-col items-center gap-3 z-10"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-purple-500"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-bold tracking-[0.3em] uppercase text-white/50">
                Loading
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
