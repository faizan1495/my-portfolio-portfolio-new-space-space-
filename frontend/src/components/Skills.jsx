import React, { useState, useEffect } from 'react';
import { Code, Database, Wrench, Zap, Star, Rocket } from 'lucide-react';
import { skills } from '../data/mock';

const Skills = () => {
  const [animatedLevels, setAnimatedLevels] = useState({});

  useEffect(() => {
    // Animate skill levels on mount
    const timer = setTimeout(() => {
      const levels = {};
      [...skills.programming, ...skills.frameworks, ...skills.tools, ...skills.soft].forEach(skill => {
        levels[skill.name] = skill.level;
      });
      setAnimatedLevels(levels);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const SkillPlanet = ({ skill, index, icon: Icon, color }) => (
    <div className="group relative">
      {/* Orbiting Ring */}
      <div className={`absolute inset-0 rounded-full border-2 ${color.border} opacity-30 animate-spin-slow`}></div>
      
      {/* Planet Core */}
      <div className={`relative w-32 h-32 ${color.bg} rounded-full flex flex-col items-center justify-center border-4 ${color.border} transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:${color.shadow} group-hover:border-opacity-100`}>
        <Icon className={`w-8 h-8 ${color.text} mb-2`} />
        <div className="text-center">
          <div className={`text-2xl font-bold ${color.text}`}>{animatedLevels[skill.name] || 0}%</div>
          <div className="text-xs text-white font-medium">{skill.name}</div>
        </div>
        
        {/* Skill Level Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color.stroke}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - (animatedLevels[skill.name] || 0) / 100)}`}
            className="transition-all duration-1000 ease-out"
            style={{ transitionDelay: `${index * 100}ms` }}
          />
        </svg>
      </div>
      
      {/* Floating Particles */}
      <div className={`absolute -top-2 -right-2 w-4 h-4 ${color.bg} rounded-full animate-pulse opacity-70`}></div>
      <div className={`absolute -bottom-1 -left-1 w-2 h-2 ${color.bg} rounded-full animate-bounce opacity-60`}></div>
    </div>
  );

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: skills.programming,
      icon: Code,
      color: {
        bg: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-400",
        text: "text-cyan-400",
        stroke: "#06b6d4",
        shadow: "shadow-cyan-500/25"
      }
    },
    {
      title: "Frameworks & APIs",
      skills: skills.frameworks,
      icon: Rocket,
      color: {
        bg: "bg-gradient-to-br from-purple-500/20 to-pink-600/20",
        border: "border-purple-400",
        text: "text-purple-400",
        stroke: "#a855f7",
        shadow: "shadow-purple-500/25"
      }
    },
    {
      title: "Tools & Database",
      skills: skills.tools,
      icon: Database,
      color: {
        bg: "bg-gradient-to-br from-green-500/20 to-emerald-600/20",
        border: "border-green-400",
        text: "text-green-400",
        stroke: "#10b981",
        shadow: "shadow-green-500/25"
      }
    },
    {
      title: "Soft Skills",
      skills: skills.soft,
      icon: Star,
      color: {
        bg: "bg-gradient-to-br from-yellow-500/20 to-orange-600/20",
        border: "border-yellow-400",
        text: "text-yellow-400",
        stroke: "#f59e0b",
        shadow: "shadow-yellow-500/25"
      }
    }
  ];

  return (
    <section id="skills" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
            Skill Galaxy
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate through my constellation of technical expertise, where each skill is a planet in my coding universe
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Skills Categories */}
        <div className="space-y-20">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="relative">
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-3 mb-4">
                  <category.icon className={`w-8 h-8 ${category.color.text}`} />
                  <h3 className="text-3xl font-bold text-white">{category.title}</h3>
                </div>
                <div className={`w-24 h-1 ${category.color.bg} mx-auto rounded-full`}></div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
                {category.skills.map((skill, index) => (
                  <SkillPlanet
                    key={skill.name}
                    skill={skill}
                    index={index}
                    icon={category.icon}
                    color={category.color}
                  />
                ))}
              </div>

              {/* Constellation Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id={`constellation-${categoryIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={category.color.stroke} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={category.color.stroke} stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {category.skills.length > 1 && (
                  <>
                    <line x1="20%" y1="50%" x2="40%" y2="50%" stroke={`url(#constellation-${categoryIndex})`} strokeWidth="1" />
                    <line x1="60%" y1="50%" x2="80%" y2="50%" stroke={`url(#constellation-${categoryIndex})`} strokeWidth="1" />
                  </>
                )}
              </svg>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
            <div className="text-gray-300">Technologies</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">85%</div>
            <div className="text-gray-300">Avg Proficiency</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">2+</div>
            <div className="text-gray-300">Years Learning</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
            <div className="text-gray-300">Growing</div>
          </div>
        </div>
      </div>

      {/* Background Space Elements */}
      <div className="absolute top-10 left-10 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute top-1/3 right-16 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-ping opacity-60"></div>
      <div className="absolute bottom-16 right-1/3 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full animate-pulse opacity-30"></div>
    </section>
  );
};

export default Skills;