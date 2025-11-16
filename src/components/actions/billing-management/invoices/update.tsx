import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
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
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	quote: InvoicesSchema.shape.quote.optional().register(fieldRegistry, {
		id: "billing-management-invoices-quote-update",
		type: "field",
		label: "Quote",
		description: "Enter a quote",
		inputType: "text",
	}),
	invoiceNumber: InvoicesSchema.shape.invoiceNumber.optional().register(fieldRegistry, {
		id: "billing-management-invoices-invoiceNumber-update",
		type: "field",
		label: "InvoiceNumber",
		description: "Enter an invoicenumber",
		inputType: "text",
	}),
	status: InvoicesSchema.shape.status.optional().register(fieldRegistry, {
		id: "billing-management-invoices-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	issueDate: InvoicesSchema.shape.issueDate.optional().register(fieldRegistry, {
		id: "billing-management-invoices-issueDate-update",
		type: "field",
		label: "IssueDate",
		description: "Enter an issuedate",
		inputType: "date",
	}),
	dueDate: InvoicesSchema.shape.dueDate.optional().register(fieldRegistry, {
		id: "billing-management-invoices-dueDate-update",
		type: "field",
		label: "DueDate",
		description: "Enter a duedate",
		inputType: "date",
	}),
	totalAmount: InvoicesSchema.shape.totalAmount.optional().register(fieldRegistry, {
		id: "billing-management-invoices-totalAmount-update",
		type: "field",
		label: "TotalAmount",
		description: "Enter a totalamount",
		inputType: "text",
	}),
	amountPaid: InvoicesSchema.shape.amountPaid.optional().register(fieldRegistry, {
		id: "billing-management-invoices-amountPaid-update",
		type: "field",
		label: "AmountPaid",
		description: "Enter an amountpaid",
		inputType: "number",
	}),
	currency: InvoicesSchema.shape.currency.optional().register(fieldRegistry, {
		id: "billing-management-invoices-currency-update",
		type: "field",
		label: "Currency",
		description: "Enter a currency",
		inputType: "text",
	}),
	discountAmount: InvoicesSchema.shape.discountAmount.optional().register(fieldRegistry, {
		id: "billing-management-invoices-discountAmount-update",
		type: "field",
		label: "DiscountAmount",
		description: "Enter a discountamount",
		inputType: "number",
	}),
	subtotal: InvoicesSchema.shape.subtotal.optional().register(fieldRegistry, {
		id: "billing-management-invoices-subtotal-update",
		type: "field",
		label: "Subtotal",
		description: "Enter a subtotal",
		inputType: "number",
	}),
	paymentTerms: InvoicesSchema.shape.paymentTerms.optional().register(fieldRegistry, {
		id: "billing-management-invoices-paymentTerms-update",
		type: "field",
		label: "PaymentTerms",
		description: "Enter a paymentterms",
		inputType: "text",
	}),
	notes: InvoicesSchema.shape.notes.optional().register(fieldRegistry, {
		id: "billing-management-invoices-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	sentAt: InvoicesSchema.shape.sentAt.optional().register(fieldRegistry, {
		id: "billing-management-invoices-sentAt-update",
		type: "field",
		label: "SentAt",
		description: "Enter a sentat",
		inputType: "date",
	}),
	paidAt: InvoicesSchema.shape.paidAt.optional().register(fieldRegistry, {
		id: "billing-management-invoices-paidAt-update",
		type: "field",
		label: "PaidAt",
		description: "Enter a paidat",
		inputType: "date",
	}),
	createdBy: InvoicesSchema.shape.createdBy.optional().register(fieldRegistry, {
		id: "billing-management-invoices-createdBy-update",
		type: "field",
		label: "CreatedBy",
		description: "Enter a createdby",
		inputType: "text",
	}),
	attachments: InvoicesSchema.shape.attachments.optional().register(fieldRegistry, {
		id: "billing-management-invoices-attachments-update",
		type: "field",
		label: "Attachments",
		description: "Enter an attachments",
		inputType: "text",
	})
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
				.pocketbase!.collection(Collections.BillingManagementInvoices)
				.update(meta.id!, value);

			toast.success("Invoices updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update invoices: ${error.message} (${error.status})`,
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

	const { data } = useQuery({
		queryKey: ["invoices", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.BillingManagementInvoices)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data || {},
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
					<form.SubmitButton>Update Invoices</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
