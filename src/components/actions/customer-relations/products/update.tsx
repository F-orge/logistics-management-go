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

const UpdateProductFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.CustomerRelationsProducts, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsProducts)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.CustomerRelationsProducts>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsProducts)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Product updated successfully");
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
				open={searchParams.action === "updateProduct"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Product"
				description="Catalogs products and services offered to customers with SKU, pricing, type, and descriptions"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Manage basic information information
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="Product or service name"
									tooltip="e.g., 'Premium Support', 'Software License'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="sku">
							{(field) => (
								<field.TextField
									label="Sku"
									description="Stock keeping unit"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Pricing</FieldSeparator>

					{/* Pricing */}
					<FieldGroup>
						<FieldLegend>Pricing</FieldLegend>
						<FieldDescription>Manage pricing information</FieldDescription>

						<form.AppField name="price">
							{(field) => (
								<field.NumberField
									label="Price"
									description="Product price"
									tooltip="e.g., 100, 500.50, 5000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Classification</FieldSeparator>

					{/* Classification */}
					<FieldGroup>
						<FieldLegend>Classification</FieldLegend>
						<FieldDescription>
							Manage classification information
						</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Type of product offering"
									tooltip="e.g., 'service', 'good', 'digital'"
									options={[
										{ label: "Service", value: "service" },
										{ label: "Good", value: "good" },
										{ label: "Digital", value: "digital" },
										{ label: "Subscription", value: "subscription" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Details</FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="description">
							{(field) => (
								<field.TextareaField
									label="Description"
									description="Detailed product description"
									tooltip="e.g., 'Includes 24/7 support and training'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default UpdateProductFormDialog;
