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
import { DisputesSchema } from "@/pocketbase/schemas/billing-management/disputes";

export const CreateSchema = z.object({
	lineItem: DisputesSchema.shape.lineItem.register(fieldRegistry, {
		id: "billing-management-disputes-lineItem-create",
		type: "field",
		label: "LineItem",
		description: "Enter a lineitem",
		inputType: "text",
	}),
	client: DisputesSchema.shape.client.register(fieldRegistry, {
		id: "billing-management-disputes-client-create",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	reason: DisputesSchema.shape.reason.register(fieldRegistry, {
		id: "billing-management-disputes-reason-create",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "select",
	}),
	status: DisputesSchema.shape.status.register(fieldRegistry, {
		id: "billing-management-disputes-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	disputeAmount: DisputesSchema.shape.disputeAmount.register(fieldRegistry, {
		id: "billing-management-disputes-disputeAmount-create",
		type: "field",
		label: "DisputeAmount",
		description: "Enter a disputeamount",
		inputType: "text",
	}),
	resolutionNotes: DisputesSchema.shape.resolutionNotes.register(fieldRegistry, {
		id: "billing-management-disputes-resolutionNotes-create",
		type: "field",
		label: "ResolutionNotes",
		description: "Enter a resolutionnotes",
		inputType: "text",
	}),
	submittedAt: DisputesSchema.shape.submittedAt.register(fieldRegistry, {
		id: "billing-management-disputes-submittedAt-create",
		type: "field",
		label: "SubmittedAt",
		description: "Enter a submittedat",
		inputType: "date",
	}),
	resolvedAt: DisputesSchema.shape.resolvedAt.register(fieldRegistry, {
		id: "billing-management-disputes-resolvedAt-create",
		type: "field",
		label: "ResolvedAt",
		description: "Enter a resolvedat",
		inputType: "date",
	}),
	resolvedBy: DisputesSchema.shape.resolvedBy.register(fieldRegistry, {
		id: "billing-management-disputes-resolvedBy-create",
		type: "field",
		label: "ResolvedBy",
		description: "Enter a resolvedby",
		inputType: "text",
	}),
	attachments: DisputesSchema.shape.attachments.register(fieldRegistry, {
		id: "billing-management-disputes-attachments-create",
		type: "field",
		label: "Attachments",
		description: "Enter an attachments",
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
				.collection(Collections.BillingManagementDisputes)
				.create(value);
			toast.success("Disputes created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create disputes: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Disputes</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
