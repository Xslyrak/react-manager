import React, { useState } from 'react';
import { login, register } from '../services/api';

function Login({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const data = await login(username, password);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    onLogin(data.username);
                } else {
                    setError(data.error || 'Login failed');
                }
            } else {
                const data = await register(username, password);
                if (data.id) {
                    alert('Registration successful! Please login.');
                    setIsLogin(true);
                    setUsername('');
                    setPassword('');
                } else {
                    setError(data.error || 'Registration failed');
                }
            }
        } catch (err) {
            setError('Something went wrong. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.authBox}>
                <h2 style={styles.title}>
                    <span style={styles.titleGradient}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </span>
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    {error && <div style={styles.error}>{error}</div>}
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>
                <p style={styles.switchText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #0a0f1c, #03060e)'
    },
    authBox: {
        background: '#0c1120',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #1e2a4a',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
    },
    title: {
        marginBottom: '25px',
        textAlign: 'center',
        transition: 'all 0.3s ease'
    },
    titleGradient: {
        background: 'linear-gradient(120deg, #ffffff, #3b82f6, #1e3a8a)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        display: 'inline-block',
        transition: 'all 0.3s ease'
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        background: '#0f1422',
        border: '2px solid #1f2a48',
        borderRadius: '10px',
        color: 'white',
        fontSize: '16px',
        transition: 'all 0.2s ease'
    },
    button: {
        width: '100%',
        padding: '12px',
        background: '#0f6bff',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    error: {
        background: '#dc354520',
        color: '#ff8a92',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '15px',
        fontSize: '14px',
        borderLeft: '3px solid #dc3545'
    },
    switchText: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#6c86ae'
    },
    switchButton: {
        background: 'none',
        border: 'none',
        color: '#3b82f6',
        cursor: 'pointer',
        textDecoration: 'underline',
        transition: 'all 0.2s ease'
    }
};

// Add hover effects via global style
const styleElement = document.createElement('style');
styleElement.textContent = `
    input:focus {
        outline: none;
        border-color: #0f6bff !important;
        box-shadow: 0 0 0 3px rgba(15, 107, 255, 0.1);
    }
    
    button:hover {
        transform: translateY(-2px);
        background: #0051cc !important;
    }
    
    .switchButton:hover {
        color: #60a5fa !important;
    }
    
    @keyframes titlePulse {
        0% { text-shadow: 0 0 0px rgba(59,130,246,0); }
        100% { text-shadow: 0 0 10px rgba(59,130,246,0.5); }
    }
    
    h2:hover span {
        animation: titlePulse 0.5s ease infinite;
    }
`;
document.head.appendChild(styleElement);

export default Login;