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
	CustomerRelationsCompaniesResponse,
	CustomerRelationsContactsRecord,
	TypedPocketBase,
} from "@/lib/pb.types";
import {
	ContactsSchema,
	CreateContactsSchema,
	UpdateContactsSchema,
} from "@/pocketbase/schemas/customer-relations";

export type ContactsFormProps = {
	action?: "create" | "edit";
};

export const ContactsForm = withForm({
	defaultValues: {} as z.infer<typeof ContactsSchema>,
	props: {} as ContactsFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* name */}
				<form.AppField name="name">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Full Name"
							description="Full name of the contact."
							tooltip="Example: John Doe"
						>
							<field.TextField showClearButton />
						</field.Field>
					)}
				</form.AppField>
				{/* email */}
				<form.AppField name="email">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Email"
							description="Contact email address."
							tooltip="Example: john@example.com"
						>
							<field.EmailField />
						</field.Field>
					)}
				</form.AppField>
				{/* phoneNumber */}
				<form.AppField name="phoneNumber">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Phone Number"
							description="Contact phone number."
							tooltip="Example: +63 917 123 4567"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* jobTitle */}
				<form.AppField name="jobTitle">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Job Title"
							description="Contact's job position or title."
							tooltip="Example: Sales Manager"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* company */}
				<form.AppField name="company">
					{(field) => (
						<field.Field
							className="col-span-full"
							title="Company"
							description="Company associated with this contact."
							tooltip="Select a company"
						>
							<field.RelationField<CustomerRelationsCompaniesResponse>
								collectionName={Collections.CustomerRelationsCompanies}
								relationshipName="company"
								renderOption={(item) => `${item.name}`}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* attachments */}
				{props.action === "create" && (
					<>
						<FieldSeparator className="col-span-full" />
						<form.FieldSet
							className="col-span-full"
							legend="Attachments"
							description="Upload files related to the contact."
						>
							<form.AppField name="attachments" mode="array">
								{(field) => (
									<>
										{field.state.value?.map((_, index) => (
											<form.AppField key={index} name={`attachments[${index}]`}>
												{(subField) => (
													<subField.Field className="mb-2">
														<subField.FileField>
															<InputGroupButton
																onClick={() => field.removeValue(index)}
																aria-label={`Remove attachment ${index + 1}`}
															>
																<X />
															</InputGroupButton>
														</subField.FileField>
													</subField.Field>
												)}
											</form.AppField>
										))}
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => field.pushValue(undefined as any)}
										>
											Add Attachments
										</Button>
									</>
								)}
							</form.AppField>
						</form.FieldSet>
					</>
				)}
			</form.FieldSet>
		);
	},
});

export const CreateContactsFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
			jobTitle: "",
			company: undefined,
			attachments: [],
		} as Partial<z.infer<ReturnType<typeof CreateContactsSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsContacts)
					.create({
						...value,
						owner: pocketbase.authStore.record?.id,
					});

				toast.success("Contact created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to create contact: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateContactsFormOption = (
	pocketbase: TypedPocketBase,
	record?: CustomerRelationsContactsRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateContactsSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsContacts)
					.update(record?.id!, value);

				toast.success("Contact updated successfully!");

				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to update contact: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
