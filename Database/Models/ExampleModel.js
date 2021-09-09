const mongoose = require('mongoose')
const ExampleSchema = new mongoose.Schema({
    userID: { type: String, required: true},
    channelID: { type: String, required: true},
    createdOn: { type: Date, required: true},
})

module.exports = mongoose.model('ExampleModel', ExampleSchema)