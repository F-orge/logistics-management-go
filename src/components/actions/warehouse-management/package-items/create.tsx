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

const CreatePackageItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementPackageItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementPackageItems)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("PackageItem created successfully");
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
				open={searchParams.action === "createPackageItem"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create PackageItem"
				description="Individual items within packages tracking product, batch, quantity, and expiry dates"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="package">
							{(field) => (
								<field.TextField
									label="Package"
									description="The package this item is in"
									tooltip="e.g., 'PKG-001', 'PACK-789'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product in this package item"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Batch</FieldSeparator>

					{/* Batch */}
					<FieldGroup>
						<FieldLegend>Batch</FieldLegend>
						<FieldDescription>Manage batch information</FieldDescription>

						<form.AppField name="batch">
							{(field) => (
								<field.TextField
									label="Batch"
									description="Batch or lot number"
									tooltip="e.g., 'BATCH-2024-001', 'LOT123'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Quantity</FieldSeparator>

					{/* Quantity */}
					<FieldGroup>
						<FieldLegend>Quantity</FieldLegend>
						<FieldDescription>Manage quantity information</FieldDescription>

						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="Quantity of this product in the package"
									tooltip="e.g., 1, 5, 10"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Batch Details</FieldSeparator>

					{/* Batch Details */}
					<FieldGroup>
						<FieldLegend>Batch Details</FieldLegend>
						<FieldDescription>
							Manage batch details information
						</FieldDescription>

						<form.AppField name="lotNumber">
							{(field) => (
								<field.TextField
									label="Lot Number"
									description="Lot number of the product"
									tooltip="e.g., 'LOT-2024-001', 'BATCH-789'"
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

						<form.AppField name="expiryDate">
							{(field) => (
								<field.DateTimeField
									label="Expiry Date"
									description="Expiration date of the product"
									tooltip="e.g., 12/31/2024, 06/30/2025"
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

export default CreatePackageItemFormDialog;
