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
	CustomerRelationsCampaignsRecord,
	TypedPocketBase,
} from "@/lib/pb.types";
import {
	CampaignsSchema,
	CreateCampaignsSchema,
	UpdateCampaignsSchema,
} from "@/pocketbase/schemas/customer-relations";

export type CampaignFormProps = {
	action?: "create" | "edit";
};

export const CampaignForm = withForm({
	defaultValues: {} as z.infer<typeof CampaignsSchema>,
	props: {} as CampaignFormProps,
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
							className="col-span-full"
							tooltip="Example: Holiday Sale 2025"
							title="Name"
							description="The campaign name used to identify this campaign in lists and reports."
						>
							<field.TextField showClearButton />
						</field.Field>
					)}
				</form.AppField>
				{/* budget */}
				<form.AppField name="budget">
					{(field) => (
						<field.Field
							className="col-span-full"
							tooltip="Example: 10000"
							title="Budget"
							description="The total monetary budget allocated to this campaign (numeric value)."
						>
							<field.NumberField addonStart="₱" />
						</field.Field>
					)}
				</form.AppField>
				{/* startDate */}
				<form.AppField name="startDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							tooltip="Example: 2025-12-01T00:00:00Z"
							title="Start Date"
							description="The start date and time when this campaign becomes active."
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* endDate */}
				<form.AppField name="endDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							tooltip="Example: 2026-01-01T00:00:00Z"
							title="End Date"
							description="The end date and time when this campaign stops being active."
						>
							<field.DateTimeField />
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

export const CreateCampaignsFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			name: "",
			budget: 0,
			startDate: new Date(),
			endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			attachments: [],
		} as Partial<z.infer<ReturnType<typeof CreateCampaignsSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsCampaigns)
					.create(value);

				toast.success("Campaign created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });

					toast.error(
						`Failed to create campaign: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateCampaignsFormOption = (
	pocketbase: TypedPocketBase,
	record?: CustomerRelationsCampaignsRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateCampaignsSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsCampaigns)
					.update(record?.id!, value);

				toast.success("Campaign updated successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });

					toast.error(
						`Failed to update campaign: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
