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
import { ContactsSchema } from "@/pocketbase/schemas/customer-relations/contacts";

export const CreateContactsSchema = z.object({
	name: ContactsSchema.shape.name.register(fieldRegistry, {
		id: "crm-contacts-name-create",
		type: "field",
		label: "Contact Name",
		description: "Enter the contact name",
		inputType: "text",
	}),
	email: ContactsSchema.shape.email.register(fieldRegistry, {
		id: "crm-contacts-email-create",
		type: "field",
		label: "Email",
		description: "Enter the email address",
		inputType: "email",
	}),
	phoneNumber: ContactsSchema.shape.phoneNumber.register(fieldRegistry, {
		id: "crm-contacts-phoneNumber-create",
		type: "field",
		label: "Phone Number",
		description: "Enter the phone number (optional)",
		inputType: "text",
	}),
	jobTitle: ContactsSchema.shape.jobTitle.register(fieldRegistry, {
		id: "crm-contacts-jobTitle-create",
		type: "field",
		label: "Job Title",
		description: "Enter the job title (optional)",
		inputType: "text",
	}),
	company: ContactsSchema.shape.company.register(fieldRegistry, {
		id: "crm-contacts-company-create",
		type: "field",
		label: "Company",
		description: "Enter the company (optional)",
		inputType: "text",
	}),
	attachments: ContactsSchema.shape.attachments.register(fieldRegistry, {
		id: "crm-contacts-attachments-create",
		type: "field",
		inputType: "file",
		label: "Attachments",
		description: "Upload attachments (optional)",
		isArray: true,
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateContactsSchema>,
	validators: {
		onSubmit: CreateContactsSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsContacts)
				.create(value);

			toast.success("Contact created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create contact: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateContactsForm = () => {
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
					{...toAutoFormFieldSet(CreateContactsSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Contact</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateContactsForm;
