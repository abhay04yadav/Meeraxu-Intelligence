import { Router, Request, Response } from 'express';
import ContactForm from '../models/ContactForm.js';
import { authMiddleware, checkRole, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Submit contact form (public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const form = new ContactForm({
      name,
      email,
      subject,
      message,
      status: 'new',
    });

    await form.save();
    res.status(201).json({ message: 'Contact form submitted successfully', form });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error submitting contact form' });
  }
});

// Get all submissions (admin)
router.get('/', authMiddleware, checkRole(['admin', 'super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const forms = await ContactForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching contact forms' });
  }
});

// Get single submission (admin)
router.get('/:id', authMiddleware, checkRole(['admin', 'super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const form = await ContactForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Contact form not found' });
    }
    res.json(form);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching contact form' });
  }
});

// Update contact form status (admin)
router.put('/:id', authMiddleware, checkRole(['admin', 'super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    if (!status || !['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const form = await ContactForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    form.status = status;
    await form.save();
    res.json(form);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating contact form' });
  }
});

// Delete contact form (super-admin only)
router.delete('/:id', authMiddleware, checkRole(['super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const form = await ContactForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    await form.deleteOne();
    res.json({ message: 'Contact form deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting contact form' });
  }
});

export default router;
