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

const UpdateSurchargeFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.BillingManagementSurcharges, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementSurcharges)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.BillingManagementSurcharges>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementSurcharges)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Surcharge updated successfully");
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
				open={searchParams.action === "updateSurcharge"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Surcharge"
				description="Defines additional charges that can be applied to services such as fuel surcharges, handling fees, or seasonal premiums with calculation methods and validity dates"
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
									description="A descriptive name for this surcharge"
									tooltip="e.g., 'Fuel Surcharge 2024', 'Holiday Premium', 'Hazmat Fee'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Calculation</FieldSeparator>

					{/* Calculation */}
					<FieldGroup>
						<FieldLegend>Calculation</FieldLegend>
						<FieldDescription>Manage calculation information</FieldDescription>

						<form.AppField name="calculationMethod">
							{(field) => (
								<field.SelectField
									label="Calculation Method"
									description="The method used to calculate the surcharge amount"
									tooltip="e.g., percentage, fixed, per-unit, sliding-scale"
									options={[
										{ label: "Percentage", value: "percentage" },
										{ label: "Fixed", value: "fixed" },
										{ label: "Per Unit", value: "per-unit" },
										{ label: "Sliding Scale", value: "sliding-scale" },
									]}
									placeholder="Select..."
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
									description="Mark whether this surcharge is currently being applied"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
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
									description="The fixed surcharge amount (for fixed calculation method)"
									tooltip="e.g., 5.5, 10, 25.75"
									placeholder="0"
									min={0}
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
								<field.TextField
									label="Type"
									description="Category or type of surcharge for reporting purposes"
									tooltip="e.g., 'fuel', 'handling', 'seasonal', 'hazmat'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Details</FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="description">
							{(field) => (
								<field.TextareaField
									label="Description"
									description="Detailed explanation of when and why this surcharge is applied"
									tooltip="e.g., 'Applied when fuel prices exceed $3 per liter', 'Holiday period premium'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Validity</FieldSeparator>

					{/* Validity */}
					<FieldGroup>
						<FieldLegend>Validity</FieldLegend>
						<FieldDescription>Manage validity information</FieldDescription>

						<form.AppField name="validFrom">
							{(field) => (
								<field.DateTimeField
									label="Valid From"
									description="The start date when this surcharge becomes effective"
									tooltip="e.g., 01/01/2024, 01/04/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="validTo">
							{(field) => (
								<field.DateTimeField
									label="Valid To"
									description="The end date when this surcharge expires or becomes inactive"
									tooltip="e.g., 12/31/2024, 03/31/2024"
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

export default UpdateSurchargeFormDialog;
