// API endpoint
const API_URL = 'http://localhost:5001/api';

// DOM Elements
const ideaForm = document.getElementById('ideaForm');
const ideasList = document.getElementById('ideasList');

// Format date
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Create idea HTML
function createIdeaElement(idea) {
    const div = document.createElement('div');
    div.className = 'list-group-item idea-item';
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <div>
                <h6 class="idea-title mb-1">${idea.title}</h6>
                <p class="idea-description mb-1">${idea.description || 'No description'}</p>
                <small class="idea-date">Created: ${formatDate(idea.created_at)}</small>
            </div>
        </div>
    `;
    return div;
}

// Fetch all ideas
async function fetchIdeas() {
    try {
        const response = await fetch(`${API_URL}/ideas`);
        const ideas = await response.json();
        
        // Clear current list
        ideasList.innerHTML = '';
        
        // Add each idea to the list
        ideas.forEach(idea => {
            ideasList.appendChild(createIdeaElement(idea));
        });
    } catch (error) {
        console.error('Error fetching ideas:', error);
        ideasList.innerHTML = '<div class="alert alert-danger">Error loading ideas</div>';
    }
}

// Submit new idea
async function submitIdea(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    try {
        const response = await fetch(`${API_URL}/ideas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });
        
        if (response.ok) {
            // Clear form
            ideaForm.reset();
            // Refresh ideas list
            fetchIdeas();
        } else {
            throw new Error('Failed to save idea');
        }
    } catch (error) {
        console.error('Error saving idea:', error);
        alert('Error saving idea. Please try again.');
    }
}

// Event Listeners
ideaForm.addEventListener('submit', submitIdea);

// Initial load
fetchIdeas(); 