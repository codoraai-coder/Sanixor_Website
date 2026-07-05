import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, BarChart, Activity, Cloud, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const options = [
    {
      title: "Hack Eval",
      description: "AI-powered hackathon evaluation platform",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      icon: <Award size={24} className="text-white" />,
      link: "/hackeval"
    },
    {
      title: "Bit Bench",
      description: "Comprehensive benchmarking suite for AI models",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      icon: <BarChart size={24} className="text-white" />,
      link: "/bitbench"
    },
    {
      title: "Auto Dash",
      description: "Automated CI/CD pipeline intelligence",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      icon: <Activity size={24} className="text-white" />,
      link: "/autodash"
    },
    {
      title: "Socio Ai",
      description: "Social media intelligence and analytics",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      icon: <Cloud size={24} className="text-white" />,
      link: "/socioai"
    },
    {
      title: "Nyay Ai",
      description: "Legal intelligence and analysis platform",
      image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=80",
      icon: <Cpu size={24} className="text-white" />,
      link: "/nyayai"
    }
  ];

  const handleOptionClick = (index: number, link: string) => {
    if (index === activeIndex) {
      navigate(link);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (isHovered) return;

    const loopTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % options.length);
    }, 4000);

    return () => clearInterval(loopTimer);
  }, [isHovered, options.length]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-transparent font-sans text-white py-12"> 
      <style>{`
        @keyframes borderPulse {
          0% {
            box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0.2), 0 0 10px rgba(168, 85, 247, 0.1);
          }
          50% {
            box-shadow: inset 0 0 0 2px rgba(216, 180, 254, 0.6), 0 0 20px rgba(168, 85, 247, 0.4);
          }
          100% {
            box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0.2), 0 0 10px rgba(168, 85, 247, 0.1);
          }
        }
        @media (max-width: 768px) {
          .options-container {
            flex-direction: column !important;
            height: 600px !important;
          }
          .option-card {
            min-width: 100% !important;
            min-height: 64px !important;
            margin: 4px 0 !important;
            justify-content: center !important;
          }
          .vertical-text-container {
            writing-mode: horizontal-tb !important;
            transform: none !important;
            flex-direction: row !important;
            justify-content: flex-start !important;
            padding-left: 1.5rem !important;
            width: 100% !important;
          }
          .label-container {
            bottom: auto !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
          }
        }
      `}</style>
      {/* Options Container */}
      <div 
        className="options options-container flex w-full max-w-7xl h-[400px] md:h-[500px] mx-0 items-stretch overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "option option-card relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer bg-[#18181b]",
              activeIndex === index ? 'active' : ''
            )}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'cover' : 'auto 120%',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '60px',
              minHeight: '100px',
              margin: '0 4px',
              borderRadius: '24px',
              borderWidth: activeIndex === index ? '1px' : '0px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? 'rgba(168, 85, 247, 0.4)' : 'transparent',
              boxShadow: activeIndex === index 
                ? '0 20px 60px rgba(168,85,247,0.15)' 
                : '0 10px 30px rgba(0,0,0,0.30)',
              flex: activeIndex === index ? '10 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              willChange: 'flex-grow, box-shadow, background-size, background-position'
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => handleOptionClick(index, option.link)}
          >
            {/* Fully color blocked overlay for closed cards */}
            <div className="absolute inset-0 bg-[#07030e] transition-opacity duration-700 ease-in-out" style={{ opacity: activeIndex === index ? 0 : 1 }} />
            
            {/* Animated Purple Border for closed cards */}
            <div 
              className="absolute inset-0 rounded-[24px] pointer-events-none transition-opacity duration-700 ease-in-out z-20"
              style={{
                opacity: activeIndex === index ? 0 : 1,
                animation: 'borderPulse 3s infinite ease-in-out'
              }}
            />

            {/* Standard overlay for active card */}
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:bg-black/20" style={{ opacity: activeIndex === index ? 0.2 : 0 }} />

            {/* Vertical text for closed cards */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out pointer-events-none"
              style={{ 
                opacity: activeIndex === index ? 0 : 1,
                transform: activeIndex === index ? 'scale(0.8)' : 'scale(1)'
              }}
            >
              <div 
                className="vertical-text-container font-bold tracking-[0.3em] uppercase whitespace-nowrap text-lg md:text-xl drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] flex gap-2" 
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                <span className="text-white">{option.title.split(' ')[0]}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-t from-purple-700 via-purple-400 to-purple-300">
                  {option.title.substring(option.title.indexOf(' ') + 1)}
                </span>
              </div>
            </div>

            {/* Shadow effect */}
            <div 
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                height: '160px',
                boxShadow: activeIndex === index 
                  ? 'inset 0 -120px 120px -80px rgba(0,0,0,0.9), inset 0 -80px 60px -40px rgba(10,6,18,0.9)' 
                  : 'inset 0 -120px 60px -80px rgba(0,0,0,0.8)'
              }}
            />
            
            {/* Label with icon and info */}
            <div className="label label-container absolute left-0 right-0 bottom-6 flex items-center justify-start h-14 z-10 pointer-events-none px-4 gap-4 w-full">
              <div 
                className="icon min-w-[50px] max-w-[50px] h-[50px] flex items-center justify-center rounded-full bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/30 flex-shrink-0 transition-all duration-700"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  transform: activeIndex === index ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(-20px)'
                }}
              >
                {option.icon}
              </div>
              <div className="info text-white flex flex-col justify-center overflow-hidden">
                <div 
                  className="main font-extrabold text-xl md:text-2xl whitespace-nowrap transition-all duration-700 ease-in-out text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 drop-shadow-lg"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="sub text-sm md:text-base text-gray-300 transition-all duration-700 ease-in-out mt-1 line-clamp-2 md:whitespace-nowrap"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelector;
