import { faker } from "@faker-js/faker";
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
	Create,
	CustomerRelationsInvoicesRecord,
	CustomerRelationsOpportunitiesResponse,
	TypedPocketBase,
} from "@/lib/pb.types";
import {
	CreateInvoicesSchema,
	InvoicesSchema,
	UpdateInvoicesSchema,
} from "@/pocketbase/schemas/customer-relations";
import { InvoiceItemsForm } from "../invoice-items/form";

export type InvoicesFormProps = {
	action?: "create" | "edit";
};

export const InvoicesForm = withForm({
	defaultValues: {} as z.infer<typeof InvoicesSchema>,
	props: {} as InvoicesFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* invoiceNumber */}
				<form.AppField name="invoiceNumber">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Invoice Number"
							description="Unique identifier for this invoice."
							tooltip="Example: INV-2025-001"
						>
							<field.TextField disabled />
						</field.Field>
					)}
				</form.AppField>
				{/* status */}
				<form.AppField name="status">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Status"
							description="Current status of the invoice."
							tooltip="Select invoice status"
						>
							<field.SelectField
								options={[
									{ label: "Draft", value: "draft" },
									{ label: "Sent", value: "sent" },
									{ label: "Paid", value: "paid" },
									{ label: "Overdue", value: "overdue" },
									{ label: "Cancelled", value: "cancelled" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* issueDate */}
				<form.AppField name="issueDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Issue Date"
							description="Date when invoice was created."
							tooltip="Select issue date"
						>
							<field.DateTimeField disabled />
						</field.Field>
					)}
				</form.AppField>
				{/* dueDate */}
				<form.AppField name="dueDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Due Date"
							description="Payment due date."
							tooltip="Select due date"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* total */}
				<form.AppField name="total">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Total Amount"
							description="Total invoice amount."
							tooltip="Example: 50000"
						>
							<field.NumberField addonStart="₱" disabled />
						</field.Field>
					)}
				</form.AppField>
				{/* paymentMethod */}
				<form.AppField name="paymentMethod">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Payment Method"
							description="Preferred method of payment."
							tooltip="Select payment method"
						>
							<field.SelectField
								options={[
									{ label: "Credit Card", value: "credit-card" },
									{ label: "Bank Transfer", value: "bank-transfer" },
									{ label: "Cash", value: "cash" },
									{ label: "Check", value: "check" },
									{ label: "PayPal", value: "paypal" },
									{ label: "Stripe", value: "stripe" },
									{ label: "Wire Transfer", value: "wire-transfer" },
									{ label: "GCash", value: "gcash" },
									{ label: "Maya", value: "maya" },
									{ label: "Other", value: "other" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* opportunity */}
				<form.AppField name="opportunity">
					{(field) => (
						<field.Field
							className="col-span-full"
							title="Opportunity"
							description="Related sales opportunity (optional)."
							tooltip="Select opportunity"
						>
							<field.RelationField<CustomerRelationsOpportunitiesResponse>
								collectionName={Collections.CustomerRelationsOpportunities}
								relationshipName="opportunity"
								renderOption={(item) => `${item.name}`}
								disabled={props.action === "edit"}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* sentAt */}
				<form.AppField name="sentAt">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Sent At"
							description="Date when invoice was sent to customer."
							tooltip="Select sent date"
						>
							<field.DateTimeField disabled />
						</field.Field>
					)}
				</form.AppField>
				{/* paidAt */}
				<form.AppField name="paidAt">
					{(field) => (
						<field.Field
							className="col-span-2"
							title="Paid At"
							description="Date when payment was received."
							tooltip="Select payment date"
						>
							<field.DateTimeField disabled />
						</field.Field>
					)}
				</form.AppField>
				{/* items */}
				{props.action === "create" && (
					<>
						<FieldSeparator className="col-span-full" />
						<form.FieldSet
							className="col-span-full"
							legend="Invoice Items"
							description="Add line items to this invoice."
						>
							<form.AppField name="items" mode="array">
								{(field) => (
									<>
										{field.state.value?.map((_, index) => (
											<InvoiceItemsForm
												key={index}
												form={form}
												fields={`items[${index}]` as any}
												onRemove={() => field.removeValue(index)}
											/>
										))}
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => field.pushValue(undefined as any)}
										>
											Add Item
										</Button>
									</>
								)}
							</form.AppField>
						</form.FieldSet>
					</>
				)}
				{/* attachments */}
				{props.action === "create" && (
					<>
						<FieldSeparator className="col-span-full" />
						<form.FieldSet
							className="col-span-full"
							legend="Attachments"
							description="Upload files related to the invoice."
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

export const CreateInvoicesFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			invoiceNumber: faker.helpers.replaceSymbols(
				`INV-${new Date().toISOString().slice(0, 10)}-###`,
			),
			status: "draft",
			issueDate: new Date(),
			dueDate: undefined,
			sentAt: undefined,
			paidAt: undefined,
			total: undefined,
			paymentMethod: "bank-transfer",
			opportunity: undefined,
			items: [],
			attachments: [],
		} as Partial<z.infer<ReturnType<typeof CreateInvoicesSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				const { items, ...rest } = value;

				const products = await pocketbase
					.collection(Collections.CustomerRelationsProducts)
					.getList(1, items!.length, {
						filter: items!.map((item) => `id = '${item.product}'`).join(" || "),
					});

				const sumPrices = items!.reduce((acc, item) => {
					const product = products.items.find((p) => p.id === item.product);
					return acc + (product ? product.price * item.quantity : 0);
				}, 0);

				const invoicePayload = {
					...rest,
					total: sumPrices,
					issueDate: new Date().toISOString(),
				};

				let invoiceId: string = "";

				try {
					// send invoice first
					const invoice = await pocketbase
						.collection(Collections.CustomerRelationsInvoices)
						.create(invoicePayload);

					invoiceId = invoice.id;

					const batch = pocketbase.createBatch();

					for (const item of items || []) {
						const product = products.items.find((p) => p.id === item.product);

						if (!product) continue;

						const invoiceItemPayload: Create<Collections.CustomerRelationsInvoiceItems> =
							{
								invoice: invoice.id,
								product: item.product,
								quantity: item.quantity,
								price: product.price * item.quantity,
							};

						batch
							.collection(Collections.CustomerRelationsInvoiceItems)
							.create(invoiceItemPayload);
					}

					await batch.send();

					toast.success("Invoices created successfully!");

					meta.navigate!({
						search: (prev) => ({ ...prev, action: undefined }),
					});
				} catch (error) {
					if (error instanceof ClientResponseError) {
						formApi.setErrorMap({ onSubmit: error.data.data });

						if (invoiceId) {
							await pocketbase
								.collection(Collections.CustomerRelationsInvoices)
								.delete(invoiceId);
						}

						toast.error(
							`Failed to create invoice items: ${error.message} (${error.status})`,
						);
					}
				}
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });

					toast.error(
						`Failed to create invoices: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateInvoicesFormOption = (
	pocketbase: TypedPocketBase,
	record?: CustomerRelationsInvoicesRecord,
) =>
	formOptions({
		defaultValues: {
			...record,
			issueDate: record?.issueDate ? new Date(record.issueDate) : new Date(),
			dueDate: record?.dueDate ? new Date(record.dueDate) : undefined,
			sentAt: record?.sentAt ? new Date(record.sentAt) : undefined,
			paidAt: record?.paidAt ? new Date(record.paidAt) : undefined,
		} as Partial<z.infer<ReturnType<typeof UpdateInvoicesSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				const result = await pocketbase
					.collection(Collections.CustomerRelationsInvoices)
					.update(record?.id!, {
						...value,
						sentAt:
							value.status === "sent" && value.sentAt ? new Date() : undefined,
						paidAt: value.paidAt ? new Date() : undefined,
					});

				console.log("Update result:", result);

				toast.success("Invoice updated successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined, id: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });

					toast.error(
						`Failed to update invoice: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
