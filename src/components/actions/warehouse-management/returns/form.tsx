import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  CustomerRelationsCompaniesResponse,
  TypedPocketBase,
  WarehouseManagementReturnsRecord,
  WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";
import {
  CreateReturnsSchema,
  ReturnsSchema,
  UpdateReturnsSchema,
} from "@/pocketbase/schemas/warehouse-management/returns";
import { ReturnItemsForm } from "../return-items/form";

export type ReturnsFormProps = {
  action?: "create" | "edit";
};

export const ReturnsForm = withForm({
  defaultValues: {} as z.infer<typeof ReturnsSchema>,
  props: {} as ReturnsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* returnNumber - string */}
        <form.AppField name="returnNumber">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Return Number"
              description="Unique return identifier"
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
              description="Client"
            >
              <field.RelationField<CustomerRelationsCompaniesResponse>
                collectionName={Collections.CustomerRelationsCompanies}
                relationshipName="client"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* salesOrder - string (relation) */}
        <form.AppField name="salesOrder">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Sales Order"
              description="Sales order"
            >
              <field.RelationField<WarehouseManagementSalesOrdersResponse>
                collectionName={Collections.WarehouseManagementSalesOrders}
                relationshipName="salesOrder"
                renderOption={(item) => `${item.orderNumber}`}
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
              description="Return status"
            >
              <field.SelectField
                options={[
                  { value: "requested", label: "Requested" },
                  { value: "approved", label: "Approved" },
                  { value: "rejected", label: "Rejected" },
                  { value: "received", label: "Received" },
                  { value: "processed", label: "Processed" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* reason - text */}
        <form.AppField name="reason">
          {(field) => (
            <field.Field
              className="col-span-4"
              label="Reason"
              description="Reason for return"
            >
              <field.TextareaField />
            </field.Field>
          )}
        </form.AppField>
        {/* items */}
        {props.action === "create" && (
          <>
            <FieldSeparator className="col-span-full" />
            <form.FieldSet
              className="col-span-full"
              legend="Return Items"
              description="Add items to this return."
            >
              {/* @ts-ignore - items field is added dynamically in CreateReturnsSchema */}
              <form.AppField name="items" mode="array">
                {(field) => (
                  <>
                    {/* @ts-ignore */}
                    {field.state.value?.map((_: any, index: number) => (
                      <React.Fragment key={index}>
                        <ReturnItemsForm
                          key={index}
                          form={form}
                          fields={`items[${index}]` as any}
                          onRemove={() => field.removeValue(index)}
                        />
                        <FieldSeparator className="col-span-full" />
                      </React.Fragment>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue(undefined as any)}
                    >
                      Add Item
                    </Button>
                  </>
                )}
              </form.AppField>
            </form.FieldSet>
          </>
        )}
      </form.FieldSet>
    );
  },
});

export const CreateReturnsFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      returnNumber: "",
      client: undefined,
      salesOrder: undefined,
      status: undefined,
      reason: "",
      items: [],
    } as Partial<z.infer<ReturnType<typeof CreateReturnsSchema>>>,
    // validators: {
    //   onSubmitAsync: CreateReturnsSchema(pocketbase),
    // },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      let returnId: string | null = null;

      try {
        // @ts-ignore
        const { items, ...returnData } = value;

        const created = await pocketbase
          .collection(Collections.WarehouseManagementReturns)
          .create(returnData);

        returnId = created.id;

        // Now create each return item linked to the created return

        const batch = pocketbase.createBatch();

        for (const item of items!) {
          batch.collection(Collections.WarehouseManagementReturnItems).create({
            ...item,
            return: returnId,
          });
        }

        await batch.send();

        toast.success("Return created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create return: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateReturnsFormOption = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementReturnsRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateReturnsSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateReturnsSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementReturns)
          .update(record?.id!, value);

        toast.success("Return updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update return: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
