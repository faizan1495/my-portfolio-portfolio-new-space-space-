import React from 'react';
import { Heart, Rocket, Mail, Linkedin, ArrowUp, Code } from 'lucide-react';
import { fallbackData } from '../services/api';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const personalInfo = fallbackData.personalInfo;

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/50 border-t border-purple-500/20">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Rocket className="w-10 h-10 text-cyan-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{personalInfo.name}</h3>
                <p className="text-cyan-400">{personalInfo.title}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Exploring the universe of code, one algorithm at a time. Creating stellar solutions for the digital cosmos.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-blue-400 hover:text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-green-400 hover:text-green-300 hover:border-green-400/50 hover:bg-green-500/10 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3"></div>
              Navigation
            </h4>
            <nav className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Education', href: '#education' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-cyan-400 transition-colors duration-300"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-4 h-4 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span>{personalInfo.location}</span>
              </div>
              <div className="text-sm text-gray-400">
                Available for remote and onsite opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-purple-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-2">4+</div>
            <div className="text-gray-400 text-sm">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">15+</div>
            <div className="text-gray-400 text-sm">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">74%</div>
            <div className="text-gray-400 text-sm">CDAC Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">100%</div>
            <div className="text-gray-400 text-sm">Dedication</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} {personalInfo.name}. Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
              <span>and lots of ☕</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-purple-500/30 rounded-full text-cyan-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-105"
            >
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 left-12 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-16 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-bounce opacity-40"></div>
    </footer>
  );
};

export default Footer;