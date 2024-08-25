const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  }
}, {
  timestamps: true
});

userSchema.virtual('contacts', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'user_id'
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);