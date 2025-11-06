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

const CreateCaseFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.CustomerRelationsCases>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsCases)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Case created successfully");
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
				open={searchParams.action === "createCase"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Case"
				description="Fill out the form to create a new support case"
			>
				<FieldSet>
					{/* Case Type & Priority */}
					<FieldGroup>
						<FieldLegend>Case Classification</FieldLegend>
						<FieldDescription>
							Define the type and urgency of this support case
						</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Case Type"
									description="Category of the case"
									tooltip="What kind of issue is this?"
									options={[
										{ label: "Question", value: "question" },
										{ label: "Problem", value: "problem" },
										{ label: "Complaint", value: "complaint" },
										{ label: "Feature Request", value: "feature-request" },
										{ label: "Bug Report", value: "bug-report" },
										{ label: "Technical Support", value: "technical-support" },
									]}
									placeholder="Select a case type"
								/>
							)}
						</form.AppField>

						<form.AppField name="priority">
							{(field) => (
								<field.SelectField
									label="Priority"
									description="Case urgency level"
									tooltip="How urgent is this case?"
									options={[
										{ label: "Critical", value: "critical" },
										{ label: "High", value: "high" },
										{ label: "Medium", value: "medium" },
										{ label: "Low", value: "low" },
									]}
									placeholder="Select priority"
								/>
							)}
						</form.AppField>

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Current case state"
									tooltip="new → in-progress → resolved → closed"
									options={[
										{ label: "New", value: "new" },
										{ label: "In Progress", value: "in-progress" },
										{
											label: "Waiting for Customer",
											value: "waiting-for-customer",
										},
										{
											label: "Waiting for Internal",
											value: "waiting-for-internal",
										},
										{ label: "Escalated", value: "escalated" },
										{ label: "Resolved", value: "resolved" },
										{ label: "Closed", value: "closed" },
										{ label: "Cancelled", value: "cancelled" },
									]}
									placeholder="Select status"
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Issue Details</FieldSeparator>

					{/* Issue Details */}
					<FieldGroup>
						<FieldLegend>Issue Details</FieldLegend>
						<FieldDescription>
							Provide contact information and detailed issue description
						</FieldDescription>

						<form.AppField name="contact">
							{(field) => (
								<field.TextField
									label="Contact ID"
									description="Associated contact (optional)"
									tooltip="Which contact is this case for?"
									placeholder="Contact ID"
								/>
							)}
						</form.AppField>

						<form.AppField name="description">
							{(field) => (
								<field.TextareaField
									label="Description"
									description="Detailed description of the issue (max 10000 characters)"
									tooltip="Provide as much detail as possible"
									placeholder="Describe the issue in detail..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Assignment</FieldSeparator>

					{/* Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>
							Assign this case to a support agent for resolution
						</FieldDescription>

						<form.AppField name="owner">
							{(field) => (
								<field.TextField
									label="Assigned To (User ID)"
									description="User ID of the support agent"
									tooltip="Who is assigned to resolve this?"
									placeholder="user-id-123"
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

export default CreateCaseFormDialog;
