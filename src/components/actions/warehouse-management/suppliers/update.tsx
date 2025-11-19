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
import { SuppliersSchema } from "@/pocketbase/schemas/warehouse-management/suppliers";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	name: SuppliersSchema.shape.name.optional().register(fieldRegistry, {
		id: "warehouse-management-suppliers-name-update",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	contactPerson: SuppliersSchema.shape.contactPerson
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-suppliers-contactPerson-update",
			type: "field",
			label: "ContactPerson",
			description: "Enter a contactperson",
			inputType: "text",
		}),
	email: SuppliersSchema.shape.email.optional().register(fieldRegistry, {
		id: "warehouse-management-suppliers-email-update",
		type: "field",
		label: "Email",
		description: "Enter an email",
		inputType: "text",
	}),
	phoneNumber: SuppliersSchema.shape.phoneNumber
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-suppliers-phoneNumber-update",
			type: "field",
			label: "PhoneNumber",
			description: "Enter a phonenumber",
			inputType: "text",
		}),
	client: SuppliersSchema.shape.client.optional().register(fieldRegistry, {
		id: "warehouse-management-suppliers-client-update",
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
				.pocketbase!.collection(Collections.WarehouseManagementSuppliers)
				.update(meta.id!, value);

			toast.success("Suppliers updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update suppliers: ${error.message} (${error.status})`,
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
		queryKey: ["suppliers", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementSuppliers)
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
					<form.SubmitButton>Update Suppliers</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
