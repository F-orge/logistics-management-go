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
import { DriverSchedulesSchema } from "@/pocketbase/schemas/transport-management/driver-schedules";

export const CreateSchema = z.object({
	driver: DriverSchedulesSchema.shape.driver.register(fieldRegistry, {
		id: "tm-driver-schedules-driver-create",
		type: "field",
		label: "Driver",
		description: "Enter the driver identifier",
		inputType: "text",
	}),
	startDate: DriverSchedulesSchema.shape.startDate.register(fieldRegistry, {
		id: "tm-driver-schedules-startDate-create",
		type: "field",
		label: "Start Date",
		description: "Select the start date",
		inputType: "date",
	}),
	endDate: DriverSchedulesSchema.shape.endDate.register(fieldRegistry, {
		id: "tm-driver-schedules-endDate-create",
		type: "field",
		label: "End Date",
		description: "Select the end date",
		inputType: "date",
	}),
	reason: DriverSchedulesSchema.shape.reason.register(fieldRegistry, {
		id: "tm-driver-schedules-reason-create",
		type: "field",
		label: "Reason",
		description: "Select the reason (optional)",
		inputType: "select",
		options: [
			{ value: "vacation", label: "Vacation" },
			{ value: "sick-leave", label: "Sick Leave" },
			{ value: "training", label: "Training" },
			{ value: "personal-leave", label: "Personal Leave" },
		],
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
				.collection(Collections.TransportManagementDriverSchedules)
				.create(value);
			toast.success("Driver schedule created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create driver schedule: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Item</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
