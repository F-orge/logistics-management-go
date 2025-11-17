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
import { CreditNotesSchema } from "@/pocketbase/schemas/billing-management/credit-notes";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	invoice: CreditNotesSchema.shape.invoice.optional().register(fieldRegistry, {
		id: "billing-management-credit-notes-invoice-update",
		type: "field",
		label: "Invoice",
		description: "Enter an invoice",
		inputType: "text",
	}),
	dispute: CreditNotesSchema.shape.dispute.optional().register(fieldRegistry, {
		id: "billing-management-credit-notes-dispute-update",
		type: "field",
		label: "Dispute",
		description: "Enter a dispute",
		inputType: "text",
	}),
	creditNoteNumber: CreditNotesSchema.shape.creditNoteNumber
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-credit-notes-creditNoteNumber-update",
			type: "field",
			label: "CreditNoteNumber",
			description: "Enter a creditnotenumber",
			inputType: "text",
		}),
	amount: CreditNotesSchema.shape.amount.optional().register(fieldRegistry, {
		id: "billing-management-credit-notes-amount-update",
		type: "field",
		label: "Amount",
		description: "Enter an amount",
		inputType: "text",
	}),
	reason: CreditNotesSchema.shape.reason.optional().register(fieldRegistry, {
		id: "billing-management-credit-notes-reason-update",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "select",
	}),
	issueDate: CreditNotesSchema.shape.issueDate
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-credit-notes-issueDate-update",
			type: "field",
			label: "IssueDate",
			description: "Enter an issuedate",
			inputType: "date",
		}),
	appliedAt: CreditNotesSchema.shape.appliedAt
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-credit-notes-appliedAt-update",
			type: "field",
			label: "AppliedAt",
			description: "Enter an appliedat",
			inputType: "date",
		}),
	currency: CreditNotesSchema.shape.currency
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-credit-notes-currency-update",
			type: "field",
			label: "Currency",
			description: "Enter a currency",
			inputType: "text",
		}),
	notes: CreditNotesSchema.shape.notes.optional().register(fieldRegistry, {
		id: "billing-management-credit-notes-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
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
				.pocketbase!.collection(Collections.BillingManagementCreditNotes)
				.update(meta.id!, value);

			toast.success("Credit Notes updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update credit-notes: ${error.message} (${error.status})`,
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
		queryKey: ["creditNotes", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.BillingManagementCreditNotes)
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
					<form.SubmitButton>Update Credit Notes</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
