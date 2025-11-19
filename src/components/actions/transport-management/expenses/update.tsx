import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
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
import { ExpensesSchema } from "@/pocketbase/schemas/transport-management/expenses";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  trip: ExpensesSchema.shape.trip.optional().register(fieldRegistry, {
    id: "transport-management-expenses-trip-update",
    type: "field",
    label: "Trip",
    description: "Enter a trip",
    inputType: "text",
  }),
  driver: ExpensesSchema.shape.driver.optional().register(fieldRegistry, {
    id: "transport-management-expenses-driver-update",
    type: "field",
    label: "Driver",
    description: "Enter a driver",
    inputType: "relation",
    props: {
      collectionName: Collections.TransportManagementDrivers,
      displayField: "name",
      relationshipName: "driver",
    },
  }),
  type: ExpensesSchema.shape.type.optional().register(fieldRegistry, {
    id: "transport-management-expenses-type-update",
    type: "field",
    label: "Type",
    description: "Enter a type",
    inputType: "select",
  }),
  amount: ExpensesSchema.shape.amount.optional().register(fieldRegistry, {
    id: "transport-management-expenses-amount-update",
    type: "field",
    label: "Amount",
    description: "Enter an amount",
    inputType: "number",
  }),
  currency: ExpensesSchema.shape.currency.optional().register(fieldRegistry, {
    id: "transport-management-expenses-currency-update",
    type: "field",
    label: "Currency",
    description: "Enter a currency",
    inputType: "select",
  }),
  fuelQuantity: ExpensesSchema.shape.fuelQuantity
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-expenses-fuelQuantity-update",
      type: "field",
      label: "FuelQuantity",
      description: "Enter a fuelquantity",
      inputType: "number",
    }),
  odometerReading: ExpensesSchema.shape.odometerReading
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-expenses-odometerReading-update",
      type: "field",
      label: "OdometerReading",
      description: "Enter an odometerreading",
      inputType: "number",
    }),
  status: ExpensesSchema.shape.status.optional().register(fieldRegistry, {
    id: "transport-management-expenses-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
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
        .pocketbase!.collection(Collections.TransportManagementExpenses)
        .update(meta.id!, value);

      toast.success("Expenses updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update expenses: ${error.message} (${error.status})`
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

  const { data } = useSuspenseQuery({
    queryKey: ["expenses", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.TransportManagementExpenses)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data as z.infer<typeof UpdateSchema>,
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
          <form.SubmitButton>Update Expenses</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
