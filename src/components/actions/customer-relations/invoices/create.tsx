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
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
	Collections,
	CustomerRelationsOpportunitiesRecord,
	TypedPocketBase,
} from "@/lib/pb.types";
import { InvoicesSchema } from "@/pocketbase/schemas/customer-relations";

export const CreateInvoiceSchema = z.object({
	invoiceNumber: InvoicesSchema.shape.invoiceNumber.register(fieldRegistry, {
		id: "crm-invoices-invoiceNumber-create",
		type: "field",
		label: "Invoice Number",
		description: "Enter the invoice number",
		inputType: "text",
	}),
	opportunity: InvoicesSchema.shape.opportunity.register(fieldRegistry, {
		id: "crm-invoices-opportunity-create",
		type: "field",
		label: "Opportunity",
		description: "Select the opportunity (optional)",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsOpportunities,
			relationshipName: "opportunity",
			placeholder: "Select an opportunity",
			displayField: "name",
			renderOption: (item) => item.name,
		} as RelationFieldProps<CustomerRelationsOpportunitiesRecord>,
	}),
	status: InvoicesSchema.shape.status.register(fieldRegistry, {
		id: "crm-invoices-status-create",
		type: "field",
		label: "Status",
		description: "Select the status (optional)",
		inputType: "select",
	}),
	issueDate: InvoicesSchema.shape.issueDate.register(fieldRegistry, {
		id: "crm-invoices-issueDate-create",
		type: "field",
		label: "Issue Date",
		description: "Select the issue date (optional)",
		inputType: "date",
	}),
	dueDate: InvoicesSchema.shape.dueDate.register(fieldRegistry, {
		id: "crm-invoices-dueDate-create",
		type: "field",
		label: "Due Date",
		description: "Select the due date (optional)",
		inputType: "date",
	}),
	sentAt: InvoicesSchema.shape.sentAt.register(fieldRegistry, {
		id: "crm-invoices-sentAt-create",
		type: "field",
		label: "Sent At",
		description: "Select when it was sent (optional)",
		inputType: "date",
	}),
	paidAt: InvoicesSchema.shape.paidAt.register(fieldRegistry, {
		id: "crm-invoices-paidAt-create",
		type: "field",
		label: "Paid At",
		description: "Select when it was paid (optional)",
		inputType: "date",
	}),
	paymentMethod: InvoicesSchema.shape.paymentMethod.register(fieldRegistry, {
		id: "crm-invoices-paymentMethod-create",
		type: "field",
		label: "Payment Method",
		description: "Select the payment method (optional)",
		inputType: "select",
	}),
	attachments: InvoicesSchema.shape.attachments.register(fieldRegistry, {
		id: "crm-invoices-attachments-create",
		type: "field",
		inputType: "file",
		label: "Attachments",
		description: "Upload attachments (optional)",
		isArray: true,
	}),
	total: InvoicesSchema.shape.total.register(fieldRegistry, {
		id: "crm-invoices-total-create",
		type: "field",
		label: "Total",
		description: "Enter the total",
		inputType: "number",
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateInvoiceSchema>,
	validators: {
		onSubmit: CreateInvoiceSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			// send invoice first
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsInvoices)
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

const CreateInvoiceForm = () => {
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
					{...toAutoFormFieldSet(CreateInvoiceSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Invoice</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateInvoiceForm;
