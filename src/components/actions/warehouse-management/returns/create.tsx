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
import { ReturnsSchema } from "@/pocketbase/schemas/warehouse-management/returns";

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
		inputType: "text",
	}),
	client: ReturnsSchema.shape.client.register(fieldRegistry, {
		id: "warehouse-management-returns-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
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
				.collection(Collections.WarehouseManagementReturns)
				.create(value);
			toast.success("Returns created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
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
