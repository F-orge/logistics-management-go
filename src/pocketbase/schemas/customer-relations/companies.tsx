import z from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1).max(255),
});
