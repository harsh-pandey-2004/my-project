'use server'

import { revalidatePath } from 'next/cache'
import clientPromise from './db'
import { ObjectId } from 'mongodb'

// Helper function to serialize MongoDB documents
function serializeDocument(doc) {
  return {
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString(),
    dueDate: doc.dueDate?.toString()
  }
}

export async function createTask(formData) {
  const client = await clientPromise
  const db = client.db("taskmanager")
  
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
    completed: false,
    createdAt: new Date()
  }

  try {
    const result = await db.collection('tasks').insertOne(task)
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to create task' }
  }
}

export async function getTasks() {
  const client = await clientPromise
  const db = client.db("taskmanager")
  
  try {
    const tasks = await db.collection('tasks')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    // Serialize the MongoDB documents
    return tasks.map(task => serializeDocument(task))
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return []
  }
}

export async function updateTask(taskId, formData) {
  const client = await clientPromise
  const db = client.db("taskmanager")
  
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
  }

  try {
    await db.collection('tasks').updateOne(
      { _id: new ObjectId(taskId) },
      { $set: task }
    )
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to update task' }
  }
}

export async function toggleTaskStatus(taskId) {
  const client = await clientPromise
  const db = client.db("taskmanager")
  
  try {
    const task = await db.collection('tasks').findOne({ _id: new ObjectId(taskId) })
    await db.collection('tasks').updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { completed: !task?.completed } }
    )
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to toggle task status' }
  }
}

export async function deleteTask(taskId) {
  const client = await clientPromise
  const db = client.db("taskmanager")
  
  try {
    await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete task' }
  }
}