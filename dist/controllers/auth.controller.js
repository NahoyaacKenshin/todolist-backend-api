import { SignupUserService, LoginCredentialsService, VerifyEmailService, RefreshTokenService, ResendEmailVerificationService } from "../services/auth";
import { TokenExpiry, toMilliseconds } from "../lib/jwt";
import { ENV } from "../config/env";
export class AuthController {
    // Helper to set cookies
    setAuthCookies(res, tokens) {
        const isProduction = ENV.NODE_ENV === "production";
        res.cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: toMilliseconds(TokenExpiry.ACCESS_TOKEN_EXPIRES),
        });
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: toMilliseconds(TokenExpiry.REFRESH_TOKEN_EXPIRES),
        });
    }
    // Credentials Signup
    signup = async (req, res) => {
        const { name, email, password } = req.body ?? {};
        const result = await SignupUserService(name, email, password);
        return res.status(result.code).json(result);
    };
    // Email Verification
    verifyEmail = async (req, res) => {
        const token = req.query.token;
        const result = await VerifyEmailService(token);
        return res.status(result.code).json(result);
    };
    // Handle Login Account
    login = async (req, res) => {
        const { email, password } = req.body ?? {};
        const result = await LoginCredentialsService(email, password);
        if (result.code === 200 && result.data?.tokens) {
            this.setAuthCookies(res, result.data.tokens);
        }
        return res.status(result.code).json(result);
    };
    // Refresh Token Helps Generate another valid Access Token
    refresh = async (req, res) => {
        const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;
        const result = await RefreshTokenService(refreshToken);
        if (result.code === 200 && result.data?.tokens) {
            this.setAuthCookies(res, result.data.tokens);
        }
        return res.status(result.code).json(result);
    };
    // Handle Logout
    logout = (req, res) => {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({ code: 200, status: "success", message: "Logged out successfully" });
    };
    // Resend Email Verification
    resendEmailVerification = async (req, res) => {
        const { email } = req.body ?? {};
        const result = await ResendEmailVerificationService(email);
        return res.status(result.code).json(result);
    };
}
//# sourceMappingURL=auth.controller.js.map