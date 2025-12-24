import z from "zod";
import {
    allDistricts,
    BloodGroupEnum,
    DistrictEnum,
    DivisionEnum,
    GenderEnum,
    RoleEnum,
} from "../../constants/enums.js";

const userIdSchema = z.object({
    id: z.string().uuid({ message: "Invalid user ID format" }),
});

const userSchema = z
    .object({
        name: z
            .string({ message: "Name must be a string" })
            .min(2, { message: "Name must be at least 2 characters long" })
            .max(50, { message: "Name cannot exceed 50 characters" })
            .optional(),
        photoURL: z
            .string({ message: "Photo URL must be a string" })
            .optional(),
        role: z.enum(RoleEnum, { message: "Invalid role." }).optional(),
        mobileNumber: z
            .string({ message: "Mobile number must be a string" })
            .max(20, { message: "Mobile number cannot exceed 20 characters" })
            .optional(),
        imo: z.boolean({ message: "IMO must be true or false" }).optional(),
        whatsapp: z
            .boolean({ message: "WhatsApp must be true or false" })
            .optional(),
        gender: z.enum(GenderEnum, { message: "Invalid gender" }).optional(),
        bloodGroup: z
            .enum(BloodGroupEnum, { message: "Invalid blood group" })
            .optional(),
        lastBloodDonateDate: z
            .date({ message: "Last blood donation date must be a valid date" })
            .optional(),
        address: z.string({ message: "Address must be a string" }).optional(),
        division: z
            .enum(DivisionEnum, { message: "Invalid division" })
            .optional(),
        district: z.string({ message: "District must be a string" }).optional(), // validate in superRefine
        zipCode: z
            .string({ message: "Zip code must be a string" })
            .max(10, { message: "Zip code cannot exceed 10 characters" })
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (data.division && data.district) {
            const district =
                data.district as (typeof DistrictEnum)[typeof data.division][number];

            if (!DistrictEnum[data.division].includes(district)) {
                ctx.addIssue({
                    path: ["district"],
                    message: "District does not match the selected division",
                    code: z.ZodIssueCode.custom,
                });
            }
        }
    });

export const userValidation = {
    userIdSchema,
    userSchema,
};
