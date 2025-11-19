import { formOptions } from "@tanstack/react-form";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
	fieldRegistry,
	fieldSetRegistry,
	toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
	Collections,
	TypedPocketBase,
	WarehouseManagementProductsRecord,
	WarehouseManagementSalesOrderItemsResponse,
	WarehouseManagementSalesOrdersRecord,
} from "@/lib/pb.types";
import { OutboundShipmentItemsSchema } from "@/pocketbase/schemas/warehouse-management";
import { OutboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/outbound-shipments";

const CreateItemSchema = z
	.object({
		salesOrderItem: OutboundShipmentItemsSchema.shape.salesOrderItem.register(
			fieldRegistry,
			{
				id: "warehouse-management-outbound-shipment-items-salesOrderItem-subitem-create",
				type: "field",
				label: "SalesOrderItem",
				description: "Enter a salesorderitem",
				inputType: "relation",
				props: {
					collectionName: Collections.WarehouseManagementSalesOrderItems,
					displayField: "orderNumber",
					relationshipName: "salesOrderItem",
					recordListOption: { expand: "product,salesOrder" },
					filterQuery: (query, id) =>
						id
							? `(salesOrder.orderNumber ~ '${query}') || id ?= "${id}"`
							: `salesOrder.orderNumber ~ '${query}'`,
					renderOption: (item) =>
						`${item.expand.salesOrder?.orderNumber} - ${item.expand.product?.name}`,
				} as RelationFieldProps<
					WarehouseManagementSalesOrderItemsResponse<{
						product: WarehouseManagementProductsRecord;
						salesOrder: WarehouseManagementSalesOrdersRecord;
					}>
				>,
			},
		),
		product: OutboundShipmentItemsSchema.shape.product.register(fieldRegistry, {
			id: "warehouse-management-outbound-shipment-items-product-subitem-create",
			type: "field",
			label: "Product",
			description: "Enter a product",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementProducts,
				displayField: "name",
				relationshipName: "product",
			},
		}),
		batch: OutboundShipmentItemsSchema.shape.batch.register(fieldRegistry, {
			id: "warehouse-management-outbound-shipment-items-batch-subitem-create",
			type: "field",
			label: "Batch",
			description: "Enter a batch",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementInventoryBatches,
				displayField: "batchNumber",
				relationshipName: "batch",
			},
		}),
		quantityShipped: OutboundShipmentItemsSchema.shape.quantityShipped.register(
			fieldRegistry,
			{
				id: "warehouse-management-outbound-shipment-items-quantityShipped-subitem-create",
				type: "field",
				label: "QuantityShipped",
				description: "Enter a quantityshipped",
				inputType: "number",
			},
		),
	})
	.register(fieldSetRegistry, {
		legend: "Outbound Shipment Item",
		description: "Details of the outbound shipment item",
	});

export const CreateSchema = z.object({
	salesOrder: OutboundShipmentsSchema.shape.salesOrder.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipments-salesOrder-create",
		type: "field",
		label: "SalesOrder",
		description: "Enter a salesorder",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementSalesOrders,
			displayField: "orderNumber",
			relationshipName: "salesOrder",
		},
	}),
	status: OutboundShipmentsSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipments-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	trackingNumber: OutboundShipmentsSchema.shape.trackingNumber.register(
		fieldRegistry,
		{
			id: "warehouse-management-outbound-shipments-trackingNumber-create",
			type: "field",
			label: "TrackingNumber",
			description: "Enter a trackingnumber",
			inputType: "text",
		},
	),
	carrier: OutboundShipmentsSchema.shape.carrier.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipments-carrier-create",
		type: "field",
		label: "Carrier",
		description: "Enter a carrier",
		inputType: "relation",
		props: {
			collectionName: Collections.TransportManagementCarriers,
			displayField: "name",
			relationshipName: "carrier",
		},
	}),
	warehouse: OutboundShipmentsSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipments-warehouse-create",
		type: "field",
		label: "Warehouse",
		description: "Enter a warehouse",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementWarehouses,
			displayField: "name",
			relationshipName: "warehouse",
		},
	}),
	items: CreateItemSchema.array(),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		let outboundShipmentId: string | null = null;

		try {
			const { items, ...outboundShipmentData } = value;

			const createdOutboundShipment = await meta.pocketbase
				.collection(Collections.WarehouseManagementOutboundShipments)
				.create(outboundShipmentData);

			outboundShipmentId = createdOutboundShipment.id;

			const batch = meta.pocketbase.createBatch();

			for (const item of items) {
				batch
					.collection(Collections.WarehouseManagementOutboundShipmentItems)
					.create({
						...item,
						outboundShipment: outboundShipmentId,
					});
			}

			await batch.send();

			toast.success("Outbound Shipments created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				if (outboundShipmentId) {
					// Rollback created outbound shipment if items creation failed
					try {
						await meta.pocketbase
							.collection(Collections.WarehouseManagementOutboundShipments)
							.delete(outboundShipmentId);
					} catch (deleteError) {
						console.error("Failed to rollback outbound shipment:", deleteError);
					}
				}

				toast.error(
					`Failed to create outbound-shipments: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm(FormOption);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Outbound Shipments</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
