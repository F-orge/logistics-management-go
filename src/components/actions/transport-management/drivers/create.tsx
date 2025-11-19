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
import { DriversSchema } from "@/pocketbase/schemas/transport-management/drivers";

export const CreateSchema = z.object({
	user: DriversSchema.shape.user.register(fieldRegistry, {
		id: "transport-management-drivers-user-create",
		type: "field",
		label: "User",
		description: "Enter a user",
		inputType: "relation",
		props: {
			collectionName: Collections.Users,
			displayField: "email",
			relationshipName: "user",
		},
	}),
	licenseNumber: DriversSchema.shape.licenseNumber.register(fieldRegistry, {
		id: "transport-management-drivers-licenseNumber-create",
		type: "field",
		label: "LicenseNumber",
		description: "Enter a licensenumber",
		inputType: "text",
	}),
	licenseExpiryDate: DriversSchema.shape.licenseExpiryDate.register(
		fieldRegistry,
		{
			id: "transport-management-drivers-licenseExpiryDate-create",
			type: "field",
			label: "LicenseExpiryDate",
			description: "Enter a licenseexpirydate",
			inputType: "date",
		},
	),
	status: DriversSchema.shape.status.register(fieldRegistry, {
		id: "transport-management-drivers-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
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
				.collection(Collections.TransportManagementDrivers)
				.create(value);
			toast.success("Driver created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create driver: ${error.message} (${error.status})`,
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
