// API service layer for Space Portfolio frontend
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle API responses consistently
apiClient.interceptors.response.use(
  (response) => {
    // Return the data part of our custom ApiResponse format
    return response.data.success ? response.data.data : response.data;
  },
  (error) => {
    console.error('API Error:', error);
    // Return a fallback error object
    return Promise.reject({
      message: error.response?.data?.error || error.message || 'Network error occurred',
      status: error.response?.status || 500
    });
  }
);

// API service methods
export const portfolioAPI = {
  // Portfolio endpoints
  getPortfolio: async () => {
    try {
      const response = await apiClient.get('/portfolio');
      return response;
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      throw error;
    }
  },

  // Skills endpoints
  getSkills: async () => {
    try {
      const response = await apiClient.get('/skills');
      return response;
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      throw error;
    }
  },

  createSkill: async (skillData) => {
    try {
      const response = await apiClient.post('/skills', skillData);
      return response;
    } catch (error) {
      console.error('Failed to create skill:', error);
      throw error;
    }
  },

  // Projects endpoints
  getProjects: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  getProject: async (projectId) => {
    try {
      const response = await apiClient.get(`/projects/${projectId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch project:', error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await apiClient.post('/projects', projectData);
      return response;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  },

  // Education endpoints
  getEducation: async () => {
    try {
      const response = await apiClient.get('/education');
      return response;
    } catch (error) {
      console.error('Failed to fetch education:', error);
      throw error;
    }
  },

  createEducation: async (educationData) => {
    try {
      const response = await apiClient.post('/education', educationData);
      return response;
    } catch (error) {
      console.error('Failed to create education:', error);
      throw error;
    }
  },

  // Contact endpoints
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response;
    } catch (error) {
      console.error('Failed to submit contact:', error);
      throw error;
    }
  },

  getContacts: async () => {
    try {
      const response = await apiClient.get('/contact');
      return response;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      throw error;
    }
  },

  // Database seeding
  seedData: async () => {
    try {
      const response = await apiClient.post('/seed-data');
      return response;
    } catch (error) {
      console.error('Failed to seed data:', error);
      throw error;
    }
  }
};

// Fallback data in case API fails (using mock data as backup)
export const fallbackData = {
  personalInfo: {
    name: "Faizan Khan",
    title: "Java Developer",
    tagline: "Exploring the Universe of Code, One Algorithm at a Time",
    email: "dsfaizankhan@gmail.com",
    phone: "+91-8770120986",
    linkedin: "https://www.linkedin.com/in/faizan-khan-1995f/",
    github: "https://github.com/faizankhan",
    location: "India",
    bio: "Dynamic and highly skilled Java Developer with a strong commitment to excellence.",
    interests: ["Space Exploration", "Astronomy", "Coding", "Problem Solving", "Technology Innovation"]
  },
  
  skills: {
    programming: [
      { name: "Java", level: 90, category: "Programming Languages" },
      { name: "SQL", level: 85, category: "Programming Languages" },
      { name: "JavaScript", level: 80, category: "Web Technologies" }
    ],
    frameworks: [
      { name: "Spring Boot", level: 90, category: "Frameworks" },
      { name: "Hibernate", level: 85, category: "Frameworks" }
    ],
    tools: [
      { name: "MySQL", level: 85, category: "Database" },
      { name: "Git", level: 90, category: "Version Control" }
    ],
    soft: [
      { name: "Problem Solving", level: 95 },
      { name: "Communication", level: 90 }
    ]
  },
  
  projects: [
    {
      id: "1",
      title: "E-commerce Nebula Platform",
      description: "Developed a dynamic E-commerce platform for Namkeen products client, driving business expansion across the digital galaxy.",
      duration: "61 Days",
      technologies: ["React.js", "Spring Boot", "MySQL", "RESTful APIs", "Microservices"],
      features: [
        "Responsive frontend with React.js",
        "Robust Spring Boot backend",
        "MySQL database optimization"
      ],
      liveDemo: "https://ecommerce-demo.space",
      github: "https://github.com/faizankhan/ecommerce-platform",
      image: "https://images.unsplash.com/photo-1504333638930-c8787321eee0"
    }
  ],
  
  education: [
    {
      degree: "Diploma in Advanced Computing",
      institution: "MET CDAC Nashik",
      board: "CDAC",
      stream: "Advanced Computing",
      performance: "74%",
      year: "2023",
      description: "Specialized in advanced computing concepts and software development methodologies."
    }
  ]
};

export default portfolioAPI;