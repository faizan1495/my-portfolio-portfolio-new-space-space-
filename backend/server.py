from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Space Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to convert ObjectId to string
def serialize_object_id(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: serialize_object_id(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [serialize_object_id(item) for item in obj]
    return obj

# Response Models
class ApiResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: str
    error: Optional[str] = None

# Portfolio Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    email: EmailStr
    phone: str
    linkedin: str
    github: str
    location: str
    bio: str
    interests: List[str]

class Portfolio(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    personalInfo: PersonalInfo
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

# Skills Models
class Skill(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    category: str
    name: str
    level: int = Field(ge=0, le=100)
    categoryType: str
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

class SkillCreate(BaseModel):
    category: str
    name: str
    level: int = Field(ge=0, le=100)
    categoryType: str

# Projects Models
class Project(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    description: str
    duration: str
    technologies: List[str]
    features: List[str]
    responsibilities: Optional[List[str]] = []
    liveDemo: str
    github: str
    image: str
    isActive: bool = True
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    duration: str
    technologies: List[str]
    features: List[str]
    responsibilities: Optional[List[str]] = []
    liveDemo: str
    github: str
    image: str

# Education Models
class Education(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    degree: str
    institution: str
    board: str
    stream: str
    performance: str
    year: str
    description: Optional[str] = ""
    order: int = 0
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

class EducationCreate(BaseModel):
    degree: str
    institution: str
    board: str
    stream: str
    performance: str
    year: str
    description: Optional[str] = ""
    order: int = 0

# Contact Models
class Contact(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    email: EmailStr
    subject: str
    message: str
    status: str = "new"
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Portfolio Endpoints
@api_router.get("/portfolio")
async def get_portfolio():
    """Get portfolio information"""
    try:
        portfolio = await db.portfolio.find_one()
        if not portfolio:
            # Return default portfolio if none exists
            return ApiResponse(
                success=True,
                data=None,
                message="No portfolio data found"
            )
        
        # Convert ObjectId to string
        portfolio = serialize_object_id(portfolio)
        
        return ApiResponse(
            success=True,
            data=portfolio,
            message="Portfolio retrieved successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to retrieve portfolio"
            ).dict()
        )

# Skills Endpoints
@api_router.get("/skills")
async def get_skills():
    """Get all skills grouped by category"""
    try:
        skills_cursor = db.skills.find()
        skills_list = await skills_cursor.to_list(length=None)
        
        # Convert ObjectIds to strings
        skills_list = serialize_object_id(skills_list)
        
        # Group skills by category
        grouped_skills = {
            "programming": [],
            "frameworks": [],
            "tools": [],
            "soft": []
        }
        
        for skill in skills_list:
            category = skill.get("category", "programming")
            if category in grouped_skills:
                grouped_skills[category].append(skill)
        
        return ApiResponse(
            success=True,
            data=grouped_skills,
            message="Skills retrieved successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to retrieve skills"
            ).dict()
        )

@api_router.post("/skills")
async def create_skill(skill: SkillCreate):
    """Create a new skill"""
    try:
        skill_dict = skill.dict()
        skill_dict["createdAt"] = datetime.utcnow()
        
        result = await db.skills.insert_one(skill_dict)
        
        # Get the created skill
        created_skill = await db.skills.find_one({"_id": result.inserted_id})
        created_skill = serialize_object_id(created_skill)
        
        return ApiResponse(
            success=True,
            data=created_skill,
            message="Skill created successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to create skill"
            ).dict()
        )

# Projects Endpoints
@api_router.get("/projects")
async def get_projects():
    """Get all active projects"""
    try:
        projects_cursor = db.projects.find({"isActive": True}).sort("createdAt", -1)
        projects_list = await projects_cursor.to_list(length=None)
        
        # Convert ObjectIds to strings
        projects_list = serialize_object_id(projects_list)
        
        return ApiResponse(
            success=True,
            data=projects_list,
            message="Projects retrieved successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to retrieve projects"
            ).dict()
        )

@api_router.get("/projects/{project_id}")
async def get_project(project_id: str):
    """Get single project by ID"""
    try:
        project = await db.projects.find_one({"_id": ObjectId(project_id)})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project = serialize_object_id(project)
        
        return ApiResponse(
            success=True,
            data=project,
            message="Project retrieved successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to retrieve project"
            ).dict()
        )

@api_router.post("/projects")
async def create_project(project: ProjectCreate):
    """Create a new project"""
    try:
        project_dict = project.dict()
        project_dict["isActive"] = True
        project_dict["createdAt"] = datetime.utcnow()
        project_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.projects.insert_one(project_dict)
        
        # Get the created project
        created_project = await db.projects.find_one({"_id": result.inserted_id})
        created_project = serialize_object_id(created_project)
        
        return ApiResponse(
            success=True,
            data=created_project,
            message="Project created successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to create project"
            ).dict()
        )

# Education Endpoints
@api_router.get("/education")
async def get_education():
    """Get all education records"""
    try:
        education_cursor = db.education.find().sort("order", -1)
        education_list = await education_cursor.to_list(length=None)
        
        # Convert ObjectIds to strings
        education_list = serialize_object_id(education_list)
        
        return ApiResponse(
            success=True,
            data=education_list,
            message="Education records retrieved successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to retrieve education records"
            ).dict()
        )

@api_router.post("/education")
async def create_education(education: EducationCreate):
    """Create a new education record"""
    try:
        education_dict = education.dict()
        education_dict["createdAt"] = datetime.utcnow()
        
        result = await db.education.insert_one(education_dict)
        
        # Get the created education record
        created_education = await db.education.find_one({"_id": result.inserted_id})
        created_education = serialize_object_id(created_education)
        
        return ApiResponse(
            success=True,
            data=created_education,
            message="Education record created successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to create education record"
            ).dict()
        )

# Contact Endpoints
@api_router.post("/contact")
async def submit_contact(contact: ContactCreate):
    """Submit contact form"""
    try:
        contact_dict = contact.dict()
        contact_dict["status"] = "new"
        contact_dict["createdAt"] = datetime.utcnow()
        
        result = await db.contact.insert_one(contact_dict)
        
        return ApiResponse(
            success=True,
            data={"id": str(result.inserted_id)},
            message="Message sent successfully! I'll get back to you soon."
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to send message"
            ).dict()
        )

@api_router.get("/contact")
async def get_contacts():
    """Get all contact messages"""
    try:
        contacts_cursor = db.contact.find().sort("createdAt", -1)
        contacts_list = await contacts_cursor.to_list(length=None)
        
        # Convert ObjectIds to strings
        contacts_list = serialize_object_id(contacts_list)
        
        return ApiResponse(
            success=True,
            data=contacts_list,
            message="Contact messages retrieved successfully"
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to retrieve contact messages"
            ).dict()
        )

# Data seeding endpoint
@api_router.post("/seed-data")
async def seed_data():
    """Seed database with initial portfolio data"""
    try:
        # Check if data already exists
        portfolio_exists = await db.portfolio.find_one()
        if portfolio_exists:
            return ApiResponse(
                success=True,
                data=None,
                message="Data already seeded"
            )
        
        # Portfolio data
        portfolio_data = {
            "personalInfo": {
                "name": "Faizan Khan",
                "title": "Java Developer",
                "tagline": "Exploring the Universe of Code, One Algorithm at a Time",
                "email": "dsfaizankhan@gmail.com",
                "phone": "+91-8770120986",
                "linkedin": "https://www.linkedin.com/in/faizan-khan-1995f/",
                "github": "https://github.com/faizankhan",
                "location": "India",
                "bio": "Dynamic and highly skilled Java Developer with a strong commitment to excellence. Proactively seeking challenging roles to apply advanced proficiency in Java, Spring Framework, and cutting-edge software development methodologies.",
                "interests": ["Space Exploration", "Astronomy", "Coding", "Problem Solving", "Technology Innovation"]
            },
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        
        await db.portfolio.insert_one(portfolio_data)
        
        # Skills data
        skills_data = [
            {"category": "programming", "name": "Java", "level": 90, "categoryType": "Programming Languages"},
            {"category": "programming", "name": "SQL", "level": 85, "categoryType": "Programming Languages"},
            {"category": "programming", "name": "Dot Net", "level": 75, "categoryType": "Programming Languages"},
            {"category": "programming", "name": "JavaScript", "level": 80, "categoryType": "Web Technologies"},
            {"category": "programming", "name": "HTML/CSS", "level": 90, "categoryType": "Web Technologies"},
            {"category": "frameworks", "name": "Spring Boot", "level": 90, "categoryType": "Frameworks"},
            {"category": "frameworks", "name": "Hibernate", "level": 85, "categoryType": "Frameworks"},
            {"category": "frameworks", "name": "RESTful APIs", "level": 88, "categoryType": "Frameworks"},
            {"category": "frameworks", "name": "Microservices", "level": 82, "categoryType": "Frameworks"},
            {"category": "tools", "name": "MySQL", "level": 85, "categoryType": "Database"},
            {"category": "tools", "name": "Git", "level": 90, "categoryType": "Version Control"},
            {"category": "tools", "name": "GitHub", "level": 88, "categoryType": "Version Control"},
            {"category": "tools", "name": "Eclipse", "level": 85, "categoryType": "IDE"},
            {"category": "tools", "name": "IntelliJ IDEA", "level": 90, "categoryType": "IDE"},
            {"category": "tools", "name": "Postman", "level": 85, "categoryType": "Testing"},
            {"category": "soft", "name": "Problem Solving", "level": 95, "categoryType": "Soft Skills"},
            {"category": "soft", "name": "Communication", "level": 90, "categoryType": "Soft Skills"},
            {"category": "soft", "name": "Teamwork", "level": 92, "categoryType": "Soft Skills"},
            {"category": "soft", "name": "Quick Learning", "level": 95, "categoryType": "Soft Skills"},
            {"category": "soft", "name": "Analytical Thinking", "level": 93, "categoryType": "Soft Skills"}
        ]
        
        for skill in skills_data:
            skill["createdAt"] = datetime.utcnow()
        
        await db.skills.insert_many(skills_data)
        
        # Projects data
        projects_data = [
            {
                "title": "E-commerce Nebula Platform",
                "description": "Developed a dynamic E-commerce platform for Namkeen products client, driving business expansion across the digital galaxy.",
                "duration": "61 Days",
                "technologies": ["React.js", "Spring Boot", "MySQL", "RESTful APIs", "Microservices"],
                "features": [
                    "Responsive frontend with React.js",
                    "Robust Spring Boot backend",
                    "MySQL database optimization",
                    "Secure user authentication",
                    "RESTful API integration"
                ],
                "responsibilities": [
                    "Backend development with RESTful APIs",
                    "Database schema design and optimization",
                    "API testing with Postman",
                    "Frontend-backend integration"
                ],
                "liveDemo": "https://ecommerce-demo.space",
                "github": "https://github.com/faizankhan/ecommerce-platform",
                "image": "https://images.unsplash.com/photo-1504333638930-c8787321eee0",
                "isActive": True,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            },
            {
                "title": "Cosmic Banking System",
                "description": "A futuristic banking application with advanced security features and real-time transaction processing.",
                "duration": "45 Days",
                "technologies": ["Java", "Spring Security", "PostgreSQL", "JWT", "Docker"],
                "features": [
                    "Secure authentication system",
                    "Real-time transaction processing",
                    "Advanced encryption protocols"
                ],
                "responsibilities": [],
                "liveDemo": "https://cosmic-bank.space",
                "github": "https://github.com/faizankhan/cosmic-banking",
                "image": "https://images.unsplash.com/photo-1537420327992-d6e192287183",
                "isActive": True,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            }
        ]
        
        await db.projects.insert_many(projects_data)
        
        # Education data
        education_data = [
            {
                "degree": "Diploma in Advanced Computing",
                "institution": "MET CDAC Nashik",
                "board": "CDAC",
                "stream": "Advanced Computing",
                "performance": "74%",
                "year": "2023",
                "description": "Specialized in advanced computing concepts and software development methodologies.",
                "order": 4,
                "createdAt": datetime.utcnow()
            },
            {
                "degree": "Bachelor of Engineering",
                "institution": "Trinity Institute of Technology & Research",
                "board": "RGPV",
                "stream": "Civil Engineering",
                "performance": "67.1%",
                "year": "2018",
                "description": "Developed strong analytical and problem-solving skills through engineering fundamentals.",
                "order": 3,
                "createdAt": datetime.utcnow()
            }
        ]
        
        await db.education.insert_many(education_data)
        
        return ApiResponse(
            success=True,
            data=None,
            message="Database seeded successfully with portfolio data"
        )
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                success=False,
                error=str(e),
                message="Failed to seed database"
            ).dict()
        )

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
