import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { authMiddleware, checkRole, AuthRequest } from '../middleware/auth.js';

const router = Router();

const generateToken = (adminId: string, role: string) => {
  return jwt.sign({ adminId, role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '24h',
  });
};

// Register a new admin/staff account (super-admin only)
router.post('/register', authMiddleware, checkRole(['super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const finalRole = role === 'super-admin' ? 'super-admin' : 'admin';

    const admin = new Admin({ email, password, name, role: finalRole });
    await admin.save();

    const token = generateToken(admin._id.toString(), admin.role);
    res.status(201).json({ 
      message: 'Admin registered', 
      token, 
      admin: { email, name, role: admin.role } 
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error registering admin' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id.toString(), admin.role);
    res.json({ 
      message: 'Login successful', 
      token, 
      admin: { email: admin.email, name: admin.name, role: admin.role } 
    });
  } catch (error: any) {
    const isDbError = error?.message?.includes('buffering timed out') ||
      error?.message?.includes('initial connection') ||
      error?.message?.includes('bufferCommands');
    const message = isDbError
      ? 'Database is not connected yet. Please wait a moment and try again.'
      : (error.message || 'Error logging in');
    res.status(500).json({ message });
  }
});

// Get admin profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching profile' });
  }
});

export default router;
