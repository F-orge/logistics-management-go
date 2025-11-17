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

export const CreateSchema = z.object({
	coordinates: DriverLocationSchema.shape.coordinates.register(fieldRegistry, {
		id: "delivery-management-driver-locations-coordinates-create",
		type: "field",
		label: "Coordinates",
		description: "Enter a coordinates",
		inputType: "geoPoint",
	}),
	heading: DriverLocationSchema.shape.heading.register(fieldRegistry, {
		id: "delivery-management-driver-locations-heading-create",
		type: "field",
		label: "Heading",
		description: "Enter a heading",
		inputType: "geoPoint",
	}),
	timestamp: DriverLocationSchema.shape.timestamp.register(fieldRegistry, {
		id: "delivery-management-driver-locations-timestamp-create",
		type: "field",
		label: "Timestamp",
		description: "Enter a timestamp",
		inputType: "date",
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
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Driver Location</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateDriverLocationForm;
