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
	CustomerRelationsProductsRecord,
	TypedPocketBase,
} from "@/lib/pb.types";
import {
	CreateProductsSchema,
	ProductsSchema,
	UpdateProductsSchema,
} from "@/pocketbase/schemas/customer-relations";

export type ProductsFormProps = {
	action?: "create" | "edit";
};

export const ProductsForm = withForm({
	defaultValues: {} as z.infer<typeof ProductsSchema>,
	props: {} as ProductsFormProps,
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
							title="Name"
							description="The product name used to identify this product."
							tooltip="Example: Product ABC"
						>
							<field.TextField showClearButton />
						</field.Field>
					)}
				</form.AppField>
				{/* sku */}
				<form.AppField name="sku">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="SKU"
							description="Stock Keeping Unit - unique identifier for inventory tracking."
							tooltip="Example: SKU-2025-001"
						>
							<field.TextField showClearButton />
						</field.Field>
					)}
				</form.AppField>
				{/* price */}
				<form.AppField name="price">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Price"
							description="The base price of the product."
							tooltip="Example: 1500"
						>
							<field.NumberField addonStart="₱" />
						</field.Field>
					)}
				</form.AppField>
				{/* type */}
				<form.AppField name="type">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Type"
							description="The type of product or service."
							tooltip="Select a type"
						>
							<field.SelectField
								options={[
									{ label: "Service", value: "service" },
									{ label: "Good", value: "good" },
									{ label: "Digital", value: "digital" },
									{ label: "Subscription", value: "subscription" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* description */}
				<form.AppField name="description">
					{(field) => (
						<field.Field
							className="col-span-full"
							title="Description"
							description="Detailed description of the product or service."
							tooltip="Provide a detailed description"
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
							description="Upload files related to the product."
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

export const CreateProductsFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			name: "",
			sku: "",
			price: undefined,
			type: "service",
			description: "",
			attachments: [],
		} as Partial<z.infer<ReturnType<typeof CreateProductsSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsProducts)
					.create(value);

				toast.success("Product created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to create product: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateProductsFormOption = (
	pocketbase: TypedPocketBase,
	record?: CustomerRelationsProductsRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateProductsSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsProducts)
					.update(record?.id!, value);

				toast.success("Product updated successfully!");

				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });

					toast.error(
						`Failed to update product: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
