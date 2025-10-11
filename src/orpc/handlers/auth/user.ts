import { implement } from '@orpc/server';
import { inUserContract } from '@/orpc/contracts/auth/user';
import { HonoVariables } from '@/server';

export const inUser = implement(inUserContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    return context.db
      .selectFrom('user')
      .select(['id', 'name', 'email', 'image'])
      .where('id', 'in', input)
      .execute();
  });
