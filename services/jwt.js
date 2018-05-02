'use strict'

const jwt = require('jwt-simple');

const moment = require('moment');

const config = require('../config');

exports.createToken = function(user){
  var payload = {
    sub: user._id,
    name: user.nombre,
    nickname: user.nickname,
    email: user.email,
    password: user.password,
    role: user.role,
    image: user.image,
    iat: moment.unix(),
    exp: moment().add(30, 'days').unix
  }

  return jwt.encode(payload, config.secret)

}
