import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import {
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
	Collections,
	Create,
	DeliveryManagementRoutesResponse,
	DeliveryManagementTasksRecord,
	TypedPocketBase,
	Update,
	WarehouseManagementPackagesResponse,
} from "@/lib/pb.types";
import { DeliveryManagementTasksSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = DeliveryManagementTasksSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.DeliveryManagementTasks>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.DeliveryManagementTasks)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Tasks created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: DeliveryManagementTasksRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.DeliveryManagementTasks>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.DeliveryManagementTasks)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Tasks updated successfully",
				})
				.unwrap();
		},
	});

export const TasksForm = withForm({
	defaultValues: {} as
		| Create<Collections.DeliveryManagementTasks>
		| Update<Collections.DeliveryManagementTasks>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Delivery Location */}
					<FieldGroup>
						<FieldLegend>Delivery Location</FieldLegend>
						<FieldDescription>
							Manage delivery location information
						</FieldDescription>

						<form.AppField name="deliveryAddress">
							{(field) => (
								<field.TextField
									label="Delivery Address"
									description="Address where delivery is to be made"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Package */}
					<FieldGroup>
						<FieldLegend>Package</FieldLegend>
						<FieldDescription>Manage package information</FieldDescription>

						<form.AppField name="package">
							{(field) => (
								<field.RelationField<WarehouseManagementPackagesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementPackages}
									relationshipName="package"
									label="Package"
									description="Package to be delivered"
									displayField="packageNumber"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Route */}
					<FieldGroup>
						<FieldLegend>Route</FieldLegend>
						<FieldDescription>Manage route information</FieldDescription>

						<form.AppField name="route">
							{(field) => (
								<field.RelationField<DeliveryManagementRoutesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.DeliveryManagementRoutes}
									relationshipName="route"
									label="Route"
									description="Delivery route"
									displayField="name"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Sequence */}
					<FieldGroup>
						<FieldLegend>Sequence</FieldLegend>
						<FieldDescription>Manage sequence information</FieldDescription>

						<form.AppField name="sequence">
							{(field) => (
								<field.NumberField
									label="Sequence"
									description="Order in which stop should be visited"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Current task status"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Assigned", value: "assigned" },
										{ label: "Out-for-delivery", value: "out-for-delivery" },
										{ label: "Delivered", value: "delivered" },
										{ label: "Failed", value: "failed" },
										{ label: "Cancelled", value: "cancelled" },
										{ label: "Rescheduled", value: "rescheduled" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Recipient */}
					<FieldGroup>
						<FieldLegend>Recipient</FieldLegend>
						<FieldDescription>Manage recipient information</FieldDescription>

						<form.AppField name="recipientName">
							{(field) => (
								<field.TextField
									label="Recipient Name"
									description="Recipient name"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="recipientPhone">
							{(field) => (
								<field.TextField
									label="Recipient Phone"
									description="Recipient phone number"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="deliveryTime">
							{(field) => (
								<field.DateTimeField
									label="Delivery Time"
									description="Scheduled delivery date"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="estimatedArrivalTime">
							{(field) => (
								<field.DateTimeField
									label="Estimated Arrival Time"
									description="Estimated arrival date"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="actualArrivalTime">
							{(field) => (
								<field.DateTimeField
									label="Actual Arrival Time"
									description="Actual arrival date"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Instructions */}
					<FieldGroup>
						<FieldLegend>Instructions</FieldLegend>
						<FieldDescription>Manage instructions information</FieldDescription>

						<form.AppField name="deliveryInstructions">
							{(field) => (
								<field.TextareaField
									label="Delivery Instructions"
									description="Special delivery instructions"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Failure */}
					<FieldGroup>
						<FieldLegend>Failure</FieldLegend>
						<FieldDescription>Manage failure information</FieldDescription>

						<form.AppField name="failureReason">
							{(field) => (
								<field.SelectField
									label="Failure Reason"
									description="Reason for failed delivery"
									options={[
										{
											label: "Reecipient-not-home",
											value: "reecipient-not-home",
										},
										{ label: "Address-not-found", value: "address-not-found" },
										{ label: "Refused-delivery", value: "refused-delivery" },
										{ label: "Damaged-package", value: "damaged-package" },
										{ label: "Access-denied", value: "access-denied" },
										{
											label: "Weather-conditions",
											value: "weather-conditions",
										},
										{ label: "Vehicle-breakdown", value: "vehicle-breakdown" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Attempts */}
					<FieldGroup>
						<FieldLegend>Attempts</FieldLegend>
						<FieldDescription>Manage attempts information</FieldDescription>

						<form.AppField name="attempCount">
							{(field) => (
								<field.NumberField
									label="Attemp Count"
									description="Number of delivery attempts"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Evidence */}
					<FieldGroup>
						<FieldLegend>Evidence</FieldLegend>
						<FieldDescription>Manage evidence information</FieldDescription>

						<form.AppField name="attachments">
							{(field) => (
								<field.TextField
									label="Attachments"
									description="Delivery proofs or documents"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</form.AppForm>
		);
	},
});

const CreateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const form = useAppForm(CreateFormOptionFactory(pocketbase));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<TasksForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

const UpdateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data: record } = useSuspenseQuery({
		queryKey: ["tasks", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.DeliveryManagementTasks)
				.getOne<DeliveryManagementTasksRecord>(searchQuery.id!),
	});

	const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<TasksForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

export default () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	switch (searchQuery.action) {
		case "create":
			return <CreateForm />;
		case "update":
			return <UpdateForm />;
		default:
			return null;
	}
};
