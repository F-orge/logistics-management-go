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
import { InventoryAdjustmentSchema } from "@/pocketbase/schemas/warehouse-management/inventory-adjustment";

export const CreateSchema = z.object({
	product: InventoryAdjustmentSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-inventory-adjustment-product-create",
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
	quantityChange: InventoryAdjustmentSchema.shape.quantityChange.register(
		fieldRegistry,
		{
			id: "warehouse-management-inventory-adjustment-quantityChange-create",
			type: "field",
			label: "QuantityChange",
			description: "Enter a quantitychange",
			inputType: "number",
		},
	),
	reason: InventoryAdjustmentSchema.shape.reason.register(fieldRegistry, {
		id: "warehouse-management-inventory-adjustment-reason-create",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "select",
	}),
	notes: InventoryAdjustmentSchema.shape.notes.register(fieldRegistry, {
		id: "warehouse-management-inventory-adjustment-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "textarea",
	}),
	warehouse: InventoryAdjustmentSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-inventory-adjustment-warehouse-create",
		type: "field",
		label: "Warehouse",
		description: "Enter a warehouse",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementWarehouses,
			displayField: "name",
			relationshipName: "warehouse",
		},
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
			await meta.pocketbase
				.collection(Collections.WarehouseManagementInventoryAdjustment)
				.create({
					...value,
					user: meta.pocketbase.authStore.record?.id,
				});
			toast.success("Inventory Adjustment created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create inventory-adjustment: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Inventory Adjustment</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
