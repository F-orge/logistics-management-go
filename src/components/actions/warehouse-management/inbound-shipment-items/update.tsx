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
	inboundShipment: InboundShipmentItemsSchema.shape.inboundShipment.optional().register(fieldRegistry, {
		id: "warehouse-management-inbound-shipment-items-inboundShipment-update",
		type: "field",
		label: "InboundShipment",
		description: "Enter an inboundshipment",
		inputType: "text",
	}),
	expectedQuantity: InboundShipmentItemsSchema.shape.expectedQuantity.optional().register(fieldRegistry, {
		id: "warehouse-management-inbound-shipment-items-expectedQuantity-update",
		type: "field",
		label: "ExpectedQuantity",
		description: "Enter an expectedquantity",
		inputType: "number",
	}),
	receivedQuantity: InboundShipmentItemsSchema.shape.receivedQuantity.optional().register(fieldRegistry, {
		id: "warehouse-management-inbound-shipment-items-receivedQuantity-update",
		type: "field",
		label: "ReceivedQuantity",
		description: "Enter a receivedquantity",
		inputType: "text",
	}),
	discrepancyNotes: InboundShipmentItemsSchema.shape.discrepancyNotes.optional().register(fieldRegistry, {
		id: "warehouse-management-inbound-shipment-items-discrepancyNotes-update",
		type: "field",
		label: "DiscrepancyNotes",
		description: "Enter a discrepancynotes",
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
				.pocketbase!.collection(
					Collections.WarehouseManagementInboundShipmentItems,
				)
				.update(meta.id!, value);

			toast.success("Inbound Shipment Items updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update inbound-shipment-items: ${error.message} (${error.status})`,
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
		queryKey: ["inboundShipmentItems", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementInboundShipmentItems)
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
					<form.SubmitButton>Update Inbound Shipment Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
