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
import { PutawayRulesSchema } from "@/pocketbase/schemas/warehouse-management/putaway-rules";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	product: PutawayRulesSchema.shape.product.optional().register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-product-update",
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
	client: PutawayRulesSchema.shape.client.optional().register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-client-update",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	warehouse: PutawayRulesSchema.shape.warehouse
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-warehouse-update",
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
	preferredLocation: PutawayRulesSchema.shape.preferredLocation
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-preferredLocation-update",
			type: "field",
			label: "PreferredLocation",
			description: "Enter a preferredlocation",
			inputType: "text",
		}),
	locationType: PutawayRulesSchema.shape.locationType
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-locationType-update",
			type: "field",
			label: "LocationType",
			description: "Enter a locationtype",
			inputType: "select",
		}),
	priority: PutawayRulesSchema.shape.priority
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-priority-update",
			type: "field",
			label: "Priority",
			description: "Enter a priority",
			inputType: "number",
		}),
	minQuantity: PutawayRulesSchema.shape.minQuantity
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-minQuantity-update",
			type: "field",
			label: "MinQuantity",
			description: "Enter a minquantity",
			inputType: "number",
		}),
	maxQuantity: PutawayRulesSchema.shape.maxQuantity
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-maxQuantity-update",
			type: "field",
			label: "MaxQuantity",
			description: "Enter a maxquantity",
			inputType: "number",
		}),
	weightThreshold: PutawayRulesSchema.shape.weightThreshold
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-weightThreshold-update",
			type: "field",
			label: "WeightThreshold",
			description: "Enter a weightthreshold",
			inputType: "text",
		}),
	volumeThreshold: PutawayRulesSchema.shape.volumeThreshold
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-volumeThreshold-update",
			type: "field",
			label: "VolumeThreshold",
			description: "Enter a volumethreshold",
			inputType: "text",
		}),
	requireTemperatureControl: PutawayRulesSchema.shape.requireTemperatureControl
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-requireTemperatureControl-update",
			type: "field",
			label: "RequireTemperatureControl",
			description: "Enter a requiretemperaturecontrol",
			inputType: "text",
		}),
	requireHazmatApproval: PutawayRulesSchema.shape.requireHazmatApproval
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-requireHazmatApproval-update",
			type: "field",
			label: "RequireHazmatApproval",
			description: "Enter a requirehazmatapproval",
			inputType: "text",
		}),
	isActive: PutawayRulesSchema.shape.isActive
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-isActive-update",
			type: "field",
			label: "IsActive",
			description: "Enter an isactive",
			inputType: "text",
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
				.pocketbase!.collection(Collections.WarehouseManagementPutawayRules)
				.update(meta.id!, value);

			toast.success("Putaway Rules updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update putaway-rules: ${error.message} (${error.status})`,
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
		queryKey: ["putawayRules", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementPutawayRules)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data as z.infer<typeof UpdateSchema>,
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
					<form.SubmitButton>Update Putaway Rules</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
