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
import { LogsSchema } from "@/pocketbase/schemas/billing-management/logs";

export const CreateSchema = z.object({
	recordType: LogsSchema.shape.recordType.register(fieldRegistry, {
		id: "billing-management-logs-recordType-create",
		type: "field",
		label: "RecordType",
		description: "Enter a recordtype",
		inputType: "text",
	}),
	externalSystem: LogsSchema.shape.externalSystem.register(fieldRegistry, {
		id: "billing-management-logs-externalSystem-create",
		type: "field",
		label: "ExternalSystem",
		description: "Enter an externalsystem",
		inputType: "text",
	}),
	status: LogsSchema.shape.status.register(fieldRegistry, {
		id: "billing-management-logs-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	errorMessage: LogsSchema.shape.errorMessage.register(fieldRegistry, {
		id: "billing-management-logs-errorMessage-create",
		type: "field",
		label: "ErrorMessage",
		description: "Enter an errormessage",
		inputType: "text",
	}),
	requestPayload: LogsSchema.shape.requestPayload.register(fieldRegistry, {
		id: "billing-management-logs-requestPayload-create",
		type: "field",
		label: "RequestPayload",
		description: "Enter a requestpayload",
		inputType: "text",
	}),
	responsePayload: LogsSchema.shape.responsePayload.register(fieldRegistry, {
		id: "billing-management-logs-responsePayload-create",
		type: "field",
		label: "ResponsePayload",
		description: "Enter a responsepayload",
		inputType: "text",
	}),
	lastSyncAt: LogsSchema.shape.lastSyncAt.register(fieldRegistry, {
		id: "billing-management-logs-lastSyncAt-create",
		type: "field",
		label: "LastSyncAt",
		description: "Enter a lastsyncat",
		inputType: "date",
	}),
	retryCount: LogsSchema.shape.retryCount.register(fieldRegistry, {
		id: "billing-management-logs-retryCount-create",
		type: "field",
		label: "RetryCount",
		description: "Enter a retrycount",
		inputType: "number",
	}),
	nextRetryAt: LogsSchema.shape.nextRetryAt.register(fieldRegistry, {
		id: "billing-management-logs-nextRetryAt-create",
		type: "field",
		label: "NextRetryAt",
		description: "Enter a nextretryat",
		inputType: "date",
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
				.collection(Collections.BillingManagementAccountLogs)
				.create(value);
			toast.success("Logs created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create logs: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Logs</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
