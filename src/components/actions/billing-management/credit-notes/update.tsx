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

const UpdateCreditNoteFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.BillingManagementCreditNotes, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementCreditNotes)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.BillingManagementCreditNotes>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementCreditNotes)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("CreditNote updated successfully");
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
				open={searchParams.action === "updateCreditNote"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update CreditNote"
				description="Issues credit to clients for returns, service failures, or adjustments with tracking of original invoices and disputes"
			>
				<FieldSet>
					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="creditNoteNumber">
							{(field) => (
								<field.TextField
									label="Credit Note Number"
									description="Unique identifier for this credit note"
									tooltip="e.g., 'CN-2024-001', 'CR-789456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Reference</FieldSeparator>

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="invoice">
							{(field) => (
								<field.TextField
									label="Invoice"
									description="Reference to the original invoice being credited"
									tooltip="e.g., 'INV-2024-001', 'BL-789'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="dispute">
							{(field) => (
								<field.TextField
									label="Dispute"
									description="Reference to the related dispute that triggered this credit"
									tooltip="e.g., 'DSP-001', 'DSP-2024-456'"
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
									description="The reason for issuing this credit note"
									tooltip="e.g., 'Damaged shipment returned', 'Service not rendered as specified'"
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
									description="The credit amount being issued"
									tooltip="e.g., 100, 500.50, 5000"
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
								<field.TextField
									label="Currency"
									description="The currency in which the credit is issued"
									tooltip="e.g., 'PHP', 'USD', 'SGD'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dates</FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="issueDate">
							{(field) => (
								<field.DateTimeField
									label="Issue Date"
									description="The date when the credit note was issued"
									tooltip="e.g., 01/15/2024, 02/01/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="appliedAt">
							{(field) => (
								<field.DateTimeField
									label="Applied At"
									description="The date when the credit was applied to the client account"
									tooltip="e.g., 01/20/2024, 02/10/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Additional Information</FieldSeparator>

					{/* Additional Information */}
					<FieldGroup>
						<FieldLegend>Additional Information</FieldLegend>
						<FieldDescription>
							Manage additional information information
						</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Additional notes about this credit note or resolution"
									tooltip="e.g., 'Applied to next invoice', 'Refund processed'"
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

export default UpdateCreditNoteFormDialog;
