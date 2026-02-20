// simple in memory dat
let tasks = [
    {id: 1, title: "Learn REST principles", completed: false},
    {id: 2, title: "Build a project with express", completed: false}
]

// simple counter for generating new IDs
let nextId = 3

module.exports = {
    findAll: () => tasks,
    findById: (id) = tasks.find(task=> task.id === id),
    create: (taskData)=> {
        const newTask = {id: nextId++, ...taskData}
        tasks.push(newTask)
        return newTask
    },
    update: (id, updates)=>{
        const task = tasks.find(t => t.id === id)
        if(!task) return null 
        Object.assign(task, updates)
        return task
    },

    delete: (id)=> {
        const index = tasks.findIndex(t=> t.id === id)
        if(index === -1) return false
        tasks.splice(index,1)
        return true
    }

}