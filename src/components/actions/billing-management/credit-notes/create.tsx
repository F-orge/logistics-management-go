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
import { CreditNotesSchema } from "@/pocketbase/schemas/billing-management/credit-notes";

export const CreateSchema = z.object({
	invoice: CreditNotesSchema.shape.invoice.register(fieldRegistry, {
		id: "billing-management-credit-notes-invoice-create",
		type: "field",
		label: "Invoice",
		description: "Enter an invoice",
		inputType: "text",
	}),
	dispute: CreditNotesSchema.shape.dispute.register(fieldRegistry, {
		id: "billing-management-credit-notes-dispute-create",
		type: "field",
		label: "Dispute",
		description: "Enter a dispute",
		inputType: "text",
	}),
	creditNoteNumber: CreditNotesSchema.shape.creditNoteNumber.register(
		fieldRegistry,
		{
			id: "billing-management-credit-notes-creditNoteNumber-create",
			type: "field",
			label: "CreditNoteNumber",
			description: "Enter a creditnotenumber",
			inputType: "text",
		},
	),
	amount: CreditNotesSchema.shape.amount.register(fieldRegistry, {
		id: "billing-management-credit-notes-amount-create",
		type: "field",
		label: "Amount",
		description: "Enter an amount",
		inputType: "text",
	}),
	reason: CreditNotesSchema.shape.reason.register(fieldRegistry, {
		id: "billing-management-credit-notes-reason-create",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "select",
	}),
	issueDate: CreditNotesSchema.shape.issueDate.register(fieldRegistry, {
		id: "billing-management-credit-notes-issueDate-create",
		type: "field",
		label: "IssueDate",
		description: "Enter an issuedate",
		inputType: "date",
	}),
	appliedAt: CreditNotesSchema.shape.appliedAt.register(fieldRegistry, {
		id: "billing-management-credit-notes-appliedAt-create",
		type: "field",
		label: "AppliedAt",
		description: "Enter an appliedat",
		inputType: "date",
	}),
	currency: CreditNotesSchema.shape.currency.register(fieldRegistry, {
		id: "billing-management-credit-notes-currency-create",
		type: "field",
		label: "Currency",
		description: "Enter a currency",
		inputType: "text",
	}),
	notes: CreditNotesSchema.shape.notes.register(fieldRegistry, {
		id: "billing-management-credit-notes-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
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
				.collection(Collections.BillingManagementCreditNotes)
				.create(value);
			toast.success("Credit Notes created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create credit-notes: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Credit Notes</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
