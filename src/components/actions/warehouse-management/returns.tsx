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
import { ReturnsSchema } from "@/pocketbase/schemas/warehouse-management/returns";

const ReturnsFormSchema = ReturnsSchema.omit({
	id: true,
	created: true,
	updated: true,
});

export const ReturnsActions = () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["returnss", searchQuery.id],
		enabled:
			!!searchQuery.id &&
			(searchQuery.action === "update" || searchQuery.action === "delete"),
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	if (searchQuery.action === "create") {
		return (
			<AutoForm<typeof ReturnsFormSchema>
				title="Create Returns"
				description="Fill in the details to create a new returns."
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.WarehouseManagementReturns)
							.create(data);
						toast.success("Returns created successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to create returns: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={ReturnsFormSchema}
			/>
		);
	}

	if (searchQuery.action === "update" && data) {
		return (
			<AutoForm<typeof ReturnsFormSchema>
				title="Update Returns"
				description="Update the returns details."
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.WarehouseManagementReturns)
							.update(searchQuery.id!, data);
						toast.success("Returns updated successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to update returns: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={ReturnsFormSchema}
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
						<AlertDialogTitle>Delete Returns</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this returns? This action cannot
							be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								try {
									await pocketbase
										.collection(Collections.WarehouseManagementReturns)
										.delete(searchQuery.id!);
									toast.success("Returns deleted successfully!");
								} catch (error) {
									if (error instanceof ClientResponseError) {
										toast.error(
											`Failed to delete returns: ${error.message} (${error.status})`,
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

export default ReturnsActions;
