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
import { LocationsSchema } from "@/pocketbase/schemas/warehouse-management/locations";

export const CreateSchema = z.object({
	warehouse: LocationsSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-locations-warehouse-create",
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
	name: LocationsSchema.shape.name.register(fieldRegistry, {
		id: "warehouse-management-locations-name-create",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	barcode: LocationsSchema.shape.barcode.register(fieldRegistry, {
		id: "warehouse-management-locations-barcode-create",
		type: "field",
		label: "Barcode",
		description: "Enter a barcode",
		inputType: "text",
	}),
	type: LocationsSchema.shape.type.register(fieldRegistry, {
		id: "warehouse-management-locations-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	level: LocationsSchema.shape.level.register(fieldRegistry, {
		id: "warehouse-management-locations-level-create",
		type: "field",
		label: "Level",
		description: "Enter a level",
		inputType: "number",
	}),
	maxWeight: LocationsSchema.shape.maxWeight.register(fieldRegistry, {
		id: "warehouse-management-locations-maxWeight-create",
		type: "field",
		label: "MaxWeight",
		description: "Enter a maxweight",
		inputType: "number",
	}),
	maxVolume: LocationsSchema.shape.maxVolume.register(fieldRegistry, {
		id: "warehouse-management-locations-maxVolume-create",
		type: "field",
		label: "MaxVolume",
		description: "Enter a maxvolume",
		inputType: "number",
	}),
	maxPallets: LocationsSchema.shape.maxPallets.register(fieldRegistry, {
		id: "warehouse-management-locations-maxPallets-create",
		type: "field",
		label: "MaxPallets",
		description: "Enter a maxpallets",
		inputType: "number",
	}),
	isPickable: LocationsSchema.shape.isPickable.register(fieldRegistry, {
		id: "warehouse-management-locations-isPickable-create",
		type: "field",
		label: "IsPickable",
		description: "Enter an ispickable",
		inputType: "bool",
	}),
	isReceivable: LocationsSchema.shape.isReceivable.register(fieldRegistry, {
		id: "warehouse-management-locations-isReceivable-create",
		type: "field",
		label: "IsReceivable",
		description: "Enter an isreceivable",
		inputType: "bool",
	}),
	temperatureControlled: LocationsSchema.shape.temperatureControlled.register(
		fieldRegistry,
		{
			id: "warehouse-management-locations-temperatureControlled-create",
			type: "field",
			label: "TemperatureControlled",
			description: "Enter a temperaturecontrolled",
			inputType: "bool",
		},
	),
	hazmatApproved: LocationsSchema.shape.hazmatApproved.register(fieldRegistry, {
		id: "warehouse-management-locations-hazmatApproved-create",
		type: "field",
		label: "HazmatApproved",
		description: "Enter a hazmatapproved",
		inputType: "bool",
	}),
	isActive: LocationsSchema.shape.isActive.register(fieldRegistry, {
		id: "warehouse-management-locations-isActive-create",
		type: "field",
		label: "IsActive",
		description: "Enter an isactive",
		inputType: "bool",
	}),
	parentLocation: LocationsSchema.shape.parentLocation.register(fieldRegistry, {
		id: "warehouse-management-locations-parentLocation-create",
		type: "field",
		label: "ParentLocation",
		description: "Enter a parentlocation",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementLocations,
			displayField: "name",
			relationshipName: "parentLocation",
		},
	}),
});

const FormOption = formOptions({
	defaultValues: {
		isActive: true,
	} as z.infer<typeof CreateSchema>,
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
				.collection(Collections.WarehouseManagementLocations)
				.create(value);
			toast.success("Locations created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create locations: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Locations</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
