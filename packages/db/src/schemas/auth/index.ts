import z from "zod";
import { UserSchema } from "./user";

export default z.object({
  user: UserSchema,
});
