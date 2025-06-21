const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Get all candidates
export const getCandidates = async () => {
  const response = await fetch(`${API_BASE_URL}/candidates`);
  return handleResponse(response);
};

// Get candidate by ID
export const getCandidateById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/candidates/${id}`);
  return handleResponse(response);
};

// Create new candidate
export const createCandidate = async (candidateData) => {
  const response = await fetch(`${API_BASE_URL}/candidates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidateData),
  });
  return handleResponse(response);
};

// Update candidate
export const updateCandidate = async (id, candidateData) => {
  const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidateData),
  });
  return handleResponse(response);
};

// Delete candidate
export const deleteCandidate = async (id) => {
  const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete candidate');
  }
  return true;
};

// Generate random candidate
export const generateRandomCandidate = async () => {
  const response = await fetch(`${API_BASE_URL}/candidates/generate`, {
    method: 'POST',
  });
  return handleResponse(response);
};

// Get statistics
export const getStatistics = async () => {
  const response = await fetch(`${API_BASE_URL}/statistics`);
  return handleResponse(response);
};

// Get available parties
export const getAvailableParties = async () => {
  const response = await fetch(`${API_BASE_URL}/parties`);
  return handleResponse(response);
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
}; 