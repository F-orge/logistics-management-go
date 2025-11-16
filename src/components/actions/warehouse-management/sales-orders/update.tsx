import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
  fieldRegistry,
  toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { SalesOrdersSchema } from "@/pocketbase/schemas/warehouse-management/sales-orders";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  shippingAddress: SalesOrdersSchema.shape.shippingAddress
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-sales-orders-shippingAddress-update",
      type: "field",
      label: "ShippingAddress",
      description: "Enter a shippingaddress",
      inputType: "number",
    }),
  client: SalesOrdersSchema.shape.client.optional().register(fieldRegistry, {
    id: "warehouse-management-sales-orders-client-update",
    type: "field",
    label: "Client",
    description: "Enter a client",
    inputType: "text",
  }),
  opportunity: SalesOrdersSchema.shape.opportunity
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-sales-orders-opportunity-update",
      type: "field",
      label: "Opportunity",
      description: "Enter an opportunity",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsOpportunities,
        displayField: "name",
        relationshipName: "opportunity",
      },
    }),
  status: SalesOrdersSchema.shape.status.optional().register(fieldRegistry, {
    id: "warehouse-management-sales-orders-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  orderNumber: SalesOrdersSchema.shape.orderNumber
    .optional()
    .register(fieldRegistry, {
      id: "warehouse-management-sales-orders-orderNumber-update",
      type: "field",
      label: "OrderNumber",
      description: "Enter an ordernumber",
      inputType: "text",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateSchema>,
  validators: {
    onSubmit: UpdateSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.WarehouseManagementSalesOrders)
        .update(meta.id!, value);

      toast.success("Sales Orders updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update sales-orders: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({
        search: (prev) => ({ ...prev, action: undefined, id: undefined }),
      });
    }
  },
});

const UpdateForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useQuery({
    queryKey: ["salesOrders", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementSalesOrders)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {},
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase, id: searchQuery.id! });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(UpdateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Sales Orders</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
