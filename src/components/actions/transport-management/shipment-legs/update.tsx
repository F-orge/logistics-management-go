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

const UpdateShipmentLegFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.TransportManagementShipmentLegs, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementShipmentLegs)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementShipmentLegs>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementShipmentLegs)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("ShipmentLeg updated successfully");
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
				open={searchParams.action === "updateShipmentLeg"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update ShipmentLeg"
				description="Individual segments or hops of a shipment through different carriers or transportation modes"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="shipment">
							{(field) => (
								<field.TextField
									label="Shipment"
									description="The shipment this leg is part of"
									tooltip="e.g., 'SHP-2024-001', 'BL-789456'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="carrier">
							{(field) => (
								<field.TextField
									label="Carrier"
									description="The carrier handling this leg of the shipment"
									tooltip="e.g., 'DHL', 'FedEx', 'Local Courier'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="internalTrip">
							{(field) => (
								<field.TextField
									label="Internal Trip"
									description="Reference to internal trip if applicable"
									tooltip="e.g., 'TRIP-2024-001', 'DLV-456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Sequence</FieldSeparator>

					{/* Sequence */}
					<FieldGroup>
						<FieldLegend>Sequence</FieldLegend>
						<FieldDescription>Manage sequence information</FieldDescription>

						<form.AppField name="legSequence">
							{(field) => (
								<field.NumberField
									label="Leg Sequence"
									description="The sequence number of this leg in the shipment route"
									tooltip="e.g., 1, 2, 3"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Location</FieldSeparator>

					{/* Location */}
					<FieldGroup>
						<FieldLegend>Location</FieldLegend>
						<FieldDescription>Manage location information</FieldDescription>

						<form.AppField name="startLocation">
							{(field) => (
								<field.TextField
									label="Start Location"
									description="The starting location for this leg"
									tooltip="e.g., 'Warehouse A - Manila', 'Regional Hub - Cebu'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="endLocation">
							{(field) => (
								<field.TextField
									label="End Location"
									description="The ending location for this leg"
									tooltip="e.g., 'Customer Site - QC', 'Port of Manila'"
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
									description="The current status of this shipment leg"
									tooltip="e.g., 'pending', 'in-transit', 'completed'"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "In Transit", value: "in-transit" },
										{ label: "Completed", value: "completed" },
										{ label: "Delayed", value: "delayed" },
										{ label: "Cancelled", value: "cancelled" },
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

export default UpdateShipmentLegFormDialog;
