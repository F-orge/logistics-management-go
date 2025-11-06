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

const CreateRateRuleFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.BillingManagementRateRules>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementRateRules)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("RateRule created successfully");
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
				open={searchParams.action === "createRateRule"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create RateRule"
				description="Specifies conditional pricing rules for rate cards with support for different pricing models (per-kg, per-item, flat-rate, etc.) and priority-based application"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="rateCard">
							{(field) => (
								<field.TextField
									label="Rate Card"
									description="Select the rate card this rule applies to"
									tooltip="e.g., 'RC-2024-001', 'Shipping-Standard'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Rule Configuration</FieldSeparator>

					{/* Rule Configuration */}
					<FieldGroup>
						<FieldLegend>Rule Configuration</FieldLegend>
						<FieldDescription>
							Manage rule configuration information
						</FieldDescription>

						<form.AppField name="value">
							{(field) => (
								<field.TextField
									label="Value"
									description="The value that triggers this pricing rule to be applied"
									tooltip="e.g., '50', 'domestic', 'express'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="condition">
							{(field) => (
								<field.TextField
									label="Condition"
									description="The condition or criteria for when this rule should apply"
									tooltip="e.g., 'weight > 50', 'zone = domestic', 'shipment_type = express'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Pricing</FieldSeparator>

					{/* Pricing */}
					<FieldGroup>
						<FieldLegend>Pricing</FieldLegend>
						<FieldDescription>Manage pricing information</FieldDescription>

						<form.AppField name="price">
							{(field) => (
								<field.NumberField
									label="Price"
									description="The price amount for this rule based on the pricing model"
									tooltip="e.g., 25.50, 100, 1500"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="pricingModel">
							{(field) => (
								<field.SelectField
									label="Pricing Model"
									description="The calculation method used to apply this price"
									tooltip="e.g., per-kg, per-item, flat-rate, percentage"
									options={[
										{ label: "Per Kg", value: "per-kg" },
										{ label: "Per Item", value: "per-item" },
										{ label: "Flat Rate", value: "flat-rate" },
										{ label: "Per Cubic Meter", value: "per-cubic-meter" },
										{ label: "Per Zone", value: "per-zone" },
										{ label: "Percentage", value: "percentage" },
										{ label: "Tiered", value: "tiered" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Priority</FieldSeparator>

					{/* Priority */}
					<FieldGroup>
						<FieldLegend>Priority</FieldLegend>
						<FieldDescription>Manage priority information</FieldDescription>

						<form.AppField name="priority">
							{(field) => (
								<field.NumberField
									label="Priority"
									description="Priority order for rule application (lower numbers apply first)"
									tooltip="e.g., 1, 5, 10 (1 = highest priority)"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Range</FieldSeparator>

					{/* Range */}
					<FieldGroup>
						<FieldLegend>Range</FieldLegend>
						<FieldDescription>Manage range information</FieldDescription>

						<form.AppField name="minValue">
							{(field) => (
								<field.NumberField
									label="Min Value"
									description="Minimum threshold value for this rule to be applicable"
									tooltip="e.g., 1, 10, 100"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxValue">
							{(field) => (
								<field.NumberField
									label="Max Value"
									description="Maximum threshold value for this rule to be applicable"
									tooltip="e.g., 100, 1000, 5000"
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
									description="Mark whether this rule is currently active and should be applied"
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

export default CreateRateRuleFormDialog;
