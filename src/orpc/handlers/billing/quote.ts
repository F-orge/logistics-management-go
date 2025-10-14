import { implement } from '@orpc/server';
import { ZodError } from 'zod';
import * as billingContracts from '@/orpc/contracts/billing/quote';
import { QuoteRepository } from '@/repositories/billing/quotes';
import { HonoVariables } from '@/server';

export const paginateQuote = implement(billingContracts.paginateQuoteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new QuoteRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeQuote = implement(billingContracts.rangeQuoteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new QuoteRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inQuote = implement(billingContracts.inQuoteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new QuoteRepository(context.db);

    return repo.in(input).execute();
  });

export const createQuote = implement(billingContracts.createQuoteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new QuoteRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateQuote = implement(billingContracts.updateQuoteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new QuoteRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteQuote = implement(billingContracts.deleteQuoteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new QuoteRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
