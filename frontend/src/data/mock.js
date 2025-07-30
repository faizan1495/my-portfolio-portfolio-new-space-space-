// Mock data for Faizan Khan's Space Portfolio

export const personalInfo = {
  name: "Faizan Khan",
  title: "Java Developer",
  tagline: "Exploring the Universe of Code, One Algorithm at a Time",
  email: "dsfaizankhan@gmail.com",
  phone: "+91-8770120986",
  linkedin: "https://www.linkedin.com/in/faizan-khan-1995f/",
  github: "https://github.com/faizankhan", // Mock GitHub
  location: "India",
  bio: "Dynamic and highly skilled Java Developer with a strong commitment to excellence. Proactively seeking challenging roles to apply advanced proficiency in Java, Spring Framework, and cutting-edge software development methodologies. Dedicated to delivering top-notch, performance-driven solutions.",
  interests: ["Space Exploration", "Astronomy", "Coding", "Problem Solving", "Technology Innovation"]
};

export const skills = {
  programming: [
    { name: "Java", level: 90, category: "Programming Languages" },
    { name: "SQL", level: 85, category: "Programming Languages" },
    { name: "Dot Net", level: 75, category: "Programming Languages" },
    { name: "JavaScript", level: 80, category: "Web Technologies" },
    { name: "HTML/CSS", level: 90, category: "Web Technologies" }
  ],
  frameworks: [
    { name: "Spring Boot", level: 90, category: "Frameworks" },
    { name: "Hibernate", level: 85, category: "Frameworks" },
    { name: "RESTful APIs", level: 88, category: "Frameworks" },
    { name: "Microservices", level: 82, category: "Frameworks" }
  ],
  tools: [
    { name: "MySQL", level: 85, category: "Database" },
    { name: "Git", level: 90, category: "Version Control" },
    { name: "GitHub", level: 88, category: "Version Control" },
    { name: "Eclipse", level: 85, category: "IDE" },
    { name: "IntelliJ IDEA", level: 90, category: "IDE" },
    { name: "Postman", level: 85, category: "Testing" }
  ],
  soft: [
    { name: "Problem Solving", level: 95 },
    { name: "Communication", level: 90 },
    { name: "Teamwork", level: 92 },
    { name: "Quick Learning", level: 95 },
    { name: "Analytical Thinking", level: 93 }
  ]
};

export const projects = [
  {
    id: 1,
    title: "E-commerce Nebula Platform",
    description: "Developed a dynamic E-commerce platform for Namkeen products client, driving business expansion across the digital galaxy. Built with modern technologies and space-age performance.",
    duration: "61 Days",
    technologies: ["React.js", "Spring Boot", "MySQL", "RESTful APIs", "Microservices"],
    features: [
      "Responsive frontend with React.js",
      "Robust Spring Boot backend",
      "MySQL database optimization",
      "Secure user authentication",
      "RESTful API integration",
      "State management implementation"
    ],
    responsibilities: [
      "Backend development with RESTful APIs",
      "Database schema design and optimization",
      "API testing with Postman",
      "Frontend-backend integration",
      "Unit and integration testing",
      "Cross-functional team collaboration"
    ],
    liveDemo: "https://ecommerce-demo.space", // Mock URL
    github: "https://github.com/faizankhan/ecommerce-platform", // Mock URL
    image: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxnYWxheHl8ZW58MHx8fHwxNzUzODU5NDgzfDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    title: "Cosmic Banking System",
    description: "A futuristic banking application with advanced security features and real-time transaction processing, designed for the next generation of financial services.",
    duration: "45 Days",
    technologies: ["Java", "Spring Security", "PostgreSQL", "JWT", "Docker"],
    features: [
      "Secure authentication system",
      "Real-time transaction processing",
      "Advanced encryption protocols",
      "RESTful API architecture",
      "Microservices deployment"
    ],
    liveDemo: "https://cosmic-bank.space", // Mock URL
    github: "https://github.com/faizankhan/cosmic-banking", // Mock URL
    image: "https://images.unsplash.com/photo-1537420327992-d6e192287183?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxzcGFjZXxlbnwwfHx8fDE3NTM4OTcyNTJ8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 3,
    title: "Stellar Task Manager",
    description: "A comprehensive project management tool with advanced collaboration features, helping teams navigate through complex projects like exploring distant galaxies.",
    duration: "38 Days",
    technologies: ["Spring Boot", "React", "MongoDB", "WebSocket", "Redis"],
    features: [
      "Real-time collaboration",
      "Advanced task tracking",
      "Team communication hub",
      "Progress analytics dashboard",
      "Mobile-responsive design"
    ],
    liveDemo: "https://stellar-tasks.space", // Mock URL
    github: "https://github.com/faizankhan/stellar-tasks", // Mock URL
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxnYWxheHl8ZW58MHx8fHwxNzUzODU5NDgzfDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 4,
    title: "Galaxy Code Compiler",
    description: "An online code compilation and execution platform supporting multiple programming languages, designed for aspiring space-age developers.",
    duration: "28 Days",
    technologies: ["Java", "Docker", "Node.js", "WebSocket", "AWS"],
    features: [
      "Multi-language support",
      "Real-time code execution",
      "Secure sandboxed environment",
      "Performance analytics",
      "Code sharing capabilities"
    ],
    liveDemo: "https://galaxy-compiler.space", // Mock URL
    github: "https://github.com/faizankhan/galaxy-compiler", // Mock URL
    image: "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg"
  }
];

export const education = [
  {
    degree: "Diploma in Advanced Computing",
    institution: "MET CDAC Nashik",
    board: "CDAC",
    stream: "Advanced Computing",
    performance: "74%",
    year: "2023",
    description: "Specialized in advanced computing concepts, software development methodologies, and modern programming frameworks."
  },
  {
    degree: "Bachelor of Engineering",
    institution: "Trinity Institute of Technology & Research",
    board: "RGPV",
    stream: "Civil Engineering",
    performance: "67.1%",
    year: "2018",
    description: "Developed strong analytical and problem-solving skills through engineering fundamentals and project management."
  },
  {
    degree: "12th Grade",
    institution: "School for Mission Boys H.S SCHOOL",
    board: "M.P Board",
    stream: "Science/Math",
    performance: "49.8%",
    year: "2014"
  },
  {
    degree: "10th Grade",
    institution: "Little Flower Convent School, Seoni M.P",
    board: "M.P Board",
    stream: "Science/Math",
    performance: "50.5%",
    year: "2011"
  }
];

export const experience = [
  {
    position: "Java Developer",
    company: "Cosmic Tech Solutions",
    duration: "2023 - Present",
    type: "Full-time",
    responsibilities: [
      "Developing scalable Java applications using Spring Boot framework",
      "Designing and implementing RESTful APIs for microservices architecture",
      "Collaborating with cross-functional teams on space-age technology solutions",
      "Optimizing database queries and improving application performance",
      "Conducting code reviews and mentoring junior developers"
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "Docker", "AWS"]
  }
];

export const achievements = [
  "Successfully delivered E-commerce platform increasing client business by 40%",
  "Implemented microservices architecture reducing system downtime by 60%",
  "Achieved 74% in Advanced Computing Diploma from CDAC",
  "Led backend development team of 3 developers on major project",
  "Optimized database queries improving application response time by 45%"
];

export const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "Senior Technical Lead",
    company: "Cosmic Tech Solutions",
    message: "Faizan is an exceptional Java developer who consistently delivers high-quality code. His problem-solving skills and dedication to excellence make him a valuable team member.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Priya Sharma",
    position: "Project Manager", 
    company: "Digital Nebula Inc",
    message: "Working with Faizan on the e-commerce project was fantastic. He delivered beyond expectations and showed great leadership in backend development.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  }
];