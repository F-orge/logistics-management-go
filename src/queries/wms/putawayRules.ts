import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsPutawayRule,
  removeWmsPutawayRule,
  selectWmsPutawayRules,
  updateWmsPutawayRule,
} from '@/actions/wms/putawayRules';
import {
  wmsPutawayRuleInsertSchema,
  wmsPutawayRuleSchema,
  wmsPutawayRuleUpdateSchema,
} from '@/schemas/wms/putaway_rule';

export const wmsPutawayRuleQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.putawayRules', page, perPage],
    queryFn: () =>
      selectWmsPutawayRules({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsPutawayRuleCreateMutationOption = mutationOptions<
  z.infer<typeof wmsPutawayRuleSchema>,
  void,
  z.infer<typeof wmsPutawayRuleInsertSchema>
>({
  mutationFn: (value) => createWmsPutawayRule({ data: value }),
});

export const wmsPutawayRuleUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsPutawayRuleSchema>,
    void,
    z.infer<typeof wmsPutawayRuleUpdateSchema>
  >({
    mutationFn: (value) => updateWmsPutawayRule({ data: { id, value } }),
  });

export const wmsPutawayRuleRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsPutawayRule({ data: { id } }),
});