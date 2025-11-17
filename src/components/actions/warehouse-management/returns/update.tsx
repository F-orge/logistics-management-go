import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
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
import { ReturnsSchema } from "@/pocketbase/schemas/warehouse-management/returns";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	returnNumber: ReturnsSchema.shape.returnNumber
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-returns-returnNumber-update",
			type: "field",
			label: "ReturnNumber",
			description: "Enter a returnnumber",
			inputType: "text",
		}),
	salesOrder: ReturnsSchema.shape.salesOrder
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-returns-salesOrder-update",
			type: "field",
			label: "SalesOrder",
			description: "Enter a salesorder",
			inputType: "text",
		}),
	client: ReturnsSchema.shape.client.optional().register(fieldRegistry, {
		id: "warehouse-management-returns-client-update",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	status: ReturnsSchema.shape.status.optional().register(fieldRegistry, {
		id: "warehouse-management-returns-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	reason: ReturnsSchema.shape.reason.optional().register(fieldRegistry, {
		id: "warehouse-management-returns-reason-update",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "text",
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
				.pocketbase!.collection(Collections.WarehouseManagementReturns)
				.update(meta.id!, value);

			toast.success("Returns updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update returns: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["returns", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data as z.infer<typeof UpdateSchema>,
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase, id: searchQuery.id! });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Returns</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
