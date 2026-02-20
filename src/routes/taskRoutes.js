const express = require('express')
const taksController = require('../controllers/taskController')

const router = express.Router()

// GET api.tasks === retrieve all tasks
router.get('/', taksController.getAllTasks)

// GET api.tasks/:id == retrive tasks by id

router.get('/', taksController.getTaskById)

// POST / api/tasks == create a new task

router.post('/', taksController.createTask)

// PUT api/tasks/:id == completely replace a task == full update

router.put('/', taksController.updateTask);

// PATCH api/tasks/:id == partially update a task

router.patch('/', taksController.patchTask)

// DELETE api/tasks/:id == delete a task
router.delete('/:id', taksController.deleteTask)

