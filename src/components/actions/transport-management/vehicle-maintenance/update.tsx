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
	serviceDate: VehicleMaintenanceSchema.shape.serviceDate.optional().register(fieldRegistry, {
		id: "transport-management-vehicle-maintenance-serviceDate-update",
		type: "field",
		label: "ServiceDate",
		description: "Enter a servicedate",
		inputType: "date",
	}),
	serviceType: VehicleMaintenanceSchema.shape.serviceType.optional().register(fieldRegistry, {
		id: "transport-management-vehicle-maintenance-serviceType-update",
		type: "field",
		label: "ServiceType",
		description: "Enter a servicetype",
		inputType: "date",
	}),
	cost: VehicleMaintenanceSchema.shape.cost.optional().register(fieldRegistry, {
		id: "transport-management-vehicle-maintenance-cost-update",
		type: "field",
		label: "Cost",
		description: "Enter a cost",
		inputType: "number",
	}),
	notes: VehicleMaintenanceSchema.shape.notes.optional().register(fieldRegistry, {
		id: "transport-management-vehicle-maintenance-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
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
					Collections.TransportManagementVehicleMaintenance,
				)
				.update(meta.id!, value);

			toast.success("Vehicle Maintenance updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update vehicle-maintenance: ${error.message} (${error.status})`,
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
		queryKey: ["vehicleMaintenance", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementVehicleMaintenance)
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
					<form.SubmitButton>Update Vehicle Maintenance</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
