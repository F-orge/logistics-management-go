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

const CreateCarrierFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementCarriers>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementCarriers)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Carrier created successfully");
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
				open={searchParams.action === "createCarrier"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Carrier"
				description="Third-party carriers or logistics partners providing transportation and delivery services"
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
									description="The name of the carrier company"
									tooltip="e.g., 'DHL Express', 'FedEx Philippines', 'Local Courier Co'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Contact</FieldSeparator>

					{/* Contact */}
					<FieldGroup>
						<FieldLegend>Contact</FieldLegend>
						<FieldDescription>Manage contact information</FieldDescription>

						<form.AppField name="contactDetails">
							{(field) => (
								<field.TextareaField
									label="Contact Details"
									description="Primary contact information for the carrier"
									tooltip="e.g., '+63 2 1234-5678', 'contact@carrier.com', 'Manila Branch'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Services</FieldSeparator>

					{/* Services */}
					<FieldGroup>
						<FieldLegend>Services</FieldLegend>
						<FieldDescription>Manage services information</FieldDescription>

						<form.AppField name="serviceOffered">
							{(field) => (
								<field.TextareaField
									label="Service Offered"
									description="Description of services provided by this carrier"
									tooltip="e.g., 'Ground shipping', 'Express delivery', 'International services'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Capabilities</FieldSeparator>

					{/* Capabilities */}
					<FieldGroup>
						<FieldLegend>Capabilities</FieldLegend>
						<FieldDescription>Manage capabilities information</FieldDescription>

						<form.AppField name="capacity">
							{(field) => (
								<field.TextField
									label="Capacity"
									description="The service tier or capacity level this carrier provides"
									tooltip="e.g., 'Standard', 'Premium', 'Bulk'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Status</FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="isActive">
							{(field) => (
								<field.SelectField
									label="Is Active"
									description="Whether this carrier is currently active and available for bookings"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
										{ label: "True", value: "true" },
										{ label: "False", value: "false" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateCarrierFormDialog;
