const express = require('express')
const taskRoutes = require('./routes/taskRoutes')
const {erroHandler} = require('./middleware/errorHandler')
const {logger} = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 3000

// built in middleware to parse json
app.use(express.json())

app.use(logger)  // logs every request

//routes
app.use('/api/tasks', taskRoutes)
//Catch-all for 404 (if no route matched)
app.all('*', (res, req, next)=>{
    res.statusCode(404).json({message: "Route not found"})
})

app.use(erroHandler)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})




