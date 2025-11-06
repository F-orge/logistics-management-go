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

const CreatePackageFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementPackages>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementPackages)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Package created successfully");
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
				open={searchParams.action === "createPackage"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Package"
				description="Represents physical packages prepared for shipment with dimensions, weight, handling requirements, and insurance"
			>
				<FieldSet>
					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="packageNumber">
							{(field) => (
								<field.TextField
									label="Package Number"
									description="Unique package identifier"
									tooltip="e.g., 'PKG-2024-001', 'PACK-789'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Reference</FieldSeparator>

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="salesOrder">
							{(field) => (
								<field.TextField
									label="Sales Order"
									description="The sales order this package fulfills"
									tooltip="e.g., 'SO-2024-001', 'ORD-789'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="warehouse">
							{(field) => (
								<field.TextField
									label="Warehouse"
									description="The warehouse preparing this package"
									tooltip="e.g., 'Manila Warehouse', 'Cebu Center'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Classification</FieldSeparator>

					{/* Classification */}
					<FieldGroup>
						<FieldLegend>Classification</FieldLegend>
						<FieldDescription>
							Manage classification information
						</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.TextField
									label="Type"
									description="The type of packaging used"
									tooltip="e.g., 'Box', 'Envelope', 'Pallet'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dimensions</FieldSeparator>

					{/* Dimensions */}
					<FieldGroup>
						<FieldLegend>Dimensions</FieldLegend>
						<FieldDescription>Manage dimensions information</FieldDescription>

						<form.AppField name="weight">
							{(field) => (
								<field.NumberField
									label="Weight"
									description="Package weight in kilograms"
									tooltip="e.g., 2.5, 5, 10"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="length">
							{(field) => (
								<field.NumberField
									label="Length"
									description="Package length in centimeters"
									tooltip="e.g., 30, 60, 100"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="width">
							{(field) => (
								<field.NumberField
									label="Width"
									description="Package width in centimeters"
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
									description="Package height in centimeters"
									tooltip="e.g., 15, 30, 60"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Handling</FieldSeparator>

					{/* Handling */}
					<FieldGroup>
						<FieldLegend>Handling</FieldLegend>
						<FieldDescription>Manage handling information</FieldDescription>

						<form.AppField name="isFragile">
							{(field) => (
								<field.TextField
									label="Is Fragile"
									description="Whether package contains fragile items"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="isHazmat">
							{(field) => (
								<field.TextField
									label="Is Hazmat"
									description="Whether package contains hazardous materials"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Delivery</FieldSeparator>

					{/* Delivery */}
					<FieldGroup>
						<FieldLegend>Delivery</FieldLegend>
						<FieldDescription>Manage delivery information</FieldDescription>

						<form.AppField name="requireSignature">
							{(field) => (
								<field.TextField
									label="Require Signature"
									description="Whether signature is required upon delivery"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Insurance</FieldSeparator>

					{/* Insurance */}
					<FieldGroup>
						<FieldLegend>Insurance</FieldLegend>
						<FieldDescription>Manage insurance information</FieldDescription>

						<form.AppField name="insuranceValue">
							{(field) => (
								<field.NumberField
									label="Insurance Value"
									description="Insurance value of the package"
									tooltip="e.g., 1000, 5000, 10000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dates</FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="packedAt">
							{(field) => (
								<field.DateTimeField
									label="Packed At"
									description="Date when package was packed"
									tooltip="e.g., 01/15/2024, 02/01/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="shippedAt">
							{(field) => (
								<field.DateTimeField
									label="Shipped At"
									description="Date when package was shipped"
									tooltip="e.g., 01/15/2024, 02/01/2024"
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

export default CreatePackageFormDialog;
