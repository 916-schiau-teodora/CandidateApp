const { faker } = require('@faker-js/faker');

// In-memory storage for candidates (in production, you'd use a database)
let candidates = [
  {
    id: 1,
    name: "Maria Popescu",
    description: "Supports education and digitalization.",
    image: "https://picsum.photos/200/200?random=1",
    party: "PSD"
  },
  {
    id: 2,
    name: "Ion Ionescu",
    description: "Promotes rural development.",
    image: "https://picsum.photos/200/200?random=2",
    party: "PNL"
  },
  {
    id: 3,
    name: "Ana Vasilescu",
    description: "Former Minister of Health.",
    image: "https://picsum.photos/200/200?random=3",
    party: "USR"
  },
  {
    id: 4,
    name: "George Radu",
    description: "Technology expert.",
    image: "https://picsum.photos/200/200?random=4",
    party: "AUR"
  },
  {
    id: 5,
    name: "Elena Munteanu",
    description: "Women's rights activist.",
    image: "https://picsum.photos/200/200?random=5",
    party: "UDMR"
  },
  {
    id: 6,
    name: "Dorin Lungu",
    description: "Experienced lawyer.",
    image: "https://picsum.photos/200/200?random=6",
    party: "PMP"
  },
  {
    id: 7,
    name: "Sorina Dima",
    description: "Environmental activist.",
    image: "https://picsum.photos/200/200?random=7",
    party: "PRO România"
  },
  {
    id: 8,
    name: "Vlad Stoica",
    description: "Energy sector entrepreneur.",
    image: "https://picsum.photos/200/200?random=8",
    party: "Forța Dreptei"
  },
  {
    id: 9,
    name: "Roxana Pavel",
    description: "University professor.",
    image: "https://picsum.photos/200/200?random=9",
    party: "REPER"
  },
  {
    id: 10,
    name: "Andrei Dobre",
    description: "Former Mayor of Bucharest.",
    image: "https://picsum.photos/200/200?random=10",
    party: "SOS România"
  }
];

// Available parties
const availableParties = [
  "PSD", "PNL", "USR", "AUR", "UDMR", "PMP", "PRO România", "Forța Dreptei", "REPER", "SOS România"
];

// Sample descriptions for random generation
const sampleDescriptions = [
  "Experienced politician with focus on economic development.",
  "Advocate for social justice and equality.",
  "Expert in environmental protection and sustainability.",
  "Former business leader with strong management skills.",
  "Dedicated to improving healthcare systems.",
  "Champion of educational reform and innovation.",
  "Specialist in technology and digital transformation.",
  "Committed to rural development and agriculture.",
  "Expert in international relations and diplomacy.",
  "Advocate for women's rights and gender equality.",
  "Former military officer with leadership experience.",
  "Specialist in energy policy and renewable resources.",
  "Expert in legal reform and judicial systems.",
  "Champion of cultural preservation and arts.",
  "Dedicated to youth development and education."
];

// Helper function to generate a random candidate
const generateRandomCandidate = () => {
  const randomName = faker.person.fullName();
  const randomDescription = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
  const randomParty = availableParties[Math.floor(Math.random() * availableParties.length)];
  
  return {
    id: candidates.length + 1,
    name: randomName,
    description: randomDescription,
    party: randomParty,
    image: `https://picsum.photos/200/200?random=${Date.now() + Math.random()}`
  };
};

// Helper function to calculate statistics
const calculateStatistics = () => {
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

  return {
    totalCandidates,
    partyCount: Object.keys(partyDistribution).length,
    mostCommonParty,
    mostCommonPartyCount,
    avgDescriptionLength,
    partyDistribution: partyPercentages,
    longestDescription,
    shortestDescription,
    longestName,
    shortestName,
    recentCandidates: candidates.slice(-5).reverse()
  };
};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, url, body } = req;
  const path = url.replace('/api', '');

  try {
    // GET all candidates
    if (method === 'GET' && path === '/candidates') {
      return res.json(candidates);
    }

    // GET candidate by ID
    if (method === 'GET' && path.match(/^\/candidates\/\d+$/)) {
      const id = parseInt(path.split('/')[2]);
      const candidate = candidates.find(c => c.id === id);
      
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      
      return res.json(candidate);
    }

    // POST new candidate
    if (method === 'POST' && path === '/candidates') {
      const { name, description, party, image } = body;
      
      if (!name || !description || !party) {
        return res.status(400).json({ message: 'Name, description, and party are required' });
      }
      
      const newCandidate = {
        id: candidates.length + 1,
        name,
        description,
        party,
        image: image || `https://picsum.photos/200/200?random=${Date.now()}`
      };
      
      candidates.push(newCandidate);
      return res.status(201).json(newCandidate);
    }

    // PUT update candidate
    if (method === 'PUT' && path.match(/^\/candidates\/\d+$/)) {
      const id = parseInt(path.split('/')[2]);
      const { name, description, party, image } = body;
      
      const candidateIndex = candidates.findIndex(c => c.id === id);
      
      if (candidateIndex === -1) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      
      if (!name || !description || !party) {
        return res.status(400).json({ message: 'Name, description, and party are required' });
      }
      
      candidates[candidateIndex] = {
        ...candidates[candidateIndex],
        name,
        description,
        party,
        image: image || `https://picsum.photos/200/200?random=${Date.now()}`
      };
      
      return res.json(candidates[candidateIndex]);
    }

    // DELETE candidate
    if (method === 'DELETE' && path.match(/^\/candidates\/\d+$/)) {
      const id = parseInt(path.split('/')[2]);
      const candidateIndex = candidates.findIndex(c => c.id === id);
      
      if (candidateIndex === -1) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      
      candidates.splice(candidateIndex, 1);
      return res.status(204).send();
    }

    // POST generate random candidate
    if (method === 'POST' && path === '/candidates/generate') {
      const newCandidate = generateRandomCandidate();
      candidates.push(newCandidate);
      return res.status(201).json(newCandidate);
    }

    // GET statistics
    if (method === 'GET' && path === '/statistics') {
      return res.json(calculateStatistics());
    }

    // GET available parties
    if (method === 'GET' && path === '/parties') {
      return res.json(availableParties);
    }

    // Health check
    if (method === 'GET' && path === '/health') {
      return res.json({ status: 'OK', timestamp: new Date().toISOString() });
    }

    // 404 for unknown routes
    return res.status(404).json({ message: 'Route not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 