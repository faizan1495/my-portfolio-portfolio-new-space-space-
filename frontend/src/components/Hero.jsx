import React from 'react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxzcGFjZXxlbnwwfHx8fDE3NTM4OTcyNTJ8MA&ixlib=rb-4.1.0&q=85"
          alt="Space Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-purple-900/70 to-slate-900/90"></div>
      </div>

      {/* Floating Planets */}
      <div className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute top-40 right-20 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute bottom-32 left-1/4 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-ping opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Animated Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse mb-4">
            {personalInfo.name}
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 animate-fade-in-up">
            {personalInfo.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delayed">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Cosmic Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">4+</div>
            <div className="text-sm text-gray-400">Projects</div>
            <div className="text-xs text-purple-400">Launched</div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">2+</div>
            <div className="text-sm text-gray-400">Years</div>
            <div className="text-xs text-cyan-400">Experience</div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">15+</div>
            <div className="text-sm text-gray-400">Technologies</div>
            <div className="text-xs text-green-400">Mastered</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button
            onClick={scrollToAbout}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <span className="flex items-center space-x-2">
              <span>Explore My Universe</span>
              <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </span>
          </button>
          
          <button className="group relative px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <span className="flex items-center space-x-2">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="flex items-center justify-center w-12 h-12 border-2 border-cyan-400 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 group"
          >
            <ArrowDown className="w-6 h-6 group-hover:animate-pulse" />
          </button>
        </div>
      </div>

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="20%" x2="25%" y2="40%" stroke="url(#constellation)" strokeWidth="1" />
        <line x1="75%" y1="25%" x2="90%" y2="45%" stroke="url(#constellation)" strokeWidth="1" />
        <line x1="20%" y1="70%" x2="35%" y2="85%" stroke="url(#constellation)" strokeWidth="1" />
        <line x1="65%" y1="75%" x2="80%" y2="90%" stroke="url(#constellation)" strokeWidth="1" />
      </svg>
    </section>
  );
};

export default Hero;