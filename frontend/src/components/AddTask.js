import React, { useState } from 'react';

function AddTask({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Add Task</button>
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    },
    input: {
        flex: 1,
        padding: '12px',
        background: '#0f1422',
        border: '2px solid #1f2a48',
        borderRadius: '10px',
        color: 'white',
        fontSize: '16px',
        transition: 'all 0.2s ease'
    },
    button: {
        padding: '12px 24px',
        background: '#0f6bff',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    }
};

// Add hover effect
const styleElement = document.createElement('style');
styleElement.textContent = `
    .add-task-input:focus {
        outline: none;
        border-color: #0f6bff !important;
        box-shadow: 0 0 0 3px rgba(15, 107, 255, 0.1);
    }
    
    .add-task-btn:hover {
        transform: translateY(-2px);
        background: #0051cc !important;
    }
`;
document.head.appendChild(styleElement);

export default AddTask;