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
import { PackagesSchema } from "@/pocketbase/schemas/warehouse-management/packages";

export const CreateSchema = z.object({
	salesOrder: PackagesSchema.shape.salesOrder.register(fieldRegistry, {
		id: "warehouse-management-packages-salesOrder-create",
		type: "field",
		label: "SalesOrder",
		description: "Enter a salesorder",
		inputType: "text",
	}),
	packageNumber: PackagesSchema.shape.packageNumber.register(fieldRegistry, {
		id: "warehouse-management-packages-packageNumber-create",
		type: "field",
		label: "PackageNumber",
		description: "Enter a packagenumber",
		inputType: "text",
	}),
	type: PackagesSchema.shape.type.register(fieldRegistry, {
		id: "warehouse-management-packages-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "text",
	}),
	weight: PackagesSchema.shape.weight.register(fieldRegistry, {
		id: "warehouse-management-packages-weight-create",
		type: "field",
		label: "Weight",
		description: "Enter a weight",
		inputType: "number",
	}),
	length: PackagesSchema.shape.length.register(fieldRegistry, {
		id: "warehouse-management-packages-length-create",
		type: "field",
		label: "Length",
		description: "Enter a length",
		inputType: "number",
	}),
	width: PackagesSchema.shape.width.register(fieldRegistry, {
		id: "warehouse-management-packages-width-create",
		type: "field",
		label: "Width",
		description: "Enter a width",
		inputType: "number",
	}),
	height: PackagesSchema.shape.height.register(fieldRegistry, {
		id: "warehouse-management-packages-height-create",
		type: "field",
		label: "Height",
		description: "Enter a height",
		inputType: "number",
	}),
	packedByUser: PackagesSchema.shape.packedByUser.register(fieldRegistry, {
		id: "warehouse-management-packages-packedByUser-create",
		type: "field",
		label: "PackedByUser",
		description: "Enter a packedbyuser",
		inputType: "text",
	}),
	packedAt: PackagesSchema.shape.packedAt.register(fieldRegistry, {
		id: "warehouse-management-packages-packedAt-create",
		type: "field",
		label: "PackedAt",
		description: "Enter a packedat",
		inputType: "date",
	}),
	shippedAt: PackagesSchema.shape.shippedAt.register(fieldRegistry, {
		id: "warehouse-management-packages-shippedAt-create",
		type: "field",
		label: "ShippedAt",
		description: "Enter a shippedat",
		inputType: "date",
	}),
	isFragile: PackagesSchema.shape.isFragile.register(fieldRegistry, {
		id: "warehouse-management-packages-isFragile-create",
		type: "field",
		label: "IsFragile",
		description: "Enter an isfragile",
		inputType: "text",
	}),
	isHazmat: PackagesSchema.shape.isHazmat.register(fieldRegistry, {
		id: "warehouse-management-packages-isHazmat-create",
		type: "field",
		label: "IsHazmat",
		description: "Enter an ishazmat",
		inputType: "text",
	}),
	requireSignature: PackagesSchema.shape.requireSignature.register(fieldRegistry, {
		id: "warehouse-management-packages-requireSignature-create",
		type: "field",
		label: "RequireSignature",
		description: "Enter a requiresignature",
		inputType: "text",
	}),
	insuranceValue: PackagesSchema.shape.insuranceValue.register(fieldRegistry, {
		id: "warehouse-management-packages-insuranceValue-create",
		type: "field",
		label: "InsuranceValue",
		description: "Enter an insurancevalue",
		inputType: "number",
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
				.collection(Collections.WarehouseManagementPackages)
				.create(value);
			toast.success("Packages created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create packages: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Packages</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
