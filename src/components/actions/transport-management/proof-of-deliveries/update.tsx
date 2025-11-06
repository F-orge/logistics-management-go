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
			Collections.TransportManagementProofOfDeliveries,
			searchParams.id,
		],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementProofOfDeliveries)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementProofOfDeliveries>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementProofOfDeliveries)
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
				description="Proof of delivery records including GPS coordinates, signatures, and delivery confirmation"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="tripStop">
							{(field) => (
								<field.TextField
									label="Trip Stop"
									description="The trip stop this delivery proof is for"
									tooltip="e.g., 'STOP-001', 'TRIP-001-S1'"
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

						<form.AppField name="coordinate">
							{(field) => (
								<field.TextField
									label="Coordinate"
									description="GPS coordinates of delivery in latitude,longitude format"
									tooltip="e.g., '14.5995,120.9842', '14.6091,121.0175'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timing</FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="deliveryTime">
							{(field) => (
								<field.DateTimeField
									label="Delivery Time"
									description="The date and time of delivery"
									tooltip="e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45"
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
									description="Name of person who received the package"
									tooltip="e.g., 'John Doe', 'ABC Corporation'"
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

						<form.AppField name="signatureData">
							{(field) => (
								<field.TextField
									label="Signature Data"
									description="Digital signature or signature image data"
									tooltip="e.g., 'Base64 encoded signature', 'URL to signature image'"
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
									description="Additional delivery notes or conditions"
									tooltip="e.g., 'Package left at gate', 'Recipient verified identity'"
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
