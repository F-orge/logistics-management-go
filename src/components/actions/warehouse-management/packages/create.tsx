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
				description="Fill out the form to create a new Package"
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
									description="Enter packagenumber"
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
									description="Enter salesorder"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="warehouse">
							{(field) => (
								<field.TextField
									label="Warehouse"
									description="Enter warehouse"
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
									description="Enter type"
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
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
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

					<FieldSeparator>Handling</FieldSeparator>

					{/* Handling */}
					<FieldGroup>
						<FieldLegend>Handling</FieldLegend>
						<FieldDescription>Manage handling information</FieldDescription>

						<form.AppField name="isFragile">
							{(field) => (
								<field.TextField
									label="Is Fragile"
									description="Enter isfragile"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="isHazmat">
							{(field) => (
								<field.TextField
									label="Is Hazmat"
									description="Enter ishazmat"
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
									description="Enter requiresignature"
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
									description="Enter number"
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
									description="Select date"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="shippedAt">
							{(field) => (
								<field.DateTimeField
									label="Shipped At"
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

export default CreatePackageFormDialog;
