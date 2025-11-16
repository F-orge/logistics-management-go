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
import { SalesOrdersSchema } from "@/pocketbase/schemas/warehouse-management/sales-orders";

export const CreateSchema = z.object({
	shippingAddress: SalesOrdersSchema.shape.shippingAddress.register(
		fieldRegistry,
		{
			id: "warehouse-management-sales-orders-shippingAddress-create",
			type: "field",
			label: "ShippingAddress",
			description: "Enter a shippingaddress",
			inputType: "number",
		},
	),
	client: SalesOrdersSchema.shape.client.register(fieldRegistry, {
		id: "warehouse-management-sales-orders-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	opportunity: SalesOrdersSchema.shape.opportunity.register(fieldRegistry, {
		id: "warehouse-management-sales-orders-opportunity-create",
		type: "field",
		label: "Opportunity",
		description: "Enter an opportunity",
		inputType: "relation",
		props: {
			collectionName: Collections.CustomerRelationsOpportunities,
			displayField: "name",
			relationshipName: "opportunity",
		},
	}),
	status: SalesOrdersSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-sales-orders-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	orderNumber: SalesOrdersSchema.shape.orderNumber.register(fieldRegistry, {
		id: "warehouse-management-sales-orders-orderNumber-create",
		type: "field",
		label: "OrderNumber",
		description: "Enter an ordernumber",
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
				.collection(Collections.WarehouseManagementSalesOrders)
				.create(value);
			toast.success("Sales Orders created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create sales-orders: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Sales Orders</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
