import { ZodError } from "zod";
export const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }
        return next(error);
    }
};
//# sourceMappingURL=validate-schema.js.map