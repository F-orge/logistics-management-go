import { oc } from "@orpc/contract";
import { PaymentRepository } from "@packages/db/repositories/billing";
import { PaymentSchema } from "@packages/db/schemas/billing/payment";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginatePaymentContract = oc.input(PaymentRepository.schemas.paginateOptionSchema).output(PaymentSchema.array());

export const RangePaymentContract = oc.input(PaymentRepository.schemas.rangeOptionSchema).output(PaymentSchema.array());

export const AnyPaymentContract = oc.input(z.uuid().array()).output(PaymentSchema.array());

export const InsertPaymentContract = oc.input(PaymentRepository.schemas.InsertSchema).output(PaymentSchema);

export const InsertManyPaymentContract = oc.input(PaymentRepository.schemas.InsertSchema.array()).output(PaymentSchema.array());

export const UpdatePaymentContract = oc.input(z.object({id: z.uuid(), value: PaymentRepository.schemas.UpdateSchema})).output(PaymentSchema);

export const RemovePaymentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
