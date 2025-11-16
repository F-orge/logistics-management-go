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
import { DriverSchedulesSchema } from "@/pocketbase/schemas/transport-management/driver-schedules";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	driver: DriverSchedulesSchema.shape.driver
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-driver-schedules-driver-update",
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
	startDate: DriverSchedulesSchema.shape.startDate
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-driver-schedules-startDate-update",
			type: "field",
			label: "StartDate",
			description: "Enter a startdate",
			inputType: "date",
		}),
	endDate: DriverSchedulesSchema.shape.endDate
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-driver-schedules-endDate-update",
			type: "field",
			label: "EndDate",
			description: "Enter an enddate",
			inputType: "date",
		}),
	reason: DriverSchedulesSchema.shape.reason
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-driver-schedules-reason-update",
			type: "field",
			label: "Reason",
			description: "Enter a reason",
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
				.pocketbase!.collection(Collections.TransportManagementDriverSchedules)
				.update(meta.id!, value);

			toast.success("Driver schedule updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update driver schedule: ${error.message} (${error.status})`,
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
		queryKey: ["driver-schedules", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementDriverSchedules)
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
					<form.SubmitButton>Update Driver Schedule</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
