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
	location: InventoryStockSchema.shape.location.optional().register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-location-update",
		type: "field",
		label: "Location",
		description: "Enter a location",
		inputType: "text",
	}),
	batch: InventoryStockSchema.shape.batch.optional().register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-batch-update",
		type: "field",
		label: "Batch",
		description: "Enter a batch",
		inputType: "text",
	}),
	quantity: InventoryStockSchema.shape.quantity.optional().register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-quantity-update",
		type: "field",
		label: "Quantity",
		description: "Enter a quantity",
		inputType: "number",
	}),
	reservedQuantity: InventoryStockSchema.shape.reservedQuantity.optional().register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-reservedQuantity-update",
		type: "field",
		label: "ReservedQuantity",
		description: "Enter a reservedquantity",
		inputType: "text",
	}),
	status: InventoryStockSchema.shape.status.optional().register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	lastCountedAt: InventoryStockSchema.shape.lastCountedAt.optional().register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-lastCountedAt-update",
		type: "field",
		label: "LastCountedAt",
		description: "Enter a lastcountedat",
		inputType: "date",
	}),
	lastMovementAt: InventoryStockSchema.shape.lastMovementAt.optional().register(fieldRegistry, {
		id: "warehouse-management-inventory-stock-lastMovementAt-update",
		type: "field",
		label: "LastMovementAt",
		description: "Enter a lastmovementat",
		inputType: "date",
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
				.pocketbase!.collection(Collections.WarehouseManagementInventoryStock)
				.update(meta.id!, value);

			toast.success("Inventory Stock updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update inventory-stock: ${error.message} (${error.status})`,
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
		queryKey: ["inventoryStock", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementInventoryStock)
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
					<form.SubmitButton>Update Inventory Stock</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
