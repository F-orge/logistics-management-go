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
import { StockTransferSchema } from "@/pocketbase/schemas/warehouse-management/stock-transfer";

export const CreateSchema = z.object({
	product: StockTransferSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-stock-transfer-product-create",
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
	quantity: StockTransferSchema.shape.quantity.register(fieldRegistry, {
		id: "warehouse-management-stock-transfer-quantity-create",
		type: "field",
		label: "Quantity",
		description: "Enter a quantity",
		inputType: "number",
	}),
	status: StockTransferSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-stock-transfer-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	sourceWarehouse: StockTransferSchema.shape.sourceWarehouse.register(
		fieldRegistry,
		{
			id: "warehouse-management-stock-transfer-sourceWarehouse-create",
			type: "field",
			label: "SourceWarehouse",
			description: "Enter a sourcewarehouse",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementWarehouses,
				displayField: "name",
				relationshipName: "sourceWarehouse",
			},
		},
	),
	destinationWarehouse: StockTransferSchema.shape.destinationWarehouse.register(
		fieldRegistry,
		{
			id: "warehouse-management-stock-transfer-destinationWarehouse-create",
			type: "field",
			label: "DestinationWarehouse",
			description: "Enter a destinationwarehouse",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementWarehouses,
				displayField: "name",
				relationshipName: "destinationWarehouse",
			},
		},
	),
});

const FormOption = formOptions({
	defaultValues: {
		status: "pending",
	} as z.infer<typeof CreateSchema>,
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
				.collection(Collections.WarehouseManagementStockTransfer)
				.create(value);
			toast.success("Stock Transfer created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create stock-transfer: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Stock Transfer</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
