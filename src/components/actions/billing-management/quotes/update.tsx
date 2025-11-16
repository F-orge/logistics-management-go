import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
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
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	client: QuotesSchema.shape.client.optional().register(fieldRegistry, {
		id: "billing-management-quotes-client-update",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	originDetails: QuotesSchema.shape.originDetails.optional().register(fieldRegistry, {
		id: "billing-management-quotes-originDetails-update",
		type: "field",
		label: "OriginDetails",
		description: "Enter an origindetails",
		inputType: "text",
	}),
	destinationDetails: QuotesSchema.shape.destinationDetails.optional().register(fieldRegistry, {
		id: "billing-management-quotes-destinationDetails-update",
		type: "field",
		label: "DestinationDetails",
		description: "Enter a destinationdetails",
		inputType: "text",
	}),
	weight: QuotesSchema.shape.weight.optional().register(fieldRegistry, {
		id: "billing-management-quotes-weight-update",
		type: "field",
		label: "Weight",
		description: "Enter a weight",
		inputType: "number",
	}),
	length: QuotesSchema.shape.length.optional().register(fieldRegistry, {
		id: "billing-management-quotes-length-update",
		type: "field",
		label: "Length",
		description: "Enter a length",
		inputType: "number",
	}),
	width: QuotesSchema.shape.width.optional().register(fieldRegistry, {
		id: "billing-management-quotes-width-update",
		type: "field",
		label: "Width",
		description: "Enter a width",
		inputType: "number",
	}),
	height: QuotesSchema.shape.height.optional().register(fieldRegistry, {
		id: "billing-management-quotes-height-update",
		type: "field",
		label: "Height",
		description: "Enter a height",
		inputType: "number",
	}),
	quotePrice: QuotesSchema.shape.quotePrice.optional().register(fieldRegistry, {
		id: "billing-management-quotes-quotePrice-update",
		type: "field",
		label: "QuotePrice",
		description: "Enter a quoteprice",
		inputType: "text",
	}),
	serviceLevel: QuotesSchema.shape.serviceLevel.optional().register(fieldRegistry, {
		id: "billing-management-quotes-serviceLevel-update",
		type: "field",
		label: "ServiceLevel",
		description: "Enter a servicelevel",
		inputType: "text",
	}),
	expiredAt: QuotesSchema.shape.expiredAt.optional().register(fieldRegistry, {
		id: "billing-management-quotes-expiredAt-update",
		type: "field",
		label: "ExpiredAt",
		description: "Enter an expiredat",
		inputType: "date",
	}),
	status: QuotesSchema.shape.status.optional().register(fieldRegistry, {
		id: "billing-management-quotes-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	quoteNumber: QuotesSchema.shape.quoteNumber.optional().register(fieldRegistry, {
		id: "billing-management-quotes-quoteNumber-update",
		type: "field",
		label: "QuoteNumber",
		description: "Enter a quotenumber",
		inputType: "text",
	}),
	notes: QuotesSchema.shape.notes.optional().register(fieldRegistry, {
		id: "billing-management-quotes-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	createdBy: QuotesSchema.shape.createdBy.optional().register(fieldRegistry, {
		id: "billing-management-quotes-createdBy-update",
		type: "field",
		label: "CreatedBy",
		description: "Enter a createdby",
		inputType: "text",
	}),
	attachments: QuotesSchema.shape.attachments.optional().register(fieldRegistry, {
		id: "billing-management-quotes-attachments-update",
		type: "field",
		label: "Attachments",
		description: "Enter an attachments",
		inputType: "text",
	})
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
				.pocketbase!.collection(Collections.BillingManagementQuotes)
				.update(meta.id!, value);

			toast.success("Quotes updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update quotes: ${error.message} (${error.status})`,
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

	const { data } = useQuery({
		queryKey: ["quotes", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.BillingManagementQuotes)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data || {},
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
					<form.SubmitButton>Update Quotes</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
