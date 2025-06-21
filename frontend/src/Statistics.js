import React from 'react';
import './Statistics.css';

const Statistics = ({ candidates, onBack }) => {
  // Calculate statistics
  const totalCandidates = candidates.length;
  
  // Party distribution
  const partyDistribution = candidates.reduce((acc, candidate) => {
    acc[candidate.party] = (acc[candidate.party] || 0) + 1;
    return acc;
  }, {});
  
  // Sort parties by count (descending)
  const sortedParties = Object.entries(partyDistribution)
    .sort(([,a], [,b]) => b - a);
  
  // Calculate percentages
  const partyPercentages = sortedParties.map(([party, count]) => ({
    party,
    count,
    percentage: ((count / totalCandidates) * 100).toFixed(1)
  }));
  
  // Most common party
  const mostCommonParty = sortedParties[0] ? sortedParties[0][0] : 'None';
  const mostCommonPartyCount = sortedParties[0] ? sortedParties[0][1] : 0;
  
  // Average description length
  const avgDescriptionLength = candidates.length > 0 
    ? Math.round(candidates.reduce((sum, candidate) => sum + candidate.description.length, 0) / candidates.length)
    : 0;
  
  // Longest and shortest descriptions
  const longestDescription = candidates.reduce((longest, candidate) => 
    candidate.description.length > longest.length ? candidate.description : longest, '');
  const shortestDescription = candidates.reduce((shortest, candidate) => 
    candidate.description.length < shortest.length || shortest === '' ? candidate.description : shortest, '');
  
  // Candidates with longest and shortest names
  const longestName = candidates.reduce((longest, candidate) => 
    candidate.name.length > longest.length ? candidate.name : longest, '');
  const shortestName = candidates.reduce((shortest, candidate) => 
    candidate.name.length < shortest.length || shortest === '' ? candidate.name : shortest, '');

  return (
    <div className="statistics-page">
      <div className="statistics-container">
        <header className="statistics-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to List
          </button>
          <h1>Candidates Statistics</h1>
        </header>
        
        <div className="statistics-content">
          {/* Overview Cards */}
          <div className="stats-overview">
            <div className="stat-card">
              <h3>Total Candidates</h3>
              <div className="stat-number">{totalCandidates}</div>
            </div>
            <div className="stat-card">
              <h3>Political Parties</h3>
              <div className="stat-number">{Object.keys(partyDistribution).length}</div>
            </div>
            <div className="stat-card">
              <h3>Most Common Party</h3>
              <div className="stat-text">{mostCommonParty}</div>
              <div className="stat-subtext">({mostCommonPartyCount} candidates)</div>
            </div>
            <div className="stat-card">
              <h3>Avg Description Length</h3>
              <div className="stat-number">{avgDescriptionLength}</div>
              <div className="stat-subtext">characters</div>
            </div>
          </div>

          {/* Party Distribution */}
          <div className="stats-section">
            <h2>Party Distribution</h2>
            <div className="party-stats">
              {partyPercentages.map(({ party, count, percentage }) => (
                <div key={party} className="party-stat-item">
                  <div className="party-info">
                    <span className="party-name">{party}</span>
                    <span className="party-count">{count} candidates</span>
                  </div>
                  <div className="party-bar">
                    <div 
                      className="party-bar-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="party-percentage">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="stats-section">
            <h2>Detailed Statistics</h2>
            <div className="detailed-stats">
              <div className="stat-item">
                <h4>Longest Description</h4>
                <p>"{longestDescription}"</p>
                <span className="stat-detail">({longestDescription.length} characters)</span>
              </div>
              <div className="stat-item">
                <h4>Shortest Description</h4>
                <p>"{shortestDescription}"</p>
                <span className="stat-detail">({shortestDescription.length} characters)</span>
              </div>
              <div className="stat-item">
                <h4>Longest Name</h4>
                <p>{longestName}</p>
                <span className="stat-detail">({longestName.length} characters)</span>
              </div>
              <div className="stat-item">
                <h4>Shortest Name</h4>
                <p>{shortestName}</p>
                <span className="stat-detail">({shortestName.length} characters)</span>
              </div>
            </div>
          </div>

          {/* Recent Candidates */}
          <div className="stats-section">
            <h2>Recent Candidates</h2>
            <div className="recent-candidates">
              {candidates.slice(-5).reverse().map((candidate) => (
                <div key={candidate.id} className="recent-candidate">
                  <img src={candidate.image} alt={candidate.name} />
                  <div className="recent-candidate-info">
                    <h4>{candidate.name}</h4>
                    <p>{candidate.party}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 