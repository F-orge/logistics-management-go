import { oc } from '@orpc/contract';
import z from 'zod';

export const inUserContract = oc.input(z.array(z.string()).nonempty()).output(
  z
    .object({
      email: z.email(),
      id: z.string(),
      name: z.string(),
      image: z.url().nullable(),
    })
    .array(),
);
