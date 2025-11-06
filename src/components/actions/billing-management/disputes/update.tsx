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

const UpdateDisputeFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.BillingManagementDisputes, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementDisputes)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.BillingManagementDisputes>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementDisputes)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Dispute updated successfully");
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
				open={searchParams.action === "updateDispute"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Dispute"
				description="Tracks invoice disputes with reason, status, and resolution tracking for dispute management workflow"
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
									description="The client who filed this dispute"
									tooltip="e.g., 'CLIENT-ABC', 'Enterprise Inc'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="lineItem">
							{(field) => (
								<field.TextField
									label="Line Item"
									description="The specific invoice line item being disputed"
									tooltip="e.g., 'ITEM-123', 'INV-001-LI-1'"
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

						<form.AppField name="reason">
							{(field) => (
								<field.TextareaField
									label="Reason"
									description="The reason why the client is disputing this charge"
									tooltip="e.g., 'Service not rendered as agreed', 'Incorrect quantity charged'"
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

						<form.AppField name="disputeAmount">
							{(field) => (
								<field.NumberField
									label="Dispute Amount"
									description="The amount being disputed"
									tooltip="e.g., 100, 500.50, 5000"
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
									description="The current status of the dispute resolution process"
									tooltip="e.g., open, under-review, approved, denied"
									options={[
										{ label: "Open", value: "open" },
										{ label: "Under Review", value: "under-review" },
										{ label: "Approved", value: "approved" },
										{ label: "Denied", value: "denied" },
										{ label: "Escalated", value: "escalated" },
										{ label: "Closed", value: "closed" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dates</FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="submittedAt">
							{(field) => (
								<field.DateTimeField
									label="Submitted At"
									description="The date when the dispute was filed"
									tooltip="e.g., 01/10/2024, 02/01/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="resolvedAt">
							{(field) => (
								<field.DateTimeField
									label="Resolved At"
									description="The date when the dispute was resolved"
									tooltip="e.g., 01/25/2024, 02/15/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Resolution</FieldSeparator>

					{/* Resolution */}
					<FieldGroup>
						<FieldLegend>Resolution</FieldLegend>
						<FieldDescription>Manage resolution information</FieldDescription>

						<form.AppField name="resolvedBy">
							{(field) => (
								<field.TextField
									label="Resolved By"
									description="The person who resolved this dispute"
									tooltip="e.g., 'John Doe', 'support@company.com'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="resolutionNotes">
							{(field) => (
								<field.TextareaField
									label="Resolution Notes"
									description="Details about how the dispute was resolved and any actions taken"
									tooltip="e.g., 'Credit issued for 50% of disputed amount', 'Service will be provided by date X'"
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

export default UpdateDisputeFormDialog;
