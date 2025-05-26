import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import { CartModel } from '../models/cart.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'coderSecretKey';

passport.use(
    'register',
    new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const exist = await UserModel.findOne({ email });
                if (exist) return done(null, false, { message: 'Usuario ya existe' });

                const hashedPassword = await bcrypt.hash(password, 10);
                const newCart = await CartModel.create({ products: [] });

                const { first_name, last_name, role } = req.body;

                const user = await UserModel.create({
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                    role,
                    cart: newCart._id
                });

                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) return done(null, false, { message: 'Usuario no encontrado' });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });

                return done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await UserModel.findById(payload.id);
                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);
