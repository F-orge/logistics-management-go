import { useQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useParams,
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
import { Collections, Update } from "@/lib/pb.types";

const UpdateInvoiceItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.CustomerRelationsInvoiceItems, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsInvoiceItems)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.CustomerRelationsInvoiceItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsInvoiceItems)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("InvoiceItem updated successfully");
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
				open={searchParams.action === "updateInvoiceItem"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update InvoiceItem"
				description="Line items for invoices tracking service/product description, quantity, pricing, discounts, and taxes"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="invoice">
							{(field) => (
								<field.TextField
									label="Invoice"
									description="The invoice this line item belongs to"
									tooltip="e.g., 'INV-2024-001', 'BL-789'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Item Details</FieldSeparator>

					{/* Item Details */}
					<FieldGroup>
						<FieldLegend>Item Details</FieldLegend>
						<FieldDescription>Manage item details information</FieldDescription>

						<form.AppField name="description">
							{(field) => (
								<field.TextareaField
									label="Description"
									description="Description of the service or product"
									tooltip="e.g., 'Professional Services - 40 hours', 'Software License - Annual'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="Quantity of the item or service units"
									tooltip="e.g., 1, 5, 10, 40"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Pricing</FieldSeparator>

					{/* Pricing */}
					<FieldGroup>
						<FieldLegend>Pricing</FieldLegend>
						<FieldDescription>Manage pricing information</FieldDescription>

						<form.AppField name="unitPrice">
							{(field) => (
								<field.NumberField
									label="Unit Price"
									description="Price per unit"
									tooltip="e.g., 25.50, 100, 1500"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Discounts & Tax</FieldSeparator>

					{/* Discounts & Tax */}
					<FieldGroup>
						<FieldLegend>Discounts & Tax</FieldLegend>
						<FieldDescription>
							Manage discounts & tax information
						</FieldDescription>

						<form.AppField name="discountRate">
							{(field) => (
								<field.NumberField
									label="Discount Rate"
									description="Discount percentage applied to this line"
									tooltip="e.g., 5, 10, 15"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="discountAmount">
							{(field) => (
								<field.NumberField
									label="Discount Amount"
									description="Discount amount deducted from this line"
									tooltip="e.g., 25, 100, 500"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="taxRate">
							{(field) => (
								<field.NumberField
									label="Tax Rate"
									description="Tax percentage applied to this line"
									tooltip="e.g., 5, 10, 12"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default UpdateInvoiceItemFormDialog;
