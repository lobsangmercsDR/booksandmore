const mongoose = require('mongoose');
const User = require('../models/User'); // Ruta correcta al archivo User.js
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Asegúrate de que el modelo User se haya requerido correctamente antes de este script.
// Por ejemplo, si tienes un archivo User.js en src/models, deberías importarlo en tu app.js o en el archivo principal antes de esta configuración.

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
