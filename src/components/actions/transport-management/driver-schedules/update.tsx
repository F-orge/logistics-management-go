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

const UpdateDriverScheduleFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.TransportManagementDriverSchedules, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementDriverSchedules)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementDriverSchedules>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementDriverSchedules)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("DriverSchedule updated successfully");
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
				open={searchParams.action === "updateDriverSchedule"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update DriverSchedule"
				description="Manages driver availability schedules including vacations, sick leave, training, and personal time off"
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
									description="The driver this schedule applies to"
									tooltip="e.g., 'DRV-001', 'Juan Dela Cruz'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Period</FieldSeparator>

					{/* Period */}
					<FieldGroup>
						<FieldLegend>Period</FieldLegend>
						<FieldDescription>Manage period information</FieldDescription>

						<form.AppField name="startDate">
							{(field) => (
								<field.DateTimeField
									label="Start Date"
									description="The start date of this schedule period"
									tooltip="e.g., 01/15/2024, 02/01/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="endDate">
							{(field) => (
								<field.DateTimeField
									label="End Date"
									description="The end date of this schedule period"
									tooltip="e.g., 01/22/2024, 02/15/2024"
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
								<field.SelectField
									label="Reason"
									description="The reason for this schedule change"
									tooltip="e.g., 'vacation', 'sick-leave', 'training'"
									options={[
										{ label: "Vacation", value: "vacation" },
										{ label: "Sick Leave", value: "sick-leave" },
										{ label: "Training", value: "training" },
										{ label: "Personal Leave", value: "personal-leave" },
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

export default UpdateDriverScheduleFormDialog;
