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

const UpdateCompanyFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.CustomerRelationsCompanies, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsCompanies)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.CustomerRelationsCompanies>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsCompanies)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Company updated successfully");
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
				open={searchParams.action === "updateCompany"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Company"
				description="Edit company information"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Essential company details for identification and contact
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="Company name (max 200 characters)"
									tooltip="The official name of the company"
									placeholder="Acme Corporation"
								/>
							)}
						</form.AppField>

						<form.AppField name="industry">
							{(field) => (
								<field.TextField
									label="Industry"
									description="Industry sector (max 100 characters)"
									tooltip="The primary industry this company operates in"
									placeholder="Technology, Finance, etc."
								/>
							)}
						</form.AppField>

						<form.AppField name="phoneNumber">
							{(field) => (
								<field.TextField
									label="Phone Number"
									description="Contact phone number (max 20 characters)"
									tooltip="Primary phone number for the company"
									placeholder="+1 (555) 123-4567"
								/>
							)}
						</form.AppField>

						<form.AppField name="website">
							{(field) => (
								<field.URLField
									label="Website"
									description="Company website URL"
									tooltip="The main website for the company"
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
							Revenue and financial metrics for the company
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
							Physical location details for the company
						</FieldDescription>

						<form.AppField name="street">
							{(field) => (
								<field.TextField
									label="Street Address"
									description="Street address (max 200 characters)"
									tooltip="Street address for the company"
									placeholder="123 Main Street"
								/>
							)}
						</form.AppField>

						<form.AppField name="city">
							{(field) => (
								<field.TextField
									label="City"
									description="City (max 100 characters)"
									tooltip="City where the company is located"
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
									tooltip="Postal code for the company address"
									placeholder="94105"
								/>
							)}
						</form.AppField>

						<form.AppField name="country">
							{(field) => (
								<field.TextField
									label="Country"
									description="Country (max 100 characters)"
									tooltip="Country where the company is located"
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
							Assign this company to a team member for management
						</FieldDescription>

						<form.AppField name="owner">
							{(field) => (
								<field.TextField
									label="Owner (User ID)"
									description="User ID of the company owner"
									tooltip="ID of the user responsible for this company"
									placeholder="user-id-123"
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default UpdateCompanyFormDialog;
