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
	fieldSetRegistry,
	toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { ReturnItemsSchema } from "@/pocketbase/schemas/warehouse-management";
import { ReturnsSchema } from "@/pocketbase/schemas/warehouse-management/returns";

const CreateItemSchema = z
	.object({
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
		quantityReceived: ReturnItemsSchema.shape.quantityReceived.register(
			fieldRegistry,
			{
				id: "warehouse-management-return-items-quantityReceived-create",
				type: "field",
				label: "QuantityReceived",
				description: "Enter a quantityreceived",
				inputType: "number",
			},
		),
		condition: ReturnItemsSchema.shape.condition.register(fieldRegistry, {
			id: "warehouse-management-return-items-condition-create",
			type: "field",
			label: "Condition",
			description: "Enter a condition",
			inputType: "select",
		}),
	})
	.register(fieldSetRegistry, {
		legend: "Return Item",
		description: "Add a return item",
	});

export const CreateSchema = z.object({
	returnNumber: ReturnsSchema.shape.returnNumber.register(fieldRegistry, {
		id: "warehouse-management-returns-returnNumber-create",
		type: "field",
		label: "ReturnNumber",
		description: "Enter a returnnumber",
		inputType: "text",
	}),
	salesOrder: ReturnsSchema.shape.salesOrder.register(fieldRegistry, {
		id: "warehouse-management-returns-salesOrder-create",
		type: "field",
		label: "SalesOrder",
		description: "Enter a salesorder",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementSalesOrders,
			displayField: "orderNumber",
			relationshipName: "salesOrder",
		},
	}),
	client: ReturnsSchema.shape.client.register(fieldRegistry, {
		id: "warehouse-management-returns-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsCompanies,
			displayField: "name",
			relationshipName: "client",
		},
	}),
	status: ReturnsSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-returns-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	reason: ReturnsSchema.shape.reason.register(fieldRegistry, {
		id: "warehouse-management-returns-reason-create",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "textarea",
	}),
	items: CreateItemSchema.array(),
});

const FormOption = formOptions({
	defaultValues: {
		status: "requested",
	} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		let returnId: string | null = null;

		try {
			const { items, ...returnData } = value;

			const createdReturn = await meta.pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.create(returnData);

			returnId = createdReturn.id;

			const batch = meta.pocketbase.createBatch();

			for (const item of items) {
				batch.collection(Collections.WarehouseManagementReturnItems).create({
					...item,
					return: returnId,
				});
			}

			await batch.send();

			toast.success("Returns created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				if (returnId) {
					// Rollback return creation
					try {
						await meta.pocketbase
							.collection(Collections.WarehouseManagementReturns)
							.delete(returnId);
					} catch (deleteError) {
						console.error("Failed to rollback return creation:", deleteError);
					}
				}

				toast.error(
					`Failed to create returns: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Returns</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
