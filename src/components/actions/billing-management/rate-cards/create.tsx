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
import { RateCardsSchema } from "@/pocketbase/schemas/billing-management/rate-cards";

export const CreateSchema = z.object({
	name: RateCardsSchema.shape.name.register(fieldRegistry, {
		id: "billing-management-rate-cards-name-create",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	type: RateCardsSchema.shape.type.register(fieldRegistry, {
		id: "billing-management-rate-cards-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	isActive: RateCardsSchema.shape.isActive.register(fieldRegistry, {
		id: "billing-management-rate-cards-isActive-create",
		type: "field",
		label: "IsActive",
		description: "Enter an isactive",
		inputType: "boolean",
	}),
	validFrom: RateCardsSchema.shape.validFrom.register(fieldRegistry, {
		id: "billing-management-rate-cards-validFrom-create",
		type: "field",
		label: "ValidFrom",
		description: "Enter a validfrom",
		inputType: "date",
	}),
	validTo: RateCardsSchema.shape.validTo.register(fieldRegistry, {
		id: "billing-management-rate-cards-validTo-create",
		type: "field",
		label: "ValidTo",
		description: "Enter a validto",
		inputType: "date",
	}),
	description: RateCardsSchema.shape.description.register(fieldRegistry, {
		id: "billing-management-rate-cards-description-create",
		type: "field",
		label: "Description",
		description: "Enter a description",
		inputType: "textarea",
	}),
	createdBy: RateCardsSchema.shape.createdBy.register(fieldRegistry, {
		id: "billing-management-rate-cards-createdBy-create",
		type: "field",
		label: "CreatedBy",
		description: "Enter a createdby",
		inputType: "text",
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
			await meta.pocketbase
				.collection(Collections.BillingManagementRateCards)
				.create(value);
			toast.success("Rate Cards created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create rate-cards: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Rate Cards</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
