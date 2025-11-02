import { TmsProofTypeEnum } from "../../../../db.types";
import {
	CreateProofOfDeliveryInputSchema,
	type ProofOfDeliveries,
	UpdateProofOfDeliveryInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
	TmsMutationResolvers,
	"createProofOfDelivery" | "updateProofOfDelivery"
> = {
	createProofOfDelivery: async (_parent, args, ctx) => {
		const { files, ...payload } = CreateProofOfDeliveryInputSchema().parse(
			args.value,
		);

		const trx = await ctx.db.startTransaction().execute();

		const result = await trx
			.insertInto("tms.proofOfDeliveries")
			.values({
				...payload,
				type: payload.type ? TmsProofTypeEnum[payload.type] : undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		if (files && files.length > 0) {
			// todo: handle file uploads properly
		}

		await trx.commit().execute();

		return result as unknown as ProofOfDeliveries;
	},
	updateProofOfDelivery: async (_parent, args, ctx) => {
		const payload = UpdateProofOfDeliveryInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("tms.proofOfDeliveries")
			.set({
				type: payload.type ? TmsProofTypeEnum[payload.type] : undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as ProofOfDeliveries;
	},
};
