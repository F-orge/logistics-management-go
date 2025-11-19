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
import { InvoicesSchema } from "@/pocketbase/schemas/customer-relations";

export const UpdateSchema = z.object({
	status: InvoicesSchema.shape.status.register(fieldRegistry, {
		id: "customer-relations-invoices-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	dueDate: InvoicesSchema.shape.dueDate.optional().register(fieldRegistry, {
		id: "customer-relations-invoices-dueDate-update",
		type: "field",
		label: "DueDate",
		description: "Enter a duedate",
		inputType: "date",
	}),
	paymentMethod: InvoicesSchema.shape.paymentMethod.register(fieldRegistry, {
		id: "customer-relations-invoices-paymentMethod-update",
		type: "field",
		label: "PaymentMethod",
		description: "Enter a paymentmethod",
		inputType: "select",
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
				.pocketbase!.collection(Collections.CustomerRelationsInvoices)
				.update(meta.id, {
					...value,
					sentAt: value.status === "sent" ? new Date() : undefined,
				});

			toast.success("Invoice updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(`Error: ${error.message}`);
			}
		} finally {
			meta.navigate({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateInvoiceForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["invoice", searchQuery.id],
		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsInvoices)
				.getOne(searchQuery.id!);
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: {
			...data,
			dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
			sentAt: data.sentAt ? new Date(data.sentAt) : undefined,
		} as z.infer<typeof UpdateSchema>,
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
					<form.SubmitButton>Update Invoice</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateInvoiceForm;
