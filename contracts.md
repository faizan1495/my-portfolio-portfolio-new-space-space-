# Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for Faizan Khan's Space Portfolio application.

## Current Mock Data (frontend/src/data/mock.js)
Currently using static mock data for:
- Personal information (name, title, contact details)
- Skills with proficiency levels
- Projects with details, technologies, and descriptions
- Education history
- Achievements and testimonials
- Contact form submissions

## Backend Implementation Plan

### 1. Database Models (MongoDB)

#### Portfolio Model
```javascript
{
  _id: ObjectId,
  personalInfo: {
    name: String,
    title: String,
    tagline: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    location: String,
    bio: String,
    interests: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Skills Model
```javascript
{
  _id: ObjectId,
  category: String, // "programming", "frameworks", "tools", "soft"
  name: String,
  level: Number, // 0-100
  categoryType: String, // "Programming Languages", "Frameworks", etc.
  createdAt: Date
}
```

#### Projects Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  duration: String,
  technologies: [String],
  features: [String],
  responsibilities: [String],
  liveDemo: String,
  github: String,
  image: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Education Model
```javascript
{
  _id: ObjectId,
  degree: String,
  institution: String,
  board: String,
  stream: String,
  performance: String,
  year: String,
  description: String,
  order: Number,
  createdAt: Date
}
```

#### Contact Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String, // "new", "read", "responded"
  createdAt: Date
}
```

### 2. API Endpoints

#### Portfolio Endpoints
- `GET /api/portfolio` - Get personal information and basic stats
- `PUT /api/portfolio` - Update personal information (admin only)

#### Skills Endpoints
- `GET /api/skills` - Get all skills grouped by category
- `POST /api/skills` - Add new skill (admin only)
- `PUT /api/skills/:id` - Update skill (admin only)
- `DELETE /api/skills/:id` - Delete skill (admin only)

#### Projects Endpoints
- `GET /api/projects` - Get all active projects
- `GET /api/projects/:id` - Get single project details
- `POST /api/projects` - Create new project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

#### Education Endpoints
- `GET /api/education` - Get all education records
- `POST /api/education` - Add education record (admin only)
- `PUT /api/education/:id` - Update education record (admin only)
- `DELETE /api/education/:id` - Delete education record (admin only)

#### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin only)
- `PUT /api/contact/:id` - Update contact message status (admin only)

### 3. Data Seeding
On first run, populate database with current mock data to ensure seamless transition.

### 4. Frontend Integration Changes

#### API Service Layer
Create `src/services/api.js` to handle all backend communications:
- Replace mock data imports with API calls
- Handle loading states and error handling
- Implement caching for static data (skills, education, projects)

#### Components to Update
1. **Hero.jsx** - Fetch personal info and stats
2. **About.jsx** - Fetch personal info, achievements
3. **Projects.jsx** - Fetch projects data
4. **Skills.jsx** - Fetch skills by category
5. **Education.jsx** - Fetch education records
6. **Contact.jsx** - Submit contact form to backend

#### State Management
- Add loading states for each section
- Implement error handling with user-friendly messages
- Add retry mechanisms for failed API calls

### 5. Environment Variables
Backend will use existing MONGODB_URL from .env file.
Frontend will continue using REACT_APP_BACKEND_URL for API calls.

### 6. Error Handling
- Graceful fallback to cached data if API fails
- User-friendly error messages
- Proper HTTP status codes
- Validation for all inputs

### 7. Response Formats

#### Success Response
```javascript
{
  success: true,
  data: { ... },
  message: "Success message"
}
```

#### Error Response
```javascript
{
  success: false,
  error: "Error message",
  details: { ... } // Optional validation details
}
```

## Implementation Priority
1. Database models and seeding
2. Portfolio and contact endpoints (core functionality)
3. Skills and projects endpoints  
4. Education endpoints
5. Frontend integration and testing
6. Error handling and validation

This approach ensures zero downtime during migration from mock data to live backend.