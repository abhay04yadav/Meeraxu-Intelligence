import { Router, Request, Response } from 'express';
import Project from '../models/Project.js';
import { authMiddleware, checkRole, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all projects (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Get single project (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
});

// Create a project (admin)
router.post('/', authMiddleware, checkRole(['admin', 'super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, category, imageUrl, technologies, stats, phases, gallery } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description, and category are required' });
    }

    const project = new Project({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      imageUrl: imageUrl.trim(),
      technologies: Array.isArray(technologies)
        ? technologies
        : typeof technologies === 'string'
        ? technologies.split(',').map((item) => item.trim()).filter(Boolean)
        : [],
      stats: stats?.trim() || '',
      phases: Array.isArray(phases) ? phases : [],
      gallery: Array.isArray(gallery) ? gallery : [],
    });

    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating project' });
  }
});

// Update a project (admin)
router.put('/:id', authMiddleware, checkRole(['admin', 'super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, category, imageUrl, technologies, stats, phases, gallery } = req.body;

    if (title) project.title = title.trim();
    if (description) project.description = description.trim();
    if (category) project.category = category.trim();
    if (imageUrl) project.imageUrl = imageUrl.trim();
    if (technologies !== undefined) {
      project.technologies = Array.isArray(technologies)
        ? technologies
        : typeof technologies === 'string'
        ? technologies.split(',').map((item) => item.trim()).filter(Boolean)
        : project.technologies;
    }
    if (stats !== undefined) project.stats = stats?.trim() || '';
    if (phases !== undefined && Array.isArray(phases)) project.phases = phases;
    if (gallery !== undefined && Array.isArray(gallery)) project.gallery = gallery;

    await project.save();
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating project' });
  }
});

// Delete a project (super-admin only)
router.delete('/:id', authMiddleware, checkRole(['super-admin']), async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting project' });
  }
});

export default router;
