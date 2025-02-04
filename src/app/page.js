import { getTasks } from './lib/action'
import TaskList from './components/TaskList'
import CreateTaskForm from './components/CreateTaskForm'
export default async function Home() {
  const tasks = await getTasks()

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-800">Task Manager</h1>
        <p className="text-center text-gray-600 mb-8">Organize your tasks efficiently</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Tasks</h2>
            <TaskList tasks={tasks} />
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create New Task</h2>
            <CreateTaskForm />
          </div>
        </div>
      </div>
    </main>
  )
}