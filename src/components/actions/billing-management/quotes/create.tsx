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

const CreateQuoteFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.BillingManagementQuotes>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementQuotes)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Quote created successfully");
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
				open={searchParams.action === "createQuote"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Quote"
				description="Fill out the form to create a new Quote"
			>
				<FieldSet>
					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="quoteNumber">
							{(field) => (
								<field.TextField
									label="Quote Number"
									description="Enter quotenumber"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Reference</FieldSeparator>

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="Enter client"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Route Details</FieldSeparator>

					{/* Route Details */}
					<FieldGroup>
						<FieldLegend>Route Details</FieldLegend>
						<FieldDescription>
							Manage route details information
						</FieldDescription>

						<form.AppField name="originDetails">
							{(field) => (
								<field.TextareaField
									label="Origin Details"
									description="Enter details"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="destinationDetails">
							{(field) => (
								<field.TextareaField
									label="Destination Details"
									description="Enter details"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Shipment Details</FieldSeparator>

					{/* Shipment Details */}
					<FieldGroup>
						<FieldLegend>Shipment Details</FieldLegend>
						<FieldDescription>
							Manage shipment details information
						</FieldDescription>

						<form.AppField name="weight">
							{(field) => (
								<field.NumberField
									label="Weight"
									description="Enter number"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dimensions</FieldSeparator>

					{/* Dimensions */}
					<FieldGroup>
						<FieldLegend>Dimensions</FieldLegend>
						<FieldDescription>Manage dimensions information</FieldDescription>

						<form.AppField name="length">
							{(field) => (
								<field.NumberField
									label="Length"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="width">
							{(field) => (
								<field.NumberField
									label="Width"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="height">
							{(field) => (
								<field.NumberField
									label="Height"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Service</FieldSeparator>

					{/* Service */}
					<FieldGroup>
						<FieldLegend>Service</FieldLegend>
						<FieldDescription>Manage service information</FieldDescription>

						<form.AppField name="serviceLevel">
							{(field) => (
								<field.TextField
									label="Service Level"
									description="Enter servicelevel"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Pricing</FieldSeparator>

					{/* Pricing */}
					<FieldGroup>
						<FieldLegend>Pricing</FieldLegend>
						<FieldDescription>Manage pricing information</FieldDescription>

						<form.AppField name="quotePrice">
							{(field) => (
								<field.NumberField
									label="Quote Price"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Status</FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Select an option"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Accepted", value: "accepted" },
										{ label: "Expired", value: "expired" },
										{ label: "Cancelled", value: "cancelled" },
										{ label: "Converted", value: "converted" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Additional Information</FieldSeparator>

					{/* Additional Information */}
					<FieldGroup>
						<FieldLegend>Additional Information</FieldLegend>
						<FieldDescription>
							Manage additional information information
						</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Enter details"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Validity</FieldSeparator>

					{/* Validity */}
					<FieldGroup>
						<FieldLegend>Validity</FieldLegend>
						<FieldDescription>Manage validity information</FieldDescription>

						<form.AppField name="expiredAt">
							{(field) => (
								<field.DateTimeField
									label="Expired At"
									description="Select date"
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

export default CreateQuoteFormDialog;
