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
import { AccountTransactionsSchema } from "@/pocketbase/schemas/billing-management/account-transactions";

export const CreateSchema = z.object({
	type: AccountTransactionsSchema.shape.type.register(fieldRegistry, {
		id: "billing-management-account-transactions-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	amount: AccountTransactionsSchema.shape.amount.register(fieldRegistry, {
		id: "billing-management-account-transactions-amount-create",
		type: "field",
		label: "Amount",
		description: "Enter an amount",
		inputType: "number",
	}),
	runningBalance: AccountTransactionsSchema.shape.runningBalance.register(fieldRegistry, {
		id: "billing-management-account-transactions-runningBalance-create",
		type: "field",
		label: "RunningBalance",
		description: "Enter a runningbalance",
		inputType: "number",
	}),
	transactionDate: AccountTransactionsSchema.shape.transactionDate.register(fieldRegistry, {
		id: "billing-management-account-transactions-transactionDate-create",
		type: "field",
		label: "TransactionDate",
		description: "Enter a transactiondate",
		inputType: "date",
	}),
	processedBy: AccountTransactionsSchema.shape.processedBy.register(fieldRegistry, {
		id: "billing-management-account-transactions-processedBy-create",
		type: "field",
		label: "ProcessedBy",
		description: "Enter a processedby",
		inputType: "text",
	}),
	referenceNumber: AccountTransactionsSchema.shape.referenceNumber.register(fieldRegistry, {
		id: "billing-management-account-transactions-referenceNumber-create",
		type: "field",
		label: "ReferenceNumber",
		description: "Enter a referencenumber",
		inputType: "text",
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
				.collection(Collections.BillingManagementAccountTransactions)
				.create(value);
			toast.success("Account Transactions created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create account-transactions: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Account Transactions</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
