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

const UpdateInventoryStockFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.WarehouseManagementInventoryStock, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementInventoryStock)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementInventoryStock>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInventoryStock)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("InventoryStock updated successfully");
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
				open={searchParams.action === "updateInventoryStock"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update InventoryStock"
				description="Edit Inventorystock information"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="Enter product"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="location">
							{(field) => (
								<field.TextField
									label="Location"
									description="Enter location"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Stock</FieldSeparator>

					{/* Stock */}
					<FieldGroup>
						<FieldLegend>Stock</FieldLegend>
						<FieldDescription>Manage stock information</FieldDescription>

						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="reservedQuantity">
							{(field) => (
								<field.NumberField
									label="Reserved Quantity"
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Batch Information</FieldSeparator>

					{/* Batch Information */}
					<FieldGroup>
						<FieldLegend>Batch Information</FieldLegend>
						<FieldDescription>
							Manage batch information information
						</FieldDescription>

						<form.AppField name="batch">
							{(field) => (
								<field.TextField
									label="Batch"
									description="Enter batch"
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
									description="Select an option"
									options={[
										{ label: "On Hand", value: "on-hand" },
										{ label: "Allocated", value: "allocated" },
										{ label: "Reserved", value: "reserved" },
										{ label: "Damaged", value: "damaged" },
										{ label: "Expired", value: "expired" },
										{ label: "Quarantined", value: "quarantined" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Tracking</FieldSeparator>

					{/* Tracking */}
					<FieldGroup>
						<FieldLegend>Tracking</FieldLegend>
						<FieldDescription>Manage tracking information</FieldDescription>

						<form.AppField name="lastMovementAt">
							{(field) => (
								<field.DateTimeField
									label="Last Movement At"
									description="Select date and time"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="lastCountedAt">
							{(field) => (
								<field.DateTimeField
									label="Last Counted At"
									description="Select date and time"
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

export default UpdateInventoryStockFormDialog;
