import { useState } from 'react'
import './App.css'

// Заголовок можно переопределить при сборке образа: docker build --build-arg VITE_APP_TITLE="..."
const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Список задач'

const START_TASKS = [
  { id: 1, text: 'Собрать Docker-образ', done: true },
  { id: 2, text: 'Запустить контейнер', done: true },
  { id: 3, text: 'Проверить приложение в браузере', done: false },
]

export default function App() {
  const [tasks, setTasks] = useState(START_TASKS)
  const [text, setText] = useState('')

  function addTask(event) {
    event.preventDefault()
    const value = text.trim()
    if (!value) return
    setTasks([...tasks, { id: Date.now(), text: value, done: false }])
    setText('')
  }

  function toggleTask(id) {
    setTasks(tasks.map((task) => (
      task.id === id ? { ...task, done: !task.done } : task
    )))
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const left = tasks.filter((task) => !task.done).length

  return (
    <main className="card">
      <h1>{APP_TITLE}</h1>
      <p className="subtitle">React + Vite + Docker + Nginx</p>

      <form className="add" onSubmit={addTask}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Новая задача..."
        />
        <button type="submit">Добавить</button>
      </form>

      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button
              className="remove"
              onClick={() => removeTask(task.id)}
              title="Удалить"
            >
              ×
            </button>
          </li>
        ))}
        {tasks.length === 0 && <li className="empty">Задач нет — добавьте первую</li>}
      </ul>

      <footer>
        Осталось задач: {left} из {tasks.length}
      </footer>
    </main>
  )
}
