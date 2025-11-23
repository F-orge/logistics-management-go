import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  CustomerRelationsCompaniesResponse,
  CustomerRelationsOpportunitiesResponse,
  TypedPocketBase,
  WarehouseManagementSalesOrdersRecord,
} from "@/lib/pb.types";
import {
  CreateSalesOrdersSchema,
  SalesOrdersSchema,
  UpdateSalesOrdersSchema,
} from "@/pocketbase/schemas/warehouse-management/sales-orders";

export type SalesOrdersFormProps = {
  action?: "create" | "edit";
};

export const SalesOrdersForm = withForm({
  defaultValues: {} as z.infer<typeof SalesOrdersSchema>,
  props: {} as SalesOrdersFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* orderNumber - string */}
        <form.AppField name="orderNumber">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Order Number"
              description="Unique order identifier"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* client - string (relation) */}
        <form.AppField name="client">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Client"
              description="Client placing order"
            >
              <field.RelationField<CustomerRelationsCompaniesResponse>
                collectionName={Collections.CustomerRelationsCompanies}
                relationshipName="client"
                renderOption={(item) => `${item.name}`}
                disabled={props.action === "edit"}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* opportunity - string (relation) */}
        <form.AppField name="opportunity">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Opportunity"
              description="Source opportunity (optional)"
            >
              <field.RelationField<CustomerRelationsOpportunitiesResponse>
                collectionName={Collections.CustomerRelationsOpportunities}
                relationshipName="opportunity"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* status - enum */}
        <form.AppField name="status">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Status"
              description="Order status"
            >
              <field.SelectField
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "processing", label: "Processing" },
                  { value: "shipped", label: "Shipped" },
                  { value: "completed", label: "Completed" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* shippingAddress - text */}
        <form.AppField name="shippingAddress">
          {(field) => (
            <field.Field
              className="col-span-4"
              label="Shipping Address"
              description="Delivery address"
            >
              <field.TextareaField />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreateSalesOrdersFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      orderNumber: "",
      client: undefined,
      opportunity: undefined,
      status: undefined,
      shippingAddress: "",
    } as Partial<z.infer<ReturnType<typeof CreateSalesOrdersSchema>>>,
    validators: {
      onSubmitAsync: CreateSalesOrdersSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementSalesOrders)
          .create(value);

        toast.success("Sales order created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create order: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateSalesOrdersFormOption = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementSalesOrdersRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateSalesOrdersSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateSalesOrdersSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementSalesOrders)
          .update(record?.id!, value);

        toast.success("Sales order updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update order: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
