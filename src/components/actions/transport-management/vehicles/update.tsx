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

const UpdateVehicleFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.TransportManagementVehicles, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementVehicles)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementVehicles>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementVehicles)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Vehicle updated successfully");
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
				open={searchParams.action === "updateVehicle"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Vehicle"
				description="Tracks vehicle information including registration, status, specifications, and capacity limits for fleet management"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Manage basic information information
						</FieldDescription>

						<form.AppField name="registrationNumber">
							{(field) => (
								<field.TextField
									label="Registration Number"
									description="The vehicle's registration or license plate number"
									tooltip="e.g., 'ABC-1234', 'MET-2024-001'"
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
									description="The current operational status of the vehicle"
									tooltip="e.g., 'available', 'in-maintenance', 'on-trip'"
									options={[
										{ label: "Available", value: "available" },
										{ label: "In Maintenance", value: "in-maintenance" },
										{ label: "On Trip", value: "on-trip" },
										{ label: "Out Of Service", value: "out-of-service" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Specifications</FieldSeparator>

					{/* Specifications */}
					<FieldGroup>
						<FieldLegend>Specifications</FieldLegend>
						<FieldDescription>
							Manage specifications information
						</FieldDescription>

						<form.AppField name="model">
							{(field) => (
								<field.TextField
									label="Model"
									description="The make and model of the vehicle"
									tooltip="e.g., 'Isuzu ELF', 'Hino 500', 'Mitsubishi Canter'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="fuelType">
							{(field) => (
								<field.TextField
									label="Fuel Type"
									description="The type of fuel this vehicle uses"
									tooltip="e.g., 'Diesel', 'Gasoline', 'LPG'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="yearManufactured">
							{(field) => (
								<field.NumberField
									label="Year Manufactured"
									description="The year the vehicle was manufactured"
									tooltip="e.g., 2020, 2022, 2024"
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

						<form.AppField name="capacityWeight">
							{(field) => (
								<field.NumberField
									label="Capacity Weight"
									description="Maximum weight capacity in kilograms"
									tooltip="e.g., 3000, 5000, 10000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="capacityVolume">
							{(field) => (
								<field.NumberField
									label="Capacity Volume"
									description="Maximum volume capacity in cubic meters"
									tooltip="e.g., 15, 25, 50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>History</FieldSeparator>

					{/* History */}
					<FieldGroup>
						<FieldLegend>History</FieldLegend>
						<FieldDescription>Manage history information</FieldDescription>

						<form.AppField name="acquisitionDate">
							{(field) => (
								<field.DateTimeField
									label="Acquisition Date"
									description="The date when this vehicle was acquired"
									tooltip="e.g., 01/15/2020, 06/01/2023"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Maintenance</FieldSeparator>

					{/* Maintenance */}
					<FieldGroup>
						<FieldLegend>Maintenance</FieldLegend>
						<FieldDescription>Manage maintenance information</FieldDescription>

						<form.AppField name="nextMaintenanceDate">
							{(field) => (
								<field.DateTimeField
									label="Next Maintenance Date"
									description="Scheduled next maintenance date"
									tooltip="e.g., 01/15/2024, 03/01/2024"
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

export default UpdateVehicleFormDialog;
