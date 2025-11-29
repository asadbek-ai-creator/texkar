Authentication API Documentation
Overview
The authentication system provides secure admin user registration and login with JWT tokens.

Endpoints
1. POST /api/auth/signup
Register a new admin user.

Request Body:

{
  "email": "nursultankoshekbaev477@gmail.com",
  "fullName": "Nursultan Koshekbaev",
  "password": "your-secure-password-123"
}
Response (201 Created):

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "nursultankoshekbaev477@gmail.com",
    "fullName": "Nursultan Koshekbaev",
    "isActive": true,
    "isSuperuser": false,
    "createdAt": "2025-11-29T10:50:00Z",
    "lastLoginAt": null
  }
}
Error Response (400 Bad Request):

{
  "detail": "Email already registered"
}
2. POST /api/auth/login
Login with existing credentials.

Request Body:

{
  "email": "nursultankoshekbaev477@gmail.com",
  "password": "your-secure-password-123"
}
Response (200 OK):

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "nursultankoshekbaev477@gmail.com",
    "fullName": "Nursultan Koshekbaev",
    "isActive": true,
    "isSuperuser": false,
    "createdAt": "2025-11-29T10:50:00Z",
    "lastLoginAt": "2025-11-29T11:15:30Z"
  }
}
Error Response (401 Unauthorized):

{
  "detail": "Incorrect email or password"
}
3. GET /api/auth/me
Get current authenticated user information.

Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Response (200 OK):

{
  "id": 1,
  "email": "nursultankoshekbaev477@gmail.com",
  "fullName": "Nursultan Koshekbaev",
  "isActive": true,
  "isSuperuser": false,
  "createdAt": "2025-11-29T10:50:00Z",
  "lastLoginAt": "2025-11-29T11:15:30Z"
}
Error Response (401 Unauthorized):

{
  "detail": "Could not validate credentials"
}
4. POST /api/auth/change-password
Change user password (authenticated).

Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Request Body:

{
  "old_password": "current-password",
  "new_password": "new-secure-password-456"
}
Response (200 OK):

{
  "message": "Password updated successfully"
}
Frontend Integration Guide
1. Signup Flow
async function signup(email: string, fullName: string, password: string) {
  const response = await fetch('https://web-production-11f5.up.railway.app/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      fullName,
      password,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Signup failed');
  }
  const data = await response.json();
  
  // Store the token
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
}
2. Login Flow
async function login(email: string, password: string) {
  const response = await fetch('https://web-production-11f5.up.railway.app/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }
  const data = await response.json();
  
  // Store the token
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
}
3. Making Authenticated Requests
async function getProtectedData() {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  const response = await fetch('https://web-production-11f5.up.railway.app/api/some-endpoint', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    // Token expired or invalid - redirect to login
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return;
  }
  return await response.json();
}
4. Get Current User
async function getCurrentUser() {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return null;
  }
  const response = await fetch('https://web-production-11f5.up.railway.app/api/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return null;
  }
  const user = await response.json();
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
}
5. Logout
function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
Security Notes
JWT Token: Expires in 7 days by default
Password Requirements: Minimum 8 characters
Email Validation: Validated using EmailStr from Pydantic
Password Hashing: Uses bcrypt for secure password storage
HTTPS: Always use HTTPS in production (Railway provides this automatically)
Environment Variables
Make sure to set these in your Railway environment:

JWT_SECRET_KEY=your-super-secret-key-change-in-production
⚠️ Important: Change the default JWT_SECRET_KEY in production for security!