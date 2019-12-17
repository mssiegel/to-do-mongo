const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Todo", TodoSchema)