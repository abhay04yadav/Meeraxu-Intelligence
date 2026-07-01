import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';

import serviceRoutes from './routes/services.js';
import projectRoutes from './routes/projects.js';
import contactFormRoutes from './routes/contactForms.js';
import authRoutes from './routes/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// FRONTEND_URL supports a comma-separated list (e.g. website + admin panel domains)
const allowedOrigins = process.env.FRONTEND_URL?.split(',').map((origin) => origin.trim().replace(/\/$/, ''));
app.use(cors({ origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files (uploads directory)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact-forms', contactFormRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
