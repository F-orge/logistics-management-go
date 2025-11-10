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
  TransportManagementTripStopsResponse,
  TransportManagementProofOfDeliveriesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { TransportManagementProofOfDeliveriesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementProofOfDeliveriesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.TransportManagementProofOfDeliveries>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementProofOfDeliveries)
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
  record: TransportManagementProofOfDeliveriesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.TransportManagementProofOfDeliveries>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementProofOfDeliveries)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "ProofOfDeliveries updated successfully",
        })
        .unwrap();
    },
  });

export const ProofOfDeliveriesForm = withForm({
  defaultValues: {} as Create<Collections.TransportManagementProofOfDeliveries> | Update<Collections.TransportManagementProofOfDeliveries>,
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

            <form.AppField name="tripStop">
              {(field) => (
                <field.RelationField<TransportManagementTripStopsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementTripStops}
                  relationshipName="tripStop"
                  label="Trip Stop"
                  description="Associated trip stop"
                  displayField="id"
                  recordListOption={{  }}
                  required
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

            <form.AppField name="coordinate">
              {(field) => (
                <field.TextField
                  label="Coordinate"
                  description="Delivery coordinates"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Evidence */}
          <FieldGroup>
            <FieldLegend>Evidence</FieldLegend>
            <FieldDescription>
              Manage evidence information
            </FieldDescription>

            <form.AppField name="attachments">
              {(field) => (
                <field.TextField
                  label="Attachments"
                  description="Photos or signature images"
                  placeholder=""
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
        .collection(Collections.TransportManagementProofOfDeliveries)
        .getOne<TransportManagementProofOfDeliveriesRecord>(searchQuery.id!),
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
