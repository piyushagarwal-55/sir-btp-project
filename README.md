# LCE Platform - Complete Setup

This project consists of three main components:
- **LCE-backend**: Node.js/Express API with MongoDB and RBAC authentication  
- **LCE-app**: React/Vite frontend with Tailwind CSS
- **figma**: Design system components (now integrated into LCE-app)

## Quick Start

### 1. Backend Setup
```bash
cd LCE-backend
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm install
node src/index.js
```
Backend runs on `http://localhost:5000`

### 2. Frontend Setup  
```bash
cd LCE-app
cp .env.example .env  
# Edit .env with backend URL if different
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017
PORT=5000
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your-strong-access-secret
REFRESH_TOKEN_SECRET=your-strong-refresh-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_AUTH_REDIRECT=http://localhost:5173
```

## RBAC Authentication

The system supports two user roles:

**Admin Role**: Full system access
**Founder Role**: Startup/founder-specific features

### Creating Initial Accounts

**Admin Account:**
```bash
curl -X POST http://localhost:5000/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@lce.com", "password": "admin123"}'
```

**Founder Account:**  
```bash
curl -X POST http://localhost:5000/api/auth/register-founder \
  -H "Content-Type: application/json" \
  -d '{"email": "founder@startup.com", "password": "founder123", "userId": "startup-profile-id"}'
```

## Available API Endpoints

- `POST /api/auth/register-admin` - Register admin
- `POST /api/auth/register-founder` - Register founder
- `POST /api/auth/login-admin` - Admin login
- `POST /api/auth/login-founder` - Founder login  
- `POST /api/auth/refresh` - Refresh access token

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- CORS enabled

**Frontend:**
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS
- React Router
- Axios for API calls
- Figma design system components

## Development Notes

- MongoDB database "LCE" is auto-created
- JWT tokens include role information for RBAC
- Protected routes enforce role-based access
- Figma components moved to `LCE-app/src/components/figma/`
- Environment variables are required for both projects

For detailed setup instructions, see:
- `LCE-backend/SETUP.md`
- `LCE-app/SETUP.md`