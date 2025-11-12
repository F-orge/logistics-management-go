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
import { StockTransferSchema } from "@/pocketbase/schemas/warehouse-management/stock-transfer";

const StockTransferFormSchema = StockTransferSchema.omit({
	id: true,
	created: true,
	updated: true,
});

export const StockTransferActions = () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["stock-transfers", searchQuery.id],
		enabled:
			!!searchQuery.id &&
			(searchQuery.action === "update" || searchQuery.action === "delete"),
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementStockTransfer)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	if (searchQuery.action === "create") {
		return (
			<AutoForm<typeof StockTransferFormSchema>
				title="Create StockTransfer"
				description="Fill in the details to create a new stock-transfer."
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.WarehouseManagementStockTransfer)
							.create(data);
						toast.success("StockTransfer created successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to create stock-transfer: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={StockTransferFormSchema}
			/>
		);
	}

	if (searchQuery.action === "update" && data) {
		return (
			<AutoForm<typeof StockTransferFormSchema>
				title="Update StockTransfer"
				description="Update the stock-transfer details."
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.WarehouseManagementStockTransfer)
							.update(searchQuery.id!, data);
						toast.success("StockTransfer updated successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to update stock-transfer: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={StockTransferFormSchema}
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
						<AlertDialogTitle>Delete StockTransfer</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this stock-transfer? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								try {
									await pocketbase
										.collection(Collections.WarehouseManagementStockTransfer)
										.delete(searchQuery.id!);
									toast.success("StockTransfer deleted successfully!");
								} catch (error) {
									if (error instanceof ClientResponseError) {
										toast.error(
											`Failed to delete stock-transfer: ${error.message} (${error.status})`,
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

export default StockTransferActions;
