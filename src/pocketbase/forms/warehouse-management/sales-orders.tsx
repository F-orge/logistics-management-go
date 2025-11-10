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
  CustomerRelationsOpportunitiesResponse,
  WarehouseManagementSalesOrdersRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementSalesOrdersSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementSalesOrdersSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementSalesOrders>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementSalesOrders)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `SalesOrders created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementSalesOrdersRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementSalesOrders>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementSalesOrders)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "SalesOrders updated successfully",
        })
        .unwrap();
    },
  });

export const SalesOrdersForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementSalesOrders> | Update<Collections.WarehouseManagementSalesOrders>,
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

            <form.AppField name="orderNumber">
              {(field) => (
                <field.TextField
                  label="Order Number"
                  description="Unique order number"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Customer */}
          <FieldGroup>
            <FieldLegend>Customer</FieldLegend>
            <FieldDescription>
              Manage customer information
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
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Reference */}
          <FieldGroup>
            <FieldLegend>Reference</FieldLegend>
            <FieldDescription>
              Manage reference information
            </FieldDescription>

            <form.AppField name="opportunity">
              {(field) => (
                <field.RelationField<CustomerRelationsOpportunitiesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.CustomerRelationsOpportunities}
                  relationshipName="opportunity"
                  label="Opportunity"
                  description="Related sales opportunity"
                  displayField="name"
                  recordListOption={{  }}
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
                  description="Order status"
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Confirmed", value: "confirmed" },
                    { label: "Picking", value: "picking" },
                    { label: "Packed", value: "packed" },
                    { label: "Shipped", value: "shipped" },
                    { label: "Delivered", value: "delivered" },
                    { label: "Cancelled", value: "cancelled" }
                  ]}
                  placeholder="Select..."
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

            <form.AppField name="shippingAddress">
              {(field) => (
                <field.NumberField
                  label="Shipping Address"
                  description="Shipping address reference"
                  placeholder="0"
                  min={0}
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
        <SalesOrdersForm form={form as any} />
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
    queryKey: ["salesorders", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementSalesOrders)
        .getOne<WarehouseManagementSalesOrdersRecord>(searchQuery.id!),
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
        <SalesOrdersForm form={form as any} />
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
