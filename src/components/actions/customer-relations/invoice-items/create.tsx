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

export const CreateSchema = z.object({
	invoice: InvoiceItemsSchema.shape.invoice.register(fieldRegistry, {
		id: "customer-relations-invoice-items-invoice-create",
		type: "field",
		label: "Invoice",
		description: "Enter an invoice",
		inputType: "text",
	}),
	product: InvoiceItemsSchema.shape.product.register(fieldRegistry, {
		id: "customer-relations-invoice-items-product-create",
		type: "field",
		label: "Product",
		description: "Enter a product",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsProducts,
			displayField: "name",
			relationshipName: "product",
		},
	}),
	quantity: InvoiceItemsSchema.shape.quantity.register(fieldRegistry, {
		id: "customer-relations-invoice-items-quantity-create",
		type: "field",
		label: "Quantity",
		description: "Enter a quantity",
		inputType: "text",
	}),
	price: InvoiceItemsSchema.shape.price.register(fieldRegistry, {
		id: "customer-relations-invoice-items-price-create",
		type: "field",
		label: "Price",
		description: "Enter a price",
		inputType: "number",
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
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Invoice Item</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateInvoiceItemsForm;
