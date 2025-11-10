import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
  DeliveryManagementTasksResponse,
  DeliveryManagementProofOfDeliveriesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { DeliveryManagementProofOfDeliveriesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = DeliveryManagementProofOfDeliveriesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.DeliveryManagementProofOfDeliveries>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.DeliveryManagementProofOfDeliveries)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `ProofOfDeliveries created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: DeliveryManagementProofOfDeliveriesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.DeliveryManagementProofOfDeliveries>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.DeliveryManagementProofOfDeliveries)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "ProofOfDeliveries updated successfully",
        })
        .unwrap();
    },
  });

export const ProofOfDeliveriesForm = withForm({
  defaultValues: {} as Create<Collections.DeliveryManagementProofOfDeliveries> | Update<Collections.DeliveryManagementProofOfDeliveries>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Delivery */}
          <FieldGroup>
            <FieldLegend>Delivery</FieldLegend>
            <FieldDescription>
              Manage delivery information
            </FieldDescription>

            <form.AppField name="task">
              {(field) => (
                <field.RelationField<DeliveryManagementTasksResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.DeliveryManagementTasks}
                  relationshipName="task"
                  label="Task"
                  description="Associated delivery task"
                  displayField="id"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Location */}
          <FieldGroup>
            <FieldLegend>Location</FieldLegend>
            <FieldDescription>
              Manage location information
            </FieldDescription>

            <form.AppField name="coordinates">
              {(field) => (
                <field.TextField
                  label="Coordinates"
                  description="Delivery location coordinates"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Recipient */}
          <FieldGroup>
            <FieldLegend>Recipient</FieldLegend>
            <FieldDescription>
              Manage recipient information
            </FieldDescription>

            <form.AppField name="recipientName">
              {(field) => (
                <field.TextField
                  label="Recipient Name"
                  description="Name of person who received"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Signature */}
          <FieldGroup>
            <FieldLegend>Signature</FieldLegend>
            <FieldDescription>
              Manage signature information
            </FieldDescription>

            <form.AppField name="signatureData">
              {(field) => (
                <field.TextField
                  label="Signature Data"
                  description="Digital signature from recipient"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Timing */}
          <FieldGroup>
            <FieldLegend>Timing</FieldLegend>
            <FieldDescription>
              Manage timing information
            </FieldDescription>

            <form.AppField name="timestamp">
              {(field) => (
                <field.DateTimeField
                  label="Timestamp"
                  description="When delivery was confirmed"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <ProofOfDeliveriesForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["proofofdeliveries", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.DeliveryManagementProofOfDeliveries)
        .getOne<DeliveryManagementProofOfDeliveriesRecord>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <ProofOfDeliveriesForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
