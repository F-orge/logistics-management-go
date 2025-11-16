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
	legSequence: ShipmentLegsSchema.shape.legSequence.optional().register(fieldRegistry, {
		id: "transport-management-shipment-legs-legSequence-update",
		type: "field",
		label: "LegSequence",
		description: "Enter a legsequence",
		inputType: "number",
	}),
	startLocation: ShipmentLegsSchema.shape.startLocation.optional().register(fieldRegistry, {
		id: "transport-management-shipment-legs-startLocation-update",
		type: "field",
		label: "StartLocation",
		description: "Enter a startlocation",
		inputType: "text",
	}),
	endLocation: ShipmentLegsSchema.shape.endLocation.optional().register(fieldRegistry, {
		id: "transport-management-shipment-legs-endLocation-update",
		type: "field",
		label: "EndLocation",
		description: "Enter an endlocation",
		inputType: "text",
	}),
	interalTrip: ShipmentLegsSchema.shape.interalTrip.optional().register(fieldRegistry, {
		id: "transport-management-shipment-legs-interalTrip-update",
		type: "field",
		label: "InteralTrip",
		description: "Enter an interaltrip",
		inputType: "text",
	}),
	status: ShipmentLegsSchema.shape.status.optional().register(fieldRegistry, {
		id: "transport-management-shipment-legs-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	shipment: ShipmentLegsSchema.shape.shipment.optional().register(fieldRegistry, {
		id: "transport-management-shipment-legs-shipment-update",
		type: "field",
		label: "Shipment",
		description: "Enter a shipment",
		inputType: "text",
	})
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
				.pocketbase!.collection(Collections.TransportManagementShipmentLegs)
				.update(meta.id!, value);

			toast.success("Shipment Legs updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update shipment-legs: ${error.message} (${error.status})`,
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
		queryKey: ["shipmentLegs", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementShipmentLegs)
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
					<form.SubmitButton>Update Shipment Legs</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
