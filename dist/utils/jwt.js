import jwt from "jsonwebtoken";
import { env } from "../config/env";
export const generateAccessToken = (payload) => {
    const options = {
        expiresIn: env.JWT_EXPIRE,
    };
    return jwt.sign(payload, env.JWT_SECRET, options);
};
export const generateRefreshToken = (payload) => {
    const options = {
        expiresIn: env.JWT_REFRESH_EXPIRE,
    };
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch {
        return null;
    }
};
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }
    catch {
        return null;
    }
};
//# sourceMappingURL=jwt.js.map