import { useQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useParams,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React from "react";
import { toast } from "sonner";
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { useAppForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import { Collections, Update } from "@/lib/pb.types";

const UpdateRouteFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.TransportManagementRoutes, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementRoutes)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementRoutes>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementRoutes)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Route updated successfully");
			} catch (error) {
				if (error instanceof ClientResponseError) {
					toast.error(error.message);
				}
			}
		},
	});

	return (
		<form.AppForm>
			<FormDialog
				open={searchParams.action === "updateRoute"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Route"
				description="Predefined delivery or transit routes with distance and duration information"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Manage basic information information
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="The name or identifier of this route"
									tooltip="e.g., 'Route A - Metro Manila', 'Daily Circuit North'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Metrics</FieldSeparator>

					{/* Metrics */}
					<FieldGroup>
						<FieldLegend>Metrics</FieldLegend>
						<FieldDescription>Manage metrics information</FieldDescription>

						<form.AppField name="totalDistance">
							{(field) => (
								<field.NumberField
									label="Total Distance"
									description="Total route distance in kilometers"
									tooltip="e.g., 50, 125.5, 250"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="totalDuration">
							{(field) => (
								<field.NumberField
									label="Total Duration"
									description="Total estimated duration in minutes"
									tooltip="e.g., 180, 300, 480"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default UpdateRouteFormDialog;
