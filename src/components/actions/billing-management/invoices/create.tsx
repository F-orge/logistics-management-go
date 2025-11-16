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
import { InvoicesSchema } from "@/pocketbase/schemas/billing-management/invoices";

export const CreateSchema = z.object({
	quote: InvoicesSchema.shape.quote.register(fieldRegistry, {
		id: "billing-management-invoices-quote-create",
		type: "field",
		label: "Quote",
		description: "Enter a quote",
		inputType: "text",
	}),
	invoiceNumber: InvoicesSchema.shape.invoiceNumber.register(fieldRegistry, {
		id: "billing-management-invoices-invoiceNumber-create",
		type: "field",
		label: "InvoiceNumber",
		description: "Enter an invoicenumber",
		inputType: "text",
	}),
	status: InvoicesSchema.shape.status.register(fieldRegistry, {
		id: "billing-management-invoices-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	issueDate: InvoicesSchema.shape.issueDate.register(fieldRegistry, {
		id: "billing-management-invoices-issueDate-create",
		type: "field",
		label: "IssueDate",
		description: "Enter an issuedate",
		inputType: "date",
	}),
	dueDate: InvoicesSchema.shape.dueDate.register(fieldRegistry, {
		id: "billing-management-invoices-dueDate-create",
		type: "field",
		label: "DueDate",
		description: "Enter a duedate",
		inputType: "date",
	}),
	totalAmount: InvoicesSchema.shape.totalAmount.register(fieldRegistry, {
		id: "billing-management-invoices-totalAmount-create",
		type: "field",
		label: "TotalAmount",
		description: "Enter a totalamount",
		inputType: "text",
	}),
	amountPaid: InvoicesSchema.shape.amountPaid.register(fieldRegistry, {
		id: "billing-management-invoices-amountPaid-create",
		type: "field",
		label: "AmountPaid",
		description: "Enter an amountpaid",
		inputType: "number",
	}),
	currency: InvoicesSchema.shape.currency.register(fieldRegistry, {
		id: "billing-management-invoices-currency-create",
		type: "field",
		label: "Currency",
		description: "Enter a currency",
		inputType: "text",
	}),
	discountAmount: InvoicesSchema.shape.discountAmount.register(fieldRegistry, {
		id: "billing-management-invoices-discountAmount-create",
		type: "field",
		label: "DiscountAmount",
		description: "Enter a discountamount",
		inputType: "number",
	}),
	subtotal: InvoicesSchema.shape.subtotal.register(fieldRegistry, {
		id: "billing-management-invoices-subtotal-create",
		type: "field",
		label: "Subtotal",
		description: "Enter a subtotal",
		inputType: "number",
	}),
	paymentTerms: InvoicesSchema.shape.paymentTerms.register(fieldRegistry, {
		id: "billing-management-invoices-paymentTerms-create",
		type: "field",
		label: "PaymentTerms",
		description: "Enter a paymentterms",
		inputType: "text",
	}),
	notes: InvoicesSchema.shape.notes.register(fieldRegistry, {
		id: "billing-management-invoices-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	sentAt: InvoicesSchema.shape.sentAt.register(fieldRegistry, {
		id: "billing-management-invoices-sentAt-create",
		type: "field",
		label: "SentAt",
		description: "Enter a sentat",
		inputType: "date",
	}),
	paidAt: InvoicesSchema.shape.paidAt.register(fieldRegistry, {
		id: "billing-management-invoices-paidAt-create",
		type: "field",
		label: "PaidAt",
		description: "Enter a paidat",
		inputType: "date",
	}),
	createdBy: InvoicesSchema.shape.createdBy.register(fieldRegistry, {
		id: "billing-management-invoices-createdBy-create",
		type: "field",
		label: "CreatedBy",
		description: "Enter a createdby",
		inputType: "text",
	}),
	attachments: InvoicesSchema.shape.attachments.register(fieldRegistry, {
		id: "billing-management-invoices-attachments-create",
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
				.collection(Collections.BillingManagementInvoices)
				.create(value);
			toast.success("Invoices created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create invoices: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Invoices</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
