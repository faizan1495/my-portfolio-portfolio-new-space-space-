import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Calendar, Zap, Code, Layers } from 'lucide-react';
import { portfolioAPI, fallbackData } from '../services/api';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const ProjectCard = ({ project, index }) => (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center opacity-80">
          <span className="text-white text-xs font-bold">{index + 1}</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center text-purple-400 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {project.duration}
          </div>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Code className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm font-semibold text-cyan-400">Technologies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white text-xs rounded-full border border-purple-500/30 hover:border-cyan-400/50 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedProject(project)}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <Layers className="w-4 h-4" />
            <span>Details</span>
          </button>
          
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border-2 border-purple-400 text-purple-400 rounded-xl hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
            Mission Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the galaxies of code I've created, each project a unique journey through the cosmos of technology
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-cyan-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{projects.length}</div>
            <div className="text-gray-300">Projects</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
            <div className="text-gray-300">Technologies</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-green-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">172</div>
            <div className="text-gray-300">Total Days</div>
          </div>
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-pink-400/40 transition-colors duration-300">
            <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-cyan-400 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features?.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3 text-gray-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-purple-400 mb-3">Project Description</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-cyan-400 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white text-sm rounded-full border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.responsibilities && (
                    <div>
                      <h4 className="text-xl font-semibold text-green-400 mb-3">My Responsibilities</h4>
                      <ul className="space-y-2">
                        {selectedProject.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start space-x-3 text-gray-300">
                            <Zap className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-4">
                    <a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-cyan-400 text-cyan-400 py-3 px-4 rounded-xl font-semibold hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Space Elements */}
      <div className="absolute top-20 left-16 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 right-20 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute top-1/2 left-8 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-70"></div>
    </section>
  );
};

export default Projects;