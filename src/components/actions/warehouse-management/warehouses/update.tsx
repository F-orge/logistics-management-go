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
				description="Edit Warehouse information"
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
									description="Enter name"
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
									description="Enter address"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="city">
							{(field) => (
								<field.TextField
									label="City"
									description="Enter city"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="state">
							{(field) => (
								<field.TextField
									label="State"
									description="Enter state"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="country">
							{(field) => (
								<field.TextField
									label="Country"
									description="Enter country"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="postalCode">
							{(field) => (
								<field.TextField
									label="Postal Code"
									description="Enter postalcode"
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
									description="Enter contactperson"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="contactPhone">
							{(field) => (
								<field.TextField
									label="Contact Phone"
									description="Enter contactphone"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="contactEmail">
							{(field) => (
								<field.EmailField
									label="Contact Email"
									description="Enter email address"
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
									description="Enter timezone"
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
									description="Enter isactive"
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
