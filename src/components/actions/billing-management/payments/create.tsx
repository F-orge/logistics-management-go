import { formOptions } from "@tanstack/react-form";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
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

export const CreateSchema = z.object({
	invoice: PaymentsSchema.shape.invoice.register(fieldRegistry, {
		id: "billing-management-payments-invoice-create",
		type: "field",
		label: "Invoice",
		description: "Enter an invoice",
		inputType: "text",
	}),
	amount: PaymentsSchema.shape.amount.register(fieldRegistry, {
		id: "billing-management-payments-amount-create",
		type: "field",
		label: "Amount",
		description: "Enter an amount",
		inputType: "text",
	}),
	paymentMethod: PaymentsSchema.shape.paymentMethod.register(fieldRegistry, {
		id: "billing-management-payments-paymentMethod-create",
		type: "field",
		label: "PaymentMethod",
		description: "Enter a paymentmethod",
		inputType: "text",
	}),
	status: PaymentsSchema.shape.status.register(fieldRegistry, {
		id: "billing-management-payments-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	paymentDate: PaymentsSchema.shape.paymentDate.register(fieldRegistry, {
		id: "billing-management-payments-paymentDate-create",
		type: "field",
		label: "PaymentDate",
		description: "Enter a paymentdate",
		inputType: "date",
	}),
	processedAt: PaymentsSchema.shape.processedAt.register(fieldRegistry, {
		id: "billing-management-payments-processedAt-create",
		type: "field",
		label: "ProcessedAt",
		description: "Enter a processedat",
		inputType: "date",
	}),
	currency: PaymentsSchema.shape.currency.register(fieldRegistry, {
		id: "billing-management-payments-currency-create",
		type: "field",
		label: "Currency",
		description: "Enter a currency",
		inputType: "text",
	}),
	fees: PaymentsSchema.shape.fees.register(fieldRegistry, {
		id: "billing-management-payments-fees-create",
		type: "field",
		label: "Fees",
		description: "Enter a fees",
		inputType: "number",
	}),
	netAmount: PaymentsSchema.shape.netAmount.register(fieldRegistry, {
		id: "billing-management-payments-netAmount-create",
		type: "field",
		label: "NetAmount",
		description: "Enter a netamount",
		inputType: "number",
	}),
	notes: PaymentsSchema.shape.notes.register(fieldRegistry, {
		id: "billing-management-payments-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	processedBy: PaymentsSchema.shape.processedBy.register(fieldRegistry, {
		id: "billing-management-payments-processedBy-create",
		type: "field",
		label: "ProcessedBy",
		description: "Enter a processedby",
		inputType: "text",
	}),
	attachments: PaymentsSchema.shape.attachments.register(fieldRegistry, {
		id: "billing-management-payments-attachments-create",
		type: "field",
		label: "Attachments",
		description: "Enter an attachments",
		inputType: "text",
	})
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta.pocketbase
				.collection(Collections.BillingManagementPayments)
				.create(value);
			toast.success("Payments created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create payments: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm(FormOption);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Payments</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
