import z from "zod";

export const UserSchema = z.object({
  name:z.string(),
  email:z.email(),
  emailVerified:z.boolean(),
  iamge:z.url().optional()
})