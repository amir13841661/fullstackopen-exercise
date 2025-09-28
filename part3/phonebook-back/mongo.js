const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name=process.argv[3]
const number=process.argv[4]


const url = `mongodb+srv://amir13841661:${password}@test.rfnaazf.mongodb.net/?retryWrites=true&w=majority&appName=test`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name:String,
  number:String,
  id:String,
})

const Person = mongoose.model('Person', personSchema)

if(name){
    const person=new Person(
        {
            name:name,
            number:number,
            
        }
    )
    person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
    })
}
else{
    Person.find({}).then(result=>{
        result.forEach(u=>console.log(`${u.name} ${u.number}`)
        )
        mongoose.connection.close()
    })
}



