import { z } from 'zod';

export const EnvSchema = z.object({
  POCKETBASE_URL: z
    .string()
    .default(import.meta.env.PROD ? '/' : 'http://localhost:8090'),
});

export default EnvSchema.parse(import.meta.env || {});
