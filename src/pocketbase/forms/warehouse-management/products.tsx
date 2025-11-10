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
  WarehouseManagementSuppliersResponse,
  WarehouseManagementProductsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementProductsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementProductsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementProducts>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementProducts)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Products created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementProductsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementProducts>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementProducts)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Products updated successfully",
        })
        .unwrap();
    },
  });

export const ProductsForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementProducts> | Update<Collections.WarehouseManagementProducts>,
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
                  description="Product name"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Identification */}
          <FieldGroup>
            <FieldLegend>Identification</FieldLegend>
            <FieldDescription>
              Manage identification information
            </FieldDescription>

            <form.AppField name="sku">
              {(field) => (
                <field.TextField
                  label="Sku"
                  description="Stock keeping unit / product code"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="barcode">
              {(field) => (
                <field.TextField
                  label="Barcode"
                  description="Barcode for product tracking"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Details */}
          <FieldGroup>
            <FieldLegend>Details</FieldLegend>
            <FieldDescription>
              Manage details information
            </FieldDescription>

            <form.AppField name="description">
              {(field) => (
                <field.TextareaField
                  label="Description"
                  description="Detailed product description"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Status */}
          <FieldGroup>
            <FieldLegend>Status</FieldLegend>
            <FieldDescription>
              Manage status information
            </FieldDescription>

            <form.AppField name="status">
              {(field) => (
                <field.SelectField
                  label="Status"
                  description="Current product status"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Discontinued", value: "discontinued" },
                    { label: "Archived", value: "archived" }
                  ]}
                  placeholder="Select..."
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Dimensions */}
          <FieldGroup>
            <FieldLegend>Dimensions</FieldLegend>
            <FieldDescription>
              Manage dimensions information
            </FieldDescription>

            <form.AppField name="length">
              {(field) => (
                <field.NumberField
                  label="Length"
                  description="Product length in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="width">
              {(field) => (
                <field.NumberField
                  label="Width"
                  description="Product width in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="height">
              {(field) => (
                <field.NumberField
                  label="Height"
                  description="Product height in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => (
                <field.NumberField
                  label="Weight"
                  description="Product weight in kg"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Pricing */}
          <FieldGroup>
            <FieldLegend>Pricing</FieldLegend>
            <FieldDescription>
              Manage pricing information
            </FieldDescription>

            <form.AppField name="costPrice">
              {(field) => (
                <field.NumberField
                  label="Cost Price"
                  description="Cost price of the product"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Association */}
          <FieldGroup>
            <FieldLegend>Association</FieldLegend>
            <FieldDescription>
              Manage association information
            </FieldDescription>

            <form.AppField name="client">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="client"
                  label="Client"
                  description="Associated client company"
                  displayField="username"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
            <form.AppField name="supplier">
              {(field) => (
                <field.RelationField<WarehouseManagementSuppliersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementSuppliers}
                  relationshipName="supplier"
                  label="Supplier"
                  description="Associated supplier"
                  displayField="name"
                  recordListOption={{  }}
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

            <form.AppField name="images">
              {(field) => (
                <field.TextField
                  label="Images"
                  description="Product images"
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
        <ProductsForm form={form as any} />
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
    queryKey: ["products", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementProducts)
        .getOne<WarehouseManagementProductsRecord>(searchQuery.id!),
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
        <ProductsForm form={form as any} />
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
