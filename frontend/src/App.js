import React, { useState, useEffect } from 'react';
import Login from './components/login';
import Navbar from './components/Navbar';
import AddTask from './components/AddTask';
import TaskList from './components/Tasklist';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');
        if (token && savedUsername) {
            setIsLoggedIn(true);
            setUsername(savedUsername);
            loadTasks();
        } else {
            setLoading(false);
        }
    }, []);

  const loadTasks = async () => {
    setLoading(true);  // ← This is correct here
    try {
        const data = await getTasks();
        const tasksArray = Array.isArray(data) ? data : [];
        setTasks(tasksArray);  // ← This is correct here
    } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks([]);
    } finally {
        setLoading(false);  // ← This is correct here
    }
    };

    const handleLogin = (user) => {
        setUsername(user);
        setIsLoggedIn(true);
        loadTasks();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        setTasks([]);
    };

    const handleAddTask = async (title) => {
        try {
            const newTask = await createTask(title);
            setTasks([newTask, ...tasks]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleToggleTask = async (id, completed) => {
        try {
            await updateTask(id, !completed);
            await loadTasks();
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            await loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    const completedCount = tasks.filter(t => t.completed === 1).length;

    return (
        <div style={styles.container}>
            <Navbar username={username} onLogout={handleLogout} />
            <AddTask onAdd={handleAddTask} />
            
            {loading ? (
                <div style={styles.loading}>Loading tasks...</div>
            ) : (
                <TaskList
                    tasks={tasks}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                />
            )}
            
            <div style={styles.stats}>
                <span>📊 Total: {tasks.length}</span>
                <span>✅ Completed: {completedCount}</span>
                <span>⏳ Pending: {tasks.length - completedCount}</span>
            </div>
        </div>
    );
}

// Professional Blue/Black Theme Styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        minHeight: '100vh',
        // Subtle gradient overlay for depth
        background: 'linear-gradient(180deg, rgba(10, 15, 28, 0.95) 0%, rgba(3, 6, 14, 0.98) 100%)',
        position: 'relative'
    },
    loading: {
        textAlign: 'center',
        padding: '60px 40px',
        color: '#6c86ae',
        background: 'rgba(12, 17, 32, 0.9)',
        borderRadius: '16px',
        border: '1px solid #1e2a4a',
        backdropFilter: 'blur(10px)',
        fontSize: '1.1rem',
        letterSpacing: '0.5px'
    },
    stats: {
        marginTop: '25px',
        padding: '18px 25px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        color: '#9bbdff',
        background: 'rgba(12, 17, 32, 0.9)',
        borderRadius: '16px',
        border: '1px solid #1e2a4a',
        backdropFilter: 'blur(10px)',
        fontWeight: '500',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease'
    }
};

// Add global styles for the app
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    /* Professional Blue/Black Theme - Global Styles */
    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        background: #0a0f1c;
        /* Subtle animated gradient background */
        background: radial-gradient(ellipse at 20% 50%, rgba(15, 23, 42, 0.8) 0%, transparent 60%),
                    radial-gradient(ellipse at 80% 20%, rgba(30, 58, 138, 0.3) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 80%, rgba(15, 23, 42, 0.6) 0%, transparent 50%),
                    #0a0f1c;
        background-attachment: fixed;
    }
    
    /* Subtle grid pattern overlay for professional look */
    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            linear-gradient(rgba(30, 42, 74, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 42, 74, 0.03) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 0;
    }
    
    /* All content sits above the background */
    #root {
        position: relative;
        z-index: 1;
    }
    
    /* Scrollbar styling - matches blue/black theme */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    body {
    background: #0a0f1c;
    background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-blend-mode: overlay;
}
    ::-webkit-scrollbar-track {
        background: rgba(10, 15, 28, 0.8);
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #1e3a8a, #3b82f6);
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #2563eb, #60a5fa);
    }
    
    /* Smooth animations for all interactive elements */
    * {
        transition: all 0.2s ease;
    }
    
    /* Glow effect for cards on hover */
    .task-card:hover {
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
    }
    
    /* Button press effect */
    button:active {
        transform: scale(0.96);
    }
    
    /* Stats hover effect */
    .stats-container:hover {
        border-color: #3b82f6;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
    }
`;

document.head.appendChild(globalStyles);

export default App;