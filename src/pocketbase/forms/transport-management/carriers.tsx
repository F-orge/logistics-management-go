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
  TransportManagementCarriersRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { TransportManagementCarriersSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementCarriersSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.TransportManagementCarriers>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementCarriers)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Carriers created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: TransportManagementCarriersRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.TransportManagementCarriers>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementCarriers)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Carriers updated successfully",
        })
        .unwrap();
    },
  });

export const CarriersForm = withForm({
  defaultValues: {} as Create<Collections.TransportManagementCarriers> | Update<Collections.TransportManagementCarriers>,
  render: ({ form }) => {
return (
      <form.AppForm>
        <FieldSet>
          {/* Basic Information */}
          <FieldGroup>
            <FieldLegend>Basic Information</FieldLegend>
            <FieldDescription>
              Manage basic information information
            </FieldDescription>

            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Name"
                  description="Carrier name"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Media */}
          <FieldGroup>
            <FieldLegend>Media</FieldLegend>
            <FieldDescription>
              Manage media information
            </FieldDescription>

            <form.AppField name="image">
              {(field) => (
                <field.TextField
                  label="Image"
                  description="Carrier logo or image"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Contact */}
          <FieldGroup>
            <FieldLegend>Contact</FieldLegend>
            <FieldDescription>
              Manage contact information
            </FieldDescription>

            <form.AppField name="contactDetails">
              {(field) => (
                <field.TextareaField
                  label="Contact Details"
                  description="Contact information"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Services */}
          <FieldGroup>
            <FieldLegend>Services</FieldLegend>
            <FieldDescription>
              Manage services information
            </FieldDescription>

            <form.AppField name="serviceOffered">
              {(field) => (
                <field.TextareaField
                  label="Service Offered"
                  description="Services offered by carrier"
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
        <CarriersForm form={form as any} />
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
    queryKey: ["carriers", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.TransportManagementCarriers)
        .getOne<TransportManagementCarriersRecord>(searchQuery.id!),
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
        <CarriersForm form={form as any} />
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
