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
import { WarehousesSchema } from "@/pocketbase/schemas/warehouse-management/warehouses";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	name: WarehousesSchema.shape.name.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-name-update",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	address: WarehousesSchema.shape.address.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-address-update",
		type: "field",
		label: "Address",
		description: "Enter an address",
		inputType: "text",
	}),
	city: WarehousesSchema.shape.city.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-city-update",
		type: "field",
		label: "City",
		description: "Enter a city",
		inputType: "text",
	}),
	state: WarehousesSchema.shape.state.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-state-update",
		type: "field",
		label: "State",
		description: "Enter a state",
		inputType: "text",
	}),
	postalCode: WarehousesSchema.shape.postalCode
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-warehouses-postalCode-update",
			type: "field",
			label: "PostalCode",
			description: "Enter a postalcode",
			inputType: "text",
		}),
	country: WarehousesSchema.shape.country.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-country-update",
		type: "field",
		label: "Country",
		description: "Enter a country",
		inputType: "text",
	}),
	timezone: WarehousesSchema.shape.timezone.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-timezone-update",
		type: "field",
		label: "Timezone",
		description: "Enter a timezone",
		inputType: "text",
	}),
	contactEmail: WarehousesSchema.shape.contactEmail
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-warehouses-contactEmail-update",
			type: "field",
			label: "ContactEmail",
			description: "Enter a contactemail",
			inputType: "text",
		}),
	isActive: WarehousesSchema.shape.isActive.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-isActive-update",
		type: "field",
		label: "IsActive",
		description: "Enter an isactive",
		inputType: "text",
	}),
	location: WarehousesSchema.shape.location.optional().register(fieldRegistry, {
		id: "warehouse-management-warehouses-location-update",
		type: "field",
		label: "Location",
		description: "Enter a location",
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
				.pocketbase!.collection(Collections.WarehouseManagementWarehouses)
				.update(meta.id!, value);

			toast.success("Warehouses updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update warehouses: ${error.message} (${error.status})`,
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
		queryKey: ["warehouses", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementWarehouses)
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
					<form.SubmitButton>Update Warehouses</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
