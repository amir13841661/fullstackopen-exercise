const express = require('express')
const morgan = require('morgan')
const cors=require("cors")
const app = express()


app.use(express.static('dist'))
app.use(cors({origin:true}))
app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

const persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
      "id":"5",
      "name":"test",
      "number":"12345"
    }
]








app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get("/info",(request,response)=>{
  const date =new Date()
  const formatted = date.toLocaleString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'longOffset'
});

  const info=`<h1>phonebook has info for ${persons.length} people</h1><p>${formatted}</p>`
  response.send(info)
})

app.get("/api/persons/:id",(request,response)=>{
  const person=persons.find(u=>u.id==request.params.id)
  if(!person){
    return response.status(404).send("<h1>user not found</h1>")
  }
  response.json(person)
})

app.delete("/api/persons/:id",(request,response)=>{
  const person=persons.findIndex(u=>u.id==request.params.id)
  
  if(person==-1){
    return response.status(404).send("<h1>user not found</h1>")
  }
  persons.splice(person,1)

  response.status(204).end()
  
})

app.post('/api/persons',(request,response)=>{
  const data=request.body
  console.log(data);
  if(!data.name||!data.number){
    return response.status(400).send({error:"invalid input"})
  }
  else if(persons.find(p=>p.name.toLowerCase()==data.name.toLowerCase())){
    return response.status(400).send({error:"name already exists"})
  }
  const newPerson={...data,id:`${Math.floor(Math.random()*1000000000)}`}
  persons.push(newPerson)
  

  response.status(201).send({message:"created successfully",id:newPerson.id})
  
})

const PORT =process.env.PORT|| 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})