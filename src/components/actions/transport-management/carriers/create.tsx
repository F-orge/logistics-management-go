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
import { CarriersSchema } from "@/pocketbase/schemas/transport-management/carriers";

export const CreateSchema = z.object({
	name: CarriersSchema.shape.name.register(fieldRegistry, {
		id: "transport-management-carriers-name-create",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	contactDetails: CarriersSchema.shape.contactDetails.register(fieldRegistry, {
		id: "transport-management-carriers-contactDetails-create",
		type: "field",
		label: "ContactDetails",
		description: "Enter contact details",
		inputType: "textarea",
	}),
	serviceOffered: CarriersSchema.shape.serviceOffered.register(fieldRegistry, {
		id: "transport-management-carriers-serviceOffered-create",
		type: "field",
		label: "ServiceOffered",
		description: "Enter services offered",
		inputType: "textarea",
	}),
	image: CarriersSchema.shape.image.register(fieldRegistry, {
		id: "transport-management-carriers-image-create",
		type: "field",
		label: "Image",
		description: "Upload an image",
		inputType: "file",
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
				.collection(Collections.TransportManagementCarriers)
				.create(value);
			toast.success("Carrier created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create carrier: ${error.message} (${error.status})`,
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
