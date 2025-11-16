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
import { InvoiceItemsSchema } from "@/pocketbase/schemas/customer-relations/invoice-items";

export const CreateInvoiceItemsSchema = z.object({
	invoice: InvoiceItemsSchema.shape.invoice.register(fieldRegistry, {
		id: "crm-invoice-items-invoice-create",
		type: "field",
		label: "Invoice",
		description: "Select the invoice",
		inputType: "text",
	}),
	product: InvoiceItemsSchema.shape.product.register(fieldRegistry, {
		id: "crm-invoice-items-product-create",
		type: "field",
		label: "Product",
		description: "Select the product",
		inputType: "text",
	}),
	quantity: InvoiceItemsSchema.shape.quantity.register(fieldRegistry, {
		id: "crm-invoice-items-quantity-create",
		type: "field",
		label: "Quantity",
		description: "Enter the quantity",
		inputType: "number",
	}),
	price: InvoiceItemsSchema.shape.price.register(fieldRegistry, {
		id: "crm-invoice-items-price-create",
		type: "field",
		label: "Price",
		description: "Enter the price",
		inputType: "number",
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateInvoiceItemsSchema>,
	validators: {
		onSubmit: CreateInvoiceItemsSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsInvoiceItems)
				.create(value);

			toast.success("Invoice item created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create invoice item: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateInvoiceItemsForm = () => {
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
					{...toAutoFormFieldSet(CreateInvoiceItemsSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Invoice Item</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateInvoiceItemsForm;
