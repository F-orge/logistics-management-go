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
import {
  Collections,
  CustomerRelationsLeadsRecord,
  TypedPocketBase,
} from "@/lib/pb.types";
import { LeadsSchema } from "@/pocketbase/schemas/customer-relations/leads";

export const UpdateSchema = z.object({
  name: LeadsSchema.shape.name.optional().register(fieldRegistry, {
    id: "customer-relations-leads-name-update",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  email: LeadsSchema.shape.email.optional().register(fieldRegistry, {
    id: "customer-relations-leads-email-update",
    type: "field",
    label: "Email",
    description: "Enter an email",
    inputType: "text",
  }),
  source: LeadsSchema.shape.source.register(fieldRegistry, {
    id: "customer-relations-leads-source-update",
    type: "field",
    label: "Source",
    description: "Enter a source",
    inputType: "select",
  }),
  status: LeadsSchema.shape.status.register(fieldRegistry, {
    id: "customer-relations-leads-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  score: LeadsSchema.shape.score.optional().register(fieldRegistry, {
    id: "customer-relations-leads-score-update",
    type: "field",
    label: "Score",
    description: "Enter a score",
    inputType: "number",
  }),
  convertedContact: LeadsSchema.shape.convertedContact
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-leads-convertedContact-update",
      type: "field",
      label: "ConvertedContact",
      description: "Enter a convertedcontact",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsContacts,
        displayField: "name",
        relationshipName: "convertedContact",
      },
    }),
  convertedCompany: LeadsSchema.shape.convertedCompany
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-leads-convertedCompany-update",
      type: "field",
      label: "ConvertedCompany",
      description: "Enter a convertedcompany",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsCompanies,
        displayField: "name",
        relationshipName: "convertedCompany",
      },
    }),
  convertedOpportunity: LeadsSchema.shape.convertedOpportunity
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-leads-convertedOpportunity-update",
      type: "field",
      label: "ConvertedOpportunity",
      description: "Enter a convertedopportunity",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsOpportunities,
        displayField: "name",
        relationshipName: "convertedOpportunity",
      },
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateSchema>,
  validators: {
    onSubmit: UpdateSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    record: CustomerRelationsLeadsRecord;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      const payload = {
        ...value,
        convertedAt:
          (value.convertedContact ||
            value.convertedCompany ||
            value.convertedOpportunity) &&
          !meta.record.convertedAt
            ? new Date()
            : undefined,
      };

      await meta
        .pocketbase!.collection(Collections.CustomerRelationsLeads)
        .update(meta.id, payload);

      toast.success("Lead updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update lead: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const UpdateLeadsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useSuspenseQuery({
    queryKey: ["lead", searchQuery.id],
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsLeads)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data as z.infer<typeof UpdateSchema>,
  });

  if (!data) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({
          id: searchQuery.id!,
          navigate,
          pocketbase,
          record: data,
        });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(UpdateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Lead</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateLeadsForm;
