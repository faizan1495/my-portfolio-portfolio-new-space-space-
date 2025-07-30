import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Rocket, MessageCircle } from 'lucide-react';
import { portfolioAPI, fallbackData } from '../services/api';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Use fallback data for personal info (should be same across components)
  const personalInfo = fallbackData.personalInfo;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-cyan-400 hover:text-cyan-300',
      bgColor: 'bg-cyan-500/20 hover:bg-cyan-500/30'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'text-green-400 hover:text-green-300',
      bgColor: 'bg-green-500/20 hover:bg-green-500/30'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: personalInfo.location,
      href: '#',
      color: 'text-purple-400 hover:text-purple-300',
      bgColor: 'bg-purple-500/20 hover:bg-purple-500/30'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Connect with me',
      href: personalInfo.linkedin,
      color: 'text-blue-400 hover:text-blue-300',
      bgColor: 'bg-blue-500/20 hover:bg-blue-500/30'
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
            Mission Control
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to embark on a coding journey together? Send a signal across the digital cosmos
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Rocket className="w-8 h-8 text-cyan-400 mr-3" />
                Let's Connect
              </h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                I'm always excited to discuss new opportunities, innovative projects, or simply chat about the latest in technology and space exploration. Drop me a message, and let's create something extraordinary together!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`flex items-center space-x-4 p-4 rounded-xl border border-purple-500/20 ${method.bgColor} transition-all duration-300 hover:scale-105 hover:border-opacity-40 group`}
                >
                  <div className={`p-3 rounded-full ${method.bgColor} ${method.color} group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{method.title}</div>
                    <div className={`${method.color} transition-colors duration-300`}>{method.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">24h</div>
                <div className="text-gray-300 text-sm">Response Time</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-gray-300 text-sm">Commitment</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-cyan-400/40 transition-colors duration-500">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-6 h-6 text-cyan-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Send Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Launching Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Launch Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Form Footer */}
            <div className="mt-6 pt-6 border-t border-purple-500/20 text-center">
              <p className="text-sm text-gray-400">
                Usually responds within 24 hours • All messages are encrypted
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Space Elements */}
      <div className="absolute top-20 left-16 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/2 right-12 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-bounce opacity-70"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-ping opacity-50"></div>
      <div className="absolute bottom-32 right-1/4 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full animate-pulse opacity-40"></div>
    </section>
  );
};

export default Contact;