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
import { TripsSchema } from "@/pocketbase/schemas/transport-management/trips";

export const CreateSchema = z.object({
	driver: TripsSchema.shape.driver.register(fieldRegistry, {
		id: "transport-management-trips-driver-create",
		type: "field",
		label: "Driver",
		description: "Enter a driver",
		inputType: "relation",
		props: {
			collectionName: Collections.TransportManagementDrivers,
			displayField: "name",
			relationshipName: "driver",
		},
	}),
	vehicle: TripsSchema.shape.vehicle.register(fieldRegistry, {
		id: "transport-management-trips-vehicle-create",
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
	status: TripsSchema.shape.status.register(fieldRegistry, {
		id: "transport-management-trips-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
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
				.collection(Collections.TransportManagementTrips)
				.create(value);
			toast.success("Trips created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create trips: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Trips</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
