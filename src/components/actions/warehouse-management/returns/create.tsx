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

const CreateReturnFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementReturns>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementReturns)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Return created successfully");
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
				open={searchParams.action === "createReturn"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Return"
				description="Tracks product returns from customers with reason, status, and approval workflow"
			>
				<FieldSet>
					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="returnNumber">
							{(field) => (
								<field.TextField
									label="Return Number"
									description="Unique return number"
									tooltip="e.g., 'RET-2024-001', 'RTN-789'"
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
									description="Original sales order being returned"
									tooltip="e.g., 'SO-2024-001', 'ORD-789'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="Customer initiating the return"
									tooltip="e.g., 'CLI-001', 'ABC Company'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Reason</FieldSeparator>

					{/* Reason */}
					<FieldGroup>
						<FieldLegend>Reason</FieldLegend>
						<FieldDescription>Manage reason information</FieldDescription>

						<form.AppField name="reason">
							{(field) => (
								<field.TextareaField
									label="Reason"
									description="Reason for the return"
									tooltip="e.g., 'Defective', 'Wrong item sent', 'Not as described'"
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
									description="Current status of the return"
									tooltip="e.g., 'initiated', 'received', 'approved'"
									options={[
										{ label: "Initiated", value: "initiated" },
										{ label: "Received", value: "received" },
										{ label: "Inspecting", value: "inspecting" },
										{ label: "Approved", value: "approved" },
										{ label: "Rejected", value: "rejected" },
										{ label: "Processed", value: "processed" },
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

export default CreateReturnFormDialog;
