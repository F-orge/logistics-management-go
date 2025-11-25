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
import { PackageItemsSchema } from "@/pocketbase/schemas/warehouse-management/package-items";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	package: PackageItemsSchema.shape.package.optional().register(fieldRegistry, {
		id: "warehouse-management-package-items-package-update",
		type: "field",
		label: "Package",
		description: "Enter a package",
		inputType: "text",
	}),
	product: PackageItemsSchema.shape.product.optional().register(fieldRegistry, {
		id: "warehouse-management-package-items-product-update",
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
	batch: PackageItemsSchema.shape.batch.optional().register(fieldRegistry, {
		id: "warehouse-management-package-items-batch-update",
		type: "field",
		label: "Batch",
		description: "Enter a batch",
		inputType: "text",
	}),
	quantity: PackageItemsSchema.shape.quantity
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-package-items-quantity-update",
			type: "field",
			label: "Quantity",
			description: "Enter a quantity",
			inputType: "number",
		}),
	lotNumber: PackageItemsSchema.shape.lotNumber
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-package-items-lotNumber-update",
			type: "field",
			label: "LotNumber",
			description: "Enter a lotnumber",
			inputType: "text",
		}),
	expiryDate: PackageItemsSchema.shape.expiryDate
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-package-items-expiryDate-update",
			type: "field",
			label: "ExpiryDate",
			description: "Enter an expirydate",
			inputType: "date",
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
				.pocketbase!.collection(Collections.WarehouseManagementPackageItems)
				.update(meta.id!, value);

			toast.success("Package Items updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update package-items: ${error.message} (${error.status})`,
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
		queryKey: ["packageItems", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementPackageItems)
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
					<form.SubmitButton>Update Package Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
