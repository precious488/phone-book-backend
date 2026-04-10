require('dotenv').config()

const Person =require('./models/person.js')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors =  require('cors')
const mongoose = require('mongoose')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))



morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
// app.use(morgan('tiny'))
// app.use(requestLogger)

app.get('/api/persons', (req, res)=>{
    Person.find({}).then(person=>{
        res.json(person)
    })
})

app.post('/api/persons', (req, res)=>{
    const body = req.body
    if(!body){
        res.status(404).json({"error":"name and number must be present"})
    }

    const person= new Person({
        name:body.name,
        number:body.number
    })
    person.save().then(savePerson=>{
        res.json(savePerson)
    })
})



const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`app is running  on  port ${PORT}`)
})