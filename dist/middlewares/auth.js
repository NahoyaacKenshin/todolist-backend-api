import { verifyAccessToken } from "../lib/jwt";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access token is required" });
        return;
    }
    const payload = verifyAccessToken(token);
    if (!payload) {
        res.status(403).json({ error: "Invalid or expired access token" });
        return;
    }
    req.userId = payload.userId;
    req.userEmail = payload.email;
    next();
};
//# sourceMappingURL=auth.js.map