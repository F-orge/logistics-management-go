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
import { DriverLocationSchema } from "@/pocketbase/schemas/delivery-management/driver-location";

export const CreateDriverLocationSchema = z.object({
	driver: DriverLocationSchema.shape.driver.register(fieldRegistry, {
		id: "dm-driver-locations-driver-create",
		type: "field",
		label: "Driver",
		description: "Enter the driver identifier",
		inputType: "text",
	}),
	coordinates: DriverLocationSchema.shape.coordinates.register(fieldRegistry, {
		id: "dm-driver-locations-coordinates-create",
		type: "field",
		label: "Coordinates",
		description: "Enter the GPS coordinates",
		inputType: "text",
	}),
	heading: DriverLocationSchema.shape.heading.register(fieldRegistry, {
		id: "dm-driver-locations-heading-create",
		type: "field",
		label: "Heading",
		description: "Enter the heading coordinates",
		inputType: "text",
	}),
	timestamp: DriverLocationSchema.shape.timestamp
		.optional()
		.register(fieldRegistry, {
			id: "dm-driver-locations-timestamp-create",
			type: "field",
			label: "Timestamp",
			description: "Select the timestamp (optional)",
			inputType: "date",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateDriverLocationSchema>,
	validators: {
		onSubmit: CreateDriverLocationSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementDriverLocation)
				.create(value);

			toast.success("Driver location created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create driver location: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateDriverLocationForm = () => {
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
					{...toAutoFormFieldSet(CreateDriverLocationSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Driver Location</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateDriverLocationForm;
