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
import { BinThresholdSchema } from "@/pocketbase/schemas/warehouse-management/bin-threshold";

export const CreateSchema = z.object({
	location: BinThresholdSchema.shape.location.register(fieldRegistry, {
		id: "warehouse-management-bin-threshold-location-create",
		type: "field",
		label: "Location",
		description: "Enter a location",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementLocations,
			displayField: "name",
			relationshipName: "location",
		},
	}),
	product: BinThresholdSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-bin-threshold-product-create",
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
	minQuantity: BinThresholdSchema.shape.minQuantity.register(fieldRegistry, {
		id: "warehouse-management-bin-threshold-minQuantity-create",
		type: "field",
		label: "MinQuantity",
		description: "Enter a minquantity",
		inputType: "number",
	}),
	maxQuantity: BinThresholdSchema.shape.maxQuantity.register(fieldRegistry, {
		id: "warehouse-management-bin-threshold-maxQuantity-create",
		type: "field",
		label: "MaxQuantity",
		description: "Enter a maxquantity",
		inputType: "number",
	}),
	reorderQuantity: BinThresholdSchema.shape.reorderQuantity.register(
		fieldRegistry,
		{
			id: "warehouse-management-bin-threshold-reorderQuantity-create",
			type: "field",
			label: "ReorderQuantity",
			description: "Enter a reorderquantity",
			inputType: "number",
		},
	),
	alertThreshold: BinThresholdSchema.shape.alertThreshold.register(
		fieldRegistry,
		{
			id: "warehouse-management-bin-threshold-alertThreshold-create",
			type: "field",
			label: "AlertThreshold",
			description: "Enter an alertthreshold",
			inputType: "number",
		},
	),
	isActive: BinThresholdSchema.shape.isActive.register(fieldRegistry, {
		id: "warehouse-management-bin-threshold-isActive-create",
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
				.collection(Collections.WarehouseManagementBinThreshold)
				.create(value);
			toast.success("Bin Threshold created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create bin-threshold: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Bin Threshold</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
