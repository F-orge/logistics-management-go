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

const CreatePutawayRuleFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementPutawayRules>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementPutawayRules)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("PutawayRule created successfully");
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
				open={searchParams.action === "createPutawayRule"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create PutawayRule"
				description="Defines location strategies for putaway operations based on product, client, and threshold requirements"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="warehouse">
							{(field) => (
								<field.TextField
									label="Warehouse"
									description="The warehouse this rule applies to"
									tooltip="e.g., 'WH-001', 'Manila Warehouse'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="Product for which this rule applies"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="Specific client this rule applies to (optional)"
									tooltip="e.g., 'CLI-001', 'ABC Company'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Location Type</FieldSeparator>

					{/* Location Type */}
					<FieldGroup>
						<FieldLegend>Location Type</FieldLegend>
						<FieldDescription>
							Manage location type information
						</FieldDescription>

						<form.AppField name="locationType">
							{(field) => (
								<field.SelectField
									label="Location Type"
									description="Type of location to use for putaway"
									tooltip="e.g., 'zone', 'aisle', 'rack', 'bin'"
									options={[
										{ label: "Zone", value: "zone" },
										{ label: "Aisle", value: "aisle" },
										{ label: "Rack", value: "rack" },
										{ label: "Shelf", value: "shelf" },
										{ label: "Bin", value: "bin" },
										{ label: "Bulk", value: "bulk" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Location</FieldSeparator>

					{/* Location */}
					<FieldGroup>
						<FieldLegend>Location</FieldLegend>
						<FieldDescription>Manage location information</FieldDescription>

						<form.AppField name="preferredLocation">
							{(field) => (
								<field.TextField
									label="Preferred Location"
									description="Preferred location code for putaway"
									tooltip="e.g., 'LOC-A-01-01', 'BIN-005'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Priority</FieldSeparator>

					{/* Priority */}
					<FieldGroup>
						<FieldLegend>Priority</FieldLegend>
						<FieldDescription>Manage priority information</FieldDescription>

						<form.AppField name="priority">
							{(field) => (
								<field.NumberField
									label="Priority"
									description="Priority level for this rule"
									tooltip="e.g., 1 (highest), 2, 3"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Quantity</FieldSeparator>

					{/* Quantity */}
					<FieldGroup>
						<FieldLegend>Quantity</FieldLegend>
						<FieldDescription>Manage quantity information</FieldDescription>

						<form.AppField name="minQuantity">
							{(field) => (
								<field.NumberField
									label="Min Quantity"
									description="Minimum quantity threshold for this rule"
									tooltip="e.g., 10, 50, 100"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxQuantity">
							{(field) => (
								<field.NumberField
									label="Max Quantity"
									description="Enter a numeric value for max quantity"
									tooltip="Maximum quantity for this rule"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Thresholds</FieldSeparator>

					{/* Thresholds */}
					<FieldGroup>
						<FieldLegend>Thresholds</FieldLegend>
						<FieldDescription>Manage thresholds information</FieldDescription>

						<form.AppField name="weightThreshold">
							{(field) => (
								<field.NumberField
									label="Weight Threshold"
									description="Enter a numeric value for weight threshold"
									tooltip="Weight threshold in kg"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="volumeThreshold">
							{(field) => (
								<field.NumberField
									label="Volume Threshold"
									description="Enter a numeric value for volume threshold"
									tooltip="Volume threshold in cubic meters"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Requirements</FieldSeparator>

					{/* Requirements */}
					<FieldGroup>
						<FieldLegend>Requirements</FieldLegend>
						<FieldDescription>Manage requirements information</FieldDescription>

						<form.AppField name="requireTemperatureControl">
							{(field) => (
								<field.TextField
									label="Require Temperature Control"
									description="Enter the require temperature control"
									tooltip="Whether temperature control is required"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="requireHazmatApproval">
							{(field) => (
								<field.TextField
									label="Require Hazmat Approval"
									description="Enter the require hazmat approval"
									tooltip="Whether hazmat approval is required"
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
								<field.TextField
									label="Is Active"
									description="Enter the is active"
									tooltip="Whether this rule is active"
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

export default CreatePutawayRuleFormDialog;
