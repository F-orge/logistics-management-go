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

const CreateSalesOrderFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementSalesOrders>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementSalesOrders)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("SalesOrder created successfully");
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
				open={searchParams.action === "createSalesOrder"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create SalesOrder"
				description="Records customer sales orders with status tracking from pending through delivery"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="The customer placing the order"
									tooltip="e.g., 'CLI-001', 'ABC Company'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="opportunity">
							{(field) => (
								<field.TextField
									label="Opportunity"
									description="Related sales opportunity"
									tooltip="e.g., 'OPP-001', 'Deal-123'"
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

						<form.AppField name="orderNumber">
							{(field) => (
								<field.TextField
									label="Order Number"
									description="Unique sales order number"
									tooltip="e.g., 'SO-2024-001', 'ORD-789'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Address</FieldSeparator>

					{/* Address */}
					<FieldGroup>
						<FieldLegend>Address</FieldLegend>
						<FieldDescription>Manage address information</FieldDescription>

						<form.AppField name="shippingAddress">
							{(field) => (
								<field.TextField
									label="Shipping Address"
									description="Delivery address for this order"
									tooltip="e.g., '123 Main St, Manila, PH'"
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
									description="Current status of the order"
									tooltip="e.g., 'pending', 'processing', 'shipped'"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Processing", value: "processing" },
										{ label: "Ready", value: "ready" },
										{ label: "Shipped", value: "shipped" },
										{ label: "Delivered", value: "delivered" },
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

export default CreateSalesOrderFormDialog;
