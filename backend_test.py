#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Space Portfolio
Tests all endpoints systematically with real-world data
"""

import requests
import json
import sys
import os
from datetime import datetime
from typing import Dict, Any, List

# Load environment variables
def load_env_file(file_path: str) -> Dict[str, str]:
    """Load environment variables from .env file"""
    env_vars = {}
    try:
        with open(file_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key] = value.strip('"')
    except FileNotFoundError:
        print(f"Warning: {file_path} not found")
    return env_vars

# Load frontend environment to get backend URL
frontend_env = load_env_file('/app/frontend/.env')
BASE_URL = frontend_env.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BASE_URL}/api"

print(f"Testing API at: {API_BASE_URL}")

class APITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
        
        if not success:
            self.failed_tests.append(test_name)
    
    def test_api_health(self):
        """Test basic API connectivity and CORS"""
        print("\n=== API Health Check ===")
        
        try:
            # Test basic connectivity
            response = self.session.get(f"{API_BASE_URL}/portfolio", timeout=10)
            if response.status_code in [200, 404]:  # 404 is ok if no data seeded yet
                self.log_test("API Connectivity", True, f"Status: {response.status_code}")
                
                # Check CORS headers
                cors_headers = response.headers.get('access-control-allow-origin')
                if cors_headers:
                    self.log_test("CORS Headers", True, f"CORS: {cors_headers}")
                else:
                    self.log_test("CORS Headers", False, "No CORS headers found")
                    
                # Check response format
                try:
                    data = response.json()
                    if isinstance(data, dict) and 'success' in data:
                        self.log_test("API Response Format", True, "Valid ApiResponse format")
                    else:
                        self.log_test("API Response Format", False, "Invalid response format")
                except:
                    self.log_test("API Response Format", False, "Non-JSON response")
            else:
                self.log_test("API Connectivity", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("API Connectivity", False, f"Connection error: {str(e)}")
    
    def test_seed_data(self):
        """Test database seeding endpoint"""
        print("\n=== Database Seeding Test ===")
        
        try:
            response = self.session.post(f"{API_BASE_URL}/seed-data", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_test("Database Seeding", True, data.get('message', ''))
                    
                    # Test duplicate seeding (should not duplicate)
                    response2 = self.session.post(f"{API_BASE_URL}/seed-data", timeout=15)
                    if response2.status_code == 200:
                        data2 = response2.json()
                        if "already seeded" in data2.get('message', '').lower():
                            self.log_test("Duplicate Seeding Prevention", True, "Prevents duplicate seeding")
                        else:
                            self.log_test("Duplicate Seeding Prevention", False, "May allow duplicates")
                    else:
                        self.log_test("Duplicate Seeding Prevention", False, f"Status: {response2.status_code}")
                else:
                    self.log_test("Database Seeding", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Database Seeding", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Database Seeding", False, f"Request error: {str(e)}")
    
    def test_portfolio_endpoints(self):
        """Test portfolio endpoints"""
        print("\n=== Portfolio Endpoints Test ===")
        
        try:
            # GET /api/portfolio
            response = self.session.get(f"{API_BASE_URL}/portfolio", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    portfolio_data = data.get('data')
                    if portfolio_data and 'personalInfo' in portfolio_data:
                        personal_info = portfolio_data['personalInfo']
                        
                        # Validate required fields
                        required_fields = ['name', 'title', 'email', 'phone', 'linkedin', 'github']
                        missing_fields = [field for field in required_fields if not personal_info.get(field)]
                        
                        if not missing_fields:
                            self.log_test("Portfolio Data Structure", True, f"Name: {personal_info['name']}")
                            
                            # Validate email format
                            email = personal_info.get('email', '')
                            if '@' in email and '.' in email:
                                self.log_test("Portfolio Email Validation", True, f"Email: {email}")
                            else:
                                self.log_test("Portfolio Email Validation", False, f"Invalid email: {email}")
                        else:
                            self.log_test("Portfolio Data Structure", False, f"Missing fields: {missing_fields}")
                    else:
                        self.log_test("Portfolio Data Structure", False, "No portfolio data or missing personalInfo")
                else:
                    self.log_test("Portfolio Retrieval", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Portfolio Retrieval", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Portfolio Retrieval", False, f"Request error: {str(e)}")
    
    def test_skills_endpoints(self):
        """Test skills endpoints"""
        print("\n=== Skills Endpoints Test ===")
        
        try:
            # GET /api/skills
            response = self.session.get(f"{API_BASE_URL}/skills", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    skills_data = data.get('data', {})
                    
                    # Check if skills are grouped by category
                    expected_categories = ['programming', 'frameworks', 'tools', 'soft']
                    found_categories = [cat for cat in expected_categories if cat in skills_data]
                    
                    if len(found_categories) >= 3:  # At least 3 categories should exist
                        self.log_test("Skills Grouping", True, f"Categories: {found_categories}")
                        
                        # Validate skill level ranges
                        all_skills = []
                        for category_skills in skills_data.values():
                            if isinstance(category_skills, list):
                                all_skills.extend(category_skills)
                        
                        invalid_levels = [skill for skill in all_skills 
                                        if not (0 <= skill.get('level', -1) <= 100)]
                        
                        if not invalid_levels:
                            self.log_test("Skills Level Validation", True, f"Total skills: {len(all_skills)}")
                        else:
                            self.log_test("Skills Level Validation", False, f"Invalid levels found: {len(invalid_levels)}")
                    else:
                        self.log_test("Skills Grouping", False, f"Only found: {found_categories}")
                else:
                    self.log_test("Skills Retrieval", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Skills Retrieval", False, f"Status: {response.status_code}")
            
            # POST /api/skills - Test creating new skill
            new_skill = {
                "category": "programming",
                "name": "Python",
                "level": 85,
                "categoryType": "Programming Languages"
            }
            
            response = self.session.post(f"{API_BASE_URL}/skills", json=new_skill, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    created_skill = data.get('data')
                    if created_skill and created_skill.get('name') == 'Python':
                        self.log_test("Skills Creation", True, f"Created skill: {created_skill['name']}")
                    else:
                        self.log_test("Skills Creation", False, "Invalid created skill data")
                else:
                    self.log_test("Skills Creation", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Skills Creation", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Skills Endpoints", False, f"Request error: {str(e)}")
    
    def test_projects_endpoints(self):
        """Test projects endpoints"""
        print("\n=== Projects Endpoints Test ===")
        
        try:
            # GET /api/projects
            response = self.session.get(f"{API_BASE_URL}/projects", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    projects = data.get('data', [])
                    
                    if projects and len(projects) > 0:
                        self.log_test("Projects Retrieval", True, f"Found {len(projects)} projects")
                        
                        # Validate project structure
                        first_project = projects[0]
                        required_fields = ['title', 'description', 'technologies', 'features']
                        missing_fields = [field for field in required_fields if field not in first_project]
                        
                        if not missing_fields:
                            self.log_test("Projects Data Structure", True, f"Title: {first_project['title']}")
                            
                            # Test single project retrieval
                            project_id = first_project.get('id') or first_project.get('_id')
                            if project_id:
                                single_response = self.session.get(f"{API_BASE_URL}/projects/{project_id}", timeout=10)
                                if single_response.status_code == 200:
                                    single_data = single_response.json()
                                    if single_data.get('success'):
                                        self.log_test("Single Project Retrieval", True, f"Retrieved project: {project_id}")
                                    else:
                                        self.log_test("Single Project Retrieval", False, single_data.get('error', ''))
                                else:
                                    self.log_test("Single Project Retrieval", False, f"Status: {single_response.status_code}")
                        else:
                            self.log_test("Projects Data Structure", False, f"Missing fields: {missing_fields}")
                    else:
                        self.log_test("Projects Retrieval", True, "No projects found (empty database)")
                else:
                    self.log_test("Projects Retrieval", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Projects Retrieval", False, f"Status: {response.status_code}")
            
            # POST /api/projects - Test creating new project
            new_project = {
                "title": "Stellar Navigation System",
                "description": "Advanced navigation system for space exploration missions",
                "duration": "30 Days",
                "technologies": ["Python", "FastAPI", "MongoDB"],
                "features": ["Real-time tracking", "Advanced algorithms", "Space-grade reliability"],
                "responsibilities": ["Backend development", "Algorithm optimization"],
                "liveDemo": "https://stellar-nav.space",
                "github": "https://github.com/faizankhan/stellar-nav",
                "image": "https://images.unsplash.com/photo-1446776877081-d282a0f896e2"
            }
            
            response = self.session.post(f"{API_BASE_URL}/projects", json=new_project, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    created_project = data.get('data')
                    if created_project and created_project.get('title') == new_project['title']:
                        self.log_test("Projects Creation", True, f"Created: {created_project['title']}")
                    else:
                        self.log_test("Projects Creation", False, "Invalid created project data")
                else:
                    self.log_test("Projects Creation", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Projects Creation", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Projects Endpoints", False, f"Request error: {str(e)}")
    
    def test_education_endpoints(self):
        """Test education endpoints"""
        print("\n=== Education Endpoints Test ===")
        
        try:
            # GET /api/education
            response = self.session.get(f"{API_BASE_URL}/education", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    education_records = data.get('data', [])
                    
                    if education_records:
                        self.log_test("Education Retrieval", True, f"Found {len(education_records)} records")
                        
                        # Check if sorted by order (descending)
                        orders = [record.get('order', 0) for record in education_records]
                        is_sorted = all(orders[i] >= orders[i+1] for i in range(len(orders)-1))
                        
                        if is_sorted:
                            self.log_test("Education Sorting", True, "Records sorted by order")
                        else:
                            self.log_test("Education Sorting", False, f"Orders: {orders}")
                    else:
                        self.log_test("Education Retrieval", True, "No education records found")
                else:
                    self.log_test("Education Retrieval", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Education Retrieval", False, f"Status: {response.status_code}")
            
            # POST /api/education - Test creating new education record
            new_education = {
                "degree": "Master of Space Sciences",
                "institution": "Galactic University",
                "board": "Space Education Board",
                "stream": "Astrophysics",
                "performance": "95%",
                "year": "2024",
                "description": "Advanced studies in space exploration and astrophysics",
                "order": 5
            }
            
            response = self.session.post(f"{API_BASE_URL}/education", json=new_education, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    created_education = data.get('data')
                    if created_education and created_education.get('degree') == new_education['degree']:
                        self.log_test("Education Creation", True, f"Created: {created_education['degree']}")
                    else:
                        self.log_test("Education Creation", False, "Invalid created education data")
                else:
                    self.log_test("Education Creation", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Education Creation", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Education Endpoints", False, f"Request error: {str(e)}")
    
    def test_contact_endpoints(self):
        """Test contact endpoints"""
        print("\n=== Contact Endpoints Test ===")
        
        try:
            # POST /api/contact - Test contact form submission
            contact_message = {
                "name": "Commander Sarah Chen",
                "email": "sarah.chen@spaceforce.gov",
                "subject": "Collaboration Opportunity",
                "message": "Interested in discussing potential collaboration on space exploration projects. Your portfolio shows impressive technical skills that align with our mission requirements."
            }
            
            response = self.session.post(f"{API_BASE_URL}/contact", json=contact_message, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    contact_id = data.get('data', {}).get('id')
                    if contact_id:
                        self.log_test("Contact Form Submission", True, f"Message ID: {contact_id}")
                    else:
                        self.log_test("Contact Form Submission", True, "Message sent successfully")
                else:
                    self.log_test("Contact Form Submission", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Contact Form Submission", False, f"Status: {response.status_code}")
            
            # Test invalid email format
            invalid_contact = {
                "name": "Test User",
                "email": "invalid-email",
                "subject": "Test",
                "message": "Test message"
            }
            
            response = self.session.post(f"{API_BASE_URL}/contact", json=invalid_contact, timeout=10)
            
            if response.status_code == 422:  # Validation error expected
                self.log_test("Contact Email Validation", True, "Invalid email rejected")
            elif response.status_code == 200:
                self.log_test("Contact Email Validation", False, "Invalid email accepted")
            else:
                self.log_test("Contact Email Validation", False, f"Unexpected status: {response.status_code}")
            
            # GET /api/contact - Test retrieving contact messages
            response = self.session.get(f"{API_BASE_URL}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    contacts = data.get('data', [])
                    self.log_test("Contact Messages Retrieval", True, f"Found {len(contacts)} messages")
                else:
                    self.log_test("Contact Messages Retrieval", False, data.get('error', 'Unknown error'))
            else:
                self.log_test("Contact Messages Retrieval", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Endpoints", False, f"Request error: {str(e)}")
    
    def test_error_handling(self):
        """Test error handling and edge cases"""
        print("\n=== Error Handling Test ===")
        
        try:
            # Test 404 for invalid endpoint
            response = self.session.get(f"{API_BASE_URL}/nonexistent", timeout=10)
            if response.status_code == 404:
                self.log_test("404 Error Handling", True, "Invalid endpoint returns 404")
            else:
                self.log_test("404 Error Handling", False, f"Status: {response.status_code}")
            
            # Test invalid project ID
            response = self.session.get(f"{API_BASE_URL}/projects/invalid-id", timeout=10)
            if response.status_code in [400, 404, 500]:  # Any error status is acceptable
                self.log_test("Invalid ID Handling", True, f"Invalid ID handled with status: {response.status_code}")
            else:
                self.log_test("Invalid ID Handling", False, f"Unexpected status: {response.status_code}")
            
            # Test malformed JSON
            response = self.session.post(f"{API_BASE_URL}/skills", 
                                       data="invalid json", 
                                       headers={'Content-Type': 'application/json'},
                                       timeout=10)
            if response.status_code in [400, 422]:
                self.log_test("Malformed JSON Handling", True, f"Status: {response.status_code}")
            else:
                self.log_test("Malformed JSON Handling", False, f"Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Error Handling", False, f"Request error: {str(e)}")
    
    def test_data_validation(self):
        """Test data validation and ObjectId conversion"""
        print("\n=== Data Validation Test ===")
        
        try:
            # Test that all IDs are strings (not ObjectId)
            response = self.session.get(f"{API_BASE_URL}/skills", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    skills_data = data.get('data', {})
                    all_skills = []
                    for category_skills in skills_data.values():
                        if isinstance(category_skills, list):
                            all_skills.extend(category_skills)
                    
                    # Check if IDs are strings
                    id_issues = []
                    for skill in all_skills:
                        skill_id = skill.get('id') or skill.get('_id')
                        if skill_id and not isinstance(skill_id, str):
                            id_issues.append(f"Non-string ID: {type(skill_id)}")
                    
                    if not id_issues:
                        self.log_test("ObjectId to String Conversion", True, f"All {len(all_skills)} IDs are strings")
                    else:
                        self.log_test("ObjectId to String Conversion", False, f"Issues: {id_issues[:3]}")
                        
                    # Check timestamps
                    timestamp_issues = []
                    for skill in all_skills:
                        created_at = skill.get('createdAt')
                        if created_at and not isinstance(created_at, str):
                            timestamp_issues.append(f"Non-string timestamp: {type(created_at)}")
                    
                    if not timestamp_issues:
                        self.log_test("Timestamp Format", True, "All timestamps are properly formatted")
                    else:
                        self.log_test("Timestamp Format", False, f"Issues: {timestamp_issues[:3]}")
                        
        except requests.exceptions.RequestException as e:
            self.log_test("Data Validation", False, f"Request error: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Space Portfolio Backend API Tests")
        print("=" * 60)
        
        # Run tests in logical order
        self.test_api_health()
        self.test_seed_data()
        self.test_portfolio_endpoints()
        self.test_skills_endpoints()
        self.test_projects_endpoints()
        self.test_education_endpoints()
        self.test_contact_endpoints()
        self.test_error_handling()
        self.test_data_validation()
        
        # Print summary
        print("\n" + "=" * 60)
        print("🌟 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests} ✅")
        print(f"Failed: {failed_tests} ❌")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"   - {test}")
        
        print("\n🎯 Backend API Testing Complete!")
        
        return {
            'total': total_tests,
            'passed': passed_tests,
            'failed': failed_tests,
            'success_rate': (passed_tests/total_tests)*100,
            'failed_tests': self.failed_tests,
            'all_results': self.test_results
        }

if __name__ == "__main__":
    tester = APITester()
    results = tester.run_all_tests()
    
    # Exit with error code if tests failed
    if results['failed'] > 0:
        sys.exit(1)
    else:
        sys.exit(0)