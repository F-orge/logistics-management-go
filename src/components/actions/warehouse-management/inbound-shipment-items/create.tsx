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
import { InboundShipmentItemsSchema } from "@/pocketbase/schemas/warehouse-management/inbound-shipment-items";

export const CreateSchema = z.object({
	inboundShipment: InboundShipmentItemsSchema.shape.inboundShipment.register(
		fieldRegistry,
		{
			id: "warehouse-management-inbound-shipment-items-inboundShipment-create",
			type: "field",
			label: "InboundShipment",
			description: "Enter an inboundshipment",
			inputType: "text",
		},
	),
	product: InboundShipmentItemsSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-inbound-shipment-items-product-create",
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
	expectedQuantity: InboundShipmentItemsSchema.shape.expectedQuantity.register(
		fieldRegistry,
		{
			id: "warehouse-management-inbound-shipment-items-expectedQuantity-create",
			type: "field",
			label: "ExpectedQuantity",
			description: "Enter an expectedquantity",
			inputType: "number",
		},
	),
	receivedQuantity: InboundShipmentItemsSchema.shape.receivedQuantity.register(
		fieldRegistry,
		{
			id: "warehouse-management-inbound-shipment-items-receivedQuantity-create",
			type: "field",
			label: "ReceivedQuantity",
			description: "Enter a receivedquantity",
			inputType: "text",
		},
	),
	discrepancyNotes: InboundShipmentItemsSchema.shape.discrepancyNotes.register(
		fieldRegistry,
		{
			id: "warehouse-management-inbound-shipment-items-discrepancyNotes-create",
			type: "field",
			label: "DiscrepancyNotes",
			description: "Enter a discrepancynotes",
			inputType: "text",
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
				.collection(Collections.WarehouseManagementInboundShipmentItems)
				.create(value);
			toast.success("Inbound Shipment Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create inbound-shipment-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Inbound Shipment Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
