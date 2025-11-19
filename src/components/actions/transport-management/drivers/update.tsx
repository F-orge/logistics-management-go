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
import { DriversSchema } from "@/pocketbase/schemas/transport-management/drivers";

export const UpdateSchema = z.object({
	licenseNumber: DriversSchema.shape.licenseNumber
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-drivers-licenseNumber-update",
			type: "field",
			label: "LicenseNumber",
			description: "Enter a licensenumber",
			inputType: "text",
		}),
	licenseExpiryDate: DriversSchema.shape.licenseExpiryDate
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-drivers-licenseExpiryDate-update",
			type: "field",
			label: "LicenseExpiryDate",
			description: "Enter a licenseexpirydate",
			inputType: "date",
		}),
	status: DriversSchema.shape.status.optional().register(fieldRegistry, {
		id: "transport-management-drivers-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
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
				.pocketbase!.collection(Collections.TransportManagementDrivers)
				.update(meta.id!, value);
			toast.success("Driver updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update item: ${error.message} (${error.status})`,
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
		queryKey: ["drivers", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementDrivers)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: {
			...data,
			licenseExpiryDate: data.licenseExpiryDate
				? new Date(data.licenseExpiryDate)
				: undefined,
		} as z.infer<typeof UpdateSchema>,
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
					<form.SubmitButton>Update Driver</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
