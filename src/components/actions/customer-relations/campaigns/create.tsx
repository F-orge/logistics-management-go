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

const CreateCampaignFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.CustomerRelationsCampaigns>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsCampaigns)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Campaign created successfully");
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
				open={searchParams.action === "createCampaign"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Campaign"
				description="Plans and tracks marketing campaigns with budget allocation and timeline management"
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
									description="Campaign name or title"
									tooltip="e.g., 'Summer Sale 2024', 'Q2 Marketing Push'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Budget</FieldSeparator>

					{/* Budget */}
					<FieldGroup>
						<FieldLegend>Budget</FieldLegend>
						<FieldDescription>Manage budget information</FieldDescription>

						<form.AppField name="budget">
							{(field) => (
								<field.NumberField
									label="Budget"
									description="Total budget allocated for this campaign"
									tooltip="e.g., 5000, 25000, 100000"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timeline</FieldSeparator>

					{/* Timeline */}
					<FieldGroup>
						<FieldLegend>Timeline</FieldLegend>
						<FieldDescription>Manage timeline information</FieldDescription>

						<form.AppField name="startDate">
							{(field) => (
								<field.DateTimeField
									label="Start Date"
									description="Campaign start date"
									tooltip="e.g., 01/01/2024, 04/01/2024"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="endDate">
							{(field) => (
								<field.DateTimeField
									label="End Date"
									description="Campaign end date"
									tooltip="e.g., 01/31/2024, 06/30/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateCampaignFormDialog;
