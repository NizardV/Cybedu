export const isAdmin = (req, res, next) => {
    const roles = req.user?.roles ?? [];
    const hasAdminRole = roles.some((role) => role?.name === 'admin');
    if (!hasAdminRole) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }
    next();
};
