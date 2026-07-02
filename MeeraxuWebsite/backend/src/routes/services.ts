import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Service from '../models/Service.js';
import { authMiddleware, checkRole, AuthRequest } from '../middleware/auth.js';

const router = Router();
const uploadDir = path.resolve(process.cwd(), 'public', 'uploads', 'services');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}-${sanitized}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    cb(null, allowedMimes.includes(file.mimetype));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const buildIconPath = (file: Express.Multer.File | undefined, iconUrl?: string) => {
  if (file) {
    return `/uploads/services/${file.filename}`;
  }
  if (iconUrl && iconUrl.trim().length > 0) {
    return iconUrl.trim();
  }
  return undefined;
};

// Get all services (public) - sorted by creation date
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Get single service (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service' });
  }
});

// Create a service (admin)
router.post(
  '/',
  authMiddleware,
  checkRole(['admin', 'super-admin']),
  upload.single('icon'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, description, shortCode, iconUrl } = req.body;
      const icon = buildIconPath(req.file, iconUrl);

      if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
      }

      const service = new Service({
        name: name.trim(),
        description: description.trim(),
        shortCode: shortCode ? shortCode.trim() : '',
        icon,
      });

      await service.save();
      res.status(201).json(service);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error creating service' });
    }
  },
);

// Update a service (admin)
router.put(
  '/:id',
  authMiddleware,
  checkRole(['admin', 'super-admin']),
  upload.single('icon'),
  async (req: AuthRequest, res: Response) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      const { name, description, shortCode, iconUrl } = req.body;
      const icon = buildIconPath(req.file, iconUrl);

      if (name) service.name = name.trim();
      if (description) service.description = description.trim();
      if (shortCode !== undefined) service.shortCode = shortCode.trim();
      if (icon) service.icon = icon;

      await service.save();
      res.json(service);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error updating service' });
    }
  },
);

// Delete a service (super-admin only)
router.delete(
  '/:id',
  authMiddleware,
  checkRole(['super-admin']),
  async (req: AuthRequest, res: Response) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      await service.deleteOne();
      res.json({ message: 'Service deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error deleting service' });
    }
  },
);

export default router;
