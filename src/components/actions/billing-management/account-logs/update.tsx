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
import { LogsSchema } from "@/pocketbase/schemas/billing-management/logs";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  recordType: LogsSchema.shape.recordType.optional().register(fieldRegistry, {
    id: "billing-management-logs-recordType-update",
    type: "field",
    label: "RecordType",
    description: "Enter a recordtype",
    inputType: "text",
  }),
  externalSystem: LogsSchema.shape.externalSystem
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-logs-externalSystem-update",
      type: "field",
      label: "ExternalSystem",
      description: "Enter an externalsystem",
      inputType: "text",
    }),
  status: LogsSchema.shape.status.optional().register(fieldRegistry, {
    id: "billing-management-logs-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "text",
  }),
  errorMessage: LogsSchema.shape.errorMessage
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-logs-errorMessage-update",
      type: "field",
      label: "ErrorMessage",
      description: "Enter an errormessage",
      inputType: "text",
    }),
  requestPayload: LogsSchema.shape.requestPayload
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-logs-requestPayload-update",
      type: "field",
      label: "RequestPayload",
      description: "Enter a requestpayload",
      inputType: "text",
    }),
  responsePayload: LogsSchema.shape.responsePayload
    .optional()
    .register(fieldRegistry, {
      id: "billing-management-logs-responsePayload-update",
      type: "field",
      label: "ResponsePayload",
      description: "Enter a responsepayload",
      inputType: "text",
    }),
  lastSyncAt: LogsSchema.shape.lastSyncAt.optional().register(fieldRegistry, {
    id: "billing-management-logs-lastSyncAt-update",
    type: "field",
    label: "LastSyncAt",
    description: "Enter a lastsyncat",
    inputType: "date",
  }),
  retryCount: LogsSchema.shape.retryCount.optional().register(fieldRegistry, {
    id: "billing-management-logs-retryCount-update",
    type: "field",
    label: "RetryCount",
    description: "Enter a retrycount",
    inputType: "number",
  }),
  nextRetryAt: LogsSchema.shape.nextRetryAt.optional().register(fieldRegistry, {
    id: "billing-management-logs-nextRetryAt-update",
    type: "field",
    label: "NextRetryAt",
    description: "Enter a nextretryat",
    inputType: "date",
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
        .pocketbase!.collection(Collections.BillingManagementAccountLogs)
        .update(meta.id!, value);

      toast.success("Logs updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update logs: ${error.message} (${error.status})`
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
    queryKey: ["logs", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.BillingManagementAccountLogs)
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
          <form.SubmitButton>Update Logs</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
