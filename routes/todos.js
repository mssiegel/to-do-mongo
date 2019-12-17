const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

//Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

//Create todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    todo: req.body.todo,
    category: req.body.category
  })

  try {
    const newTodo = await todo.save()
    res.status(201).json(newTodo)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

/*
//Delete todo without middleware
router.delete('/:todoId', async (req, res) => {
  try {
    const deletedTodo = await Todo.remove({ _id: req.params.todoId })
    res.json({ message: 'Deleted todo' })
  } catch (err) {
    res.json({ message: err })
  }
})
*/

//Delete todo
router.delete('/:todoId', getTodo, async (req,res) => {
  try {
    await res.todo.remove()
    res.json({ message: 'Deleted todo' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


async function getTodo(req, res, next) {
  try {
    todo = await Todo.findById({ _id: req.params.todoId })
    if (todo === null) return res.status(404).json({ message: 'Cant find todo'})
  }
  catch(err) {
    return res.status(500).json({ message: err.message })
  }

  res.todo = todo
  next()
}

module.exports = router