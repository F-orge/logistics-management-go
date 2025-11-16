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
import { Collections, Create, TypedPocketBase } from "@/lib/pb.types";
import { OpportunitiesSchema } from "@/pocketbase/schemas/customer-relations/opportunities";

export const CreateSchema = z.object({
	name: OpportunitiesSchema.shape.name.register(fieldRegistry, {
		id: "customer-relations-opportunities-name-create",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	stage: OpportunitiesSchema.shape.stage.register(fieldRegistry, {
		id: "customer-relations-opportunities-stage-create",
		type: "field",
		label: "Stage",
		description: "Enter a stage",
		inputType: "text",
	}),
	dealValue: OpportunitiesSchema.shape.dealValue.register(fieldRegistry, {
		id: "customer-relations-opportunities-dealValue-create",
		type: "field",
		label: "DealValue",
		description: "Enter a dealvalue",
		inputType: "number",
	}),
	probability: OpportunitiesSchema.shape.probability.register(fieldRegistry, {
		id: "customer-relations-opportunities-probability-create",
		type: "field",
		label: "Probability",
		description: "Enter a probability",
		inputType: "text",
	}),
	expectedCloseDate: OpportunitiesSchema.shape.expectedCloseDate.register(
		fieldRegistry,
		{
			id: "customer-relations-opportunities-expectedCloseDate-create",
			type: "field",
			label: "ExpectedCloseDate",
			description: "Enter an expectedclosedate",
			inputType: "date",
		},
	),
	lostReason: OpportunitiesSchema.shape.lostReason.register(fieldRegistry, {
		id: "customer-relations-opportunities-lostReason-create",
		type: "field",
		label: "LostReason",
		description: "Enter a lostreason",
		inputType: "text",
	}),
	source: OpportunitiesSchema.shape.source.register(fieldRegistry, {
		id: "customer-relations-opportunities-source-create",
		type: "field",
		label: "Source",
		description: "Enter a source",
		inputType: "select",
	}),
	owner: OpportunitiesSchema.shape.owner.register(fieldRegistry, {
		id: "customer-relations-opportunities-owner-create",
		type: "field",
		label: "Owner",
		description: "Enter an owner",
		inputType: "text",
	}),
	contact: OpportunitiesSchema.shape.contact.register(fieldRegistry, {
		id: "customer-relations-opportunities-contact-create",
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
	company: OpportunitiesSchema.shape.company.register(fieldRegistry, {
		id: "customer-relations-opportunities-company-create",
		type: "field",
		label: "Company",
		description: "Enter a company",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsCompanies,
			displayField: "name",
			relationshipName: "company",
		},
	}),
	campaign: OpportunitiesSchema.shape.campaign.register(fieldRegistry, {
		id: "customer-relations-opportunities-campaign-create",
		type: "field",
		label: "Campaign",
		description: "Enter a campaign",
		inputType: "text",
	}),
	products: OpportunitiesSchema.shape.products.register(fieldRegistry, {
		id: "customer-relations-opportunities-products-create",
		type: "field",
		label: "Products",
		description: "Enter a products",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsOpportunityProducts,
			displayField: "name",
			relationshipName: "products",
		},
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
				.pocketbase!.collection(Collections.CustomerRelationsOpportunities)
				.create<Create<Collections.CustomerRelationsOpportunities>>(value);

			toast.success("Opportunity created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create opportunity: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateOpportunitiesForm = () => {
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
					<form.SubmitButton>Create Opportunity</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateOpportunitiesForm;
