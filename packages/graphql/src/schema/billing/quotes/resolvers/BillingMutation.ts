import { BillingQuoteStatusEnum } from "../../../../db.types";
import {
  CreateQuoteInputSchema,
  Quotes,
  UpdateQuoteInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createQuote" | "removeQuote" | "updateQuote"
> = {
  createQuote: async (_parent, args, ctx) => {
    const payload = CreateQuoteInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.quotes")
      .values({
        ...payload,
        status: payload.status
          ? BillingQuoteStatusEnum[payload.status]
          : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish created event
    await ctx.pubsub.publish("billing.quote.created", result);

    return result as unknown as Quotes;
  },
  updateQuote: async (_parent, args, ctx) => {
    const payload = UpdateQuoteInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousQuote = await ctx.db
      .selectFrom("billing.quotes")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("billing.quotes")
      .set({
        ...payload,
        status: payload.status
          ? BillingQuoteStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousQuote.status) {
      const status = payload.status as BillingQuoteStatusEnum;

      await ctx.pubsub.publish("billing.quote.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousQuote.status as BillingQuoteStatusEnum,
        clientId: result.clientId,
      });

      // Publish specific status events
      if (status === "PENDING") {
        await ctx.pubsub.publish("billing.quote.sent", result);
      } else if (status === "ACCEPTED") {
        await ctx.pubsub.publish("billing.quote.accepted", result);
      } else if (status === "EXPIRED") {
        await ctx.pubsub.publish("billing.quote.expired", {
          id: result.id,
          quoteNumber: result.quoteNumber,
          clientId: result.clientId,
        });
      } else if (status === "CONVERTED") {
        // Find the invoice created from this quote
        const invoice = await ctx.db
          .selectFrom("billing.invoices")
          .select("id")
          .where("billing.invoices.quoteId", "=", result.id)
          .orderBy("billing.invoices.createdAt", "desc")
          .executeTakeFirst();

        await ctx.pubsub.publish("billing.quote.converted", {
          ...result,
          invoiceId: invoice?.id || "",
        });
      }
    }

    return result as unknown as Quotes;
  },
  removeQuote: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.quotes")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
