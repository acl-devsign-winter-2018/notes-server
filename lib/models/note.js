const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequiredString = {
  type: String,
  required: true
};

const addId = schema => {
  schema.virtual('id').get(function(){
    return this._id.toHexString();
  });

  // Ensure virtual fields are serialised.
  schema.set('toJSON', {
    virtuals: true
  });
};

const commentsSchema = new Schema({
  text: RequiredString
});

addId(commentsSchema);

const schema = new Schema({
  text: RequiredString,
  user: RequiredString,
  comments: [commentsSchema]
}, {
  timestamps: { 
    createdAt: 'created', 
    updatedAt: 'updated' 
  }
});

addId(schema);

module.exports = mongoose.model('Note', schema);