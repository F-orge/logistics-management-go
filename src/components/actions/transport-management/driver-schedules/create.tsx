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

const CreateDriverScheduleFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementDriverSchedules>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementDriverSchedules)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("DriverSchedule created successfully");
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
				open={searchParams.action === "createDriverSchedule"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create DriverSchedule"
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
									required
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
									required
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
									required
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

export default CreateDriverScheduleFormDialog;
