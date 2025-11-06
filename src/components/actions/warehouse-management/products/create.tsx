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

const CreateProductFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementProducts>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementProducts)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Product created successfully");
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
				open={searchParams.action === "createProduct"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Product"
				description="Catalogs products available in the warehouse with SKU, name, category, unit cost, and reorder information"
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
									description="The name of the product"
									tooltip="e.g., 'Office Chair', 'Desk Lamp'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Identification</FieldSeparator>

					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="sku">
							{(field) => (
								<field.TextField
									label="Sku"
									description="Stock keeping unit for inventory tracking"
									tooltip="e.g., 'SKU123456', 'PROD-001'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="barcode">
							{(field) => (
								<field.TextField
									label="Barcode"
									description="Product barcode for scanning"
									tooltip="e.g., '5901234123457', 'BC-789123'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Details</FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="description">
							{(field) => (
								<field.TextareaField
									label="Description"
									description="Detailed product description"
									tooltip="e.g., 'Ergonomic office chair with adjustable height'"
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

						<form.AppField name="costPrice">
							{(field) => (
								<field.NumberField
									label="Cost Price"
									description="Cost per unit"
									tooltip="e.g., 500, 1500.50, 5000"
									placeholder="0"
									min={0}
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
									description="Weight in kilograms"
									tooltip="e.g., 5, 10.5, 25"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="length">
							{(field) => (
								<field.NumberField
									label="Length"
									description="Length in centimeters"
									tooltip="e.g., 50, 100, 200"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="width">
							{(field) => (
								<field.NumberField
									label="Width"
									description="Width in centimeters"
									tooltip="e.g., 40, 80, 150"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="height">
							{(field) => (
								<field.NumberField
									label="Height"
									description="Height in centimeters"
									tooltip="e.g., 30, 60, 120"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Reference</FieldSeparator>

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="supplier">
							{(field) => (
								<field.TextField
									label="Supplier"
									description="The supplier of this product"
									tooltip="e.g., 'Supplier Inc', 'Wholesale Distributor'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="The client this product belongs to or is for"
									tooltip="e.g., 'Client ABC', 'Customer XYZ'"
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

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Current status of the product"
									tooltip="e.g., 'active', 'inactive', 'discontinued'"
									options={[
										{ label: "Active", value: "active" },
										{ label: "Inactive", value: "inactive" },
										{ label: "Discontinued", value: "discontinued" },
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

export default CreateProductFormDialog;
