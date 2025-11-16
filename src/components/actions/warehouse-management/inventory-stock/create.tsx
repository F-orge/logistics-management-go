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
import { InventoryStockSchema } from "@/pocketbase/schemas/warehouse-management/inventory-stock";

export const CreateSchema = z.object({
	location: InventoryStockSchema.shape.location.register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-location-create",
		type: "field",
		label: "Location",
		description: "Enter a location",
		inputType: "text",
	}),
	batch: InventoryStockSchema.shape.batch.register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-batch-create",
		type: "field",
		label: "Batch",
		description: "Enter a batch",
		inputType: "text",
	}),
	quantity: InventoryStockSchema.shape.quantity.register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-quantity-create",
		type: "field",
		label: "Quantity",
		description: "Enter a quantity",
		inputType: "number",
	}),
	reservedQuantity: InventoryStockSchema.shape.reservedQuantity.register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-reservedQuantity-create",
		type: "field",
		label: "ReservedQuantity",
		description: "Enter a reservedquantity",
		inputType: "text",
	}),
	status: InventoryStockSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	lastCountedAt: InventoryStockSchema.shape.lastCountedAt.register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-lastCountedAt-create",
		type: "field",
		label: "LastCountedAt",
		description: "Enter a lastcountedat",
		inputType: "date",
	}),
	lastMovementAt: InventoryStockSchema.shape.lastMovementAt.register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-lastMovementAt-create",
		type: "field",
		label: "LastMovementAt",
		description: "Enter a lastmovementat",
		inputType: "date",
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
				.collection(Collections.WarehouseManagementInventoryStock)
				.create(value);
			toast.success("Inventory Stock created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create inventory-stock: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Inventory Stock</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
