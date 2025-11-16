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

export const CreateSchema = z.object({
	invoiceNumber: InvoicesSchema.shape.invoiceNumber.register(fieldRegistry, {
		id: "customer-relations-invoices-invoiceNumber-create",
		type: "field",
		label: "InvoiceNumber",
		description: "Invoice number is required",
		inputType: "text",
	}),
	opportunity: InvoicesSchema.shape.opportunity.register(fieldRegistry, {
		id: "customer-relations-invoices-opportunity-create",
		type: "field",
		label: "Opportunity",
		description: "Enter an opportunity",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsOpportunities,
			displayField: "name",
			relationshipName: "opportunity",
		},
	}),
	status: InvoicesSchema.shape.status.register(fieldRegistry, {
		id: "customer-relations-invoices-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	total: InvoicesSchema.shape.total.register(fieldRegistry, {
		id: "customer-relations-invoices-total-create",
		type: "field",
		label: "Total",
		description: "Enter a total",
		inputType: "number",
	}),
	issueDate: InvoicesSchema.shape.issueDate.register(fieldRegistry, {
		id: "customer-relations-invoices-issueDate-create",
		type: "field",
		label: "IssueDate",
		description: "Enter an issuedate",
		inputType: "text",
	}),
	dueDate: InvoicesSchema.shape.dueDate.register(fieldRegistry, {
		id: "customer-relations-invoices-dueDate-create",
		type: "field",
		label: "DueDate",
		description: "Enter a duedate",
		inputType: "text",
	}),
	sentAt: InvoicesSchema.shape.sentAt.register(fieldRegistry, {
		id: "customer-relations-invoices-sentAt-create",
		type: "field",
		label: "SentAt",
		description: "Enter a sentat",
		inputType: "text",
	}),
	paymentMethod: InvoicesSchema.shape.paymentMethod.register(fieldRegistry, {
		id: "customer-relations-invoices-paymentMethod-create",
		type: "field",
		label: "PaymentMethod",
		description: "Enter a paymentmethod",
		inputType: "text",
	}),
	items: InvoicesSchema.shape.items.register(fieldRegistry, {
		id: "customer-relations-invoices-items-create",
		type: "field",
		label: "Items",
		description: "Enter an items",
		inputType: "text",
	}),
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
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Invoice</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateInvoiceForm;
