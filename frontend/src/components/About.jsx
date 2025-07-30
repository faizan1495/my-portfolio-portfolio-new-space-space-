import React from 'react';
import { Rocket, Code, Coffee, Zap, Heart } from 'lucide-react';
import { personalInfo, achievements } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Profile Image & Stats */}
          <div className="relative">
            {/* Profile Image Container */}
            <div className="relative mx-auto w-80 h-80 group">
              {/* Rotating Border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-spin-slow p-1">
                <div className="w-full h-full bg-slate-900 rounded-full"></div>
              </div>
              
              {/* Profile Image */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-purple-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxnYWxheHl8ZW58MHx8fHwxNzUzODU5NDgzfDA&ixlib=rb-4.1.0&q=85"
                  alt="Faizan Khan"
                  className="w-full h-full object-cover rounded-full opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-full"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center animate-bounce">
                <Rocket className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-cyan-400/40 transition-colors duration-300">
                <div className="text-2xl font-bold text-cyan-400 mb-2">74%</div>
                <div className="text-sm text-gray-300">CDAC Score</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-colors duration-300">
                <div className="text-2xl font-bold text-purple-400 mb-2">61</div>
                <div className="text-sm text-gray-300">Days Project</div>
              </div>
            </div>
          </div>

          {/* Right Side - Bio & Details */}
          <div className="space-y-8">
            {/* Bio */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-4">
                Navigating the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Code Galaxy</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With a passion for space exploration and cutting-edge technology, I transform complex problems into elegant solutions. My journey from Civil Engineering to Advanced Computing reflects my adaptability and continuous learning mindset.
              </p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 text-pink-400 mr-2" />
                Cosmic Interests
              </h4>
              <div className="flex flex-wrap gap-3">
                {personalInfo.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-slate-800 to-purple-900/50 text-cyan-400 rounded-full text-sm border border-purple-500/20 hover:border-cyan-400/40 transition-colors duration-300 hover:scale-105 transform"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                Mission Achievements
              </h4>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-purple-500/10 hover:border-cyan-400/30 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                <div className="text-sm text-gray-400 mb-1">Location</div>
                <div className="text-white font-medium">{personalInfo.location}</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                <div className="text-sm text-gray-400 mb-1">Available for</div>
                <div className="text-cyan-400 font-medium">Remote & Onsite</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Space Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
    </section>
  );
};

export default About;