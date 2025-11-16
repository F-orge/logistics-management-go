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
import { ShipmentLegEventsSchema } from "@/pocketbase/schemas/transport-management/shipment-leg-events";

export const CreateSchema = z.object({
	message: ShipmentLegEventsSchema.shape.message.register(fieldRegistry, {
		id: "transport-management-shipment-leg-events-message-create",
		type: "field",
		label: "Message",
		description: "Enter a message",
		inputType: "text",
	}),
	shipmentLegId: ShipmentLegEventsSchema.shape.shipmentLegId.register(
		fieldRegistry,
		{
			id: "transport-management-shipment-leg-events-shipmentLegId-create",
			type: "field",
			label: "ShipmentLegId",
			description: "Enter a shipmentlegid",
			inputType: "relation",
			props: {
				collectionName: Collections.TransportManagementShipmentLegs,
				displayField: "name",
				relationshipName: "shipmentLegId",
			},
		},
	),
	location: ShipmentLegEventsSchema.shape.location.register(fieldRegistry, {
		id: "transport-management-shipment-leg-events-location-create",
		type: "field",
		label: "Location",
		description: "Enter a location",
		inputType: "text",
	}),
	timestamp: ShipmentLegEventsSchema.shape.timestamp.register(fieldRegistry, {
		id: "transport-management-shipment-leg-events-timestamp-create",
		type: "field",
		label: "Timestamp",
		description: "Enter a timestamp",
		inputType: "date",
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
				.collection(Collections.TransportManagementShipmentLegEvents)
				.create(value);
			toast.success("Shipment Leg Events created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create shipment-leg-events: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Shipment Leg Events</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
