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
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
	Collections,
	TransportManagementDriversResponse,
	TypedPocketBase,
	UsersRecord,
} from "@/lib/pb.types";
import { RoutesSchema } from "@/pocketbase/schemas/delivery-management/routes";

export const CreateSchema = z.object({
	name: RoutesSchema.shape.name.register(fieldRegistry, {
		id: "delivery-management-routes-name-create",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	driver: RoutesSchema.shape.driver.register(fieldRegistry, {
		id: "delivery-management-routes-driver-create",
		type: "field",
		label: "Driver",
		description: "Enter a driver",
		inputType: "relation",
		props: {
			collectionName: Collections.TransportManagementDrivers,
			displayField: "name",
			recordListOption: { expand: "user" },
			relationshipName: "driver",
			renderOption: (record) => record?.expand.user?.name || "no name",
		} as RelationFieldProps<
			TransportManagementDriversResponse<{ user: UsersRecord }>
		>,
	}),
	routeDate: RoutesSchema.shape.routeDate.register(fieldRegistry, {
		id: "delivery-management-routes-routeDate-create",
		type: "field",
		label: "RouteDate",
		description: "Enter a routedate",
		inputType: "date",
	}),
	status: RoutesSchema.shape.status.register(fieldRegistry, {
		id: "delivery-management-routes-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	totalDistance: RoutesSchema.shape.totalDistance.register(fieldRegistry, {
		id: "delivery-management-routes-totalDistance-create",
		type: "field",
		label: "TotalDistance",
		description: "Enter a totaldistance",
		inputType: "number",
	}),
	startedAt: RoutesSchema.shape.startedAt.register(fieldRegistry, {
		id: "delivery-management-routes-startedAt-create",
		type: "field",
		label: "StartedAt",
		description: "Enter a startedat",
		inputType: "date",
		props: {
			showTime: true,
		},
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
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementRoutes)
				.create(value);

			toast.success("Route created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create route: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateRouteForm = () => {
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
					<form.SubmitButton>Create Route</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateRouteForm;
