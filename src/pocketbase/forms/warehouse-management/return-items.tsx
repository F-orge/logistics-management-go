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
  WarehouseManagementReturnsResponse,
  WarehouseManagementProductsResponse,
  WarehouseManagementReturnItemsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementReturnItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementReturnItemsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementReturnItems>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementReturnItems)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `ReturnItems created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementReturnItemsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementReturnItems>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementReturnItems)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "ReturnItems updated successfully",
        })
        .unwrap();
    },
  });

export const ReturnItemsForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementReturnItems> | Update<Collections.WarehouseManagementReturnItems>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Return */}
          <FieldGroup>
            <FieldLegend>Return</FieldLegend>
            <FieldDescription>
              Manage return information
            </FieldDescription>

            <form.AppField name="return">
              {(field) => (
                <field.RelationField<WarehouseManagementReturnsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementReturns}
                  relationshipName="return"
                  label="Return"
                  description="Parent return"
                  displayField="returnNumber"
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
                  description="Returned product"
                  displayField="name"
                  recordListOption={{  }}
                  required
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

            <form.AppField name="quantityExpected">
              {(field) => (
                <field.NumberField
                  label="Quantity Expected"
                  description="Quantity expected to return"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="quantityRecevied">
              {(field) => (
                <field.NumberField
                  label="Quantity Recevied"
                  description="Quantity actually received"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Condition */}
          <FieldGroup>
            <FieldLegend>Condition</FieldLegend>
            <FieldDescription>
              Manage condition information
            </FieldDescription>

            <form.AppField name="condition">
              {(field) => (
                <field.SelectField
                  label="Condition"
                  description="Item condition"
                  options={[
                    { label: "Sellable", value: "sellable" },
                    { label: "Damaged", value: "damaged" },
                    { label: "Defective", value: "defective" },
                    { label: "Expired", value: "expired" },
                    { label: "Unsellable", value: "unsellable" }
                  ]}
                  placeholder="Select..."
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
        <ReturnItemsForm form={form as any} />
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
    queryKey: ["returnitems", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementReturnItems)
        .getOne<WarehouseManagementReturnItemsRecord>(searchQuery.id!),
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
        <ReturnItemsForm form={form as any} />
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
