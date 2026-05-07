import { userRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword, generateVerificationToken } from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/email";
export class AuthService {
    async signup(data) {
        // Check if user already exists
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        // Generate verification token
        const verificationToken = generateVerificationToken();
        // Hash password
        const hashedPassword = hashPassword(data.password);
        // Create user
        const user = await userRepository.create({
            email: data.email,
            password: hashedPassword,
            verificationToken,
        });
        // Send verification email
        await sendVerificationEmail(data.email, verificationToken);
        return {
            userId: user.id,
            email: user.email,
            message: "Signup successful. Please check your email to verify your account.",
        };
    }
    async verifyEmail(data) {
        const user = await userRepository.findByVerificationToken(data.token);
        if (!user) {
            throw new Error("Invalid or expired verification token");
        }
        if (user.emailVerified) {
            throw new Error("Email is already verified");
        }
        // Update user
        const updatedUser = await userRepository.updateEmailVerification(user.id);
        // Send welcome email
        await sendWelcomeEmail(updatedUser.email);
        return {
            userId: updatedUser.id,
            email: updatedUser.email,
            message: "Email verified successfully!",
        };
    }
    async login(data) {
        const user = await userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in");
        }
        // Verify password
        if (!verifyPassword(data.password, user.password)) {
            throw new Error("Invalid email or password");
        }
        // Generate tokens
        const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email,
        });
        const refreshToken = generateRefreshToken({
            userId: user.id,
            email: user.email,
        });
        // Store refresh token
        await userRepository.updateRefreshToken(user.id, refreshToken);
        return {
            userId: user.id,
            email: user.email,
            accessToken,
            refreshToken,
        };
    }
    async refreshAccessToken(refreshToken) {
        const user = await userRepository.findByRefreshToken(refreshToken);
        if (!user) {
            throw new Error("Invalid refresh token");
        }
        const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email,
        });
        return { accessToken };
    }
    async logout(userId) {
        await userRepository.updateRefreshToken(userId, null);
        return { message: "Logout successful" };
    }
}
export const authService = new AuthService();
//# sourceMappingURL=auth.service.js.map