import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
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
import { InventoryAdjustmentSchema } from "@/pocketbase/schemas/warehouse-management/inventory-adjustment";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	product: InventoryAdjustmentSchema.shape.product
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inventory-adjustment-product-update",
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
	user: InventoryAdjustmentSchema.shape.user
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inventory-adjustment-user-update",
			type: "field",
			label: "User",
			description: "Enter an user",
			inputType: "text",
		}),
	quantityChange: InventoryAdjustmentSchema.shape.quantityChange
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inventory-adjustment-quantityChange-update",
			type: "field",
			label: "QuantityChange",
			description: "Enter a quantitychange",
			inputType: "text",
		}),
	reason: InventoryAdjustmentSchema.shape.reason
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inventory-adjustment-reason-update",
			type: "field",
			label: "Reason",
			description: "Enter a reason",
			inputType: "select",
		}),
	notes: InventoryAdjustmentSchema.shape.notes
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inventory-adjustment-notes-update",
			type: "field",
			label: "Notes",
			description: "Enter a notes",
			inputType: "text",
		}),
	warehouse: InventoryAdjustmentSchema.shape.warehouse
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inventory-adjustment-warehouse-update",
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
				.pocketbase!.collection(
					Collections.WarehouseManagementInventoryAdjustment,
				)
				.update(meta.id!, value);

			toast.success("Inventory Adjustment updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update inventory-adjustment: ${error.message} (${error.status})`,
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

	const { data } = useSuspenseQuery({
		queryKey: ["inventoryAdjustment", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementInventoryAdjustment)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data as z.infer<typeof UpdateSchema>,
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
					<form.SubmitButton>Update Inventory Adjustment</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
