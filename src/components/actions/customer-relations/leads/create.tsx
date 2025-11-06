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

const CreateLeadFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.CustomerRelationsLeads>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsLeads)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Lead created successfully");
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
				open={searchParams.action === "createLead"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Lead"
				description="Tracks sales leads including scoring, source, status, and assignment to sales representatives"
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
									description="The name of the sales lead"
									tooltip="e.g., 'John Doe', 'ABC Company'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="email">
							{(field) => (
								<field.EmailField
									label="Email"
									description="Email address of the lead contact"
									tooltip="e.g., 'john@company.com', 'contact@business.com'"
									placeholder="example@email.com"
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Lead Details</FieldSeparator>

					{/* Lead Details */}
					<FieldGroup>
						<FieldLegend>Lead Details</FieldLegend>
						<FieldDescription>Manage lead details information</FieldDescription>

						<form.AppField name="score">
							{(field) => (
								<field.NumberField
									label="Score"
									description="Lead scoring value between 0-100"
									tooltip="e.g., 25, 50, 75"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="source">
							{(field) => (
								<field.SelectField
									label="Source"
									description="Where this lead originated from"
									tooltip="e.g., 'website', 'referral', 'social-media'"
									options={[
										{ label: "Website", value: "website" },
										{ label: "Referral", value: "referral" },
										{ label: "Social Media", value: "social-media" },
										{ label: "Email Campaign", value: "email-campaign" },
										{ label: "Cold Call", value: "cold-call" },
										{ label: "Event", value: "event" },
										{ label: "Advertisment", value: "advertisment" },
										{ label: "Partner", value: "partner" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Current status in the sales pipeline"
									tooltip="e.g., 'new', 'contacted', 'qualified'"
									options={[
										{ label: "New", value: "new" },
										{ label: "Contacted", value: "contacted" },
										{ label: "Qualified", value: "qualified" },
										{ label: "Unqualified", value: "unqualified" },
										{ label: "Converted", value: "converted" },
									]}
									placeholder="Select..."
									required
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

						<form.AppField name="campaign">
							{(field) => (
								<field.TextField
									label="Campaign"
									description="Associated marketing campaign"
									tooltip="e.g., 'CAM-2024-001', 'Summer Sale'"
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

						<form.AppField name="owner">
							{(field) => (
								<field.TextField
									label="Owner"
									description="Sales representative assigned to this lead"
									tooltip="e.g., 'John Sales', 'sales-rep@company.com'"
									placeholder=""
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

export default CreateLeadFormDialog;
