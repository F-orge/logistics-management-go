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
import { ShipmentLegsSchema } from "@/pocketbase/schemas/transport-management/shipment-legs";

export const CreateSchema = z.object({
	legSequence: ShipmentLegsSchema.shape.legSequence.register(fieldRegistry, {
		id: "transport-management-shipment-legs-legSequence-create",
		type: "field",
		label: "LegSequence",
		description: "Enter a legsequence",
		inputType: "number",
	}),
	startLocation: ShipmentLegsSchema.shape.startLocation.register(
		fieldRegistry,
		{
			id: "transport-management-shipment-legs-startLocation-create",
			type: "field",
			label: "StartLocation",
			description: "Enter a startlocation",
			inputType: "text",
		},
	),
	endLocation: ShipmentLegsSchema.shape.endLocation.register(fieldRegistry, {
		id: "transport-management-shipment-legs-endLocation-create",
		type: "field",
		label: "EndLocation",
		description: "Enter an endlocation",
		inputType: "text",
	}),
	carrier: ShipmentLegsSchema.shape.carrier.register(fieldRegistry, {
		id: "transport-management-shipment-legs-carrier-create",
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
	interalTrip: ShipmentLegsSchema.shape.interalTrip.register(fieldRegistry, {
		id: "transport-management-shipment-legs-interalTrip-create",
		type: "field",
		label: "InteralTrip",
		description: "Enter an interaltrip",
		inputType: "text",
	}),
	status: ShipmentLegsSchema.shape.status.register(fieldRegistry, {
		id: "transport-management-shipment-legs-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	shipment: ShipmentLegsSchema.shape.shipment.register(fieldRegistry, {
		id: "transport-management-shipment-legs-shipment-create",
		type: "field",
		label: "Shipment",
		description: "Enter a shipment",
		inputType: "text",
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
				.collection(Collections.TransportManagementShipmentLegs)
				.create(value);
			toast.success("Shipment Legs created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create shipment-legs: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Shipment Legs</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
