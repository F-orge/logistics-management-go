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
import { CampaignsSchema } from "@/pocketbase/schemas/customer-relations/campaigns";

export const CreateCampaignSchema = z.object({
	name: CampaignsSchema.shape.name.register(fieldRegistry, {
		id: "crm-campaign-name-create",
		type: "field",
		label: "Campaign Name",
		description: "Enter the name of the campaign",
		inputType: "text",
	}),
	budget: CampaignsSchema.shape.budget.register(fieldRegistry, {
		id: "crm-campaign-budget-create",
		type: "field",
		label: "Budget",
		description: "Enter the budget for the campaign",
		inputType: "number",
	}),
	startDate: CampaignsSchema.shape.startDate.register(fieldRegistry, {
		id: "crm-campaign-startDate-create",
		type: "field",
		label: "Start Date",
		description: "Enter the start date of the campaign",
		inputType: "date",
	}),
	endDate: CampaignsSchema.shape.endDate.register(fieldRegistry, {
		id: "crm-campaign-endDate-create",
		type: "field",
		label: "End Date",
		description: "Enter the end date of the campaign",
		inputType: "date",
	}),
	attachments: CampaignsSchema.shape.attachments.register(fieldRegistry, {
		id: "crm-campaign-attachments-create",
		type: "field",
		inputType: "file",
		label: "Attachments",
		description: "Upload attachments for the campaign",
		isArray: true,
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateCampaignSchema>,
	validators: {
		onSubmit: CreateCampaignSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsCampaigns)
				.create(value);

			toast.success("Campaign created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create campaign: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateCampaignForm = () => {
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
					{...toAutoFormFieldSet(CreateCampaignSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Campaign</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateCampaignForm;
