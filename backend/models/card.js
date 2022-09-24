const mongoose = require('mongoose');
const { regExp } = require('../constants/constants');

const ObjectID = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Не должно быть пустым'],
    minlength: [2, 'Должно быть не менее {VALUE}'],
    maxlength: [30, 'Должно быть неболее {VALUE}'],
  },
  link: {
    type: String,
    required: [true, 'Не должно быть пустым'],
    validate: {
      validator(v) {
        return regExp.test(v);
      },
    },
  },
  owner: {
    type: ObjectID,
    ref: 'user',
    required: [true, 'Не должно быть пустым'],
  },
  likes: {
    type: [{ type: ObjectID, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
