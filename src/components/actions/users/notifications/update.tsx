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

const UpdateNotificationFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.Notifications, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.Notifications)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record || {}) as Update<Collections.Notifications>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.Notifications)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Notification updated successfully");
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
				open={searchParams.action === "updateNotification"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Notification"
				description="System notifications sent to users with message content, action links, and read status tracking"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="user">
							{(field) => (
								<field.TextField
									label="User"
									description="User receiving this notification"
									tooltip="e.g., 'USR-001', 'John Doe'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Message</FieldSeparator>

					{/* Message */}
					<FieldGroup>
						<FieldLegend>Message</FieldLegend>
						<FieldDescription>Manage message information</FieldDescription>

						<form.AppField name="message">
							{(field) => (
								<field.TextareaField
									label="Message"
									description="Content of the notification message"
									tooltip="e.g., 'Order #123 has been shipped'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Action</FieldSeparator>

					{/* Action */}
					<FieldGroup>
						<FieldLegend>Action</FieldLegend>
						<FieldDescription>Manage action information</FieldDescription>

						<form.AppField name="link">
							{(field) => (
								<field.TextField
									label="Link"
									description="URL link for notification action"
									tooltip="e.g., '/orders/123', '/dashboard'"
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

						<form.AppField name="isRead">
							{(field) => (
								<field.TextField
									label="Is Read"
									description="Whether the notification has been read"
									tooltip="e.g., true, false"
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

export default UpdateNotificationFormDialog;
