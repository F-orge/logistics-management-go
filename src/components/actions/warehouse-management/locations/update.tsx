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
import { LocationsSchema } from "@/pocketbase/schemas/warehouse-management/locations";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	warehouse: LocationsSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-locations-warehouse-update",
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
		id: "warehouse-management-locations-name-update",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	barcode: LocationsSchema.shape.barcode.register(fieldRegistry, {
		id: "warehouse-management-locations-barcode-update",
		type: "field",
		label: "Barcode",
		description: "Enter a barcode",
		inputType: "text",
	}),
	type: LocationsSchema.shape.type.register(fieldRegistry, {
		id: "warehouse-management-locations-type-update",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	level: LocationsSchema.shape.level.register(fieldRegistry, {
		id: "warehouse-management-locations-level-update",
		type: "field",
		label: "Level",
		description: "Enter a level",
		inputType: "number",
	}),
	maxWeight: LocationsSchema.shape.maxWeight.register(fieldRegistry, {
		id: "warehouse-management-locations-maxWeight-update",
		type: "field",
		label: "MaxWeight",
		description: "Enter a maxweight",
		inputType: "number",
	}),
	maxVolume: LocationsSchema.shape.maxVolume.register(fieldRegistry, {
		id: "warehouse-management-locations-maxVolume-update",
		type: "field",
		label: "MaxVolume",
		description: "Enter a maxvolume",
		inputType: "number",
	}),
	maxPallets: LocationsSchema.shape.maxPallets.register(fieldRegistry, {
		id: "warehouse-management-locations-maxPallets-update",
		type: "field",
		label: "MaxPallets",
		description: "Enter a maxpallets",
		inputType: "number",
	}),
	isPickable: LocationsSchema.shape.isPickable.register(fieldRegistry, {
		id: "warehouse-management-locations-isPickable-update",
		type: "field",
		label: "IsPickable",
		description: "Enter an ispickable",
		inputType: "bool",
	}),
	isReceivable: LocationsSchema.shape.isReceivable.register(fieldRegistry, {
		id: "warehouse-management-locations-isReceivable-update",
		type: "field",
		label: "IsReceivable",
		description: "Enter an isreceivable",
		inputType: "bool",
	}),
	temperatureControlled: LocationsSchema.shape.temperatureControlled.register(
		fieldRegistry,
		{
			id: "warehouse-management-locations-temperatureControlled-update",
			type: "field",
			label: "TemperatureControlled",
			description: "Enter a temperaturecontrolled",
			inputType: "bool",
		},
	),
	hazmatApproved: LocationsSchema.shape.hazmatApproved.register(fieldRegistry, {
		id: "warehouse-management-locations-hazmatApproved-update",
		type: "field",
		label: "HazmatApproved",
		description: "Enter a hazmatapproved",
		inputType: "bool",
	}),
	isActive: LocationsSchema.shape.isActive.register(fieldRegistry, {
		id: "warehouse-management-locations-isActive-update",
		type: "field",
		label: "IsActive",
		description: "Enter an isactive",
		inputType: "bool",
	}),
	parentLocation: LocationsSchema.shape.parentLocation.register(fieldRegistry, {
		id: "warehouse-management-locations-parentLocation-update",
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
				.pocketbase!.collection(Collections.WarehouseManagementLocations)
				.update(meta.id!, value);

			toast.success("Locations updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update locations: ${error.message} (${error.status})`,
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
		queryKey: ["locations", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementLocations)
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
					<form.SubmitButton>Update Locations</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
