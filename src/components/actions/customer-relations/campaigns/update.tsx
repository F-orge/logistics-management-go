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

export const UpdateSchema = z.object({
	name: CampaignsSchema.shape.name.optional().register(fieldRegistry, {
		id: "customer-relations-campaigns-name-update",
		type: "field",
		label: "Name",
		description: "Campaign name is required",
		inputType: "text",
	}),
	budget: CampaignsSchema.shape.budget.optional().register(fieldRegistry, {
		id: "customer-relations-campaigns-budget-update",
		type: "field",
		label: "Budget",
		description: "Enter a budget",
		inputType: "number",
	}),
	startDate: CampaignsSchema.shape.startDate
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-campaigns-startDate-update",
			type: "field",
			label: "StartDate",
			description: "Enter a startdate",
			inputType: "date",
		}),
	endDate: CampaignsSchema.shape.endDate.optional().register(fieldRegistry, {
		id: "customer-relations-campaigns-endDate-update",
		type: "field",
		label: "EndDate",
		description: "Enter an enddate",
		inputType: "date",
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
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Campaign</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateCampaignForm;
