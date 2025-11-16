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
import { QuotesSchema } from "@/pocketbase/schemas/billing-management/quotes";

export const CreateSchema = z.object({
	client: QuotesSchema.shape.client.register(fieldRegistry, {
		id: "billing-management-quotes-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	originDetails: QuotesSchema.shape.originDetails.register(fieldRegistry, {
		id: "billing-management-quotes-originDetails-create",
		type: "field",
		label: "OriginDetails",
		description: "Enter an origindetails",
		inputType: "text",
	}),
	destinationDetails: QuotesSchema.shape.destinationDetails.register(
		fieldRegistry,
		{
			id: "billing-management-quotes-destinationDetails-create",
			type: "field",
			label: "DestinationDetails",
			description: "Enter a destinationdetails",
			inputType: "text",
		},
	),
	weight: QuotesSchema.shape.weight.register(fieldRegistry, {
		id: "billing-management-quotes-weight-create",
		type: "field",
		label: "Weight",
		description: "Enter a weight",
		inputType: "number",
	}),
	length: QuotesSchema.shape.length.register(fieldRegistry, {
		id: "billing-management-quotes-length-create",
		type: "field",
		label: "Length",
		description: "Enter a length",
		inputType: "number",
	}),
	width: QuotesSchema.shape.width.register(fieldRegistry, {
		id: "billing-management-quotes-width-create",
		type: "field",
		label: "Width",
		description: "Enter a width",
		inputType: "number",
	}),
	height: QuotesSchema.shape.height.register(fieldRegistry, {
		id: "billing-management-quotes-height-create",
		type: "field",
		label: "Height",
		description: "Enter a height",
		inputType: "number",
	}),
	quotePrice: QuotesSchema.shape.quotePrice.register(fieldRegistry, {
		id: "billing-management-quotes-quotePrice-create",
		type: "field",
		label: "QuotePrice",
		description: "Enter a quoteprice",
		inputType: "text",
	}),
	serviceLevel: QuotesSchema.shape.serviceLevel.register(fieldRegistry, {
		id: "billing-management-quotes-serviceLevel-create",
		type: "field",
		label: "ServiceLevel",
		description: "Enter a servicelevel",
		inputType: "text",
	}),
	expiredAt: QuotesSchema.shape.expiredAt.register(fieldRegistry, {
		id: "billing-management-quotes-expiredAt-create",
		type: "field",
		label: "ExpiredAt",
		description: "Enter an expiredat",
		inputType: "date",
	}),
	status: QuotesSchema.shape.status.register(fieldRegistry, {
		id: "billing-management-quotes-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	quoteNumber: QuotesSchema.shape.quoteNumber.register(fieldRegistry, {
		id: "billing-management-quotes-quoteNumber-create",
		type: "field",
		label: "QuoteNumber",
		description: "Enter a quotenumber",
		inputType: "text",
	}),
	notes: QuotesSchema.shape.notes.register(fieldRegistry, {
		id: "billing-management-quotes-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	createdBy: QuotesSchema.shape.createdBy.register(fieldRegistry, {
		id: "billing-management-quotes-createdBy-create",
		type: "field",
		label: "CreatedBy",
		description: "Enter a createdby",
		inputType: "text",
	}),
	attachments: QuotesSchema.shape.attachments.register(fieldRegistry, {
		id: "billing-management-quotes-attachments-create",
		type: "field",
		label: "Attachments",
		description: "Enter an attachments",
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
				.collection(Collections.BillingManagementQuotes)
				.create(value);
			toast.success("Quotes created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create quotes: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Quotes</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
