import z from "zod";

const userIdSchema = z.object({
    id: z.string().uuid(),
});

export const userValidation = {
    userIdSchema
};
