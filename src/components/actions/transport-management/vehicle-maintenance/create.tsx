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
import { VehicleMaintenanceSchema } from "@/pocketbase/schemas/transport-management/vehicle-maintenance";

export const CreateSchema = z.object({
	vehicle: VehicleMaintenanceSchema.shape.vehicle.register(fieldRegistry, {
		id: "transport-management-vehicle-maintenance-vehicle-create",
		type: "field",
		label: "Vehicle",
		description: "Enter a vehicle",
		inputType: "relation",
		props: {
			collectionName: Collections.TransportManagementVehicles,
			displayField: "name",
			relationshipName: "vehicle",
		},
	}),
	serviceDate: VehicleMaintenanceSchema.shape.serviceDate.register(
		fieldRegistry,
		{
			id: "transport-management-vehicle-maintenance-serviceDate-create",
			type: "field",
			label: "ServiceDate",
			description: "Enter a servicedate",
			inputType: "date",
		},
	),
	serviceType: VehicleMaintenanceSchema.shape.serviceType.register(
		fieldRegistry,
		{
			id: "transport-management-vehicle-maintenance-serviceType-create",
			type: "field",
			label: "ServiceType",
			description: "Enter a servicetype",
			inputType: "date",
		},
	),
	cost: VehicleMaintenanceSchema.shape.cost.register(fieldRegistry, {
		id: "transport-management-vehicle-maintenance-cost-create",
		type: "field",
		label: "Cost",
		description: "Enter a cost",
		inputType: "number",
	}),
	notes: VehicleMaintenanceSchema.shape.notes.register(fieldRegistry, {
		id: "transport-management-vehicle-maintenance-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
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
				.collection(Collections.TransportManagementVehicleMaintenance)
				.create(value);
			toast.success("Vehicle Maintenance created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create vehicle-maintenance: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Vehicle Maintenance</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
