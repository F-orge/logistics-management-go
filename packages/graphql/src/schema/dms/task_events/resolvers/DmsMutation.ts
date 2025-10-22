import {
  CreateTaskEventInputSchema,
  TaskEvents,
  UpdateTaskEventInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
export const DmsMutation: Pick<
  DmsMutationResolvers,
  "createTaskEvent" | "removeTaskEvent" | "updateTaskEvent"
> = {
  createTaskEvent: async (_parent, args, ctx) => {
    const payload = CreateTaskEventInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.taskEvents")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as TaskEvents;
  },
  updateTaskEvent: async (_parent, args, ctx) => {
    const payload = UpdateTaskEventInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("dms.taskEvents")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as TaskEvents;
  },
  removeTaskEvent: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("dms.taskEvents")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
