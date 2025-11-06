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

const UpdateLocationFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.WarehouseManagementLocations, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementLocations)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementLocations>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementLocations)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Location updated successfully");
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
				open={searchParams.action === "updateLocation"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Location"
				description="Defines storage locations within warehouses (zones, aisles, racks, bins, etc.) with hierarchical structure, capacity limits, and operational constraints"
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
									description="The name or identifier for this location"
									tooltip="e.g., 'Zone A', 'Aisle 5', 'Rack B-12'"
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

						<form.AppField name="warehouse">
							{(field) => (
								<field.TextField
									label="Warehouse"
									description="The parent warehouse this location belongs to"
									tooltip="e.g., 'Manila Warehouse', 'Cebu Center'"
									placeholder=""
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
								<field.SelectField
									label="Type"
									description="The type of location in the warehouse hierarchy"
									tooltip="e.g., 'zone', 'aisle', 'rack', 'bin'"
									options={[
										{ label: "Zone", value: "zone" },
										{ label: "Aisle", value: "aisle" },
										{ label: "Rack", value: "rack" },
										{ label: "Shelf", value: "shelf" },
										{ label: "Bin", value: "bin" },
										{ label: "Dock", value: "dock" },
										{ label: "Packing Station", value: "packing-station" },
										{ label: "Cross Dock", value: "cross-dock" },
										{ label: "Quarantine", value: "quarantine" },
										{ label: "Bulk Storage", value: "bulk-storage" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Hierarchy</FieldSeparator>

					{/* Hierarchy */}
					<FieldGroup>
						<FieldLegend>Hierarchy</FieldLegend>
						<FieldDescription>Manage hierarchy information</FieldDescription>

						<form.AppField name="parentLocation">
							{(field) => (
								<field.TextField
									label="Parent Location"
									description="Parent location if this is a sub-location"
									tooltip="e.g., 'Zone A', 'Aisle 5'"
									placeholder=""
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

						<form.AppField name="barcode">
							{(field) => (
								<field.TextField
									label="Barcode"
									description="Barcode for this location"
									tooltip="e.g., 'LOC-001', 'BIN-A5-12'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Physical Layout</FieldSeparator>

					{/* Physical Layout */}
					<FieldGroup>
						<FieldLegend>Physical Layout</FieldLegend>
						<FieldDescription>
							Manage physical layout information
						</FieldDescription>

						<form.AppField name="level">
							{(field) => (
								<field.NumberField
									label="Level"
									description="Height level (0 = ground level)"
									tooltip="e.g., 0, 1, 2, 3"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Capacity</FieldSeparator>

					{/* Capacity */}
					<FieldGroup>
						<FieldLegend>Capacity</FieldLegend>
						<FieldDescription>Manage capacity information</FieldDescription>

						<form.AppField name="maxWeight">
							{(field) => (
								<field.NumberField
									label="Max Weight"
									description="Maximum weight capacity in kilograms"
									tooltip="e.g., 500, 1000, 2000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxVolume">
							{(field) => (
								<field.NumberField
									label="Max Volume"
									description="Maximum volume capacity in cubic meters"
									tooltip="e.g., 5, 10, 25"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxPallets">
							{(field) => (
								<field.NumberField
									label="Max Pallets"
									description="Maximum number of pallets allowed at this location"
									tooltip="e.g., 1, 2, 4"
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

						<form.AppField name="isActive">
							{(field) => (
								<field.TextField
									label="Is Active"
									description="Whether this location is available for storage"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Operations</FieldSeparator>

					{/* Operations */}
					<FieldGroup>
						<FieldLegend>Operations</FieldLegend>
						<FieldDescription>Manage operations information</FieldDescription>

						<form.AppField name="isPickable">
							{(field) => (
								<field.TextField
									label="Is Pickable"
									description="Whether items can be picked from this location"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="isReceivable">
							{(field) => (
								<field.TextField
									label="Is Receivable"
									description="Whether items can be received at this location"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Environment</FieldSeparator>

					{/* Environment */}
					<FieldGroup>
						<FieldLegend>Environment</FieldLegend>
						<FieldDescription>Manage environment information</FieldDescription>

						<form.AppField name="temperatureControlled">
							{(field) => (
								<field.TextField
									label="Temperature Controlled"
									description="Whether this location has temperature control"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="hazmatApproved">
							{(field) => (
								<field.TextField
									label="Hazmat Approved"
									description="Whether this location is approved for hazardous materials"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
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

export default UpdateLocationFormDialog;
