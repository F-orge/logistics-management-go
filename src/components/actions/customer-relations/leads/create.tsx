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
import { LeadsSchema } from "@/pocketbase/schemas/customer-relations/leads";

export const CreateLeadsSchema = z.object({
	name: LeadsSchema.shape.name.register(fieldRegistry, {
		id: "crm-leads-name-create",
		type: "field",
		label: "Lead Name",
		description: "Enter the lead name (optional)",
		inputType: "text",
	}),
	email: LeadsSchema.shape.email.register(fieldRegistry, {
		id: "crm-leads-email-create",
		type: "field",
		label: "Email",
		description: "Enter the email (optional)",
		inputType: "email",
	}),
	source: LeadsSchema.shape.source.register(fieldRegistry, {
		id: "crm-leads-source-create",
		type: "field",
		label: "Source",
		description: "Select the lead source (optional)",
		inputType: "select",
	}),
	status: LeadsSchema.shape.status.register(fieldRegistry, {
		id: "crm-leads-status-create",
		type: "field",
		label: "Status",
		description: "Select the status (optional)",
		inputType: "select",
	}),
	score: LeadsSchema.shape.score.register(fieldRegistry, {
		id: "crm-leads-score-create",
		type: "field",
		label: "Score",
		description: "Enter the lead score",
		inputType: "number",
	}),
	campaign: LeadsSchema.shape.campaign.register(fieldRegistry, {
		id: "crm-leads-campaign-create",
		type: "field",
		label: "Campaign",
		description: "Select the campaign (optional)",
		inputType: "text",
	}),
	convertedAt: LeadsSchema.shape.convertedAt.register(fieldRegistry, {
		id: "crm-leads-convertedAt-create",
		type: "field",
		label: "Converted At",
		description: "Select the conversion date (optional)",
		inputType: "date",
	}),
	convertedContact: LeadsSchema.shape.convertedContact.register(fieldRegistry, {
		id: "crm-leads-convertedContact-create",
		type: "field",
		label: "Converted Contact",
		description: "Enter the converted contact (optional)",
		inputType: "text",
	}),
	convertedCompany: LeadsSchema.shape.convertedCompany.register(fieldRegistry, {
		id: "crm-leads-convertedCompany-create",
		type: "field",
		label: "Converted Company",
		description: "Enter the converted company (optional)",
		inputType: "text",
	}),
	convertedOpportunity: LeadsSchema.shape.convertedOpportunity.register(
		fieldRegistry,
		{
			id: "crm-leads-convertedOpportunity-create",
			type: "field",
			label: "Converted Opportunity",
			description: "Enter the converted opportunity (optional)",
			inputType: "text",
		},
	),
	attachments: LeadsSchema.shape.attachments.register(fieldRegistry, {
		id: "crm-leads-attachments-create",
		type: "field",
		inputType: "file",
		label: "Attachments",
		description: "Upload attachments (optional)",
		isArray: true,
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateLeadsSchema>,
	validators: {
		onSubmit: CreateLeadsSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsLeads)
				.create(value);

			toast.success("Lead created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create lead: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateLeadsForm = () => {
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
					{...toAutoFormFieldSet(CreateLeadsSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Lead</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateLeadsForm;
