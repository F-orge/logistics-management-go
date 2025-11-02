import type { User } from "../../../../zod.schema";
import type { DocumentsResolvers } from "./../../../types.generated";
export const Documents: DocumentsResolvers = {
	uploadedByUser: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("user")
			.selectAll("user")
			.innerJoin(
				"billing.documents",
				"billing.documents.uploadedByUserId",
				"user.id",
			)
			.where("billing.documents.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as User;
	},
};
