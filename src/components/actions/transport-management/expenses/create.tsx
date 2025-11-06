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

const CreateExpenseFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementExpenses>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementExpenses)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Expense created successfully");
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
				open={searchParams.action === "createExpense"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Expense"
				description="Fill out the form to create a new Expense"
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
									description="Enter driver"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="trip">
							{(field) => (
								<field.TextField
									label="Trip"
									description="Enter trip"
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
									description="Select an option"
									options={[
										{ label: "Fuel", value: "fuel" },
										{ label: "Maintenance", value: "maintenance" },
										{ label: "Tolls", value: "tolls" },
										{ label: "Parking", value: "parking" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
									required
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
									description="Enter number"
									placeholder="0"
									min={0}
									required
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
									description="Select an option"
									options={[
										{ label: "PHP", value: "PHP" },
										{ label: "USD", value: "USD" },
										{ label: "EUR", value: "EUR" },
										{ label: "SGD", value: "SGD" },
									]}
									placeholder="Select..."
									required
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
									description="Enter number"
									placeholder="0"
									min={0}
									required
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
									description="Enter number"
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
									description="Select an option"
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

export default CreateExpenseFormDialog;
