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
import { OutboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/outbound-shipments";

export const CreateSchema = z.object({
	salesOrder: OutboundShipmentsSchema.shape.salesOrder.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipments-salesOrder-create",
		type: "field",
		label: "SalesOrder",
		description: "Enter a salesorder",
		inputType: "text",
	}),
	status: OutboundShipmentsSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipments-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
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
	items: OutboundShipmentsSchema.shape.items.register(fieldRegistry, {
		id: "warehouse-management-outbound-shipments-items-create",
		type: "field",
		label: "Items",
		description: "Enter an items",
		inputType: "text",
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
				.collection(Collections.WarehouseManagementOutboundShipments)
				.create(value);
			toast.success("Outbound Shipments created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
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
