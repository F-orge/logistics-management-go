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
import { OpportunityProductsSchema } from "@/pocketbase/schemas/customer-relations/opportunity-products";

const OpportunityProductsFormSchema = OpportunityProductsSchema.omit({
	id: true,
	created: true,
	updated: true,
});

export const OpportunityProductsActions = () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["opportunity-productss", searchQuery.id],
		enabled:
			!!searchQuery.id &&
			(searchQuery.action === "update" || searchQuery.action === "delete"),
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.CustomerRelationsOpportunityProducts)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	if (searchQuery.action === "create") {
		return (
			<AutoForm<typeof OpportunityProductsFormSchema>
				title="Create OpportunityProducts"
				description="Fill in the details to create a new opportunity-products."
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.CustomerRelationsOpportunityProducts)
							.create(data);
						toast.success("OpportunityProducts created successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to create opportunity-products: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={OpportunityProductsFormSchema}
			/>
		);
	}

	if (searchQuery.action === "update" && data) {
		return (
			<AutoForm<typeof OpportunityProductsFormSchema>
				title="Update OpportunityProducts"
				description="Update the opportunity-products details."
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				onSubmit={async (data) => {
					try {
						await pocketbase
							.collection(Collections.CustomerRelationsOpportunityProducts)
							.update(searchQuery.id!, data);
						toast.success("OpportunityProducts updated successfully!");
					} catch (error) {
						if (error instanceof ClientResponseError) {
							toast.error(
								`Failed to update opportunity-products: ${error.message} (${error.status})`,
							);
						}
					} finally {
						navigate({ search: (prev) => ({ ...prev, action: undefined }) });
					}
				}}
				schema={OpportunityProductsFormSchema}
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
						<AlertDialogTitle>Delete OpportunityProducts</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this opportunity-products? This
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
											Collections.CustomerRelationsOpportunityProducts,
										)
										.delete(searchQuery.id!);
									toast.success("OpportunityProducts deleted successfully!");
								} catch (error) {
									if (error instanceof ClientResponseError) {
										toast.error(
											`Failed to delete opportunity-products: ${error.message} (${error.status})`,
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

export default OpportunityProductsActions;
