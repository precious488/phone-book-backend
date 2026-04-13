const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]
// mongodb+srv://befehprecious_db_user:12345@cluster0.xogpld0.mongodb.net/noteApp

const url = `mongodb+srv://befehprecious_db_user:${password}@cluster0.xogpld0.mongodb.net/phonebook`
mongoose.set('strictQuery', false)

// const url = 'mongodb://localhost:27017/notes'

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Ada Lovelace',
  number: '040-1231236',
})

person.save().then((result) => {
  console.log('person saved saved!', result)
})

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person)
    console.log('result')
  })
  mongoose.connection.close()
})
