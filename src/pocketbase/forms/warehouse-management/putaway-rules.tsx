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
  WarehouseManagementWarehousesResponse,
  WarehouseManagementProductsResponse,
  UsersResponse,
  WarehouseManagementLocationsResponse,
  WarehouseManagementPutawayRulesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementPutawayRulesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementPutawayRulesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementPutawayRules>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementPutawayRules)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `PutawayRules created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementPutawayRulesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementPutawayRules>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementPutawayRules)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "PutawayRules updated successfully",
        })
        .unwrap();
    },
  });

export const PutawayRulesForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementPutawayRules> | Update<Collections.WarehouseManagementPutawayRules>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
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
                  description="Associated warehouse"
                  displayField="name"
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
                  description="Product for rule"
                  displayField="name"
                  recordListOption={{  }}
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
                  description="Optional client restriction"
                  displayField="username"
                  recordListOption={{  }}
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

            <form.AppField name="locationType">
              {(field) => (
                <field.SelectField
                  label="Location Type"
                  description="Preferred location type"
                  options={[
                    { label: "Receiving-dock", value: "receiving-dock" },
                    { label: "Pick-bin", value: "pick-bin" },
                    { label: "Packing-station", value: "packing-station" },
                    { label: "Cross-dock-area", value: "cross-dock-area" },
                    { label: "Bulk-storage", value: "bulk-storage" },
                    { label: "Reserve-storage", value: "reserve-storage" },
                    { label: "Damaged-goods", value: "damaged-goods" },
                    { label: "Staging-area", value: "staging-area" },
                    { label: "Quality-control", value: "quality-control" },
                    { label: "Returns-area", value: "returns-area" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="preferredLocation">
              {(field) => (
                <field.RelationField<WarehouseManagementLocationsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementLocations}
                  relationshipName="preferredLocation"
                  label="Preferred Location"
                  description="Preferred storage location"
                  displayField="name"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Priority */}
          <FieldGroup>
            <FieldLegend>Priority</FieldLegend>
            <FieldDescription>
              Manage priority information
            </FieldDescription>

            <form.AppField name="priority">
              {(field) => (
                <field.NumberField
                  label="Priority"
                  description="Rule priority (lower = higher)"
                  placeholder="0"
                  min={0}
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

            <form.AppField name="minQuantity">
              {(field) => (
                <field.NumberField
                  label="Min Quantity"
                  description="Minimum quantity threshold"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="maxQuantity">
              {(field) => (
                <field.NumberField
                  label="Max Quantity"
                  description="Maximum quantity allowed"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Capacity */}
          <FieldGroup>
            <FieldLegend>Capacity</FieldLegend>
            <FieldDescription>
              Manage capacity information
            </FieldDescription>

            <form.AppField name="volumeThreshold">
              {(field) => (
                <field.NumberField
                  label="Volume Threshold"
                  description="Volume threshold in cubic meters"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="weightThreshold">
              {(field) => (
                <field.NumberField
                  label="Weight Threshold"
                  description="Weight threshold in kg"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Requirements */}
          <FieldGroup>
            <FieldLegend>Requirements</FieldLegend>
            <FieldDescription>
              Manage requirements information
            </FieldDescription>

            <form.AppField name="requireTemperatureControl">
              {(field) => (
                <field.TextField
                  label="Require Temperature Control"
                  description="Whether temperature control required"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="requireHazmatApproval">
              {(field) => (
                <field.TextField
                  label="Require Hazmat Approval"
                  description="Whether hazmat approval required"
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

            <form.AppField name="isActive">
              {(field) => (
                <field.TextField
                  label="Is Active"
                  description="Whether rule is active"
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
        <PutawayRulesForm form={form as any} />
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
    queryKey: ["putawayrules", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementPutawayRules)
        .getOne<WarehouseManagementPutawayRulesRecord>(searchQuery.id!),
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
        <PutawayRulesForm form={form as any} />
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
