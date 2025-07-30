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

# Include the router in the main app
app.include_router(api_router)

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
