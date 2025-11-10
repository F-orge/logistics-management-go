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
  UsersResponse,
  WarehouseManagementSuppliersRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementSuppliersSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementSuppliersSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementSuppliers>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementSuppliers)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Suppliers created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementSuppliersRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementSuppliers>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementSuppliers)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Suppliers updated successfully",
        })
        .unwrap();
    },
  });

export const SuppliersForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementSuppliers> | Update<Collections.WarehouseManagementSuppliers>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

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
                  description="Supplier name"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Client */}
          <FieldGroup>
            <FieldLegend>Client</FieldLegend>
            <FieldDescription>
              Manage client information
            </FieldDescription>

            <form.AppField name="client">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="client"
                  label="Client"
                  description="Associated client"
                  displayField="username"
                  recordListOption={{  }}
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

            <form.AppField name="email">
              {(field) => (
                <field.EmailField
                  label="Email"
                  description="Supplier email"
                  placeholder="example@email.com"
                />
              )}
            </form.AppField>
            <form.AppField name="phoneNumber">
              {(field) => (
                <field.TextField
                  label="Phone Number"
                  description="Supplier phone"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="contactPerson">
              {(field) => (
                <field.TextField
                  label="Contact Person"
                  description="Primary contact person"
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
        <SuppliersForm form={form as any} />
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
    queryKey: ["suppliers", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementSuppliers)
        .getOne<WarehouseManagementSuppliersRecord>(searchQuery.id!),
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
        <SuppliersForm form={form as any} />
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
