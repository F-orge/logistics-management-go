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
import { ContactsSchema } from "@/pocketbase/schemas/customer-relations/contacts";
import { CreateContactsSchema } from "./create";

export const UpdateContactsSchema = z.object({
	name: ContactsSchema.shape.name.optional().register(fieldRegistry, {
		id: "crm-contacts-name-update",
		type: "field",
		label: "Contact Name",
		description: "Enter the contact name",
		inputType: "text",
	}),
	email: ContactsSchema.shape.email.optional().register(fieldRegistry, {
		id: "crm-contacts-email-update",
		type: "field",
		label: "Email",
		description: "Enter the email address",
		inputType: "email",
	}),
	phoneNumber: ContactsSchema.shape.phoneNumber
		.optional()
		.register(fieldRegistry, {
			id: "crm-contacts-phoneNumber-update",
			type: "field",
			label: "Phone Number",
			description: "Enter the phone number (optional)",
			inputType: "text",
		}),
	jobTitle: ContactsSchema.shape.jobTitle.optional().register(fieldRegistry, {
		id: "crm-contacts-jobTitle-update",
		type: "field",
		label: "Job Title",
		description: "Enter the job title (optional)",
		inputType: "text",
	}),
	company: ContactsSchema.shape.company.optional().register(fieldRegistry, {
		id: "crm-contacts-company-update",
		type: "field",
		label: "Company",
		description: "Enter the company (optional)",
		inputType: "text",
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateContactsSchema>,
	validators: {
		onSubmit: UpdateContactsSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsContacts)
				.update(meta.id, value);

			toast.success("Contact updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update contact: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const UpdateContactsForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["contact", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsContacts)
				.getOne(searchQuery.id!);
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data || {},
	});

	if (!data) return null;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(UpdateContactsSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Contact</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateContactsForm;
