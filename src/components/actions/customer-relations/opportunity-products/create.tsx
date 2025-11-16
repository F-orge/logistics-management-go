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
import { OpportunityProductsSchema } from "@/pocketbase/schemas/customer-relations/opportunity-products";

export const CreateSchema = z.object({
	opportunity: OpportunityProductsSchema.shape.opportunity.register(
		fieldRegistry,
		{
			id: "customer-relations-opportunity-products-opportunity-create",
			type: "field",
			label: "Opportunity",
			description: "Enter an opportunity",
			inputType: "relation",
			props: {
				collectionName: Collections.CustomerRelationsOpportunities,
				displayField: "name",
				relationshipName: "opportunity",
			},
		},
	),
	product: OpportunityProductsSchema.shape.product.register(fieldRegistry, {
		id: "customer-relations-opportunity-products-product-create",
		type: "field",
		label: "Product",
		description: "Enter a product",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsProducts,
			displayField: "name",
			relationshipName: "product",
		},
	}),
	quantity: OpportunityProductsSchema.shape.quantity.register(fieldRegistry, {
		id: "customer-relations-opportunity-products-quantity-create",
		type: "field",
		label: "Quantity",
		description: "Enter a quantity",
		inputType: "text",
	}),
	priceSnapshot: OpportunityProductsSchema.shape.priceSnapshot.register(
		fieldRegistry,
		{
			id: "customer-relations-opportunity-products-priceSnapshot-create",
			type: "field",
			label: "PriceSnapshot",
			description: "Enter a pricesnapshot",
			inputType: "text",
		},
	),
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
				.pocketbase!.collection(
					Collections.CustomerRelationsOpportunityProducts,
				)
				.create(value);

			toast.success("Opportunity product created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create opportunity product: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateOpportunityProductsForm = () => {
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
					<form.SubmitButton>Create Opportunity Product</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateOpportunityProductsForm;
