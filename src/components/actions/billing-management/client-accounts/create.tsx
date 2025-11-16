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
import { ClientAccountsSchema } from "@/pocketbase/schemas/billing-management/client-accounts";

export const CreateSchema = z.object({
	client: ClientAccountsSchema.shape.client.register(fieldRegistry, {
		id: "billing-management-client-accounts-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	creditLimit: ClientAccountsSchema.shape.creditLimit.register(fieldRegistry, {
		id: "billing-management-client-accounts-creditLimit-create",
		type: "field",
		label: "CreditLimit",
		description: "Enter a creditlimit",
		inputType: "number",
	}),
	availableCredit: ClientAccountsSchema.shape.availableCredit.register(fieldRegistry, {
		id: "billing-management-client-accounts-availableCredit-create",
		type: "field",
		label: "AvailableCredit",
		description: "Enter an availablecredit",
		inputType: "text",
	}),
	walletBalance: ClientAccountsSchema.shape.walletBalance.register(fieldRegistry, {
		id: "billing-management-client-accounts-walletBalance-create",
		type: "field",
		label: "WalletBalance",
		description: "Enter a walletbalance",
		inputType: "text",
	}),
	currency: ClientAccountsSchema.shape.currency.register(fieldRegistry, {
		id: "billing-management-client-accounts-currency-create",
		type: "field",
		label: "Currency",
		description: "Enter a currency",
		inputType: "text",
	}),
	paymentTermsDays: ClientAccountsSchema.shape.paymentTermsDays.register(fieldRegistry, {
		id: "billing-management-client-accounts-paymentTermsDays-create",
		type: "field",
		label: "PaymentTermsDays",
		description: "Enter a paymenttermsdays",
		inputType: "number",
	}),
	isCreditApproved: ClientAccountsSchema.shape.isCreditApproved.register(fieldRegistry, {
		id: "billing-management-client-accounts-isCreditApproved-create",
		type: "field",
		label: "IsCreditApproved",
		description: "Enter an iscreditapproved",
		inputType: "boolean",
	}),
	lastPaymentDate: ClientAccountsSchema.shape.lastPaymentDate.register(fieldRegistry, {
		id: "billing-management-client-accounts-lastPaymentDate-create",
		type: "field",
		label: "LastPaymentDate",
		description: "Enter a lastpaymentdate",
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
				.collection(Collections.BillingManagementClientAccounts)
				.create(value);
			toast.success("Client Accounts created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create client-accounts: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Client Accounts</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
