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
				description="Pricing quotes for shipments with route, dimensions, service level, and validity tracking"
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
									description="Unique identifier for this quote"
									tooltip="e.g., 'QUOTE-2024-001', 'QT-789456'"
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
									description="The client requesting this quote"
									tooltip="e.g., 'CLIENT-ABC', 'Enterprise Inc'"
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
									description="Complete pickup location address and details"
									tooltip="e.g., 'Manila, Philippines', '123 Main St, Makati City'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="destinationDetails">
							{(field) => (
								<field.TextareaField
									label="Destination Details"
									description="Complete delivery destination address and details"
									tooltip="e.g., 'Cebu, Philippines', '456 Oak Ave, Cebu City'"
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
									description="Total weight of the shipment in kilograms"
									tooltip="e.g., 50, 100, 250.5"
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
									description="Length of package in centimeters"
									tooltip="e.g., 30, 50, 100"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="width">
							{(field) => (
								<field.NumberField
									label="Width"
									description="Width of package in centimeters"
									tooltip="e.g., 20, 40, 80"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="height">
							{(field) => (
								<field.NumberField
									label="Height"
									description="Height of package in centimeters"
									tooltip="e.g., 15, 30, 60"
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
									description="The type or speed of service requested"
									tooltip="e.g., 'Standard', 'Express', 'Overnight', 'Economy'"
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
									description="The proposed price for this shipment"
									tooltip="e.g., 500, 1500.50, 5000"
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
									description="The current state of this quote"
									tooltip="e.g., pending, accepted, expired, converted"
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
									description="Any special conditions, requirements, or notes about this quote"
									tooltip="e.g., 'Special handling required', 'Fragile items', 'Temperature controlled'"
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
									description="The date when this quote is no longer valid"
									tooltip="e.g., 02/15/2024, 03/31/2024"
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
