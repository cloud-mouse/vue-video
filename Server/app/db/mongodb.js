const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/vue-video', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose