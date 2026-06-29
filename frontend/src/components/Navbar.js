import React from 'react';

function Navbar({ username, onLogout }) {
    return (
        <div style={styles.header}>
            <h1 style={styles.title}>
                <span style={styles.titleGradient}>✅ Task Manager</span>
            </h1>
            <div style={styles.userInfo}>
                <span style={styles.username}>👤 {username}</span>
                <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
            </div>
        </div>
    );
}

const styles = {
    header: {
        background: '#0c1120',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #1e2a4a',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    },
    title: {
        margin: 0,
        padding: 0,
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    },
    titleGradient: {
        background: 'linear-gradient(120deg, #ffffff, #3b82f6, #1e3a8a)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        display: 'inline-block',
        transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
        transformOrigin: 'left center'
    },
    // Hover effect for the title
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    username: {
        color: '#9bbdff',
        fontWeight: '500',
        background: '#0f1422',
        padding: '6px 12px',
        borderRadius: '20px',
        border: '1px solid #1e2a4a'
    },
    logoutBtn: {
        padding: '8px 16px',
        background: '#1e2a4a',
        border: 'none',
        borderRadius: '8px',
        color: '#9bbdff',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    }
};

// Add hover effect via JavaScript
const titleElement = document.createElement('style');
titleElement.textContent = `
    h1:hover span {
        transform: scale(1.05) translateX(5px);
        background: linear-gradient(135deg, #ffffff, #60a5fa, #2563eb);
        background-clip: text;
        -webkit-background-clip: text;
        text-shadow: 0 0 15px rgba(59,130,246,0.5);
    }
`;
document.head.appendChild(titleElement);

export default Navbar;