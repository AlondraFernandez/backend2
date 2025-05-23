import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'coderSecretKey';

export const loginSuccess = async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
};

export const currentUser = (req, res) => {
    const { _id, email, first_name, last_name, role } = req.user;
    res.json({ id: _id, email, fullName: `${first_name} ${last_name}`, role });
};