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

const UpdateWarehouseFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.WarehouseManagementWarehouses, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementWarehouses)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementWarehouses>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementWarehouses)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Warehouse updated successfully");
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
				open={searchParams.action === "updateWarehouse"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Warehouse"
				description="Stores warehouse facility information including addresses, contact details, timezone, and operational status"
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
									description="The name of the warehouse facility"
									tooltip="e.g., 'Manila Warehouse', 'Cebu Distribution Center'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Address</FieldSeparator>

					{/* Address */}
					<FieldGroup>
						<FieldLegend>Address</FieldLegend>
						<FieldDescription>Manage address information</FieldDescription>

						<form.AppField name="address">
							{(field) => (
								<field.TextField
									label="Address"
									description="The street address of the warehouse"
									tooltip="e.g., '123 Main Street', 'Block A Building 1'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="city">
							{(field) => (
								<field.TextField
									label="City"
									description="The city where the warehouse is located"
									tooltip="e.g., 'Manila', 'Cebu City', 'Davao'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="state">
							{(field) => (
								<field.TextField
									label="State"
									description="The state or province where the warehouse is located"
									tooltip="e.g., 'Metro Manila', 'Cebu', 'Davao del Sur'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="country">
							{(field) => (
								<field.TextField
									label="Country"
									description="The country where the warehouse is located"
									tooltip="e.g., 'Philippines', 'Vietnam', 'Thailand'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="postalCode">
							{(field) => (
								<field.TextField
									label="Postal Code"
									description="The postal code of the warehouse location"
									tooltip="e.g., '1200', '6000', '8000'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Contact Information</FieldSeparator>

					{/* Contact Information */}
					<FieldGroup>
						<FieldLegend>Contact Information</FieldLegend>
						<FieldDescription>
							Manage contact information information
						</FieldDescription>

						<form.AppField name="contactPerson">
							{(field) => (
								<field.TextField
									label="Contact Person"
									description="Name of the main contact person for this warehouse"
									tooltip="e.g., 'John Doe', 'Maria Garcia'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="contactPhone">
							{(field) => (
								<field.TextField
									label="Contact Phone"
									description="Phone number for warehouse contact"
									tooltip="e.g., '+63 2 1234-5678', '09123456789'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="contactEmail">
							{(field) => (
								<field.EmailField
									label="Contact Email"
									description="Email address for warehouse contact"
									tooltip="e.g., 'manager@warehouse.com', 'contact@logistics.com'"
									placeholder="example@email.com"
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Operational Settings</FieldSeparator>

					{/* Operational Settings */}
					<FieldGroup>
						<FieldLegend>Operational Settings</FieldLegend>
						<FieldDescription>
							Manage operational settings information
						</FieldDescription>

						<form.AppField name="timezone">
							{(field) => (
								<field.TextField
									label="Timezone"
									description="The timezone for warehouse operations"
									tooltip="e.g., 'UTC+8', 'Asia/Manila'"
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
									description="Whether this warehouse is currently active and operational"
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

export default UpdateWarehouseFormDialog;
