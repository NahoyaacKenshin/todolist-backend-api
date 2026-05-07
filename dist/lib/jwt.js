import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "no-jwt-key";
export var TokenExpiry;
(function (TokenExpiry) {
    TokenExpiry["ACCESS_TOKEN_EXPIRES"] = "15m";
    TokenExpiry["REFRESH_TOKEN_EXPIRES"] = "7d";
})(TokenExpiry || (TokenExpiry = {}));
export function signAccessToken(userId, role, duration) {
    const payload = { sub: userId, role, type: "access" };
    return jwt.sign(payload, jwtSecret, { expiresIn: duration });
}
export function signRefreshToken(userId, role, duration) {
    const payload = { sub: userId, role, type: "refresh" };
    return jwt.sign(payload, jwtSecret, { expiresIn: duration });
}
export function verifyAccessToken(token) {
    try {
        const payload = jwt.verify(token, jwtSecret);
        return payload.type === "access" ? payload : null;
    }
    catch {
        return null;
    }
}
export function verifyRefreshToken(token) {
    try {
        const payload = jwt.verify(token, jwtSecret);
        return payload.type === "refresh" ? payload : null;
    }
    catch {
        return null;
    }
}
export function toMilliseconds(duration) {
    if (duration === undefined)
        return undefined;
    if (typeof duration === "number") {
        return duration * 1000;
    }
    const match = /^(\d+)([smhd])$/.exec(duration);
    if (!match)
        return undefined;
    const value = Number(match[1]);
    const unit = match[2];
    switch (unit) {
        case "s":
            return value * 1000;
        case "m":
            return value * 60 * 1000;
        case "h":
            return value * 60 * 60 * 1000;
        case "d":
            return value * 24 * 60 * 60 * 1000;
        default:
            return undefined;
    }
}
//# sourceMappingURL=jwt.js.map