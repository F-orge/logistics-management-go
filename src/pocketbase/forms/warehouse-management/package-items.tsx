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
  WarehouseManagementPackagesResponse,
  WarehouseManagementProductsResponse,
  WarehouseManagementInventoryBatchesResponse,
  WarehouseManagementPackageItemsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementPackageItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementPackageItemsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementPackageItems>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementPackageItems)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `PackageItems created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementPackageItemsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementPackageItems>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementPackageItems)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "PackageItems updated successfully",
        })
        .unwrap();
    },
  });

export const PackageItemsForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementPackageItems> | Update<Collections.WarehouseManagementPackageItems>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Package */}
          <FieldGroup>
            <FieldLegend>Package</FieldLegend>
            <FieldDescription>
              Manage package information
            </FieldDescription>

            <form.AppField name="package">
              {(field) => (
                <field.RelationField<WarehouseManagementPackagesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementPackages}
                  relationshipName="package"
                  label="Package"
                  description="Parent package"
                  displayField="packageNumber"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Product */}
          <FieldGroup>
            <FieldLegend>Product</FieldLegend>
            <FieldDescription>
              Manage product information
            </FieldDescription>

            <form.AppField name="product">
              {(field) => (
                <field.RelationField<WarehouseManagementProductsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementProducts}
                  relationshipName="product"
                  label="Product"
                  description="Product in package"
                  displayField="name"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Batch */}
          <FieldGroup>
            <FieldLegend>Batch</FieldLegend>
            <FieldDescription>
              Manage batch information
            </FieldDescription>

            <form.AppField name="batch">
              {(field) => (
                <field.RelationField<WarehouseManagementInventoryBatchesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementInventoryBatches}
                  relationshipName="batch"
                  label="Batch"
                  description="Inventory batch"
                  displayField="batchNumber"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Quantity */}
          <FieldGroup>
            <FieldLegend>Quantity</FieldLegend>
            <FieldDescription>
              Manage quantity information
            </FieldDescription>

            <form.AppField name="quantity">
              {(field) => (
                <field.NumberField
                  label="Quantity"
                  description="Quantity in package"
                  placeholder="0"
                  min={0}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Lot */}
          <FieldGroup>
            <FieldLegend>Lot</FieldLegend>
            <FieldDescription>
              Manage lot information
            </FieldDescription>

            <form.AppField name="lotNumber">
              {(field) => (
                <field.TextField
                  label="Lot Number"
                  description="Lot number"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Expiry */}
          <FieldGroup>
            <FieldLegend>Expiry</FieldLegend>
            <FieldDescription>
              Manage expiry information
            </FieldDescription>

            <form.AppField name="expiryDate">
              {(field) => (
                <field.DateTimeField
                  label="Expiry Date"
                  description="Expiration date"
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
        <PackageItemsForm form={form as any} />
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
    queryKey: ["packageitems", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementPackageItems)
        .getOne<WarehouseManagementPackageItemsRecord>(searchQuery.id!),
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
        <PackageItemsForm form={form as any} />
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
