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
  WarehouseManagementSalesOrdersResponse,
  WarehouseManagementWarehousesResponse,
  UsersResponse,
  WarehouseManagementPackagesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementPackagesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementPackagesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementPackages>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementPackages)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Packages created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementPackagesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementPackages>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementPackages)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Packages updated successfully",
        })
        .unwrap();
    },
  });

export const PackagesForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementPackages> | Update<Collections.WarehouseManagementPackages>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Identification */}
          <FieldGroup>
            <FieldLegend>Identification</FieldLegend>
            <FieldDescription>
              Manage identification information
            </FieldDescription>

            <form.AppField name="packageNumber">
              {(field) => (
                <field.TextField
                  label="Package Number"
                  description="Unique package number"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Order */}
          <FieldGroup>
            <FieldLegend>Order</FieldLegend>
            <FieldDescription>
              Manage order information
            </FieldDescription>

            <form.AppField name="salesOrder">
              {(field) => (
                <field.RelationField<WarehouseManagementSalesOrdersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementSalesOrders}
                  relationshipName="salesOrder"
                  label="Sales Order"
                  description="Associated sales order"
                  displayField="orderNumber"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Warehouse */}
          <FieldGroup>
            <FieldLegend>Warehouse</FieldLegend>
            <FieldDescription>
              Manage warehouse information
            </FieldDescription>

            <form.AppField name="warehouse">
              {(field) => (
                <field.RelationField<WarehouseManagementWarehousesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementWarehouses}
                  relationshipName="warehouse"
                  label="Warehouse"
                  description="Warehouse location"
                  displayField="name"
                  recordListOption={{  }}
                  required
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

            <form.AppField name="type">
              {(field) => (
                <field.TextField
                  label="Type"
                  description="Package type"
                  placeholder=""
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
                  description="Length in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="width">
              {(field) => (
                <field.NumberField
                  label="Width"
                  description="Width in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="height">
              {(field) => (
                <field.NumberField
                  label="Height"
                  description="Height in cm"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => (
                <field.NumberField
                  label="Weight"
                  description="Weight in kg"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Flags */}
          <FieldGroup>
            <FieldLegend>Flags</FieldLegend>
            <FieldDescription>
              Manage flags information
            </FieldDescription>

            <form.AppField name="isFragile">
              {(field) => (
                <field.TextField
                  label="Is Fragile"
                  description="Whether package contains fragile items"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="isHazmat">
              {(field) => (
                <field.TextField
                  label="Is Hazmat"
                  description="Whether package contains hazardous materials"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Delivery */}
          <FieldGroup>
            <FieldLegend>Delivery</FieldLegend>
            <FieldDescription>
              Manage delivery information
            </FieldDescription>

            <form.AppField name="requireSignature">
              {(field) => (
                <field.TextField
                  label="Require Signature"
                  description="Whether signature is required"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Insurance */}
          <FieldGroup>
            <FieldLegend>Insurance</FieldLegend>
            <FieldDescription>
              Manage insurance information
            </FieldDescription>

            <form.AppField name="insuranceValue">
              {(field) => (
                <field.NumberField
                  label="Insurance Value"
                  description="Insurance value"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Packing */}
          <FieldGroup>
            <FieldLegend>Packing</FieldLegend>
            <FieldDescription>
              Manage packing information
            </FieldDescription>

            <form.AppField name="packedByUser">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="packedByUser"
                  label="Packed By User"
                  description="User who packed the package"
                  displayField="username"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
            <form.AppField name="packedAt">
              {(field) => (
                <field.DateTimeField
                  label="Packed At"
                  description="When package was packed"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Shipping */}
          <FieldGroup>
            <FieldLegend>Shipping</FieldLegend>
            <FieldDescription>
              Manage shipping information
            </FieldDescription>

            <form.AppField name="shippedAt">
              {(field) => (
                <field.DateTimeField
                  label="Shipped At"
                  description="When package was shipped"
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

            <form.AppField name="images">
              {(field) => (
                <field.TextField
                  label="Images"
                  description="Package photos"
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
        <PackagesForm form={form as any} />
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
    queryKey: ["packages", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementPackages)
        .getOne<WarehouseManagementPackagesRecord>(searchQuery.id!),
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
        <PackagesForm form={form as any} />
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
