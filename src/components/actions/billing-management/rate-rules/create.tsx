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
import { RateRulesSchema } from "@/pocketbase/schemas/billing-management/rate-rules";

export const CreateSchema = z.object({
	rateCard: RateRulesSchema.shape.rateCard.register(fieldRegistry, {
		id: "billing-management-rate-rules-rateCard-create",
		type: "field",
		label: "RateCard",
		description: "Enter a ratecard",
		inputType: "text",
	}),
	condition: RateRulesSchema.shape.condition.register(fieldRegistry, {
		id: "billing-management-rate-rules-condition-create",
		type: "field",
		label: "Condition",
		description: "Enter a condition",
		inputType: "text",
	}),
	value: RateRulesSchema.shape.value.register(fieldRegistry, {
		id: "billing-management-rate-rules-value-create",
		type: "field",
		label: "Value",
		description: "Enter a value",
		inputType: "text",
	}),
	price: RateRulesSchema.shape.price.register(fieldRegistry, {
		id: "billing-management-rate-rules-price-create",
		type: "field",
		label: "Price",
		description: "Enter a price",
		inputType: "number",
	}),
	pricingModel: RateRulesSchema.shape.pricingModel.register(fieldRegistry, {
		id: "billing-management-rate-rules-pricingModel-create",
		type: "field",
		label: "PricingModel",
		description: "Enter a pricingmodel",
		inputType: "select",
	}),
	minValue: RateRulesSchema.shape.minValue.register(fieldRegistry, {
		id: "billing-management-rate-rules-minValue-create",
		type: "field",
		label: "MinValue",
		description: "Enter a minvalue",
		inputType: "number",
	}),
	maxValue: RateRulesSchema.shape.maxValue.register(fieldRegistry, {
		id: "billing-management-rate-rules-maxValue-create",
		type: "field",
		label: "MaxValue",
		description: "Enter a maxvalue",
		inputType: "number",
	}),
	priority: RateRulesSchema.shape.priority.register(fieldRegistry, {
		id: "billing-management-rate-rules-priority-create",
		type: "field",
		label: "Priority",
		description: "Enter a priority",
		inputType: "number",
	}),
	isActive: RateRulesSchema.shape.isActive.register(fieldRegistry, {
		id: "billing-management-rate-rules-isActive-create",
		type: "field",
		label: "IsActive",
		description: "Enter an isactive",
		inputType: "boolean",
	})
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
			await meta.pocketbase
				.collection(Collections.BillingManagementRateRules)
				.create(value);
			toast.success("Rate Rules created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create rate-rules: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateForm = () => {
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
					<form.SubmitButton>Create Rate Rules</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
