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

const UpdateProofOfDeliveryFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [
			Collections.DeliveryManagementProofOfDeliveries,
			searchParams.id,
		],
		queryFn: () =>
			pocketbase
				.collection(Collections.DeliveryManagementProofOfDeliveries)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.DeliveryManagementProofOfDeliveries>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.DeliveryManagementProofOfDeliveries)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("ProofOfDelivery updated successfully");
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
				open={searchParams.action === "updateProofOfDelivery"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update ProofOfDelivery"
				description="Records delivery confirmations with recipient signatures, GPS coordinates, and timestamps for accountability"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="task">
							{(field) => (
								<field.TextField
									label="Task"
									description="The delivery task this proof is for"
									tooltip="e.g., 'TASK-001', 'DLV-456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timestamp</FieldSeparator>

					{/* Timestamp */}
					<FieldGroup>
						<FieldLegend>Timestamp</FieldLegend>
						<FieldDescription>Manage timestamp information</FieldDescription>

						<form.AppField name="timestamp">
							{(field) => (
								<field.DateTimeField
									label="Timestamp"
									description="Date and time when delivery was confirmed"
									tooltip="e.g., 01/15/2024 10:35 AM, 02/01/2024 15:00"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Recipient</FieldSeparator>

					{/* Recipient */}
					<FieldGroup>
						<FieldLegend>Recipient</FieldLegend>
						<FieldDescription>Manage recipient information</FieldDescription>

						<form.AppField name="recipientName">
							{(field) => (
								<field.TextField
									label="Recipient Name"
									description="Name of the person who received the package"
									tooltip="e.g., 'John Doe', 'ABC Corporation'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Location</FieldSeparator>

					{/* Location */}
					<FieldGroup>
						<FieldLegend>Location</FieldLegend>
						<FieldDescription>Manage location information</FieldDescription>

						<form.AppField name="coordinates">
							{(field) => (
								<field.TextField
									label="Coordinates"
									description="GPS coordinates in latitude,longitude format"
									tooltip="e.g., '14.5995,120.9842', '14.6091,121.0175'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Signature</FieldSeparator>

					{/* Signature */}
					<FieldGroup>
						<FieldLegend>Signature</FieldLegend>
						<FieldDescription>Manage signature information</FieldDescription>

						<form.AppField name="signatureUrl">
							{(field) => (
								<field.TextField
									label="Signature Url"
									description="URL or data of recipient signature"
									tooltip="e.g., 'https://...', 'Base64 encoded data'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Notes</FieldSeparator>

					{/* Notes */}
					<FieldGroup>
						<FieldLegend>Notes</FieldLegend>
						<FieldDescription>Manage notes information</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Additional notes about the delivery"
									tooltip="e.g., 'Left at doorstep', 'Handed to building guard'"
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

export default UpdateProofOfDeliveryFormDialog;
