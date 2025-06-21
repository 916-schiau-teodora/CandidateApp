# Deployment Guide

## Deploying to Vercel

This application is configured to deploy to Vercel with both frontend and backend functionality.

### Prerequisites

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Make sure you have a Vercel account and are logged in:
   ```bash
   vercel login
   ```

### Deployment Steps

1. **Deploy the application:**
   ```bash
   vercel
   ```

2. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm the deployment settings

3. **The deployment will:**
   - Build the React frontend from the `frontend/` directory
   - Deploy the API serverless function from `api/index.js`
   - Configure routing to serve the frontend and handle API requests

### Project Structure for Deployment

```
/
├── frontend/          # React application
├── api/
│   └── index.js      # Vercel serverless function (backend)
├── package.json      # Root dependencies
├── vercel.json       # Vercel configuration
└── README.md
```

### How it Works

- **Frontend**: Built from `frontend/` directory and served as static files
- **Backend**: Handled by Vercel serverless function in `api/index.js`
- **Routing**: 
  - `/api/*` routes go to the serverless function
  - All other routes serve the React app

### Environment Variables

The application automatically detects the environment:
- **Development**: Uses `http://localhost:3001/api` (local backend)
- **Production**: Uses `/api` (Vercel serverless function)

### Troubleshooting

If you encounter build errors:

1. **Check Node.js version**: Ensure you're using Node.js 16+ in Vercel
2. **Verify dependencies**: Make sure all dependencies are in the correct package.json files
3. **Check build logs**: Review the Vercel build logs for specific error messages

### Local Development

For local development, you can still run the backend separately:

```bash
cd backend
npm install
npm run dev
```

And the frontend:

```bash
cd frontend
npm install
npm start
```

The frontend will automatically use the local backend when running in development mode. 