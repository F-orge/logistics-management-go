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
import { GeofenceEventsSchema } from "@/pocketbase/schemas/transport-management";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	vehicle: GeofenceEventsSchema.shape.vehicle
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-geofence-events-vehicle-update",
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
	geofence: GeofenceEventsSchema.shape.geofence
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-geofence-events-geofence-update",
			type: "field",
			label: "Geofence",
			description: "Enter a geofence",
			inputType: "text",
		}),
	type: GeofenceEventsSchema.shape.type.optional().register(fieldRegistry, {
		id: "transport-management-geofence-events-type-update",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	timestamp: GeofenceEventsSchema.shape.timestamp
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-geofence-events-timestamp-update",
			type: "field",
			label: "Timestamp",
			description: "Enter a timestamp",
			inputType: "date",
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
				.pocketbase!.collection(Collections.TransportManagementGeofenceEvents)
				.update(meta.id!, value);

			toast.success("Geofence Events updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update geofence-events: ${error.message} (${error.status})`,
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
		queryKey: ["geofenceEvents", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementGeofenceEvents)
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
					<form.SubmitButton>Update Geofence Events</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
