const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/authError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Неверный E-mail!!!',
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 12,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.static.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные логин или пароль');
      }
      return bcrypt.compare(password, user.password)
      // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные логин или пароль');
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
