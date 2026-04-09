const express = require('express')
const app = express()
const morgan = require('morgan')
const cors =  require('cors')





app.use(express.json())
app.use(cors())


morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
// app.use(morgan('tiny'))
// app.use(requestLogger)

let person =[ 
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:', request.path)
//     console.log('Body:', request.body)
//     console.log('---')
//     next()
// }

app.get('/api/persons', (req, res)=>{
    res.json(person)
})

app.get('/info', (req, res)=>{
    const total = person.length
    const date =new Date
    res.send(`
            <p>Phonebook has info for ${total} people</p>
         <p>${date}</p>
        `)
})

app.get('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)

    const personTOShow = person.find(p=> id==p.id)
    if(personTOShow){
        res.json(personTOShow)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)
    person = person.filter(p=> id !==p.id)
    res.status(204).end()
})

app.post('/api/persons', (req, res)=>{

    const body = req.body
    console.log(body)

    if(!body.name || !body.number){
        return res.status(404).json({
            "error": "name and number must be present"
        })
    }

    const nameExist = person.some(p=> p.name ===body.name)
    if(nameExist){
        return res.status(400).json({
            "error": "name alredy exist"
        })
    }


    const newPerson = {
        id: Math.random()* 1000,
        name: body.name,
        number: body.number,
    }
   person = person.concat(newPerson)
   res.json(newPerson)
})





const  PORT =3000
app.listen(PORT, ()=>{
    console.log(`app is running  on  port ${PORT}`)
})