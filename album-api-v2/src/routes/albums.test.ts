import request from 'supertest';
import express from 'express';
import albumsRouter from './albums';
import * as albumsData from '../data/albums';

// Create a test app
const app = express();
app.use(express.json());
app.use('/albums', albumsRouter);

// Mock the albums data module
jest.mock('../data/albums');

describe('Albums API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /albums', () => {
    it('should return all albums', async () => {
      const mockAlbums = [
        { id: 1, title: 'Album 1', artist: 'Artist 1', price: 9.99, image_url: 'http://example.com/1.jpg' },
        { id: 2, title: 'Album 2', artist: 'Artist 2', price: 12.99, image_url: 'http://example.com/2.jpg' }
      ];
      
      (albumsData.getAllAlbums as jest.Mock).mockReturnValue(mockAlbums);

      const response = await request(app).get('/albums');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAlbums);
      expect(albumsData.getAllAlbums).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /albums/:id', () => {
    it('should return a single album by ID', async () => {
      const mockAlbum = { id: 1, title: 'Album 1', artist: 'Artist 1', price: 9.99, image_url: 'http://example.com/1.jpg' };
      
      (albumsData.getAlbumById as jest.Mock).mockReturnValue(mockAlbum);

      const response = await request(app).get('/albums/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAlbum);
      expect(albumsData.getAlbumById).toHaveBeenCalledWith(1);
    });

    it('should return 404 if album not found', async () => {
      (albumsData.getAlbumById as jest.Mock).mockReturnValue(undefined);

      const response = await request(app).get('/albums/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Album not found' });
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app).get('/albums/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid album ID' });
    });
  });

  describe('POST /albums', () => {
    it('should create a new album', async () => {
      const newAlbumData = {
        title: 'New Album',
        artist: 'New Artist',
        price: 15.99,
        image_url: 'http://example.com/new.jpg'
      };
      
      const createdAlbum = { id: 7, ...newAlbumData };
      
      (albumsData.createAlbum as jest.Mock).mockReturnValue(createdAlbum);

      const response = await request(app)
        .post('/albums')
        .send(newAlbumData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdAlbum);
      expect(albumsData.createAlbum).toHaveBeenCalledWith(newAlbumData);
    });

    it('should return 400 if required fields are missing', async () => {
      const incompleteData = {
        title: 'Album without artist'
      };

      const response = await request(app)
        .post('/albums')
        .send(incompleteData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing required fields: title, artist, price, image_url' });
    });

    it('should return 400 if price is negative', async () => {
      const invalidData = {
        title: 'Album',
        artist: 'Artist',
        price: -5,
        image_url: 'http://example.com/img.jpg'
      };

      const response = await request(app)
        .post('/albums')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Price must be a positive number' });
    });
  });

  describe('PUT /albums/:id', () => {
    it('should update an existing album', async () => {
      const updateData = {
        title: 'Updated Title',
        price: 19.99
      };
      
      const updatedAlbum = {
        id: 1,
        title: 'Updated Title',
        artist: 'Original Artist',
        price: 19.99,
        image_url: 'http://example.com/1.jpg'
      };
      
      (albumsData.updateAlbum as jest.Mock).mockReturnValue(updatedAlbum);

      const response = await request(app)
        .put('/albums/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedAlbum);
      expect(albumsData.updateAlbum).toHaveBeenCalledWith(1, updateData);
    });

    it('should return 404 if album not found', async () => {
      (albumsData.updateAlbum as jest.Mock).mockReturnValue(undefined);

      const response = await request(app)
        .put('/albums/999')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Album not found' });
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .put('/albums/invalid')
        .send({ title: 'Updated' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid album ID' });
    });

    it('should return 400 if price is negative', async () => {
      const response = await request(app)
        .put('/albums/1')
        .send({ price: -10 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Price must be a positive number' });
    });
  });

  describe('DELETE /albums/:id', () => {
    it('should delete an album', async () => {
      (albumsData.deleteAlbum as jest.Mock).mockReturnValue(true);

      const response = await request(app).delete('/albums/1');

      expect(response.status).toBe(204);
      expect(albumsData.deleteAlbum).toHaveBeenCalledWith(1);
    });

    it('should return 404 if album not found', async () => {
      (albumsData.deleteAlbum as jest.Mock).mockReturnValue(false);

      const response = await request(app).delete('/albums/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Album not found' });
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app).delete('/albums/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid album ID' });
    });
  });
});
