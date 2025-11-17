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
import { DisputesSchema } from "@/pocketbase/schemas/billing-management/disputes";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	lineItem: DisputesSchema.shape.lineItem.optional().register(fieldRegistry, {
		id: "billing-management-disputes-lineItem-update",
		type: "field",
		label: "LineItem",
		description: "Enter a lineitem",
		inputType: "text",
	}),
	client: DisputesSchema.shape.client.optional().register(fieldRegistry, {
		id: "billing-management-disputes-client-update",
		type: "field",
		label: "Client",
		description: "Enter a client",
		inputType: "text",
	}),
	reason: DisputesSchema.shape.reason.optional().register(fieldRegistry, {
		id: "billing-management-disputes-reason-update",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "select",
	}),
	status: DisputesSchema.shape.status.optional().register(fieldRegistry, {
		id: "billing-management-disputes-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	disputeAmount: DisputesSchema.shape.disputeAmount
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-disputes-disputeAmount-update",
			type: "field",
			label: "DisputeAmount",
			description: "Enter a disputeamount",
			inputType: "text",
		}),
	resolutionNotes: DisputesSchema.shape.resolutionNotes
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-disputes-resolutionNotes-update",
			type: "field",
			label: "ResolutionNotes",
			description: "Enter a resolutionnotes",
			inputType: "text",
		}),
	submittedAt: DisputesSchema.shape.submittedAt
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-disputes-submittedAt-update",
			type: "field",
			label: "SubmittedAt",
			description: "Enter a submittedat",
			inputType: "date",
		}),
	resolvedAt: DisputesSchema.shape.resolvedAt
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-disputes-resolvedAt-update",
			type: "field",
			label: "ResolvedAt",
			description: "Enter a resolvedat",
			inputType: "date",
		}),
	resolvedBy: DisputesSchema.shape.resolvedBy
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-disputes-resolvedBy-update",
			type: "field",
			label: "ResolvedBy",
			description: "Enter a resolvedby",
			inputType: "text",
		}),
	attachments: DisputesSchema.shape.attachments
		.optional()
		.register(fieldRegistry, {
			id: "billing-management-disputes-attachments-update",
			type: "field",
			label: "Attachments",
			description: "Enter an attachments",
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
				.pocketbase!.collection(Collections.BillingManagementDisputes)
				.update(meta.id!, value);

			toast.success("Disputes updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update disputes: ${error.message} (${error.status})`,
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
		queryKey: ["disputes", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.BillingManagementDisputes)
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
					<form.SubmitButton>Update Disputes</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
