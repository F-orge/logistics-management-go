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
	CustomerRelationsCasesResponse,
	CustomerRelationsContactsResponse,
	CustomerRelationsInteractionsRecord,
	TypedPocketBase,
} from "@/lib/pb.types";
import {
	CreateInteractionsSchema,
	InteractionsSchema,
	UpdateInteractionsSchema,
} from "@/pocketbase/schemas/customer-relations";

export type InteractionsFormProps = {
	action?: "create" | "edit";
	pocketbase?: TypedPocketBase;
};

export const InteractionsForm = withForm({
	defaultValues: {} as z.infer<typeof InteractionsSchema>,
	props: {} as InteractionsFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* contact */}
				<form.AppField name="contact">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Contact"
							description="Contact involved in this interaction."
							tooltip="Select a contact"
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
				{/* case */}
				<form.AppField name="case">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Case"
							description="Associated case (optional)."
							tooltip="Select a case"
						>
							<field.RelationField<CustomerRelationsCasesResponse>
								collectionName={Collections.CustomerRelationsCases}
								relationshipName="case"
								renderOption={(item) => `${item.caseNumber}`}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* type */}
				<form.AppField name="type">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Type"
							description="Type of interaction."
							tooltip="Select interaction type"
						>
							<field.SelectField
								options={[
									{ label: "Call", value: "call" },
									{ label: "Meeting", value: "meeting" },
									{ label: "Text", value: "text" },
									{ label: "Email", value: "email" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* interactionDate */}
				<form.AppField name="interactionDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Interaction Date"
							description="Date and time of the interaction."
							tooltip="Select date and time"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* outcome */}
				<form.AppField name="outcome">
					{(field) => (
						<field.Field
							className="col-span-full"
							title="Outcome"
							description="Result or outcome of the interaction."
							tooltip="Describe the outcome"
						>
							<field.TextareaField rows={3} />
						</field.Field>
					)}
				</form.AppField>
				{/* notes */}
				<form.AppField name="notes">
					{(field) => (
						<field.Field
							className="col-span-full"
							title="Notes"
							description="Additional notes about the interaction."
							tooltip="Add detailed notes"
						>
							<field.TextareaField rows={3} />
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
							description="Upload files related to the interaction."
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

export const CreateInteractionsFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			contact: undefined,
			case: undefined,
			type: "call",
			interactionDate: new Date(),
			outcome: "",
			notes: "",
			attachments: [],
		} as Partial<z.infer<ReturnType<typeof CreateInteractionsSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsInteractions)
					.create(value);

				toast.success("Interaction created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to create interaction: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateInteractionsFormOption = (
	pocketbase: TypedPocketBase,
	record?: CustomerRelationsInteractionsRecord,
) =>
	formOptions({
		defaultValues: {
			...record,
			interactionDate: record?.interactionDate
				? new Date(record.interactionDate)
				: new Date(),
		} as Partial<z.infer<ReturnType<typeof UpdateInteractionsSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsInteractions)
					.update(record?.id!, value);

				toast.success("Interaction updated successfully!");

				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to update interaction: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
