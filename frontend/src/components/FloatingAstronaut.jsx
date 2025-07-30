import React from 'react';

const FloatingAstronaut = () => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 animate-float pointer-events-none">
      <div className="relative">
        {/* Astronaut SVG */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="drop-shadow-2xl"
        >
          {/* Helmet */}
          <circle cx="60" cy="45" r="25" fill="#E8E9EA" stroke="#B0B3B8" strokeWidth="2" opacity="0.9"/>
          <circle cx="60" cy="45" r="20" fill="rgba(135, 206, 250, 0.3)" />
          
          {/* Helmet Reflection */}
          <ellipse cx="55" cy="40" rx="8" ry="12" fill="rgba(255, 255, 255, 0.4)" />
          
          {/* Body */}
          <ellipse cx="60" cy="80" rx="20" ry="25" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2"/>
          
          {/* Chest Control Panel */}
          <rect x="55" y="70" width="10" height="8" rx="2" fill="#4A90E2" opacity="0.8"/>
          <circle cx="57" cy="74" r="1" fill="#50E3C2"/>
          <circle cx="63" cy="74" r="1" fill="#F5A623"/>
          
          {/* Arms */}
          <ellipse cx="35" cy="75" rx="8" ry="15" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2" transform="rotate(-20 35 75)"/>
          <ellipse cx="85" cy="75" rx="8" ry="15" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2" transform="rotate(20 85 75)"/>
          
          {/* Gloves */}
          <circle cx="30" cy="85" r="6" fill="#E8E9EA" stroke="#B0B3B8" strokeWidth="1"/>
          <circle cx="90" cy="85" r="6" fill="#E8E9EA" stroke="#B0B3B8" strokeWidth="1"/>
          
          {/* Legs */}
          <ellipse cx="50" cy="105" rx="8" ry="15" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2"/>
          <ellipse cx="70" cy="105" rx="8" ry="15" fill="#F0F2F5" stroke="#B0B3B8" strokeWidth="2"/>
          
          {/* Boots */}
          <ellipse cx="50" cy="115" rx="9" ry="6" fill="#2C3E50" stroke="#B0B3B8" strokeWidth="1"/>
          <ellipse cx="70" cy="115" rx="9" ry="6" fill="#2C3E50" stroke="#B0B3B8" strokeWidth="1"/>
        </svg>
        
        {/* Floating particles around astronaut */}
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default FloatingAstronaut;