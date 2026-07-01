# Meeraxu Backend API

A Node.js/Express backend API for the Meeraxu website with TypeScript support and MongoDB integration.

## Features

- RESTful API for Services, Projects, and Contact Forms
- Admin authentication with JWT
- MongoDB Atlas integration
- TypeScript support
- CORS enabled

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/meeraxu?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
ADMIN_EMAIL=admin@meeraxu.com
ADMIN_PASSWORD=admin123
```

### 3. Development

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### 4. Build

```bash
npm run build
```

### 5. Production

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register admin (only if no admin exists)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile (requires auth)

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Contact Forms

- `GET /api/contact-forms` - Get all submissions (admin only)
- `GET /api/contact-forms/:id` - Get single submission (admin only)
- `POST /api/contact-forms` - Submit form (public)
- `PUT /api/contact-forms/:id` - Update status (admin only)
- `DELETE /api/contact-forms/:id` - Delete submission (admin only)

## Database Schema

### Service

- name: String
- description: String
- icon: String
- shortCode: String
- timestamps

### Project

- title: String
- description: String
- category: String
- imageUrl: String
- technologies: [String]
- link: String
- details: String
- timestamps

### ContactForm

- name: String
- email: String
- subject: String
- message: String
- status: 'new' | 'read' | 'replied'
- timestamps

### Admin

- email: String (unique)
- password: String (hashed)
- name: String
- timestamps
