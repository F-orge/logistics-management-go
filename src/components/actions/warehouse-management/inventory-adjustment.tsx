import { useQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AutoForm from "@/components/ui/autoform-tanstack/auto-form";
import { Collections } from "@/lib/pb.types";
import { InventoryAdjustmentSchema } from "@/pocketbase/schemas/warehouse-management/inventory-adjustment";

const InventoryAdjustmentFormSchema = InventoryAdjustmentSchema.omit({
	id: true,
	created: true,
	updated: true,
});

export const InventoryAdjustmentActions = () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["inventory-adjustments", searchQuery.id],
		enabled:
			!!searchQuery.id &&
			(searchQuery.action === "update" || searchQuery.action === "delete"),
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementInventoryAdjustment)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	if (searchQuery.action === "create") {
		return (
			<AutoForm<typeof InventoryAdjustmentFormSchema>
				title="Create InventoryAdjustment"
				description="Fill in the details to create a new inventory-adjustment."
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.WarehouseManagementInventoryAdjustment)
							.create(data);
						toast.success("InventoryAdjustment created successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to create inventory-adjustment: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={InventoryAdjustmentFormSchema}
			/>
		);
	}

	if (searchQuery.action === "update" && data) {
		return (
			<AutoForm<typeof InventoryAdjustmentFormSchema>
				title="Update InventoryAdjustment"
				description="Update the inventory-adjustment details."
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.WarehouseManagementInventoryAdjustment)
							.update(searchQuery.id!, data);
						toast.success("InventoryAdjustment updated successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to update inventory-adjustment: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={InventoryAdjustmentFormSchema}
				defaultValues={data as any}
			/>
		);
	}

	if (searchQuery.action === "delete" && data) {
		return (
			<AlertDialog
				open={searchQuery.action === "delete"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete InventoryAdjustment</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this inventory-adjustment? This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								try {
									await pocketbase
										.collection(
											Collections.WarehouseManagementInventoryAdjustment,
										)
										.delete(searchQuery.id!);
									toast.success("InventoryAdjustment deleted successfully!");
								} catch (error) {
									if (error instanceof ClientResponseError) {
										toast.error(
											`Failed to delete inventory-adjustment: ${error.message} (${error.status})`,
										);
									}
								} finally {
									navigate({
										search: (prev) => ({
											...prev,
											action: undefined,
											id: undefined,
										}),
									});
								}
							}}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}
};

export default InventoryAdjustmentActions;
