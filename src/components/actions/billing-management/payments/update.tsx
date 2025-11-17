import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
	fieldRegistry,
	toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { PaymentsSchema } from "@/pocketbase/schemas/billing-management/payments";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	invoice: PaymentsSchema.shape.invoice.optional().register(fieldRegistry, {
		id: "billing-management-payments-invoice-update",
		type: "field",
		label: "Invoice",
		description: "Enter an invoice",
		inputType: "text",
	}),
	amount: PaymentsSchema.shape.amount.optional().register(fieldRegistry, {
		id: "billing-management-payments-amount-update",
		type: "field",
		label: "Amount",
		description: "Enter an amount",
		inputType: "text",
	}),
	paymentMethod: PaymentsSchema.shape.paymentMethod
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-payments-paymentMethod-update",
			type: "field",
			label: "PaymentMethod",
			description: "Enter a paymentmethod",
			inputType: "text",
		}),
	status: PaymentsSchema.shape.status.optional().register(fieldRegistry, {
		id: "billing-management-payments-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	paymentDate: PaymentsSchema.shape.paymentDate
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-payments-paymentDate-update",
			type: "field",
			label: "PaymentDate",
			description: "Enter a paymentdate",
			inputType: "date",
		}),
	processedAt: PaymentsSchema.shape.processedAt
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-payments-processedAt-update",
			type: "field",
			label: "ProcessedAt",
			description: "Enter a processedat",
			inputType: "date",
		}),
	currency: PaymentsSchema.shape.currency.optional().register(fieldRegistry, {
		id: "billing-management-payments-currency-update",
		type: "field",
		label: "Currency",
		description: "Enter a currency",
		inputType: "text",
	}),
	fees: PaymentsSchema.shape.fees.optional().register(fieldRegistry, {
		id: "billing-management-payments-fees-update",
		type: "field",
		label: "Fees",
		description: "Enter a fees",
		inputType: "number",
	}),
	netAmount: PaymentsSchema.shape.netAmount.optional().register(fieldRegistry, {
		id: "billing-management-payments-netAmount-update",
		type: "field",
		label: "NetAmount",
		description: "Enter a netamount",
		inputType: "number",
	}),
	notes: PaymentsSchema.shape.notes.optional().register(fieldRegistry, {
		id: "billing-management-payments-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	processedBy: PaymentsSchema.shape.processedBy
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-payments-processedBy-update",
			type: "field",
			label: "ProcessedBy",
			description: "Enter a processedby",
			inputType: "text",
		}),
	attachments: PaymentsSchema.shape.attachments
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-payments-attachments-update",
			type: "field",
			label: "Attachments",
			description: "Enter an attachments",
			inputType: "text",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateSchema>,
	validators: {
		onSubmit: UpdateSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.BillingManagementPayments)
				.update(meta.id!, value);

			toast.success("Payments updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update payments: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["payments", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.BillingManagementPayments)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data as z.infer<typeof UpdateSchema>,
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase, id: searchQuery.id! });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Payments</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
