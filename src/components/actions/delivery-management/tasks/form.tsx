import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { X } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { withForm } from "@/components/ui/forms";
import { InputGroupButton } from "@/components/ui/input-group";
import {
	Collections,
	DeliveryManagementRoutesResponse,
	DeliveryManagementTasksRecord,
	TypedPocketBase,
	WarehouseManagementPackagesResponse,
} from "@/lib/pb.types";
import {
	CreateTasksSchema,
	TasksSchema,
	UpdateTasksSchema,
} from "@/pocketbase/schemas/delivery-management/tasks";

export type TasksFormProps = {
	action?: "create" | "edit";
};

export const TasksForm = withForm({
	defaultValues: {} as z.infer<typeof TasksSchema>,
	props: {} as TasksFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* package - string (relation) */}
				<form.AppField name="package">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Package"
							description="Select the package for this task."
						>
							<field.RelationField<WarehouseManagementPackagesResponse>
								collectionName={Collections.WarehouseManagementPackages}
								relationshipName="package"
								renderOption={(item) => `${item.packageNumber}`}
								disabled={props.action === "edit"}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* route - string (relation) */}
				<form.AppField name="route">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Route"
							description="Select the delivery route."
						>
							<field.RelationField<DeliveryManagementRoutesResponse>
								collectionName={Collections.DeliveryManagementRoutes}
								relationshipName="route"
								renderOption={(item) => `${item.name}`}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* deliveryAddress - string */}
				<form.AppField name="deliveryAddress">
					{(field) => (
						<field.Field
							className="col-span-full"
							label="Delivery Address"
							description="Complete delivery address"
						>
							<field.TextareaField />
						</field.Field>
					)}
				</form.AppField>
				{/* recipientName - string */}
				<form.AppField name="recipientName">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Recipient Name"
							description="Name of recipient"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* recipientPhone - string */}
				<form.AppField name="recipientPhone">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Recipient Phone"
							description="Contact number"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* deliveryInstructions - string */}
				<form.AppField name="deliveryInstructions">
					{(field) => (
						<field.Field
							className="col-span-full"
							label="Delivery Instructions"
							description="Special instructions for delivery"
						>
							<field.TextareaField />
						</field.Field>
					)}
				</form.AppField>
				{/* estimatedArrivalTime - date */}
				<form.AppField name="estimatedArrivalTime">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Estimated Arrival Time"
							description="Expected delivery time"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* actualArrivalTime - date
        <form.AppField name="actualArrivalTime">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Actual Arrival Time"
              description="Actual delivery arrival time"
            >
              <field.DateTimeField />
            </field.Field>
          )}
        </form.AppField> */}
				{/* deliveryTime - date */}
				<form.AppField name="deliveryTime">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Delivery Time"
							description="Completion time of delivery"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* status - enum */}
				<form.AppField name="status">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Status"
							description="Current delivery status"
						>
							<field.SelectField
								options={[
									{ label: "Pending", value: "pending" },
									{ label: "Assigned", value: "assigned" },
									{ label: "Out for Delivery", value: "out-for-delivery" },
									{ label: "Delivered", value: "delivered" },
									{ label: "Failed", value: "failed" },
									{ label: "Cancelled", value: "cancelled" },
									{ label: "Rescheduled", value: "rescheduled" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* attempCount - number */}
				<form.AppField name="attempCount">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Attempt Count"
							description="Number of delivery attempts"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* failureReason - enum */}
				<form.AppField name="failureReason">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Failure Reason"
							description="Reason for delivery failure"
						>
							<field.SelectField
								options={[
									{ label: "Recipient Not Home", value: "recipient-not-home" },
									{ label: "Address Not Found", value: "address-not-found" },
									{ label: "Refused Delivery", value: "refused-delivery" },
									{ label: "Damaged Package", value: "damaged-package" },
									{ label: "Access Denied", value: "access-denied" },
									{ label: "Weather Conditions", value: "weather-conditions" },
									{ label: "Other", value: "other" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* attachments - file array */}
				{props.action === "create" && (
					<form.AppField name="attachments" mode="array">
						{(field) => (
							<field.Field
								className="col-span-full"
								label="Attachments"
								description="Upload proof or additional files"
							>
								<field.FileField />
							</field.Field>
						)}
					</form.AppField>
				)}
			</form.FieldSet>
		);
	},
});

export const CreateTasksFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			package: undefined,
			route: undefined,
			deliveryAddress: "",
			recipientName: "",
			recipientPhone: "",
			deliveryInstructions: "",
			estimatedArrivalTime: undefined,
			actualArrivalTime: undefined,
			deliveryTime: undefined,
			status: "pending",
			attempCount: 0,
			failureReason: undefined,
			attachments: [],
		} as Partial<z.infer<ReturnType<typeof CreateTasksSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.DeliveryManagementTasks)
					.create(value);

				toast.success("Task created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to create task: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateTasksFormOption = (
	pocketbase: TypedPocketBase,
	record?: DeliveryManagementTasksRecord,
) =>
	formOptions({
		defaultValues: {
			...record,
			deliveryTime: record?.deliveryTime
				? new Date(record.deliveryTime)
				: undefined,
			estimatedArrivalTime: record?.estimatedArrivalTime
				? new Date(record.estimatedArrivalTime)
				: undefined,
		} as Partial<z.infer<ReturnType<typeof UpdateTasksSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.DeliveryManagementTasks)
					.update(record?.id!, {
						...value,
						actualArrivalTime: value.status === "delivered" ? new Date() : null,
					});

				toast.success("Task updated successfully!");

				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to update task: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
