import { Router, Request, Response } from 'express';
import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
} from '../data/albums';
import { Album } from '../types/album';

const router = Router();

// GET /albums - Get all albums
router.get('/', (req: Request, res: Response) => {
  const albums = getAllAlbums();
  res.json(albums);
});

// GET /albums/:id - Get a single album by ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid album ID' });
    return;
  }
  
  const album = getAlbumById(id);
  
  if (!album) {
    res.status(404).json({ error: 'Album not found' });
    return;
  }
  
  res.json(album);
});

// POST /albums - Create a new album
router.post('/', (req: Request, res: Response) => {
  const { title, artist, price, image_url } = req.body;
  
  // Validation
  if (!title || !artist || price === undefined || !image_url) {
    res.status(400).json({ error: 'Missing required fields: title, artist, price, image_url' });
    return;
  }
  
  if (typeof price !== 'number' || price < 0) {
    res.status(400).json({ error: 'Price must be a positive number' });
    return;
  }
  
  const newAlbum = createAlbum({ title, artist, price, image_url });
  res.status(201).json(newAlbum);
});

// PUT /albums/:id - Update an existing album
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid album ID' });
    return;
  }
  
  const { title, artist, price, image_url } = req.body;
  
  // Validation for price if provided
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    res.status(400).json({ error: 'Price must be a positive number' });
    return;
  }
  
  const updatedAlbum = updateAlbum(id, { title, artist, price, image_url });
  
  if (!updatedAlbum) {
    res.status(404).json({ error: 'Album not found' });
    return;
  }
  
  res.json(updatedAlbum);
});

// DELETE /albums/:id - Delete an album
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid album ID' });
    return;
  }
  
  const deleted = deleteAlbum(id);
  
  if (!deleted) {
    res.status(404).json({ error: 'Album not found' });
    return;
  }
  
  res.status(204).send();
});

export default router;
