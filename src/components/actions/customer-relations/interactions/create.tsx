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
import { InteractionsSchema } from "@/pocketbase/schemas/customer-relations/interactions";

export const CreateSchema = z.object({
	contact: InteractionsSchema.shape.contact.register(fieldRegistry, {
		id: "customer-relations-interactions-contact-create",
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
	case: InteractionsSchema.shape.case.register(fieldRegistry, {
		id: "customer-relations-interactions-case-create",
		type: "field",
		label: "Case",
		description: "Enter a case",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsCases,
			displayField: "caseNumber",
			relationshipName: "case",
		},
	}),
	type: InteractionsSchema.shape.type.register(fieldRegistry, {
		id: "customer-relations-interactions-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	outcome: InteractionsSchema.shape.outcome.register(fieldRegistry, {
		id: "customer-relations-interactions-outcome-create",
		type: "field",
		label: "Outcome",
		description: "Enter an outcome",
		inputType: "textarea",
	}),
	notes: InteractionsSchema.shape.notes.register(fieldRegistry, {
		id: "customer-relations-interactions-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
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
				.pocketbase!.collection(Collections.CustomerRelationsInteractions)
				.create({
					...value,
					user: meta.pocketbase!.authStore.model?.id,
					interactionDate: new Date().toISOString(),
				});

			toast.success("Interaction created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create interaction: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateInteractionsForm = () => {
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
					<form.SubmitButton>Create Interaction</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateInteractionsForm;
