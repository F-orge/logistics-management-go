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
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { InboundShipmentItemsSchema } from "@/pocketbase/schemas/warehouse-management";
import { InboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/inbound-shipments";

export const CreateItemSchema = z
	.object({
		product: InboundShipmentItemsSchema.shape.product.register(fieldRegistry, {
			id: "warehouse-management-inbound-shipment-items-sub-item-product-create",
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
		expectedQuantity:
			InboundShipmentItemsSchema.shape.expectedQuantity.register(
				fieldRegistry,
				{
					id: "warehouse-management-inbound-shipment-items-sub-item-expectedQuantity-create",
					type: "field",
					label: "ExpectedQuantity",
					description: "Enter an expectedquantity",
					inputType: "number",
				},
			),
		receivedQuantity:
			InboundShipmentItemsSchema.shape.receivedQuantity.register(
				fieldRegistry,
				{
					id: "warehouse-management-inbound-shipment-items-sub-item-receivedQuantity-create",
					type: "field",
					label: "ReceivedQuantity",
					description: "Enter a receivedquantity",
					inputType: "number",
				},
			),
		discrepancyNotes:
			InboundShipmentItemsSchema.shape.discrepancyNotes.register(
				fieldRegistry,
				{
					id: "warehouse-management-inbound-shipment-items-sub-item-discrepancyNotes-create",
					type: "field",
					label: "DiscrepancyNotes",
					description: "Enter a discrepancynotes",
					inputType: "textarea",
				},
			),
	})
	.register(fieldSetRegistry, {
		legend: "Items",
		description: "Add items to the inbound shipment",
		separator: true,
	});

export const CreateSchema = z.object({
	client: InboundShipmentsSchema.shape.client.register(fieldRegistry, {
		id: "warehouse-management-inbound-shipments-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsCompanies,
			displayField: "name",
			relationshipName: "client",
		},
	}),
	status: InboundShipmentsSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-inbound-shipments-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	expectedArrivalDate:
		InboundShipmentsSchema.shape.expectedArrivalDate.register(fieldRegistry, {
			id: "warehouse-management-inbound-shipments-expectedArrivalDate-create",
			type: "field",
			label: "ExpectedArrivalDate",
			description: "Enter an expectedarrivaldate",
			inputType: "date",
			props: {
				showTime: true,
			},
		}),
	warehouse: InboundShipmentsSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-inbound-shipments-warehouse-create",
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
	defaultValues: {
		status: "pending",
	} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		let inboundShipmentId: string | null = null;

		try {
			const { items, ...inboundShipmentData } = value;

			const inboundShipmentRecord = await meta.pocketbase
				.collection(Collections.WarehouseManagementInboundShipments)
				.create(inboundShipmentData);

			inboundShipmentId = inboundShipmentRecord.id;

			const batch = meta.pocketbase.createBatch();

			for (const item of items) {
				batch
					.collection(Collections.WarehouseManagementInboundShipmentItems)
					.create({
						...item,
						inboundShipment: inboundShipmentId,
					});
			}

			await batch.send();

			toast.success("Inbound Shipments created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				if (inboundShipmentId) {
					// Cleanup: Delete the created inbound shipment if item creation fails
					try {
						await meta.pocketbase
							.collection(Collections.WarehouseManagementInboundShipments)
							.delete(inboundShipmentId);
					} catch (cleanupError) {
						console.error(
							"Failed to cleanup inbound shipment after item creation failure:",
							cleanupError,
						);
					}
				}

				toast.error(
					`Failed to create inbound-shipments: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Inbound Shipments</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
