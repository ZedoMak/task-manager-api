const {z} = require('zod')

// define schema for a task

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    completed: z.boolean().optional().default(false)
})

// for partial updates
const partialTaskSchema = taskSchema.partial()

// validation function

function validateTask(data){
    return taskSchema.safeParse(data)
}

function validatePartialTask(data){
    return partialTaskSchema.safeParse(data)
}


module.exports = {
    validateTask,
    validatePartialTask
}