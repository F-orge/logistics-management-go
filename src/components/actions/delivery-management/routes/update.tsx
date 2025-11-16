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
import { RoutesSchema } from "@/pocketbase/schemas/delivery-management/routes";
import { CreateRouteSchema } from "./create";

export const UpdateRouteSchema = z.object({
	driver: RoutesSchema.shape.driver.optional().register(fieldRegistry, {
		id: "dm-routes-driver-update",
		type: "field",
		label: "Driver",
		description: "Select the driver (optional)",
		inputType: "text",
	}),
	routeDate: RoutesSchema.shape.routeDate.optional().register(fieldRegistry, {
		id: "dm-routes-routeDate-update",
		type: "field",
		label: "Route Date",
		description: "Select the route date (optional)",
		inputType: "date",
	}),
	status: RoutesSchema.shape.status.optional().register(fieldRegistry, {
		id: "dm-routes-status-update",
		type: "field",
		label: "Status",
		description: "Select the route status (optional)",
		inputType: "select",
	}),
	totalDistance: RoutesSchema.shape.totalDistance
		.optional()
		.register(fieldRegistry, {
			id: "dm-routes-totalDistance-update",
			type: "field",
			label: "Total Distance",
			description: "Enter the total distance (optional)",
			inputType: "number",
		}),
	estimatedDurationInMinutes: RoutesSchema.shape.estimatedDurationInMinutes
		.optional()
		.register(fieldRegistry, {
			id: "dm-routes-estimatedDurationInMinutes-update",
			type: "field",
			label: "Estimated Duration (Minutes)",
			description: "Enter estimated duration in minutes (optional)",
			inputType: "number",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateRouteSchema>,
	validators: {
		onSubmit: UpdateRouteSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementRoutes)
				.update(meta.id!, value);

			toast.success("Route updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update route: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateRouteForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useQuery({
		queryKey: ["routes", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.DeliveryManagementRoutes)
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
					{...toAutoFormFieldSet(UpdateRouteSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Route</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateRouteForm;
