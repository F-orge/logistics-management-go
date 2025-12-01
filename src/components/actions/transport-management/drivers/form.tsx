import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
	Collections,
	TransportManagementDriversRecord,
	TypedPocketBase,
	UsersResponse,
} from "@/lib/pb.types";
import {
	CreateDriversSchema,
	DriversSchema,
	UpdateDriversSchema,
} from "@/pocketbase/schemas/transport-management/drivers";

export type DriversFormProps = {
	action?: "create" | "edit";
};

export const DriversForm = withForm({
	defaultValues: {} as z.infer<typeof DriversSchema>,
	props: {} as DriversFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* user - string (relation) */}
				<form.AppField name="user">
					{(field) => (
						<field.Field
							className="col-span-full"
							label="User Account"
							description="Associated user account for this driver"
						>
							<field.RelationField<UsersResponse>
								collectionName={Collections.Users}
								relationshipName="user"
								renderOption={(item) => `${item.name}`}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* licenseNumber - string */}
				<form.AppField name="licenseNumber">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="License Number"
							description="Driver's license number"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* licenseExpiryDate - date */}
				<form.AppField name="licenseExpiryDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="License Expiry Date"
							description="When the license expires"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* status - enum */}
				<form.AppField name="status">
					{(field) => (
						<field.Field
							className="col-span-full"
							label="Status"
							description="Driver employment status"
						>
							<field.SelectField
								options={[
									{ label: "Active", value: "active" },
									{ label: "Inactive", value: "inactive" },
									{ label: "On Leave", value: "on-leave" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
			</form.FieldSet>
		);
	},
});

export const CreateDriversFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			user: undefined,
			licenseNumber: "",
			licenseExpiryDate: undefined,
			status: "active",
			schedules: [],
		} as Partial<z.infer<ReturnType<typeof CreateDriversSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementDrivers)
					.create(value);

				toast.success("Driver created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to create driver: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateDriversFormOption = (
	pocketbase: TypedPocketBase,
	record?: TransportManagementDriversRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateDriversSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementDrivers)
					.update(record?.id!, value);

				toast.success("Driver updated successfully!");

				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to update driver: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
