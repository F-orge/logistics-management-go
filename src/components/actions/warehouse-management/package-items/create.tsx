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
import { PackageItemsSchema } from "@/pocketbase/schemas/warehouse-management/package-items";

export const CreateSchema = z.object({
	package: PackageItemsSchema.shape.package.register(fieldRegistry, {
		id: "warehouse-management-package-items-package-create",
		type: "field",
		label: "Package",
		description: "Enter a package",
		inputType: "text",
	}),
	batch: PackageItemsSchema.shape.batch.register(fieldRegistry, {
		id: "warehouse-management-package-items-batch-create",
		type: "field",
		label: "Batch",
		description: "Enter a batch",
		inputType: "text",
	}),
	quantity: PackageItemsSchema.shape.quantity.register(fieldRegistry, {
		id: "warehouse-management-package-items-quantity-create",
		type: "field",
		label: "Quantity",
		description: "Enter a quantity",
		inputType: "number",
	}),
	lotNumber: PackageItemsSchema.shape.lotNumber.register(fieldRegistry, {
		id: "warehouse-management-package-items-lotNumber-create",
		type: "field",
		label: "LotNumber",
		description: "Enter a lotnumber",
		inputType: "text",
	}),
	expiryDate: PackageItemsSchema.shape.expiryDate.register(fieldRegistry, {
		id: "warehouse-management-package-items-expiryDate-create",
		type: "field",
		label: "ExpiryDate",
		description: "Enter an expirydate",
		inputType: "date",
	})
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
				.collection(Collections.WarehouseManagementPackageItems)
				.create(value);
			toast.success("Package Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create package-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Package Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
