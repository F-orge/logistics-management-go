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

const CreateCarrierRateFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementCarrierRates>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementCarrierRates)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("CarrierRate created successfully");
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
				open={searchParams.action === "createCarrierRate"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create CarrierRate"
				description="Pricing rates set by carriers for specific routes, services, and units"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="carrier">
							{(field) => (
								<field.TextField
									label="Carrier"
									description="The carrier this rate applies to"
									tooltip="e.g., 'DHL', 'FedEx', 'Local Courier'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Route</FieldSeparator>

					{/* Route */}
					<FieldGroup>
						<FieldLegend>Route</FieldLegend>
						<FieldDescription>Manage route information</FieldDescription>

						<form.AppField name="origin">
							{(field) => (
								<field.TextField
									label="Origin"
									description="The origin location or zone code"
									tooltip="e.g., 'Metro Manila', 'Zone 1', 'NCR'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="destination">
							{(field) => (
								<field.TextField
									label="Destination"
									description="The destination location or zone code"
									tooltip="e.g., 'Cebu City', 'Zone 5', 'Visayas'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Pricing</FieldSeparator>

					{/* Pricing */}
					<FieldGroup>
						<FieldLegend>Pricing</FieldLegend>
						<FieldDescription>Manage pricing information</FieldDescription>

						<form.AppField name="rate">
							{(field) => (
								<field.NumberField
									label="Rate"
									description="The shipping rate for this route"
									tooltip="e.g., 150, 250.50, 500"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Unit</FieldSeparator>

					{/* Unit */}
					<FieldGroup>
						<FieldLegend>Unit</FieldLegend>
						<FieldDescription>Manage unit information</FieldDescription>

						<form.AppField name="unit">
							{(field) => (
								<field.SelectField
									label="Unit"
									description="The unit of measurement for this rate"
									tooltip="e.g., 'per-kg', 'per-item', 'flat-rate'"
									options={[
										{ label: "Per Kg", value: "per-kg" },
										{ label: "Per Item", value: "per-item" },
										{ label: "Per Km", value: "per-km" },
										{ label: "Flat Rate", value: "flat-rate" },
										{ label: "Per Cubic Meter", value: "per-cubic-meter" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Service</FieldSeparator>

					{/* Service */}
					<FieldGroup>
						<FieldLegend>Service</FieldLegend>
						<FieldDescription>Manage service information</FieldDescription>

						<form.AppField name="serviceType">
							{(field) => (
								<field.TextField
									label="Service Type"
									description="The type of service (standard, express, etc.)"
									tooltip="e.g., 'Standard', 'Express', 'Overnight'"
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

export default CreateCarrierRateFormDialog;
