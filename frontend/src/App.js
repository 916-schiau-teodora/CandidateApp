import React, { useState, useEffect } from 'react';
import './App.css';
import AddCandidate from './AddCandidate';
import UpdateCandidate from './UpdateCandidate';
import Statistics from './Statistics';
import * as candidatesApi from './api/candidatesApi';

// Candidate Card Component
const CandidateCard = ({ candidate, onClick, onDelete, onUpdate }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(candidate.id);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    onUpdate(candidate);
  };

  return (
    <div className="candidate-card" onClick={() => onClick(candidate)}>
      <img src={candidate.image} alt={candidate.name} className="candidate-image" />
      <div className="candidate-info">
        <h3>{candidate.name}</h3>
        <p className="party">{candidate.party}</p>
        <p className="description">{candidate.description}</p>
      </div>
      <div className="candidate-actions">
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ candidate, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={candidate.image} alt={candidate.name} className="modal-image" />
          <div className="modal-details">
            <h2>{candidate.name}</h2>
            <p className="modal-party"><strong>Party:</strong> {candidate.party}</p>
            <p className="modal-description"><strong>Description:</strong> {candidate.description}</p>
            <p className="modal-id"><strong>Candidate ID:</strong> {candidate.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [candidatesList, setCandidatesList] = useState([]);
  const [availableParties, setAvailableParties] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [showUpdatePage, setShowUpdatePage] = useState(false);
  const [showStatsPage, setShowStatsPage] = useState(false);
  const [candidateToUpdate, setCandidateToUpdate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationInterval, setGenerationInterval] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [candidates, parties] = await Promise.all([
          candidatesApi.getCandidates(),
          candidatesApi.getAvailableParties()
        ]);
        setCandidatesList(candidates);
        setAvailableParties(parties);
      } catch (err) {
        setError('Failed to load candidates. Please check if the backend server is running.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleAddCandidate = async (newCandidate) => {
    try {
      const createdCandidate = await candidatesApi.createCandidate(newCandidate);
      setCandidatesList(prev => [...prev, createdCandidate]);
      setShowAddPage(false);
    } catch (err) {
      alert('Failed to add candidate: ' + err.message);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await candidatesApi.deleteCandidate(candidateId);
        setCandidatesList(prev => prev.filter(candidate => candidate.id !== candidateId));
      } catch (err) {
        alert('Failed to delete candidate: ' + err.message);
      }
    }
  };

  const handleUpdateCandidate = (candidate) => {
    setCandidateToUpdate(candidate);
    setShowUpdatePage(true);
  };

  const handleUpdateSubmit = async (updatedCandidate) => {
    try {
      const updated = await candidatesApi.updateCandidate(updatedCandidate.id, updatedCandidate);
      setCandidatesList(prev => prev.map(candidate => 
        candidate.id === updated.id ? updated : candidate
      ));
      setShowUpdatePage(false);
      setCandidateToUpdate(null);
    } catch (err) {
      alert('Failed to update candidate: ' + err.message);
    }
  };

  const handleBackToList = () => {
    setShowAddPage(false);
    setShowUpdatePage(false);
    setShowStatsPage(false);
    setCandidateToUpdate(null);
  };

  const generateRandomCandidate = async () => {
    try {
      const newCandidate = await candidatesApi.generateRandomCandidate();
      setCandidatesList(prev => [...prev, newCandidate]);
    } catch (err) {
      console.error('Error generating candidate:', err);
    }
  };

  const startGeneratingCandidates = () => {
    setIsGenerating(true);
    // Generate one candidate immediately
    generateRandomCandidate();
    // Then generate a new candidate every 3 seconds
    const interval = setInterval(() => {
      generateRandomCandidate();
    }, 3000);
    setGenerationInterval(interval);
  };

  const stopGeneratingCandidates = () => {
    setIsGenerating(false);
    if (generationInterval) {
      clearInterval(generationInterval);
      setGenerationInterval(null);
    }
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (generationInterval) {
        clearInterval(generationInterval);
      }
    };
  }, [generationInterval]);

  if (showAddPage) {
    return (
      <AddCandidate 
        onAdd={handleAddCandidate}
        onBack={handleBackToList}
        availableParties={availableParties}
      />
    );
  }

  if (showUpdatePage && candidateToUpdate) {
    return (
      <UpdateCandidate 
        candidate={candidateToUpdate}
        onUpdate={handleUpdateSubmit}
        onBack={handleBackToList}
        availableParties={availableParties}
      />
    );
  }

  if (showStatsPage) {
    return (
      <Statistics 
        candidates={candidatesList}
        onBack={handleBackToList}
      />
    );
  }

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <h2>Loading candidates...</h2>
          <p>Please wait while we fetch the data from the server.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <p>Make sure the backend server is running on http://localhost:3001</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Candidates List</h1>
        <p>Click on a candidate to see their details</p>
        <div className="header-buttons">
          <button className="add-candidate-btn" onClick={() => setShowAddPage(true)}>
            + Add New Candidate
          </button>
          <button className="stats-btn" onClick={() => setShowStatsPage(true)}>
            📊 Statistics
          </button>
          {!isGenerating ? (
            <button className="generate-btn" onClick={startGeneratingCandidates}>
              🔄 Start Auto-Generate
            </button>
          ) : (
            <button className="stop-btn" onClick={stopGeneratingCandidates}>
              ⏹️ Stop Generation
            </button>
          )}
        </div>
      </header>
      
      <main className="candidates-container">
        <div className="candidates-list">
          {candidatesList.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onClick={handleCandidateClick}
              onDelete={handleDeleteCandidate}
              onUpdate={handleUpdateCandidate}
            />
          ))}
        </div>
      </main>

      <Modal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
