import { CreateTaskEventInputSchema, TaskEvents } from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<DmsMutationResolvers, "createTaskEvent"> = {
  createTaskEvent: async (_parent, args, ctx) => {
    const payload = CreateTaskEventInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.taskEvents")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as TaskEvents;
  },
};
