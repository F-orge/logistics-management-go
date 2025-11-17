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
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
	Collections,
	CustomerRelationsCompaniesRecord,
	TypedPocketBase,
} from "@/lib/pb.types";
import { CasesSchema } from "@/pocketbase/schemas/customer-relations/cases";

export const CreateSchema = z.object({
	caseNumber: CasesSchema.shape.caseNumber.register(fieldRegistry, {
		id: "customer-relations-cases-caseNumber-create",
		type: "field",
		label: "CaseNumber",
		description: "Case number is required",
		inputType: "text",
	}),
	status: CasesSchema.shape.status.register(fieldRegistry, {
		id: "customer-relations-cases-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	priority: CasesSchema.shape.priority.register(fieldRegistry, {
		id: "customer-relations-cases-priority-create",
		type: "field",
		label: "Priority",
		description: "Enter a priority",
		inputType: "select",
	}),
	type: CasesSchema.shape.type.register(fieldRegistry, {
		id: "customer-relations-cases-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	contact: CasesSchema.shape.contact.register(fieldRegistry, {
		id: "customer-relations-cases-contact-create",
		type: "field",
		label: "Contact",
		description: "Enter a contact",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsContacts,
			displayField: "name",
			relationshipName: "contact",
		},
	}),
	description: CasesSchema.shape.description.register(fieldRegistry, {
		id: "customer-relations-cases-description-create",
		type: "field",
		label: "Description",
		description: "Enter a description",
		inputType: "textarea",
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
				.pocketbase!.collection(Collections.CustomerRelationsCases)
				.create({
					...value,
					owner: meta.pocketbase!.authStore.record?.id,
				});

			toast.success("Case created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create case: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateCasesForm = () => {
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
					<form.SubmitButton>Create Case</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateCasesForm;
