import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/credit_note';
import { CreditNoteRepository } from '@/repositories/billing/creditNotes';
import { HonoVariables } from '@/server';

export const paginateCreditNote = implement(
  billingContracts.paginateCreditNoteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CreditNoteRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeCreditNote = implement(
  billingContracts.rangeCreditNoteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CreditNoteRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inCreditNote = implement(billingContracts.inCreditNoteContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CreditNoteRepository(context.db);

    return repo.in(input).execute();
  });

export const createCreditNote = implement(
  billingContracts.createCreditNoteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CreditNoteRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateCreditNote = implement(
  billingContracts.updateCreditNoteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CreditNoteRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteCreditNote = implement(
  billingContracts.deleteCreditNoteContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CreditNoteRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
