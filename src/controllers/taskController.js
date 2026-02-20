const taskService = require('../services/taskService')
const {validateTask, validatePartialTask} = require('../models/taskModel')

// GET all tasks

exports.getAllTasks = (req, res, next)=>{
    try{
        const tasks = taskService.getAllTasks()
        res.status(200).json(tasks)
    } catch(err){
        next(err) // pass error to error handler middleware
    }
}

//GET task by id
exports.getTaskById = (req, res, next)=> {
    try{
        const id = parseInt(req.params.id)
        const task = taskService.getTaskById(id)
        if(!task){
            return res.status(404).json({message: 'Task Not Found'})
        }
        res.status(200).json(task)
    }catch(err){
        next(err)
    }
}

// POST create a new task
exports.createTask() = (req, res, next)=>{
    try{
        // validate input using zod schema
        const validation = validateTask(req.body)
        if(!validation.success){
            return res.status(400).json({errors: validation.error.errors})
        }

        const newTask = taskService.createTask(validation.data)
        res.status(201).json(newTask)
    } catch (err){
        next(err)
    }
}

// PUT (full update)
exports.updateTask = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    // For PUT, we expect a full task object (all fields required)
    const validation = validateTask(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const updatedTask = taskService.updateTask(id, validation.data);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// PATCH (partial update)
exports.patchTask = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    // For PATCH, we accept partial data
    const validation = validatePartialTask(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const updatedTask = taskService.updateTask(id, validation.data);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// DELETE task
exports.deleteTask = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = taskService.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // 204 No Content – no response body
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
