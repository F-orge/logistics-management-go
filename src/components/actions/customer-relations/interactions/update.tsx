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

const UpdateInteractionFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.CustomerRelationsInteractions, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsInteractions)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.CustomerRelationsInteractions>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsInteractions)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Interaction updated successfully");
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
				open={searchParams.action === "updateInteraction"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Interaction"
				description="Logs customer interactions (calls, meetings, emails, texts) with notes, outcomes, and assignments"
			>
				<FieldSet>
					{/* Contact Information */}
					<FieldGroup>
						<FieldLegend>Contact Information</FieldLegend>
						<FieldDescription>
							Manage contact information information
						</FieldDescription>

						<form.AppField name="contact">
							{(field) => (
								<field.TextField
									label="Contact"
									description="The contact involved in this interaction"
									tooltip="e.g., 'John Doe', 'Jane Smith'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Interaction Details</FieldSeparator>

					{/* Interaction Details */}
					<FieldGroup>
						<FieldLegend>Interaction Details</FieldLegend>
						<FieldDescription>
							Manage interaction details information
						</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Type of customer interaction"
									tooltip="e.g., 'call', 'meeting', 'email'"
									options={[
										{ label: "Call", value: "call" },
										{ label: "Meeting", value: "meeting" },
										{ label: "Text", value: "text" },
										{ label: "Email", value: "email" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
						<form.AppField name="interactionDate">
							{(field) => (
								<field.DateTimeField
									label="Interaction Date"
									description="Date and time when the interaction took place"
									tooltip="e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Notes or summary of the interaction"
									tooltip="e.g., 'Discussed pricing', 'Client interested in Q2 rollout'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="outcome">
							{(field) => (
								<field.TextField
									label="Outcome"
									description="Outcome or result of the interaction"
									tooltip="e.g., 'Follow-up needed', 'Deal moved forward'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Relationships</FieldSeparator>

					{/* Relationships */}
					<FieldGroup>
						<FieldLegend>Relationships</FieldLegend>
						<FieldDescription>
							Manage relationships information
						</FieldDescription>

						<form.AppField name="case">
							{(field) => (
								<field.TextField
									label="Case"
									description="Related support case if applicable"
									tooltip="e.g., 'CASE-001', 'Support-123'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Assignment</FieldSeparator>

					{/* Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>Manage assignment information</FieldDescription>

						<form.AppField name="user">
							{(field) => (
								<field.TextField
									label="User"
									description="User who conducted this interaction"
									tooltip="e.g., 'John Interaction', 'user@company.com'"
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

export default UpdateInteractionFormDialog;
