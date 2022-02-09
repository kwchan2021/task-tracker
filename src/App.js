
import { useState, useEffect } from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

// Refresh page to show task
const refreshTasks = async () => {
  const data = await fetchTasks()
  setTasks(data)
}

// Dequeue Task - Delete the last item
const dequeueTask = async () => {
  const data = await fetchTasks()
  console.log(data[data.length-1].id)
  const id = data[data.length-1].id

  await fetch(`http://localhost:5000/tasks/${id}`, 
    {method: 'DELETE'}
  )
  setTasks(tasks.filter((task) => task.id !== id))
}

// Fetch data
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data
}

// Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
}

// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, 
    {method: 'DELETE'}
  )
  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => 
    task.id === id ? { ...task, reminder: !task.reminder } : task))
}

  return (
    <div className='container'>
      <Header 
        title="Task Trackers" 
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        onRefresh={ refreshTasks }
        onDequeue={ dequeueTask }
      />
      {
        showAddTask && 
        <AddTask onAdd={ addTask }/>
      }
      {tasks.length > 0?
        <Tasks 
        tasks={tasks}
        onDelete={ deleteTask } 
        onToggle={ toggleReminder }
        /> : 'No Task'}
    </div>
  )
}

export default App;