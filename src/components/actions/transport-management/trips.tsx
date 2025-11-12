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
import { TripsSchema } from "@/pocketbase/schemas/transport-management/trips";

const TripsFormSchema = TripsSchema.omit({
	id: true,
	created: true,
	updated: true,
});

export const TripsActions = () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["tripss", searchQuery.id],
		enabled:
			!!searchQuery.id &&
			(searchQuery.action === "update" || searchQuery.action === "delete"),
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementTrips)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	if (searchQuery.action === "create") {
		return (
			<AutoForm<typeof TripsFormSchema>
				title="Create Trips"
				description="Fill in the details to create a new trips."
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.TransportManagementTrips)
							.create(data);
						toast.success("Trips created successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to create trips: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={TripsFormSchema}
			/>
		);
	}

	if (searchQuery.action === "update" && data) {
		return (
			<AutoForm<typeof TripsFormSchema>
				title="Update Trips"
				description="Update the trips details."
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.TransportManagementTrips)
							.update(searchQuery.id!, data);
						toast.success("Trips updated successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to update trips: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={TripsFormSchema}
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
						<AlertDialogTitle>Delete Trips</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this trips? This action cannot be
							undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								try {
									await pocketbase
										.collection(Collections.TransportManagementTrips)
										.delete(searchQuery.id!);
									toast.success("Trips deleted successfully!");
								} catch (error) {
									if (error instanceof ClientResponseError) {
										toast.error(
											`Failed to delete trips: ${error.message} (${error.status})`,
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

export default TripsActions;
