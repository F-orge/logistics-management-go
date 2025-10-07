import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createBillingRateRule,
  removeBillingRateRule,
  selectBillingRateRule,
  updateBillingRateRule,
} from '@/actions/billing/rateRules';
import {
  billingRateRuleInsertSchema,
  billingRateRuleSchema,
  billingRateRuleUpdateSchema,
} from '@/schemas/billing/rate_rule';

export const billingRateRuleQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.rateRules', page, perPage],
    queryFn: () =>
      selectBillingRateRule({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingRateRuleCreateMutationOption = mutationOptions<
  z.infer<typeof billingRateRuleSchema>,
  void,
  z.infer<typeof billingRateRuleInsertSchema>
>({
  mutationFn: (value) => createBillingRateRule({ data: value }),
});

export const billingRateRuleUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingRateRuleSchema>,
    void,
    z.infer<typeof billingRateRuleUpdateSchema>
  >({
    mutationFn: (value) => updateBillingRateRule({ data: { id, value } }),
  });

export const billingRateRuleRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingRateRule({ data: { id } }),
});