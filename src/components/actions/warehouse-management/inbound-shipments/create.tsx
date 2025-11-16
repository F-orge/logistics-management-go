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
import { InboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/inbound-shipments";

export const CreateSchema = z.object({
	client: InboundShipmentsSchema.shape.client.register(fieldRegistry, {
		id: "warehouse-management-inbound-shipments-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	status: InboundShipmentsSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-inbound-shipments-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	expectedArrivalDate:
		InboundShipmentsSchema.shape.expectedArrivalDate.register(fieldRegistry, {
			id: "warehouse-management-inbound-shipments-expectedArrivalDate-create",
			type: "field",
			label: "ExpectedArrivalDate",
			description: "Enter an expectedarrivaldate",
			inputType: "date",
		}),
	actualArrivalDate: InboundShipmentsSchema.shape.actualArrivalDate.register(
		fieldRegistry,
		{
			id: "warehouse-management-inbound-shipments-actualArrivalDate-create",
			type: "field",
			label: "ActualArrivalDate",
			description: "Enter an actualarrivaldate",
			inputType: "date",
		},
	),
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
				.collection(Collections.WarehouseManagementInboundShipments)
				.create(value);
			toast.success("Inbound Shipments created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
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
