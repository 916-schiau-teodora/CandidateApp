# Candidates Management System

A full-stack React application for managing political candidates with CRUD operations, automatic candidate generation, and comprehensive statistics.

## Features

- **CRUD Operations**: Create, Read, Update, Delete candidates
- **Auto-Generation**: Automatically generate random candidates using Faker.js
- **Statistics Dashboard**: Comprehensive analytics and party distribution
- **Real-time Updates**: Statistics update as candidates are added/modified
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

### Frontend
- React 19
- CSS3 with modern styling
- Fetch API for HTTP requests

### Backend
- Node.js with Express
- TypeScript
- Faker.js for generating random data
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd ExamMpp
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory:
```bash
cd backend
```

2. Start the development server:
```bash
npm run dev
```

The backend server will start on `http://localhost:3001`

### Start the Frontend Application

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Start the React development server:
```bash
npm start
```

The frontend application will start on `http://localhost:3000`

## API Endpoints

### Candidates
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get candidate by ID
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `POST /api/candidates/generate` - Generate random candidate

### Statistics
- `GET /api/statistics` - Get comprehensive statistics
- `GET /api/parties` - Get available political parties
- `GET /api/health` - Health check endpoint

## Usage

### Adding Candidates
1. Click the "+ Add New Candidate" button
2. Fill in the candidate details (name, description, party)
3. Optionally add a custom image URL
4. Click "Add Candidate"

### Auto-Generation
1. Click "🔄 Start Auto-Generate" to begin automatic candidate generation
2. New candidates will be added every 3 seconds
3. Click "⏹️ Stop Generation" to stop the process

### Viewing Statistics
1. Click "📊 Statistics" to view the dashboard
2. See party distribution, candidate counts, and detailed analytics
3. View recent candidates and performance metrics

### Managing Candidates
- **View Details**: Click on any candidate card to see full details
- **Update**: Click the "Update" button to modify candidate information
- **Delete**: Click the "Delete" button to remove a candidate

## Political Parties

The system supports the following Romanian political parties:
- PSD (Partidul Social Democrat)
- PNL (Partidul Național Liberal)
- USR (Uniunea Salvați România)
- AUR (Alianța pentru Unirea Românilor)
- UDMR (Uniunea Democrată Maghiară din România)
- PMP (Partidul Mișcarea Populară)
- PRO România
- Forța Dreptei
- REPER
- SOS România

## Data Persistence

Currently, the application uses in-memory storage for candidates. Data will be lost when the server restarts. For production use, consider implementing a database solution.

## Development

### Backend Development
```bash
cd backend
npm run dev  # Start with hot reload
npm run build  # Build for production
npm start  # Start production build
```

### Frontend Development
```bash
cd frontend
npm start  # Start development server
npm run build  # Build for production
```

## Troubleshooting

### Backend Issues
- Ensure Node.js is installed and up to date
- Check that port 3001 is not in use
- Verify all dependencies are installed with `npm install`

### Frontend Issues
- Ensure the backend server is running on port 3001
- Check browser console for CORS errors
- Verify all dependencies are installed with `npm install`

### Connection Issues
- Make sure both frontend and backend are running
- Check that the backend URL in `frontend/src/api/candidatesApi.js` matches your setup
- Verify firewall settings allow localhost connections

## Project Structure

```
ExamMpp/
├── backend/
│   ├── src/
│   │   └── index.ts          # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── candidatesApi.js  # API service
│   │   ├── App.js            # Main component
│   │   ├── AddCandidate.js   # Add candidate form
│   │   ├── UpdateCandidate.js # Update candidate form
│   │   ├── Statistics.js     # Statistics dashboard
│   │   └── *.css            # Styling files
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 