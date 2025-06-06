// API endpoint
const API_URL = 'http://localhost:5001/api';

// DOM Elements
const ideaForm = document.getElementById('ideaForm');
const ideasList = document.getElementById('ideasList');

let editMode = false;
let editIdeaId = null;

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
                <p class="idea-description mb-1">${idea.description || ''}</p>
                <span class="idea-date">${formatDate(idea.created_at)}</span>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-light btn-edit" data-id="${idea.id}">Edit</button>
            </div>
        </div>
    `;
    return div;
}

// Add event delegation for Edit buttons
ideasList.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.getAttribute('data-id');
        const idea = window.ideas.find(i => i.id == id);
        if (idea) {
            ideaForm.title.value = idea.title;
            ideaForm.description.value = idea.description;
            editMode = true;
            editIdeaId = idea.id;
            ideaForm.querySelector('button[type="submit"]').textContent = 'Update Idea';
            document.getElementById('formTitle').textContent = 'Update Idea';
        }
    }
});

// Store ideas globally for editing
window.ideas = [];

// Fetch all ideas
async function fetchIdeas() {
    try {
        const response = await fetch(`${API_URL}/ideas`);
        const ideas = await response.json();
        
        window.ideas = ideas;
        
        // Clear current list
        ideasList.innerHTML = '';
        
        // Add each idea to the list
        ideas.forEach(idea => {
            ideasList.appendChild(createIdeaElement(idea));
        });
    } catch (error) {
        console.error('Error fetching ideas:', error);
        ideasList.innerHTML = '<div class="alert alert-danger">Error fetching ideas.</div>';
    }
}

// Submit new idea
async function submitIdea(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    if (editMode && editIdeaId) {
        // Edit mode: send PUT
        try {
            const response = await fetch(`${API_URL}/ideas/${editIdeaId}`, {
                method: 'PUT',
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
                editMode = false;
                editIdeaId = null;
                ideaForm.querySelector('button[type="submit"]').textContent = 'Save Idea';
                document.getElementById('formTitle').textContent = 'Add a New Idea';
            } else {
                throw new Error('Failed to update idea');
            }
        } catch (error) {
            console.error('Error updating idea:', error);
            alert('Error updating idea. Please try again.');
        }
    } else {
        // Create mode: send POST
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
}

// Event Listeners
ideaForm.addEventListener('submit', submitIdea);

// Initial load
fetchIdeas(); 