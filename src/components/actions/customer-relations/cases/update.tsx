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
import { CasesSchema } from "@/pocketbase/schemas/customer-relations/cases";
import { CreateCasesSchema } from "./create";

export const UpdateCasesSchema = z.object({
	caseNumber: CasesSchema.shape.caseNumber.optional().register(fieldRegistry, {
		id: "crm-cases-caseNumber-update",
		type: "field",
		label: "Case Number",
		description: "Enter the case number",
		inputType: "text",
	}),
	status: CasesSchema.shape.status.optional().register(fieldRegistry, {
		id: "crm-cases-status-update",
		type: "field",
		label: "Status",
		description: "Select the case status",
		inputType: "select",
	}),
	priority: CasesSchema.shape.priority.optional().register(fieldRegistry, {
		id: "crm-cases-priority-update",
		type: "field",
		label: "Priority",
		description: "Select the priority level",
		inputType: "select",
	}),
	type: CasesSchema.shape.type.optional().register(fieldRegistry, {
		id: "crm-cases-type-update",
		type: "field",
		label: "Type",
		description: "Select the case type",
		inputType: "select",
	}),
	contact: CasesSchema.shape.contact.optional().register(fieldRegistry, {
		id: "crm-cases-contact-update",
		type: "field",
		label: "Contact",
		description: "Enter the contact (optional)",
		inputType: "text",
	}),
	description: CasesSchema.shape.description
		.optional()
		.register(fieldRegistry, {
			id: "crm-cases-description-update",
			type: "field",
			label: "Description",
			description: "Enter the case description (optional)",
			inputType: "textarea",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateCasesSchema>,
	validators: {
		onSubmit: UpdateCasesSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsCases)
				.update(meta.id, value);

			toast.success("Case updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update case: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const UpdateCasesForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["case", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsCases)
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
					{...toAutoFormFieldSet(UpdateCasesSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Case</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateCasesForm;
