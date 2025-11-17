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
import { DriverLocationSchema } from "@/pocketbase/schemas/delivery-management/driver-location";

export const UpdateSchema = z.object({
	coordinates: DriverLocationSchema.shape.coordinates
		.optional()
		.register(fieldRegistry, {
			id: "delivery-management-driver-locations-coordinates-update",
			type: "field",
			label: "Coordinates",
			description: "Enter a coordinates",
			inputType: "geoPoint",
		}),
	heading: DriverLocationSchema.shape.heading
		.optional()
		.register(fieldRegistry, {
			id: "delivery-management-driver-locations-heading-update",
			type: "field",
			label: "Heading",
			description: "Enter a heading",
			inputType: "geoPoint",
		}),
	timestamp: DriverLocationSchema.shape.timestamp
		.optional()
		.register(fieldRegistry, {
			id: "delivery-management-driver-locations-timestamp-update",
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

	const { data } = useSuspenseQuery({
		queryKey: ["driver-locations", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.DeliveryManagementDriverLocation)
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
					<form.SubmitButton>Update Driver Location</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateDriverLocationForm;
