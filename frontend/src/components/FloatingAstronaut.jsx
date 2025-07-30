import React, { useState, useEffect } from 'react';

const FloatingAstronaut = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [astronautPosition, setAstronautPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Smooth follow animation with delay
    const followMouse = () => {
      setAstronautPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
    };

    const interval = setInterval(followMouse, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div 
      className="fixed pointer-events-none z-20 transition-transform duration-100"
      style={{
        left: astronautPosition.x - 60, // Center the astronaut (120px width / 2)
        top: astronautPosition.y - 60,  // Center the astronaut (120px height / 2)
        transform: `translate(0, 0) scale(0.8)` // Slightly smaller
      }}
    >
      <div className="relative animate-float">
        {/* Little Boy Astronaut SVG */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="drop-shadow-2xl"
        >
          {/* Body - smaller and more child-like */}
          <ellipse cx="60" cy="75" rx="16" ry="20" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2"/>
          
          {/* Head - larger proportionally like a child */}
          <circle cx="60" cy="40" r="22" fill="#FFDBAC" stroke="#D4A574" strokeWidth="2"/>
          
          {/* Helmet - transparent dome */}
          <circle cx="60" cy="40" r="26" fill="rgba(135, 206, 250, 0.2)" stroke="#B0B3B8" strokeWidth="2" opacity="0.9"/>
          
          {/* Helmet Reflection */}
          <ellipse cx="52" cy="32" rx="6" ry="10" fill="rgba(255, 255, 255, 0.6)" />
          
          {/* Eyes - big child-like eyes */}
          <circle cx="54" cy="38" r="3" fill="#2C3E50"/>
          <circle cx="66" cy="38" r="3" fill="#2C3E50"/>
          <circle cx="55" cy="37" r="1" fill="white"/> {/* Eye shine */}
          <circle cx="67" cy="37" r="1" fill="white"/>
          
          {/* Mouth - small smile */}
          <path d="M 56 45 Q 60 48 64 45" stroke="#2C3E50" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          
          {/* Chest Control Panel - simpler design */}
          <rect x="56" y="68" width="8" height="6" rx="2" fill="#4A90E2" opacity="0.8"/>
          <circle cx="58" cy="71" r="0.8" fill="#50E3C2"/>
          <circle cx="62" cy="71" r="0.8" fill="#F5A623"/>
          
          {/* Arms - shorter and more child-like */}
          <ellipse cx="38" cy="70" rx="6" ry="12" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2" transform="rotate(-15 38 70)"/>
          <ellipse cx="82" cy="70" rx="6" ry="12" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2" transform="rotate(15 82 70)"/>
          
          {/* Gloves - smaller */}
          <circle cx="34" cy="80" r="5" fill="#E8E9EA" stroke="#B0B3B8" strokeWidth="1"/>
          <circle cx="86" cy="80" r="5" fill="#E8E9EA" stroke="#B0B3B8" strokeWidth="1"/>
          
          {/* Legs - shorter */}
          <ellipse cx="52" cy="95" rx="6" ry="12" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2"/>
          <ellipse cx="68" cy="95" rx="6" ry="12" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2"/>
          
          {/* Boots - smaller */}
          <ellipse cx="52" cy="105" rx="7" ry="5" fill="#2C3E50" stroke="#B0B3B8" strokeWidth="1"/>
          <ellipse cx="68" cy="105" rx="7" ry="5" fill="#2C3E50" stroke="#B0B3B8" strokeWidth="1"/>
          
          {/* Hair showing through helmet - little boy hair */}
          <path d="M 42 22 Q 50 18 58 22 Q 66 18 74 22 Q 70 28 60 26 Q 50 28 46 22" fill="#8B4513" opacity="0.7"/>
        </svg>
        
        {/* Floating particles around astronaut */}
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
        
        {/* Jetpack exhaust effect */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-6 bg-gradient-to-t from-orange-400 via-yellow-400 to-transparent opacity-70 animate-pulse"></div>
          <div className="w-0.5 h-4 bg-gradient-to-t from-blue-400 via-cyan-400 to-transparent opacity-50 animate-pulse ml-0.5"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAstronaut;