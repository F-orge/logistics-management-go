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
	WarehouseManagementInboundShipmentItemsRecord,
	WarehouseManagementInboundShipmentsResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";
import { WarehouseManagementInboundShipmentItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema =
	WarehouseManagementInboundShipmentItemsSchema.omit({
		id: true,
		created: true,
		updated: true,
	}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues:
			{} as Create<Collections.WarehouseManagementInboundShipmentItems>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementInboundShipmentItems)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `InboundShipmentItems created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementInboundShipmentItemsRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.WarehouseManagementInboundShipmentItems>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementInboundShipmentItems)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "InboundShipmentItems updated successfully",
				})
				.unwrap();
		},
	});

export const InboundShipmentItemsForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementInboundShipmentItems>
		| Update<Collections.WarehouseManagementInboundShipmentItems>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Shipment */}
					<FieldGroup>
						<FieldLegend>Shipment</FieldLegend>
						<FieldDescription>Manage shipment information</FieldDescription>

						<form.AppField name="inboundShipment">
							{(field) => (
								<field.RelationField<WarehouseManagementInboundShipmentsResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.WarehouseManagementInboundShipments
									}
									relationshipName="inboundShipment"
									label="Inbound Shipment"
									description="Parent inbound shipment"
									displayField="id"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

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
									description="Product received"
									displayField="name"
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

						<form.AppField name="expectedQuantity">
							{(field) => (
								<field.NumberField
									label="Expected Quantity"
									description="Quantity expected"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="receivedQuantity">
							{(field) => (
								<field.NumberField
									label="Received Quantity"
									description="Quantity actually received"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Discrepancies */}
					<FieldGroup>
						<FieldLegend>Discrepancies</FieldLegend>
						<FieldDescription>
							Manage discrepancies information
						</FieldDescription>

						<form.AppField name="discrepancyNotes">
							{(field) => (
								<field.TextareaField
									label="Discrepancy Notes"
									description="Notes on any discrepancies"
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
				<InboundShipmentItemsForm form={form as any} />
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
		queryKey: ["inboundshipmentitems", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementInboundShipmentItems)
				.getOne<WarehouseManagementInboundShipmentItemsRecord>(searchQuery.id!),
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
				<InboundShipmentItemsForm form={form as any} />
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
