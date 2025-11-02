import {
	type ClientAccounts,
	CreateClientAccountInputSchema,
	UpdateClientAccountInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
	BillingMutationResolvers,
	"createClientAccount" | "removeClientAccount" | "updateClientAccount"
> = {
	createClientAccount: async (_parent, args, ctx) => {
		const payload = CreateClientAccountInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("billing.clientAccounts")
			.values(payload)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as ClientAccounts;
	},
	updateClientAccount: async (_parent, args, ctx) => {
		const payload = UpdateClientAccountInputSchema().parse(args.value);

		const previous = await ctx.db
			.selectFrom("billing.clientAccounts")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const result = await ctx.db
			.updateTable("billing.clientAccounts")
			.set(payload)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish balance update event if available or wallet balance changed
		if (
			(payload.availableCredit &&
				payload.availableCredit !== previous.availableCredit) ||
			(payload.walletBalance &&
				payload.walletBalance !== previous.walletBalance)
		) {
			await ctx.pubsub.publish("billing.clientAccount.balanceUpdated", {
				clientId: result.clientId,
				newAvailableCredit: result.availableCredit?.toString() || "0",
				newWalletBalance: result.walletBalance?.toString() || "0",
			});
		}

		// Publish last payment date update event if changed
		if (payload.lastPaymentDate) {
			// Find the most recent payment for this client account
			const latestPayment = await ctx.db
				.selectFrom("billing.payments")
				.innerJoin(
					"billing.invoices",
					"billing.payments.invoiceId",
					"billing.invoices.id",
				)
				.select("billing.payments.id")
				.where("billing.invoices.clientId", "=", result.clientId)
				.orderBy("billing.payments.paymentDate", "desc")
				.executeTakeFirst();

			await ctx.pubsub.publish("billing.clientAccount.lastPaymentDateUpdated", {
				clientId: result.clientId,
				lastPaymentDate: new Date(payload.lastPaymentDate).toISOString(),
				paymentId: latestPayment?.id || "",
			});
		}

		return result as unknown as ClientAccounts;
	},
	removeClientAccount: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("billing.clientAccounts")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
