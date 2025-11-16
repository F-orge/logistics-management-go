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

export const UpdateSchema = z.object({
	driver: RoutesSchema.shape.driver.optional().register(fieldRegistry, {
		id: "delivery-management-routes-driver-update",
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
	routeDate: RoutesSchema.shape.routeDate.optional().register(fieldRegistry, {
		id: "delivery-management-routes-routeDate-update",
		type: "field",
		label: "RouteDate",
		description: "Enter a routedate",
		inputType: "date",
	}),
	status: RoutesSchema.shape.status.optional().register(fieldRegistry, {
		id: "delivery-management-routes-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	totalDistance: RoutesSchema.shape.totalDistance
		.optional()
		.register(fieldRegistry, {
			id: "delivery-management-routes-totalDistance-update",
			type: "field",
			label: "TotalDistance",
			description: "Enter a totaldistance",
			inputType: "text",
		}),
	estimatedDurationInMinutes: RoutesSchema.shape.estimatedDurationInMinutes
		.optional()
		.register(fieldRegistry, {
			id: "delivery-management-routes-estimatedDurationInMinutes-update",
			type: "field",
			label: "EstimatedDurationInMinutes",
			description: "Enter an estimateddurationinminutes",
			inputType: "text",
		}),
	startedAt: RoutesSchema.shape.startedAt.optional().register(fieldRegistry, {
		id: "delivery-management-routes-startedAt-update",
		type: "field",
		label: "StartedAt",
		description: "Enter a startedat",
		inputType: "date",
	}),
	completedAt: RoutesSchema.shape.completedAt
		.optional()
		.register(fieldRegistry, {
			id: "delivery-management-routes-completedAt-update",
			type: "field",
			label: "CompletedAt",
			description: "Enter a completedat",
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
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Route</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateRouteForm;
