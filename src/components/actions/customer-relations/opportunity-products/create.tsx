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

const CreateOpportunityProductFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues:
			{} as Create<Collections.CustomerRelationsOpportunityProducts>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsOpportunityProducts)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("OpportunityProduct created successfully");
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
				open={searchParams.action === "createOpportunityProduct"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create OpportunityProduct"
				description="Fill out the form to create a new Opportunityproduct"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Essential Opportunityproduct details for identification and
							contact
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="OpportunityProduct name (max 200 characters)"
									tooltip="The official name of the Opportunityproduct"
									placeholder="Acme Corporation"
									required
								/>
							)}
						</form.AppField>

						<form.AppField name="industry">
							{(field) => (
								<field.TextField
									label="Industry"
									description="Industry sector (max 100 characters)"
									tooltip="The primary industry this Opportunityproduct operates in"
									placeholder="Technology, Finance, etc."
								/>
							)}
						</form.AppField>

						<form.AppField name="phoneNumber">
							{(field) => (
								<field.TextField
									label="Phone Number"
									description="Contact phone number (max 20 characters)"
									tooltip="Primary phone number for the Opportunityproduct"
									placeholder="+1 (555) 123-4567"
								/>
							)}
						</form.AppField>

						<form.AppField name="website">
							{(field) => (
								<field.URLField
									label="Website"
									description="OpportunityProduct website URL"
									tooltip="The main website for the Opportunityproduct"
									placeholder="https://example.com"
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Financial Information</FieldSeparator>

					{/* Financial Information */}
					<FieldGroup>
						<FieldLegend>Financial Information</FieldLegend>
						<FieldDescription>
							Revenue and financial metrics for the Opportunityproduct
						</FieldDescription>

						<form.AppField name="annualRevenue">
							{(field) => (
								<field.NumberField
									label="Annual Revenue"
									description="Annual revenue in currency units"
									tooltip="Estimated or actual annual revenue"
									placeholder="1000000"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Address</FieldSeparator>

					{/* Address Information */}
					<FieldGroup>
						<FieldLegend>Address</FieldLegend>
						<FieldDescription>
							Physical location details for the Opportunityproduct
						</FieldDescription>

						<form.AppField name="street">
							{(field) => (
								<field.TextField
									label="Street Address"
									description="Street address (max 200 characters)"
									tooltip="Street address for the Opportunityproduct"
									placeholder="123 Main Street"
								/>
							)}
						</form.AppField>

						<form.AppField name="city">
							{(field) => (
								<field.TextField
									label="City"
									description="City (max 100 characters)"
									tooltip="City where the Opportunityproduct is located"
									placeholder="San Francisco"
								/>
							)}
						</form.AppField>

						<form.AppField name="state">
							{(field) => (
								<field.TextField
									label="State/Province"
									description="State or province (max 100 characters)"
									tooltip="State or province code"
									placeholder="CA"
								/>
							)}
						</form.AppField>

						<form.AppField name="postalCode">
							{(field) => (
								<field.TextField
									label="Postal Code"
									description="Postal/Zip code (max 20 characters)"
									tooltip="Postal code for the Opportunityproduct address"
									placeholder="94105"
								/>
							)}
						</form.AppField>

						<form.AppField name="country">
							{(field) => (
								<field.TextField
									label="Country"
									description="Country (max 100 characters)"
									tooltip="Country where the Opportunityproduct is located"
									placeholder="United States"
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Assignment</FieldSeparator>

					{/* Relationship & Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>
							Assign this Opportunityproduct to a team member for management
						</FieldDescription>

						<form.AppField name="owner">
							{(field) => (
								<field.RelationField
									pocketbase={pocketbase}
									label="Owner"
									description="Select a user to own this Opportunityproduct"
									tooltip="The user responsible for managing this Opportunityproduct"
									relationshipName="owner"
									collectionName="_pb_users_auth_"
									displayField="email"
									placeholder="Search users..."
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateOpportunityProductFormDialog;
