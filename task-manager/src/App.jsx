import { useState } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  function addTask() {
    if (!input.trim()) return
    setTasks([...tasks, { id: Date.now(), text: input, done: false }])
    setInput('')
  }
  function deleteTask(id) {
  setTasks(tasks.filter(t => t.id !== id))
}

  return (
    <div className="app">
      <h1>My Task Manager</h1>
      <div className="task-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
 <button className="delete-btn" onClick={() => deleteTask(task.id)}>✕</button>
            <span>{task.text}</span>

          </li>
        ))}
      </ul>
    </div>
  )
}