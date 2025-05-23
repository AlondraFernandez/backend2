export const authRole = (roleRequired) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== roleRequired) {
            return res.status(403).json({ error: 'Acceso denegado: permiso insuficiente' });
        }
        next();
    };
};