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
import { ReturnItemsSchema } from "@/pocketbase/schemas/warehouse-management/return-items";

export const CreateSchema = z.object({
	return: ReturnItemsSchema.shape.return.register(fieldRegistry, {
		id: "warehouse-management-return-items-return-create",
		type: "field",
		label: "Return",
		description: "Enter a return",
		inputType: "text",
	}),
	product: ReturnItemsSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-return-items-product-create",
		type: "field",
		label: "Product",
		description: "Enter a product",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementProducts,
			displayField: "name",
			relationshipName: "product",
		},
	}),
	quantityExpected: ReturnItemsSchema.shape.quantityExpected.register(
		fieldRegistry,
		{
			id: "warehouse-management-return-items-quantityExpected-create",
			type: "field",
			label: "QuantityExpected",
			description: "Enter a quantityexpected",
			inputType: "number",
		},
	),
	quantityRecevied: ReturnItemsSchema.shape.quantityRecevied.register(
		fieldRegistry,
		{
			id: "warehouse-management-return-items-quantityRecevied-create",
			type: "field",
			label: "QuantityRecevied",
			description: "Enter a quantityrecevied",
			inputType: "number",
		},
	),
	condition: ReturnItemsSchema.shape.condition.register(fieldRegistry, {
		id: "warehouse-management-return-items-condition-create",
		type: "field",
		label: "Condition",
		description: "Enter a condition",
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
				.collection(Collections.WarehouseManagementReturnItems)
				.create(value);
			toast.success("Return Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create return-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Return Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
