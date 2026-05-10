import { useState } from 'react'
import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('tasks')
  return saved ? JSON.parse(saved) : []
})


  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'done'

// compute filtered list
const filtered = tasks.filter(t => {
  if (filter === 'active') return !t.done
  if (filter === 'done') return t.done
  return true
})

  function addTask() {
    if (!input.trim()) return
    setTasks([...tasks, { id: Date.now(), text: input, done: false ,dueDate,priority}])
    setInput('')
    setDueDate('')
    setPriority('medium')

  }
  function deleteTask(id) {
  setTasks(tasks.filter(t => t.id !== id))
}
function toggleTask(id) {
  setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
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
        <input
  type="date"
  value={dueDate}
  onChange={e => setDueDate(e.target.value)}
  style={{ width: '140px' }}
/><select value={priority} onChange={e => setPriority(e.target.value)}>
  <option value="high">🔴 High</option>
  <option value="medium">🟡 Medium</option>
  <option value="low">🟢 Low</option>
</select>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter-bar">
  {['all', 'active', 'done'].map(f => (
    <button
      key={f}
      className={filter === f ? 'active' : ''}
      onClick={() => setFilter(f)}
    >
      {f.charAt(0).toUpperCase() + f.slice(1)}
    </button>
  ))}
</div>
      <ul className="task-list">
        {filtered.map(task => (
        <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
  <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
  <span>{task.text}</span>
  <span className="due-date">{task.dueDate || 'No date'}</span>
  <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
  <button className="delete-btn" onClick={() => deleteTask(task.id)}>✕</button>
</li>
        ))}
      </ul>
    </div>
  )
}