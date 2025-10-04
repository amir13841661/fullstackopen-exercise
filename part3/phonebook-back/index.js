require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(express.static('dist'))
app.use(cors({ origin: true }))
app.use(express.json())
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: 'invalid input format for name or number',
    })
  }

  next(error)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  const formatted = date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
  })
  Person.find({}).then((result) => {
    const length = result.length
    const info = `<h1>phonebook has info for ${length}
   people</h1><p>${formatted}</p>`
    response.send(info)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
  // response.json(persons);
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person
        ? response.json(person)
        : response.status(404).send('<h1>user not found</h1>')
    })
    .catch((err) => next(err))
  // const person = persons.find((u) => u.id == request.params.id);
  // if (!person) {
  //   return response.status(404).send("<h1>user not found</h1>");
  // }
  // response.json(person);
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const data = request.body
  console.log(data)
  const person = new Person({
    name: data.name,
    number: data.number,
  })
  person
    .save()
    .then((savedPerson) => response.status(201).json(savedPerson))
    .catch((err) => next(err))

  // response.status(201).send({ message: "created successfully" });
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findById(request.params.id).then((result) => {
    if (!result) {
      return response.status(404).end()
    }
    result.name = name
    result.number = number

    return result
      .save()
      .then((update) => {
        response.json(update)
      })
      .catch((err) => next(err))
  })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
