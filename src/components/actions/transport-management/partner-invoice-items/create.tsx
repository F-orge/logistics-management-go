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
import { PartnerInvoiceItemsSchema } from "@/pocketbase/schemas/transport-management/partner-invoice-items";

export const CreateSchema = z.object({
	partnerInvoice: PartnerInvoiceItemsSchema.shape.partnerInvoice.register(
		fieldRegistry,
		{
			id: "transport-management-partner-invoice-items-partnerInvoice-create",
			type: "field",
			label: "PartnerInvoice",
			description: "Enter a partnerinvoice",
			inputType: "text",
		},
	),
	shipmentLeg: PartnerInvoiceItemsSchema.shape.shipmentLeg.register(
		fieldRegistry,
		{
			id: "transport-management-partner-invoice-items-shipmentLeg-create",
			type: "field",
			label: "ShipmentLeg",
			description: "Enter a shipmentleg",
			inputType: "text",
		},
	),
	amount: PartnerInvoiceItemsSchema.shape.amount.register(fieldRegistry, {
		id: "transport-management-partner-invoice-items-amount-create",
		type: "field",
		label: "Amount",
		description: "Enter an amount",
		inputType: "number",
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
				.collection(Collections.TransportManagementPartnerInvoiceItems)
				.create(value);
			toast.success("Partner Invoice Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create partner-invoice-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Partner Invoice Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
