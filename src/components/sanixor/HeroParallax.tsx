import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

interface Product {
  title: string;
  category: string;
  thumbnail: string;
  link: string;
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto pt-12 pb-6 md:py-32 px-6 w-full left-0 top-0 z-40 pointer-events-none">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, #6B46C1, #9333ea)",
          }}
        />
        <span
          className="text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Sanixor AI
        </span>
      </div>

      <h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-extrabold leading-[0.95] tracking-[-0.04em]"
        style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif", color: "#FFFFFF" }}
      >
        The Ultimate
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #a855f7, #d8b4fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AI Agent Studio
        </span>
      </h1>

      <p
        className="max-w-lg text-base md:text-lg mt-6 leading-relaxed font-light"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        We build production-grade AI agents with cutting-edge frameworks.
        Our team of passionate engineers crafts agents that actually work.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      key={product.title}
      className="group/product h-[8rem] w-[12rem] sm:h-[10rem] sm:w-[15rem] md:h-[14rem] md:w-[21rem] lg:h-[15rem] lg:w-[23rem] relative flex-shrink-0 rounded-3xl overflow-hidden"
    >
      <img
        src={product.thumbnail}
        className="object-cover object-center absolute h-full w-full inset-0 transition-all duration-500 ease-out group-hover/product:scale-[1.06]"
        style={{ filter: "brightness(0.72) saturate(0.85)" }}
        alt={product.title}
        loading="lazy"
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out opacity-35 group-hover/product:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,18,0.05) 0%, rgba(10,6,18,0.15) 40%, rgba(10,6,18,0.88) 100%)",
        }}
      />

      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover/product:opacity-100 transition-opacity duration-500"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(180deg, rgba(107,70,193,0) 0%, rgba(107,70,193,0) 30%, rgba(107,70,193,0.35) 70%, rgba(107,70,193,0.35) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover/product:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow:
            "0 25px 60px rgba(107,70,193,0.18), 0 0 100px rgba(107,70,193,0.04)",
        }}
      />

      <div
        className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[0.58rem] font-medium uppercase tracking-[0.08em] opacity-0 -translate-y-1.5 group-hover/product:opacity-100 group-hover/product:translate-y-0 transition-all duration-500 ease-out"
        style={{
          background: "rgba(10,6,18,0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {product.category}
      </div>

      <h2
        className="absolute bottom-5 left-5 right-5 z-10 text-lg font-semibold tracking-tight opacity-0 translate-y-2.5 group-hover/product:opacity-100 group-hover/product:translate-y-0 transition-all duration-500 ease-out"
        style={{
          fontFamily: "'Space Grotesk', 'Syne', sans-serif",
          color: "#FFFFFF",
          textShadow: "0 2px 16px rgba(0,0,0,0.6)",
        }}
      >
        {product.title}
      </h2>
    </motion.div>
  );
};

const products = [
  {
    title: "CodeLens",
    category: "Analysis",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "LegalMind",
    category: "Legal",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "DataForge",
    category: "Data",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "AgentPilot",
    category: "Agents",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "NexusAI",
    category: "Platform",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "QueryFlow",
    category: "Database",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "SynthDoc",
    category: "Documents",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "VectorBase",
    category: "Search",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "PromptLab",
    category: "AI Tools",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "InsightAI",
    category: "Analytics",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "AutoSpec",
    category: "Testing",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "NeuralDraft",
    category: "Generation",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "ScanLogic",
    category: "Security",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "BridgeAI",
    category: "Integration",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=640&h=480&fit=crop&auto=format&q=80",
  },
  {
    title: "CoreWeave",
    category: "Infrastructure",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=640&h=480&fit=crop&auto=format&q=80",
  },
];

export function HeroParallax() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [isMobile ? 12 : 15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 1], [isMobile ? 10 : 20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [isMobile ? -350 : -700, isMobile ? 40 : 100]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.2, 1]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? 300 : 800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -300 : -800]),
    springConfig
  );

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -220]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden antialiased py-24 md:py-32 flex flex-col self-auto"
      style={{ perspective: "1000px", background: "transparent", transformStyle: "preserve-3d" }}
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-6 mb-4 md:mb-6">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row space-x-4 md:space-x-6 mb-4 md:mb-6">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-6">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
