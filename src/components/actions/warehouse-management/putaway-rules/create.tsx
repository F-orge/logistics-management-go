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
import { PutawayRulesSchema } from "@/pocketbase/schemas/warehouse-management/putaway-rules";

export const CreateSchema = z.object({
	product: PutawayRulesSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-product-create",
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
	client: PutawayRulesSchema.shape.client.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-client-create",
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
	warehouse: PutawayRulesSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-warehouse-create",
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
	preferredLocation: PutawayRulesSchema.shape.preferredLocation.register(
		fieldRegistry,
		{
			id: "warehouse-management-putaway-rules-preferredLocation-create",
			type: "field",
			label: "PreferredLocation",
			description: "Enter a preferredlocation",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementLocations,
				displayField: "name",
				relationshipName: "preferredLocation",
			},
		},
	),
	locationType: PutawayRulesSchema.shape.locationType.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-locationType-create",
		type: "field",
		label: "LocationType",
		description: "Enter a locationtype",
		inputType: "select",
	}),
	priority: PutawayRulesSchema.shape.priority.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-priority-create",
		type: "field",
		label: "Priority",
		description: "Enter a priority",
		inputType: "number",
	}),
	minQuantity: PutawayRulesSchema.shape.minQuantity.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-minQuantity-create",
		type: "field",
		label: "MinQuantity",
		description: "Enter a minquantity",
		inputType: "number",
	}),
	maxQuantity: PutawayRulesSchema.shape.maxQuantity.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-maxQuantity-create",
		type: "field",
		label: "MaxQuantity",
		description: "Enter a maxquantity",
		inputType: "number",
	}),
	weightThreshold: PutawayRulesSchema.shape.weightThreshold.register(
		fieldRegistry,
		{
			id: "warehouse-management-putaway-rules-weightThreshold-create",
			type: "field",
			label: "WeightThreshold",
			description: "Enter a weightthreshold",
			inputType: "number",
		},
	),
	volumeThreshold: PutawayRulesSchema.shape.volumeThreshold.register(
		fieldRegistry,
		{
			id: "warehouse-management-putaway-rules-volumeThreshold-create",
			type: "field",
			label: "VolumeThreshold",
			description: "Enter a volumethreshold",
			inputType: "number",
		},
	),
	requireTemperatureControl:
		PutawayRulesSchema.shape.requireTemperatureControl.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-requireTemperatureControl-create",
			type: "field",
			label: "RequireTemperatureControl",
			description: "Enter a requiretemperaturecontrol",
			inputType: "bool",
			orientation: "horizontal",
		}),
	requireHazmatApproval:
		PutawayRulesSchema.shape.requireHazmatApproval.register(fieldRegistry, {
			id: "warehouse-management-putaway-rules-requireHazmatApproval-create",
			type: "field",
			label: "RequireHazmatApproval",
			description: "Enter a requirehazmatapproval",
			inputType: "bool",
			orientation: "horizontal",
		}),
	isActive: PutawayRulesSchema.shape.isActive.register(fieldRegistry, {
		id: "warehouse-management-putaway-rules-isActive-create",
		type: "field",
		label: "IsActive",
		description: "Enter an isactive",
		inputType: "bool",
		orientation: "horizontal",
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
				.collection(Collections.WarehouseManagementPutawayRules)
				.create(value);
			toast.success("Putaway Rules created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create putaway-rules: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Putaway Rules</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
