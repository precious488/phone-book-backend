require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
console.log('connecting to', url)
mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        // Regex explanation:
        // ^           -> start
        // \d{2,3}     -> 2 or 3 digits
        // -           -> hyphen
        // \d{5,}      -> at least 5 digits
        // $           -> end
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Format must be XX-XXXXX or XXX-XXXXX`,
    },
  },
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
