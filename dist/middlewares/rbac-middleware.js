/**
 * Middleware to check if the authenticated user has one of the required roles.
 * @param roles Array of allowed roles
 */
export const permittedRole = (roles) => {
    return (req, res, next) => {
        const authReq = req;
        if (!authReq.user) {
            return res.status(401).json({
                code: 401,
                status: "error",
                message: "Authentication required",
            });
        }
        if (!roles.includes(authReq.user.role)) {
            return res.status(403).json({
                code: 403,
                status: "error",
                message: "Forbidden: You do not have the required role",
            });
        }
        return next();
    };
};
//# sourceMappingURL=rbac-middleware.js.map