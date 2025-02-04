'use client'
import "../../app/globals.css"

import { toggleTaskStatus, deleteTask } from '../lib/action'

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-500">No tasks yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskStatus(task._id)}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all duration-200 cursor-pointer"
              />
            </div>
            
            <div className="flex-grow">
              <h3 className={`font-semibold text-lg mb-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
              
              {task.dueDate && (
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={`${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                    Due: {new Date(task.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>
            
            <button
              onClick={() => deleteTask(task._id)}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-200"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}