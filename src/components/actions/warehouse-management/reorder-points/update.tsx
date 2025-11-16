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
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	product: ReorderPointsSchema.shape.product
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-reorder-points-product-update",
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
	threshold: ReorderPointsSchema.shape.threshold
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-reorder-points-threshold-update",
			type: "field",
			label: "Threshold",
			description: "Enter a threshold",
			inputType: "text",
		}),
	warehouse: ReorderPointsSchema.shape.warehouse
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-reorder-points-warehouse-update",
			type: "field",
			label: "Warehouse",
			description: "Enter a warehouse",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementWarehouses,
				displayField: "name",
				relationshipName: "warehouse",
			},
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
				.pocketbase!.collection(Collections.WarehouseManagementReorderPoints)
				.update(meta.id!, value);

			toast.success("Reorder Points updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update reorder-points: ${error.message} (${error.status})`,
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

	const { data } = useQuery({
		queryKey: ["reorderPoints", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementReorderPoints)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data || {},
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
					<form.SubmitButton>Update Reorder Points</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
