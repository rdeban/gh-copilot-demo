import express, { Request, Response } from 'express';
import cors from 'cors';
import albumsRouter from './routes/albums';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hit the /albums endpoint to retrieve a list of albums!');
});

// Albums routes
app.use('/albums', albumsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Album API v2 is running on http://localhost:${PORT}`);
});

export default app;
