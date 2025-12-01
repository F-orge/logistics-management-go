import { faker } from "@faker-js/faker";
import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult, useRouteContext } from "@tanstack/react-router";
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
	CustomerRelationsCasesRecord,
	CustomerRelationsContactsResponse,
	TypedPocketBase,
} from "@/lib/pb.types";
import {
	CasesSchema,
	CreateCasesSchema,
	UpdateCasesSchema,
} from "@/pocketbase/schemas/customer-relations";

export type CasesFormProps = {
	action?: "create" | "edit";
};

export const CasesForm = withForm({
	defaultValues: {} as z.infer<typeof CasesSchema>,
	props: {} as CasesFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* case number */}
				<form.AppField name="caseNumber">
					{(field) => (
						<field.Field
							className="col-span-full"
							label="Case Number"
							description="Unique identifier for the case."
							tooltip="Should be example: CASE-DATE-12345"
						>
							<field.TextField disabled={true} />
						</field.Field>
					)}
				</form.AppField>
				{/* status */}
				<form.AppField name="status">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Status"
							description="Current status of the case."
							tooltip="Select the current status of the case."
						>
							<field.SelectField
								options={[
									{
										label: "New",
										value: "new",
									},
									{ label: "In Progress", value: "in-progress" },
									{
										label: "Waiting for Customer",
										value: "waiting-for-customer",
									},
									{
										label: "Waiting for Internal",
										value: "waiting-for-internal",
									},
									{ label: "Escalated", value: "escalated" },
									{ label: "Resolved", value: "resolved" },
									{ label: "Closed", value: "closed" },
									{ label: "Cancelled", value: "cancelled" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* priority */}
				<form.AppField name="priority">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Priority"
							description="Priority level of the case."
							tooltip="Select the priority level."
						>
							<field.SelectField
								options={[
									{ label: "Critical", value: "critical" },
									{ label: "High", value: "high" },
									{ label: "Medium", value: "medium" },
									{ label: "Low", value: "low" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* type */}
				<form.AppField name="type">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Type"
							description="Type of the case."
							tooltip="Select the type of case."
						>
							<field.SelectField
								options={[
									{ label: "Question", value: "question" },
									{ label: "Problem", value: "problem" },
									{ label: "Complaint", value: "complaint" },
									{ label: "Feature Request", value: "feature-request" },
									{ label: "Bug Report", value: "bug-report" },
									{ label: "Technical Support", value: "technical-support" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* contact */}
				<form.AppField name="contact">
					{(field) => (
						<field.Field
							className="col-span-full"
							label="Contact"
							description="Contact associated with the case."
							tooltip="Enter the contact information."
						>
							<field.RelationField<CustomerRelationsContactsResponse>
								collectionName={Collections.CustomerRelationsContacts}
								relationshipName="contact"
								renderOption={(item) =>
									`${item.name} ${item.phoneNumber} (${item.email})`
								}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* description */}
				<form.AppField name="description">
					{(field) => (
						<field.Field
							label="Description"
							description="Detailed description of the case."
							tooltip="Provide a detailed description."
							className="col-span-full"
						>
							<field.TextareaField rows={5} />
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
							description="Upload files related to the campaign."
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

export const CreateCasesFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			status: "new",
			priority: "medium",
			type: "question",
			caseNumber: faker.helpers.replaceSymbols(
				`CASE-${new Date().toISOString().slice(0, 10)}-#####`,
			),
			contact: undefined,
			description: "",
			owner: pocketbase.authStore.record?.id,
			attachments: [],
		} as Partial<z.infer<ReturnType<typeof CreateCasesSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsCases)
					.create(value);

				toast.success("Case created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to create case: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateCasesFormOption = (
	pocketbase: TypedPocketBase,
	record?: CustomerRelationsCasesRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateCasesSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsCases)
					.update(record?.id!, value);

				toast.success("Case updated successfully!");

				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to update case: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
