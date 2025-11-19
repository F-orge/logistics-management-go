import { formOptions } from "@tanstack/react-form";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
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

export const CreateSchema = z.object({
  trip: ExpensesSchema.shape.trip.register(fieldRegistry, {
    id: "transport-management-expenses-trip-create",
    type: "field",
    label: "Trip",
    description: "Enter a trip",
    inputType: "relation",
    props: {
      collectionName: Collections.TransportManagementTrips,
      displayField: "id",
      relationshipName: "trip",
    },
  }),
  driver: ExpensesSchema.shape.driver.register(fieldRegistry, {
    id: "transport-management-expenses-driver-create",
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
  type: ExpensesSchema.shape.type.register(fieldRegistry, {
    id: "transport-management-expenses-type-create",
    type: "field",
    label: "Type",
    description: "Enter a type",
    inputType: "select",
  }),
  amount: ExpensesSchema.shape.amount.register(fieldRegistry, {
    id: "transport-management-expenses-amount-create",
    type: "field",
    label: "Amount",
    description: "Enter an amount",
    inputType: "number",
  }),
  currency: ExpensesSchema.shape.currency.register(fieldRegistry, {
    id: "transport-management-expenses-currency-create",
    type: "field",
    label: "Currency",
    description: "Enter a currency",
    inputType: "select",
  }),
  fuelQuantity: ExpensesSchema.shape.fuelQuantity.register(fieldRegistry, {
    id: "transport-management-expenses-fuelQuantity-create",
    type: "field",
    label: "FuelQuantity",
    description: "Enter a fuelquantity",
    inputType: "number",
  }),
  odometerReading: ExpensesSchema.shape.odometerReading.register(
    fieldRegistry,
    {
      id: "transport-management-expenses-odometerReading-create",
      type: "field",
      label: "OdometerReading",
      description: "Enter an odometerreading",
      inputType: "number",
    }
  ),
  status: ExpensesSchema.shape.status.register(fieldRegistry, {
    id: "transport-management-expenses-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  receipts: z.file().array().optional().register(fieldRegistry, {
    id: "transport-management-expenses-receipts-create",
    type: "field",
    label: "Receipts",
    description: "Upload receipts",
    inputType: "file",
  }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta.pocketbase
        .collection(Collections.TransportManagementExpenses)
        .create(value);
      toast.success("Expenses created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create expenses: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(FormOption);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(CreateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Expenses</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
