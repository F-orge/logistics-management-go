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

export const CreateSchema = z.object({
	name: CampaignsSchema.shape.name.register(fieldRegistry, {
		id: "customer-relations-campaigns-name-create",
		type: "field",
		label: "Name",
		description: "Campaign name is required",
		inputType: "text",
	}),
	budget: CampaignsSchema.shape.budget.register(fieldRegistry, {
		id: "customer-relations-campaigns-budget-create",
		type: "field",
		label: "Budget",
		description: "Enter a budget",
		inputType: "number",
	}),
	startDate: CampaignsSchema.shape.startDate.register(fieldRegistry, {
		id: "customer-relations-campaigns-startDate-create",
		type: "field",
		label: "StartDate",
		description: "Enter a startdate",
		inputType: "date",
	}),
	endDate: CampaignsSchema.shape.endDate.register(fieldRegistry, {
		id: "customer-relations-campaigns-endDate-create",
		type: "field",
		label: "EndDate",
		description: "Enter an enddate",
		inputType: "date",
	}),
});

// Enforce business-level constraints not represented directly in the
// auto-generated CampaignsSchema: if both dates are provided, ensure
// startDate <= endDate. We use superRefine to attach a cross-field
// validation error on the startDate field.
export const CreateSchemaWithConstraints = CreateSchema.superRefine(
	(value, ctx) => {
		if (value.startDate && value.endDate) {
			// Date types come from the DateTimeField and z.date() in the schema.
			if (value.startDate > value.endDate) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Start Date must be before or equal to End Date",
					path: ["startDate"],
				});
			}
		}
	},
);

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchemaWithConstraints,
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
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Campaign</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateCampaignForm;
