export const authorizedFor = (user_type) => (req, res, next) => {
    if (process.env.IS_ROLE_PERMISSION_ACTIVATED === false) {
        next();
    } else {

        if (!Array.isArray(user_type)) return res.status(500).json({ message: "Invalid route configuration" });

        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const USER = req.user;

        if (!user_type.includes(USER.user_type.toLowerCase())) return res.status(403).json({ message: "Forbidden" });

        next();
    }
}