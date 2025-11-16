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
import { InvoiceLineItemsSchema } from "@/pocketbase/schemas/billing-management/invoice-line-items";

export const CreateSchema = z.object({
	invoice: InvoiceLineItemsSchema.shape.invoice.register(fieldRegistry, {
		id: "billing-management-invoice-line-items-invoice-create",
		type: "field",
		label: "Invoice",
		description: "Enter an invoice",
		inputType: "text",
	}),
	description: InvoiceLineItemsSchema.shape.description.register(
		fieldRegistry,
		{
			id: "billing-management-invoice-line-items-description-create",
			type: "field",
			label: "Description",
			description: "Enter a description",
			inputType: "textarea",
		},
	),
	quantity: InvoiceLineItemsSchema.shape.quantity.register(fieldRegistry, {
		id: "billing-management-invoice-line-items-quantity-create",
		type: "field",
		label: "Quantity",
		description: "Enter a quantity",
		inputType: "number",
	}),
	unitPrice: InvoiceLineItemsSchema.shape.unitPrice.register(fieldRegistry, {
		id: "billing-management-invoice-line-items-unitPrice-create",
		type: "field",
		label: "UnitPrice",
		description: "Enter an unitprice",
		inputType: "number",
	}),
	taxRate: InvoiceLineItemsSchema.shape.taxRate.register(fieldRegistry, {
		id: "billing-management-invoice-line-items-taxRate-create",
		type: "field",
		label: "TaxRate",
		description: "Enter a taxrate",
		inputType: "text",
	}),
	discountRate: InvoiceLineItemsSchema.shape.discountRate.register(
		fieldRegistry,
		{
			id: "billing-management-invoice-line-items-discountRate-create",
			type: "field",
			label: "DiscountRate",
			description: "Enter a discountrate",
			inputType: "text",
		},
	),
	discountRate: InvoiceLineItemsSchema.shape.discountRate.register(
		fieldRegistry,
		{
			id: "billing-management-invoice-line-items-discountRate-create",
			type: "field",
			label: "DiscountRate",
			description: "Enter a discountrate",
			inputType: "number",
		},
	),
	discountAmount: InvoiceLineItemsSchema.shape.discountAmount.register(
		fieldRegistry,
		{
			id: "billing-management-invoice-line-items-discountAmount-create",
			type: "field",
			label: "DiscountAmount",
			description: "Enter a discountamount",
			inputType: "number",
		},
	),
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
				.collection(Collections.BillingManagementInvoiceLineItems)
				.create(value);
			toast.success("Invoice Line Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create invoice-line-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Invoice Line Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
