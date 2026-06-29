import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
    // Make sure tasks is an array and filter out invalid items
    const validTasks = Array.isArray(tasks) ? tasks.filter(task => task && task.id) : [];
    
    if (validTasks.length === 0) {
        return (
            <div style={styles.empty}>
                <p>✨ No tasks yet. Add one above!</p>
            </div>
        );
    }

    return (
        <div>
            {validTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

const styles = {
    empty: {
        textAlign: 'center',
        padding: '40px',
        color: '#6c86ae',
        background: '#0c1120',
        borderRadius: '12px',
        border: '1px solid #1e2a4a'
    }
};

export default TaskList;