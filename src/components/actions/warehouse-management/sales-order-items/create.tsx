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
import { SalesOrderItemsSchema } from "@/pocketbase/schemas/warehouse-management/sales-order-items";

export const CreateSchema = z.object({
	salesOrder: SalesOrderItemsSchema.shape.salesOrder.register(fieldRegistry, {
		id: "warehouse-management-sales-order-items-salesOrder-create",
		type: "field",
		label: "SalesOrder",
		description: "Enter a salesorder",
		inputType: "text",
	}),
	product: SalesOrderItemsSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-sales-order-items-product-create",
		type: "field",
		label: "Product",
		description: "Enter a product",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementProducts,
			displayField: "name",
			relationshipName: "product",
		},
	}),
	quantityOrdered: SalesOrderItemsSchema.shape.quantityOrdered.register(
		fieldRegistry,
		{
			id: "warehouse-management-sales-order-items-quantityOrdered-create",
			type: "field",
			label: "QuantityOrdered",
			description: "Enter a quantityordered",
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
				.collection(Collections.WarehouseManagementSalesOrderItems)
				.create(value);
			toast.success("Sales Order Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create sales-order-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Sales Order Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
