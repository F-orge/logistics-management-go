import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
	useSearch,
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
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	outboundShipment: OutboundShipmentItemsSchema.shape.outboundShipment
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-outbound-shipment-items-outboundShipment-update",
			type: "field",
			label: "OutboundShipment",
			description: "Enter an outboundshipment",
			inputType: "text",
		}),
	salesOrderItem: OutboundShipmentItemsSchema.shape.salesOrderItem
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-outbound-shipment-items-salesOrderItem-update",
			type: "field",
			label: "SalesOrderItem",
			description: "Enter a salesorderitem",
			inputType: "text",
		}),
	product: OutboundShipmentItemsSchema.shape.product
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-outbound-shipment-items-product-update",
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
	batch: OutboundShipmentItemsSchema.shape.batch
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-outbound-shipment-items-batch-update",
			type: "field",
			label: "Batch",
			description: "Enter a batch",
			inputType: "text",
		}),
	quantityShipped: OutboundShipmentItemsSchema.shape.quantityShipped
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-outbound-shipment-items-quantityShipped-update",
			type: "field",
			label: "QuantityShipped",
			description: "Enter a quantityshipped",
			inputType: "number",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateSchema>,
	validators: {
		onSubmit: UpdateSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(
					Collections.WarehouseManagementOutboundShipmentItems,
				)
				.update(meta.id!, value);

			toast.success("Outbound Shipment Items updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update outbound-shipment-items: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useQuery({
		queryKey: ["outboundShipmentItems", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementOutboundShipmentItems)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data || {},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase, id: searchQuery.id! });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Outbound Shipment Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
