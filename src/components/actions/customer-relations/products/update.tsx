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
import { ProductsSchema } from "@/pocketbase/schemas/customer-relations/products";

export const UpdateSchema = z.object({
	name: ProductsSchema.shape.name.optional().register(fieldRegistry, {
		id: "customer-relations-products-name-update",
		type: "field",
		label: "Name",
		description: "Product name is required",
		inputType: "text",
	}),
	sku: ProductsSchema.shape.sku.optional().register(fieldRegistry, {
		id: "customer-relations-products-sku-update",
		type: "field",
		label: "Sku",
		description: "SKU is required",
		inputType: "text",
	}),
	price: ProductsSchema.shape.price.optional().register(fieldRegistry, {
		id: "customer-relations-products-price-update",
		type: "field",
		label: "Price",
		description: "Enter a price",
		inputType: "number",
	}),
	type: ProductsSchema.shape.type.optional().register(fieldRegistry, {
		id: "customer-relations-products-type-update",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	description: ProductsSchema.shape.description
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-products-description-update",
			type: "field",
			label: "Description",
			description: "Enter a description",
			inputType: "textarea",
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
				.pocketbase!.collection(Collections.CustomerRelationsProducts)
				.update(meta.id, value);

			toast.success("Product updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update product: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const UpdateProductsForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useQuery({
		queryKey: ["product", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsProducts)
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
					<form.SubmitButton>Update Product</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateProductsForm;
