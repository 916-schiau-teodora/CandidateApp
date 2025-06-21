import React, { useState, useEffect } from 'react';
import './UpdateCandidate.css';

const UpdateCandidate = ({ candidate, onUpdate, onBack, availableParties }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    party: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Pre-fill form with existing candidate data
    setFormData({
      name: candidate.name,
      description: candidate.description,
      party: candidate.party,
      image: candidate.image
    });
  }, [candidate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.party) {
      newErrors.party = 'Please select a party';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // If no image URL is provided, use Lorem Picsum
      const updatedCandidate = {
        ...candidate,
        ...formData,
        image: formData.image.trim() || `https://picsum.photos/200/200?random=${Date.now()}`
      };
      onUpdate(updatedCandidate);
    }
  };

  return (
    <div className="update-candidate-page">
      <div className="update-candidate-container">
        <header className="update-candidate-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to List
          </button>
          <h1>Update Candidate</h1>
        </header>
        
        <form className="update-candidate-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Candidate Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter candidate name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter candidate description"
              rows="4"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="party">Political Party *</label>
            <select
              id="party"
              name="party"
              value={formData.party}
              onChange={handleInputChange}
              className={errors.party ? 'error' : ''}
            >
              <option value="">Select a party</option>
              {availableParties.map(party => (
                <option key={party} value={party}>
                  {party}
                </option>
              ))}
            </select>
            {errors.party && <span className="error-message">{errors.party}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Image URL (Optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL or leave empty for random image"
            />
            <small className="help-text">
              Leave empty to use a random Lorem Picsum image
            </small>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Update Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCandidate; 