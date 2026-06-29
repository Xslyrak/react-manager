import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
    // If task is undefined or null, don't render anything
    if (!task) {
        console.warn('TaskItem received undefined task');
        return null;
    }
    
    return (
        <div style={styles.taskCard} className="task-card">
            <input
                type="checkbox"
                checked={task.completed === 1}
                onChange={() => onToggle(task.id, task.completed)}
                style={styles.checkbox}
                className="checkbox"
            />
            <span style={{
                ...styles.taskTitle,
                textDecoration: task.completed === 1 ? 'line-through' : 'none',
                color: task.completed === 1 ? '#6c86ae' : 'white'
            }}>
                {task.title || 'No title'}
            </span>
            <button onClick={() => onDelete(task.id)} style={styles.deleteBtn} className="delete-btn">
                Delete
            </button>
        </div>
    );
}

const styles = {
    taskCard: {
        background: '#0c1120',
        borderRadius: '12px',
        padding: '15px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        border: '1px solid #1e2a4a',
        transition: 'all 0.2s ease'
    },
    checkbox: {
        width: '22px',
        height: '22px',
        cursor: 'pointer',
        accentColor: '#0f6bff',
        transition: 'transform 0.1s ease'
    },
    taskTitle: {
        flex: 1,
        fontSize: '16px',
        transition: 'all 0.2s ease'
    },
    deleteBtn: {
        padding: '6px 12px',
        background: '#dc3545',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    }
};

export default TaskItem;