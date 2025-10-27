import { CrmLeadSource, CrmLeadStatus } from "../../../../db.types";
import { CreateLeadInputSchema, Leads } from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createLead'|'removeLead'|'updateLead'> = {
  createLead: async (_parent, args, ctx) => {
    const trx = await ctx.db.startTransaction().execute();

    const payload = CreateLeadInputSchema().parse(args.value);

    const result = await trx
      .insertInto("crm.leads")
      .values({
        ...payload,
        leadSource: payload.leadSource
          ? CrmLeadSource[payload.leadSource]
          : CrmLeadSource.OTHER,
        status: payload.status
          ? CrmLeadStatus[payload.status]
          : CrmLeadStatus.NEW,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return result as unknown as Leads;
  },
  updateLead: async (_parent, args, ctx) => {
    const payload = CreateLeadInputSchema().parse(args.value);

    const trx = await ctx.db.startTransaction().execute();

    const result = await trx
      .updateTable("crm.leads")
      .set({
        ...payload,
        leadSource: payload.leadSource
          ? CrmLeadSource[payload.leadSource]
          : undefined,
        status: payload.status ? CrmLeadStatus[payload.status] : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return result as unknown as Leads;
  },
  removeLead: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.leads")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
