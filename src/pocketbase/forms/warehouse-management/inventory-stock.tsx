import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import {
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
	Collections,
	Create,
	TypedPocketBase,
	Update,
	WarehouseManagementInventoryBatchesResponse,
	WarehouseManagementInventoryStockRecord,
	WarehouseManagementLocationsResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";
import { WarehouseManagementInventoryStockSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementInventoryStockSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.WarehouseManagementInventoryStock>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementInventoryStock)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `InventoryStock created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementInventoryStockRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.WarehouseManagementInventoryStock>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementInventoryStock)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "InventoryStock updated successfully",
				})
				.unwrap();
		},
	});

export const InventoryStockForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementInventoryStock>
		| Update<Collections.WarehouseManagementInventoryStock>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Product */}
					<FieldGroup>
						<FieldLegend>Product</FieldLegend>
						<FieldDescription>Manage product information</FieldDescription>

						<form.AppField name="product">
							{(field) => (
								<field.RelationField<WarehouseManagementProductsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementProducts}
									relationshipName="product"
									label="Product"
									description="Associated product"
									displayField="name"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Location */}
					<FieldGroup>
						<FieldLegend>Location</FieldLegend>
						<FieldDescription>Manage location information</FieldDescription>

						<form.AppField name="location">
							{(field) => (
								<field.RelationField<WarehouseManagementLocationsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementLocations}
									relationshipName="location"
									label="Location"
									description="Storage location"
									displayField="name"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Batch */}
					<FieldGroup>
						<FieldLegend>Batch</FieldLegend>
						<FieldDescription>Manage batch information</FieldDescription>

						<form.AppField name="batch">
							{(field) => (
								<field.RelationField<WarehouseManagementInventoryBatchesResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.WarehouseManagementInventoryBatches
									}
									relationshipName="batch"
									label="Batch"
									description="Associated inventory batch"
									displayField="batchNumber"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Quantity */}
					<FieldGroup>
						<FieldLegend>Quantity</FieldLegend>
						<FieldDescription>Manage quantity information</FieldDescription>

						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="Quantity currently in stock"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="reservedQuantity">
							{(field) => (
								<field.NumberField
									label="Reserved Quantity"
									description="Quantity reserved for orders"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Stock status"
									options={[
										{ label: "In-stock", value: "in-stock" },
										{ label: "Low-stock", value: "low-stock" },
										{ label: "Out-of-stock", value: "out-of-stock" },
										{ label: "Discontinued", value: "discontinued" },
										{ label: "Obsolete", value: "obsolete" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Audit */}
					<FieldGroup>
						<FieldLegend>Audit</FieldLegend>
						<FieldDescription>Manage audit information</FieldDescription>

						<form.AppField name="lastCountedAt">
							{(field) => (
								<field.DateTimeField
									label="Last Counted At"
									description="Last inventory count date"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="lastMovementAt">
							{(field) => (
								<field.DateTimeField
									label="Last Movement At"
									description="Last movement date"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</form.AppForm>
		);
	},
});

const CreateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const form = useAppForm(CreateFormOptionFactory(pocketbase));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<InventoryStockForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

const UpdateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data: record } = useSuspenseQuery({
		queryKey: ["inventorystock", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementInventoryStock)
				.getOne<WarehouseManagementInventoryStockRecord>(searchQuery.id!),
	});

	const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<InventoryStockForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

export default () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	switch (searchQuery.action) {
		case "create":
			return <CreateForm />;
		case "update":
			return <UpdateForm />;
		default:
			return null;
	}
};
