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

const UpdateExpenseFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.TransportManagementExpenses, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementExpenses)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementExpenses>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementExpenses)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Expense updated successfully");
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
				open={searchParams.action === "updateExpense"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Expense"
				description="Driver or trip-related expenses such as fuel, maintenance, tolls, and parking for reimbursement tracking"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="driver">
							{(field) => (
								<field.TextField
									label="Driver"
									description="The driver who incurred this expense"
									tooltip="e.g., 'DRV-001', 'Juan Dela Cruz'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="trip">
							{(field) => (
								<field.TextField
									label="Trip"
									description="The trip or delivery this expense relates to"
									tooltip="e.g., 'TRIP-2024-001', 'DLV-456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Type</FieldSeparator>

					{/* Type */}
					<FieldGroup>
						<FieldLegend>Type</FieldLegend>
						<FieldDescription>Manage type information</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="The category of expense"
									tooltip="e.g., 'fuel', 'maintenance', 'tolls', 'parking'"
									options={[
										{ label: "Fuel", value: "fuel" },
										{ label: "Maintenance", value: "maintenance" },
										{ label: "Tolls", value: "tolls" },
										{ label: "Parking", value: "parking" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Amount</FieldSeparator>

					{/* Amount */}
					<FieldGroup>
						<FieldLegend>Amount</FieldLegend>
						<FieldDescription>Manage amount information</FieldDescription>

						<form.AppField name="amount">
							{(field) => (
								<field.NumberField
									label="Amount"
									description="The amount spent"
									tooltip="e.g., 500, 1500.50, 5000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Currency</FieldSeparator>

					{/* Currency */}
					<FieldGroup>
						<FieldLegend>Currency</FieldLegend>
						<FieldDescription>Manage currency information</FieldDescription>

						<form.AppField name="currency">
							{(field) => (
								<field.SelectField
									label="Currency"
									description="The currency of the expense"
									tooltip="e.g., 'PHP', 'USD', 'EUR'"
									options={[
										{ label: "PHP", value: "PHP" },
										{ label: "USD", value: "USD" },
										{ label: "EUR", value: "EUR" },
										{ label: "SGD", value: "SGD" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Vehicle Data</FieldSeparator>

					{/* Vehicle Data */}
					<FieldGroup>
						<FieldLegend>Vehicle Data</FieldLegend>
						<FieldDescription>Manage vehicle data information</FieldDescription>

						<form.AppField name="odometerReading">
							{(field) => (
								<field.NumberField
									label="Odometer Reading"
									description="The vehicle odometer reading at the time of expense"
									tooltip="e.g., 12500, 45678.5, 98765"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Fuel</FieldSeparator>

					{/* Fuel */}
					<FieldGroup>
						<FieldLegend>Fuel</FieldLegend>
						<FieldDescription>Manage fuel information</FieldDescription>

						<form.AppField name="fuelQuantity">
							{(field) => (
								<field.NumberField
									label="Fuel Quantity"
									description="Quantity of fuel purchased in liters (if fuel expense)"
									tooltip="e.g., 10, 25.5, 50"
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

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="The reimbursement status of this expense"
									tooltip="e.g., 'pending', 'approved', 'reimbursed'"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Approved", value: "approved" },
										{ label: "Reimbursed", value: "reimbursed" },
										{ label: "Rejected", value: "rejected" },
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

export default UpdateExpenseFormDialog;
