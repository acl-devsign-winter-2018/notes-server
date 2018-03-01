const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequiredString = {
  type: String,
  required: true
};

const schema = new Schema({
  text: RequiredString,
  user: RequiredString,
  comments: [{
    text: RequiredString,
    user: RequiredString
  }]
}, {
  timestamps: { 
    createdAt: 'created', 
    updatedAt: 'updated' 
  }
});

module.exports = mongoose.model('Note', schema);