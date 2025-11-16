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
import { LeadsSchema } from "@/pocketbase/schemas/customer-relations/leads";

export const UpdateSchema = z.object({
	name: LeadsSchema.shape.name.optional().register(fieldRegistry, {
		id: "customer-relations-leads-name-update",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	email: LeadsSchema.shape.email.optional().register(fieldRegistry, {
		id: "customer-relations-leads-email-update",
		type: "field",
		label: "Email",
		description: "Enter an email",
		inputType: "text",
	}),
	source: LeadsSchema.shape.source.optional().register(fieldRegistry, {
		id: "customer-relations-leads-source-update",
		type: "field",
		label: "Source",
		description: "Enter a source",
		inputType: "text",
	}),
	status: LeadsSchema.shape.status.optional().register(fieldRegistry, {
		id: "customer-relations-leads-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	score: LeadsSchema.shape.score.optional().register(fieldRegistry, {
		id: "customer-relations-leads-score-update",
		type: "field",
		label: "Score",
		description: "Enter a score",
		inputType: "number",
	}),
	owner: LeadsSchema.shape.owner.optional().register(fieldRegistry, {
		id: "customer-relations-leads-owner-update",
		type: "field",
		label: "Owner",
		description: "Enter an owner",
		inputType: "text",
	}),
	campaign: LeadsSchema.shape.campaign.optional().register(fieldRegistry, {
		id: "customer-relations-leads-campaign-update",
		type: "field",
		label: "Campaign",
		description: "Enter a campaign",
		inputType: "text",
	}),
	convertedAt: LeadsSchema.shape.convertedAt
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-leads-convertedAt-update",
			type: "field",
			label: "ConvertedAt",
			description: "Enter a convertedat",
			inputType: "date",
		}),
	convertedContact: LeadsSchema.shape.convertedContact
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-leads-convertedContact-update",
			type: "field",
			label: "ConvertedContact",
			description: "Enter a convertedcontact",
			inputType: "relation",
			props: {
				collectionName: Collections.CustomerRelationsContacts,
				displayField: "name",
				relationshipName: "convertedContact",
			},
		}),
	convertedCompany: LeadsSchema.shape.convertedCompany
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-leads-convertedCompany-update",
			type: "field",
			label: "ConvertedCompany",
			description: "Enter a convertedcompany",
			inputType: "relation",
			props: {
				collectionName: Collections.CustomerRelationsCompanies,
				displayField: "name",
				relationshipName: "convertedCompany",
			},
		}),
	convertedOpportunity: LeadsSchema.shape.convertedOpportunity
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-leads-convertedOpportunity-update",
			type: "field",
			label: "ConvertedOpportunity",
			description: "Enter a convertedopportunity",
			inputType: "relation",
			props: {
				collectionName: Collections.CustomerRelationsOpportunities,
				displayField: "name",
				relationshipName: "convertedOpportunity",
			},
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
				.pocketbase!.collection(Collections.CustomerRelationsLeads)
				.update(meta.id, value);

			toast.success("Lead updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update lead: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const UpdateLeadsForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["lead", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsLeads)
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
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Lead</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateLeadsForm;
