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
import { DriverLocationSchema } from "@/pocketbase/schemas/delivery-management/driver-location";
import { CreateDriverLocationSchema } from "./create";

export const UpdateDriverLocationSchema = z.object({
	driver: DriverLocationSchema.shape.driver.optional().register(fieldRegistry, {
		id: "dm-driver-locations-driver-update",
		type: "field",
		label: "Driver",
		description: "Enter the driver identifier",
		inputType: "text",
	}),
	coordinates: DriverLocationSchema.shape.coordinates
		.optional()
		.register(fieldRegistry, {
			id: "dm-driver-locations-coordinates-update",
			type: "field",
			label: "Coordinates",
			description: "Enter the GPS coordinates",
			inputType: "text",
		}),
	heading: DriverLocationSchema.shape.heading
		.optional()
		.register(fieldRegistry, {
			id: "dm-driver-locations-heading-update",
			type: "field",
			label: "Heading",
			description: "Enter the heading coordinates",
			inputType: "text",
		}),
	timestamp: DriverLocationSchema.shape.timestamp
		.optional()
		.register(fieldRegistry, {
			id: "dm-driver-locations-timestamp-update",
			type: "field",
			label: "Timestamp",
			description: "Select the timestamp (optional)",
			inputType: "date",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateDriverLocationSchema>,
	validators: {
		onSubmit: UpdateDriverLocationSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementDriverLocation)
				.update(meta.id!, value);

			toast.success("Driver location updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update driver location: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateDriverLocationForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useQuery({
		queryKey: ["driver-locations", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.DeliveryManagementDriverLocation)
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
					{...toAutoFormFieldSet(UpdateDriverLocationSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Driver Location</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateDriverLocationForm;
