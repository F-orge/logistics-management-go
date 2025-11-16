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
import { CampaignsSchema } from "@/pocketbase/schemas/customer-relations/campaigns";
import { CreateCampaignSchema } from "./create";

export const UpdateCampaignSchema = z.object({
	name: CampaignsSchema.shape.name.optional().register(fieldRegistry, {
		id: "crm-campaign-name-update",
		type: "field",
		label: "Campaign Name",
		description: "Enter the name of the campaign",
		inputType: "text",
	}),
	budget: CampaignsSchema.shape.budget.optional().register(fieldRegistry, {
		id: "crm-campaign-budget-update",
		type: "field",
		label: "Budget",
		description: "Enter the budget for the campaign",
		inputType: "number",
	}),
	startDate: CampaignsSchema.shape.startDate
		.optional()
		.register(fieldRegistry, {
			id: "crm-campaign-startDate-update",
			type: "field",
			label: "Start Date",
			description: "Enter the start date of the campaign",
			inputType: "date",
		}),
	endDate: CampaignsSchema.shape.endDate.optional().register(fieldRegistry, {
		id: "crm-campaign-endDate-update",
		type: "field",
		label: "End Date",
		description: "Enter the end date of the campaign",
		inputType: "date",
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateCampaignSchema>,
	validators: {
		onSubmit: UpdateCampaignSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsCampaigns)
				.update(meta.id, value);

			toast.success("Campaign updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update campaign: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const UpdateCampaignForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["campaign", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsCampaigns)
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
					{...toAutoFormFieldSet(UpdateCampaignSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Campaign</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateCampaignForm;
