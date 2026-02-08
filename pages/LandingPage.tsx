
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate percentage positions for the gradient
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-white">
      {/* Dynamic Colorful Background Layer */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(30, 64, 175, 0.22) 0%, rgba(147, 51, 234, 0.16) 25%, rgba(255, 255, 255, 0) 52%)`,
          pointerEvents: 'none',
          zIndex: 1
        }}
      ></div>

      {/* Second Glow for more "pop" */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(59, 130, 246, 0.16) 0%, rgba(255, 255, 255, 0) 42%)`,
          pointerEvents: 'none',
          zIndex: 1
        }}
      ></div>

      {/* Topographic Background Overlay */}
      <div className="topo-bg absolute inset-0 opacity-35 z-0"></div>
      <div className="topo-lines z-2"></div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-4">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight drop-shadow-sm">
            <span className="text-black">mrt</span>
            <span className="mx-4 text-black font-light">=</span>
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
              Moratuwa
            </span>
          </h1>
          <p className="mt-4 text-slate-400 font-medium tracking-widest text-sm md:text-base uppercase opacity-80">
            Innovation & Excellence
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-20 bg-white/80 backdrop-blur-md">
        <div className="flex flex-wrap justify-center md:justify-start gap-8 text-sm text-slate-600 font-medium">
          <a href="https://info.mrt.lk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700 transition-colors group">
            <i className="fa-solid fa-globe group-hover:rotate-12 transition-transform"></i>
            info.mrt.lk
          </a>
          <a href="mailto:contact@mrt.lk" className="flex items-center gap-2 hover:text-blue-700 transition-colors group">
            <i className="fa-solid fa-envelope group-hover:-translate-y-1 transition-transform"></i>
            contact@mrt.lk 
          </a>
            <a href="tel:0771595616" className="flex items-center gap-2 hover:text-blue-700 transition-colors group">
            <i className="fa-solid fa-phone text-blue-600/50"></i>
            0771595616
            </a>
        </div>
          <a href="https://webmail.mrt.lk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700 transition-colors group">
            <i className="fa-solid fa-globe group-hover:rotate-12 transition-transform"></i>
            webmail.mrt.lk
          </a>


      </footer>
    </div>
  );
};

export default LandingPage;
