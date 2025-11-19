import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
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
import { InboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/inbound-shipments";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	client: InboundShipmentsSchema.shape.client
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inbound-shipments-client-update",
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
		id: "warehouse-management-inbound-shipments-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	expectedArrivalDate:
		InboundShipmentsSchema.shape.expectedArrivalDate.register(fieldRegistry, {
			id: "warehouse-management-inbound-shipments-expectedArrivalDate-update",
			type: "field",
			label: "ExpectedArrivalDate",
			description: "Enter an expectedarrivaldate",
			inputType: "date",
			props: {
				showTime: true,
			},
		}),
	actualArrivalDate: InboundShipmentsSchema.shape.actualArrivalDate.register(
		fieldRegistry,
		{
			id: "warehouse-management-inbound-shipments-actualArrivalDate-update",
			type: "field",
			label: "ActualArrivalDate",
			description: "Enter an actualarrivaldate",
			inputType: "date",
			props: {
				showTime: true,
			},
		},
	),
	warehouse: InboundShipmentsSchema.shape.warehouse
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-inbound-shipments-warehouse-update",
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
				.pocketbase!.collection(Collections.WarehouseManagementInboundShipments)
				.update(meta.id!, value);

			toast.success("Inbound Shipments updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update inbound-shipments: ${error.message} (${error.status})`,
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

	const { data } = useSuspenseQuery({
		queryKey: ["inboundShipments", searchQuery.id],
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementInboundShipments)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: {
			...data,
			expectedArrivalDate: data.expectedArrivalDate
				? new Date(data.expectedArrivalDate)
				: undefined,
			actualArrivalDate: data.actualArrivalDate
				? new Date(data.actualArrivalDate)
				: undefined,
		} as z.infer<typeof UpdateSchema>,
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
					<form.SubmitButton>Update Inbound Shipments</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
