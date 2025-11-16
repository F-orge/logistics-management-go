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
import { SurchargesSchema } from "@/pocketbase/schemas/billing-management/surcharges";

export const CreateSchema = z.object({
	name: SurchargesSchema.shape.name.register(fieldRegistry, {
		id: "billing-management-surcharges-name-create",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	type: SurchargesSchema.shape.type.register(fieldRegistry, {
		id: "billing-management-surcharges-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "text",
	}),
	amount: SurchargesSchema.shape.amount.register(fieldRegistry, {
		id: "billing-management-surcharges-amount-create",
		type: "field",
		label: "Amount",
		description: "Enter an amount",
		inputType: "number",
	}),
	calculationMethod: SurchargesSchema.shape.calculationMethod.register(fieldRegistry, {
		id: "billing-management-surcharges-calculationMethod-create",
		type: "field",
		label: "CalculationMethod",
		description: "Enter a calculationmethod",
		inputType: "text",
	}),
	isActive: SurchargesSchema.shape.isActive.register(fieldRegistry, {
		id: "billing-management-surcharges-isActive-create",
		type: "field",
		label: "IsActive",
		description: "Enter an isactive",
		inputType: "boolean",
	}),
	validFrom: SurchargesSchema.shape.validFrom.register(fieldRegistry, {
		id: "billing-management-surcharges-validFrom-create",
		type: "field",
		label: "ValidFrom",
		description: "Enter a validfrom",
		inputType: "date",
	}),
	validTo: SurchargesSchema.shape.validTo.register(fieldRegistry, {
		id: "billing-management-surcharges-validTo-create",
		type: "field",
		label: "ValidTo",
		description: "Enter a validto",
		inputType: "date",
	}),
	description: SurchargesSchema.shape.description.register(fieldRegistry, {
		id: "billing-management-surcharges-description-create",
		type: "field",
		label: "Description",
		description: "Enter a description",
		inputType: "textarea",
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
				.collection(Collections.BillingManagementSurcharges)
				.create(value);
			toast.success("Surcharges created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create surcharges: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Surcharges</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
