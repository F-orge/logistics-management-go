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

const UpdateOpportunityFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.CustomerRelationsOpportunities, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsOpportunities)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.CustomerRelationsOpportunities>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsOpportunities)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Opportunity updated successfully");
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
				open={searchParams.action === "updateOpportunity"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Opportunity"
				description="Edit Opportunity information"
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
									description="Enter name"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="company">
							{(field) => (
								<field.TextField
									label="Company"
									description="Enter company"
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

						<form.AppField name="contact">
							{(field) => (
								<field.TextField
									label="Contact"
									description="Enter contact"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="campaign">
							{(field) => (
								<field.TextField
									label="Campaign"
									description="Enter campaign"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Deal Details</FieldSeparator>

					{/* Deal Details */}
					<FieldGroup>
						<FieldLegend>Deal Details</FieldLegend>
						<FieldDescription>Manage deal details information</FieldDescription>

						<form.AppField name="dealValue">
							{(field) => (
								<field.NumberField
									label="Deal Value"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="stage">
							{(field) => (
								<field.SelectField
									label="Stage"
									description="Select an option"
									options={[
										{ label: "Prospecting", value: "prospecting" },
										{ label: "Qualification", value: "qualification" },
										{ label: "Need Analysis", value: "need-analysis" },
										{ label: "Demo", value: "demo" },
										{ label: "Proposal", value: "proposal" },
										{ label: "Negotiation", value: "negotiation" },
										{ label: "Closed Won", value: "closed-won" },
										{ label: "Closed Lost", value: "closed-lost" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
						<form.AppField name="probability">
							{(field) => (
								<field.NumberField
									label="Probability"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="source">
							{(field) => (
								<field.SelectField
									label="Source"
									description="Select an option"
									options={[
										{ label: "Website", value: "website" },
										{ label: "Referral", value: "referral" },
										{ label: "Social Media", value: "social-media" },
										{ label: "Email Campaign", value: "email-campaign" },
										{ label: "Cold Call", value: "cold-call" },
										{ label: "Event", value: "event" },
										{ label: "Advertisment", value: "advertisment" },
										{ label: "Partner", value: "partner" },
										{ label: "Existing Customer", value: "existing-customer" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timeline</FieldSeparator>

					{/* Timeline */}
					<FieldGroup>
						<FieldLegend>Timeline</FieldLegend>
						<FieldDescription>Manage timeline information</FieldDescription>

						<form.AppField name="expectedCloseDate">
							{(field) => (
								<field.DateTimeField
									label="Expected Close Date"
									description="Select date"
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
									description="Enter owner"
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

export default UpdateOpportunityFormDialog;
