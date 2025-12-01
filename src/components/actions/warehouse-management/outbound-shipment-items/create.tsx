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
	toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { OutboundShipmentItemsSchema } from "@/pocketbase/schemas/warehouse-management/outbound-shipment-items";

export const CreateSchema = z.object({
	outboundShipment: OutboundShipmentItemsSchema.shape.outboundShipment.register(
		fieldRegistry,
		{
			id: "warehouse-management-outbound-shipment-items-outboundShipment-create",
			type: "field",
			label: "OutboundShipment",
			description: "Enter an outboundshipment",
			inputType: "text",
		},
	),
	salesOrderItem: OutboundShipmentItemsSchema.shape.salesOrderItem.register(
		fieldRegistry,
		{
			id: "warehouse-management-outbound-shipment-items-salesOrderItem-create",
			type: "field",
			label: "SalesOrderItem",
			description: "Enter a salesorderitem",
			inputType: "text",
		},
	),
	product: OutboundShipmentItemsSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipment-items-product-create",
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
		id: "warehouse-management-outbound-shipment-items-batch-create",
		type: "field",
		label: "Batch",
		description: "Enter a batch",
		inputType: "text",
	}),
	quantityShipped: OutboundShipmentItemsSchema.shape.quantityShipped.register(
		fieldRegistry,
		{
			id: "warehouse-management-outbound-shipment-items-quantityShipped-create",
			type: "field",
			label: "QuantityShipped",
			description: "Enter a quantityshipped",
			inputType: "number",
		},
	),
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
		try {
			await meta.pocketbase
				.collection(Collections.WarehouseManagementOutboundShipmentItems)
				.create(value);
			toast.success("Outbound Shipment Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create outbound-shipment-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Outbound Shipment Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
