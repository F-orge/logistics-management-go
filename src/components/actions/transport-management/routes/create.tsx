import {
	useNavigate,
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
import { Collections, Create } from "@/lib/pb.types";

const CreateRouteFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementRoutes>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementRoutes)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Route created successfully");
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
				open={searchParams.action === "createRoute"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Route"
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
									required
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
									required
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
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateRouteFormDialog;
