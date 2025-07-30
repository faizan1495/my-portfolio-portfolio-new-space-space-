import React, { useState, useEffect } from 'react';
import { GraduationCap, Calendar, Award, BookOpen, Star } from 'lucide-react';
import { portfolioAPI, fallbackData } from '../services/api';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await portfolioAPI.getEducation();
        setEducation(data || fallbackData.education);
      } catch (err) {
        console.error('Failed to fetch education:', err);
        setError(err.message);
        // Use fallback data
        setEducation(fallbackData.education);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section id="education" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
        <div className="container mx-auto max-w-6xl flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-400">Loading academic journey...</p>
          </div>
        </div>
      </section>
    );
  }
  const EducationCard = ({ edu, index, isHighlighted }) => (
    <div className={`relative group ${isHighlighted ? 'lg:scale-105' : ''}`}>
      {/* Timeline Connector */}
      {index < education.length - 1 && (
        <div className="hidden lg:block absolute left-1/2 top-full w-1 h-16 bg-gradient-to-b from-cyan-400 to-purple-400 transform -translate-x-1/2 z-10"></div>
      )}
      
      {/* Timeline Node */}
      <div className="absolute left-1/2 -top-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full transform -translate-x-1/2 z-20 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>

      {/* Card */}
      <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        isHighlighted 
          ? 'border-cyan-400/60 hover:border-cyan-400 shadow-cyan-500/20' 
          : 'border-purple-500/20 hover:border-purple-400/40 hover:shadow-purple-500/10'
      }`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${isHighlighted ? 'bg-cyan-500/20' : 'bg-purple-500/20'}`}>
              <GraduationCap className={`w-6 h-6 ${isHighlighted ? 'text-cyan-400' : 'text-purple-400'}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
              <p className={`text-sm ${isHighlighted ? 'text-cyan-400' : 'text-purple-400'}`}>{edu.stream}</p>
            </div>
          </div>
          
          {/* Year Badge */}
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            isHighlighted 
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
              : 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
          }`}>
            {edu.year}
          </div>
        </div>

        {/* Institution Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-white font-medium">{edu.institution}</div>
              <div className="text-sm text-gray-400">{edu.board}</div>
            </div>
          </div>
          
          {/* Performance */}
          <div className="flex items-center space-x-3">
            <Award className={`w-4 h-4 ${isHighlighted ? 'text-cyan-400' : 'text-purple-400'}`} />
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">Performance:</span>
              <span className={`font-bold ${isHighlighted ? 'text-cyan-400' : 'text-purple-400'}`}>
                {edu.performance}
              </span>
              {isHighlighted && (
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {edu.description && (
          <p className="text-gray-300 text-sm leading-relaxed">
            {edu.description}
          </p>
        )}

        {/* Highlight Badge */}
        {isHighlighted && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            Latest
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="education" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
            Academic Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Charting my educational voyage through the cosmos of knowledge and discovery
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-transparent transform -translate-x-1/2"></div>
          
          {/* Education Cards */}
          <div className="space-y-16 lg:space-y-24">
            {education.map((edu, index) => (
              <EducationCard 
                key={index} 
                edu={edu} 
                index={index} 
                isHighlighted={index === 0} // Highlight the most recent education
              />
            ))}
          </div>
        </div>

        {/* Educational Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-cyan-400 mb-2">74%</div>
            <div className="text-gray-300">CDAC Score</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
            <div className="text-gray-300">Qualifications</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">2</div>
            <div className="text-gray-300">Degrees</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-yellow-400 mb-2">12+</div>
            <div className="text-gray-300">Study Years</div>
          </div>
        </div>

        {/* Journey Highlights */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Journey Highlights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-cyan-400/40 transition-colors duration-300">
              <div className="text-cyan-400 text-2xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold text-white mb-2">Career Transition</h4>
              <p className="text-gray-300 text-sm">Successfully transitioned from Civil Engineering to Advanced Computing</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-colors duration-300">
              <div className="text-purple-400 text-2xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold text-white mb-2">Specialized Training</h4>
              <p className="text-gray-300 text-sm">Advanced Computing certification from prestigious CDAC institute</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-green-400/40 transition-colors duration-300">
              <div className="text-green-400 text-2xl mb-3">⭐</div>
              <h4 className="text-lg font-semibold text-white mb-2">Strong Foundation</h4>
              <p className="text-gray-300 text-sm">Solid engineering background with analytical problem-solving skills</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Space Elements */}
      <div className="absolute top-16 left-12 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-16 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-ping opacity-70"></div>
      <div className="absolute bottom-32 right-1/3 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full animate-pulse opacity-40"></div>
    </section>
  );
};

export default Education;