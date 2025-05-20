import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';
import { isValidPassword } from '../utils/crypt.js'; 
import { cookieExtractor } from '../utils/cookieExtractor.js';

// Carga las variables de entorno desde .env
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Validación: asegurarse de que JWT_SECRET esté definido
if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET no está definido en el archivo .env');
}

// Estrategia de registro
passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) return done(null, false);

        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Estrategia de login
passport.use(
  'login',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return done(null, false);

      const isValid = isValidPassword(user, password);
      if (!isValid) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Estrategia JWT
passport.use(
  'current',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
