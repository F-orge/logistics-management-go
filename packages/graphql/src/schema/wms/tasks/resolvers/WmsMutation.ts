import {
  CreateTaskInputSchema,
  Tasks,
  UpdateTaskInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createTask'|'removeTask'|'updateTask'> = {
  createTask: async (_parent, args, ctx) => {
    const payload = CreateTaskInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.tasks")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Tasks;
  },
  updateTask: async (_parent, args, ctx) => {
    const payload = UpdateTaskInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.tasks")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Tasks;
  },
  removeTask: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.tasks")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
