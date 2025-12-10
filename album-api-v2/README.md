# Album API v2

A Node.js TypeScript API for managing music albums. This is a rewrite of the .NET `albums-api` project.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete albums
- **In-Memory Storage**: No database required - data is stored in memory
- **TypeScript**: Fully typed with TypeScript for type safety
- **Unit Tests**: Comprehensive test coverage with Jest
- **CORS Enabled**: Ready for cross-origin requests

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/albums` | Get all albums |
| GET | `/albums/:id` | Get a single album by ID |
| POST | `/albums` | Create a new album |
| PUT | `/albums/:id` | Update an existing album |
| DELETE | `/albums/:id` | Delete an album |

## Album Data Model

```typescript
interface Album {
  id: number;
  title: string;
  artist: string;
  price: number;
  image_url: string;
}
```

## Sample Data

The API includes 6 pre-loaded sample albums:
1. "You, Me and an App Id" by Daprize ($10.99)
2. "Seven Revision Army" by The Blue-Green Stripes ($13.99)
3. "Scale It Up" by KEDA Club ($13.99)
4. "Lost in Translation" by MegaDNS ($12.99)
5. "Lock Down Your Love" by V is for VNET ($12.99)
6. "Sweet Container O' Mine" by Guns N Probeses ($14.99)

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

## Run

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Test

Run all tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

Coverage report:
```bash
npm run test:coverage
```

## Configuration

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## Integration with Vue.js Album Viewer

This API is designed to work with the Vue.js `album-viewer` app. The Vue app is configured to proxy `/albums` requests to `http://localhost:3000`.

To use together:
1. Start this API: `npm start` (runs on port 3000)
2. Start the Vue app: `cd ../album-viewer && npm run dev` (runs on port 3001)
3. Access the Vue app at `http://localhost:3001`
