import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false, important: false }]);
    setNewTask('');
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleImportant = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Cálculo de las estadísticas
  const totalTasks = tasks.length;
  const importantTasks = tasks.filter(task => task.important).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const uncompletedTasks = totalTasks - completedTasks;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '8px',
              padding: '8px',
              borderBottom: '1px solid #ccc',
              width: '90%',
              maxWidth: '600px',
              margin: 'auto',
              backgroundColor: task.important ? '#ffefc4' : 'transparent',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
              style={{ marginRight: '10px' }}
            />
            <span
              onClick={() => handleToggleTask(index)}
              style={{
                cursor: 'pointer',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.important ? 'red' : 'black',
                flexGrow: 1,
                maxWidth: '70%', // Limita el ancho del texto
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={task.text} // Muestra el texto completo en un tooltip
            >
              {task.text}
            </span>
            <button onClick={() => handleToggleImportant(index)} style={{ marginLeft: '10px' }}>
              {task.important ? 'Unmark Important' : 'Mark Important'}
            </button>
            <button onClick={() => handleDeleteTask(index)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Recuadro de estadísticas */}
      <div style={{
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Task Summary</h3>
        <p>Total Tasks: {totalTasks}</p>
        <p>Important Tasks: {importantTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Uncompleted Tasks: {uncompletedTasks}</p>
      </div>
    </div>
  );
}

export default App;
