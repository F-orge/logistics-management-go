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
import { WarehousesSchema } from "@/pocketbase/schemas/warehouse-management/warehouses";

export const CreateSchema = z.object({
  name: WarehousesSchema.shape.name.register(fieldRegistry, {
    id: "warehouse-management-warehouses-name-create",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  address: WarehousesSchema.shape.address.register(fieldRegistry, {
    id: "warehouse-management-warehouses-address-create",
    type: "field",
    label: "Address",
    description: "Enter an address",
    inputType: "text",
  }),
  city: WarehousesSchema.shape.city.register(fieldRegistry, {
    id: "warehouse-management-warehouses-city-create",
    type: "field",
    label: "City",
    description: "Enter a city",
    inputType: "text",
  }),
  state: WarehousesSchema.shape.state.register(fieldRegistry, {
    id: "warehouse-management-warehouses-state-create",
    type: "field",
    label: "State",
    description: "Enter a state",
    inputType: "text",
  }),
  postalCode: WarehousesSchema.shape.postalCode.register(fieldRegistry, {
    id: "warehouse-management-warehouses-postalCode-create",
    type: "field",
    label: "PostalCode",
    description: "Enter a postalcode",
    inputType: "text",
  }),
  country: WarehousesSchema.shape.country.register(fieldRegistry, {
    id: "warehouse-management-warehouses-country-create",
    type: "field",
    label: "Country",
    description: "Enter a country",
    inputType: "text",
  }),
  timezone: WarehousesSchema.shape.timezone.register(fieldRegistry, {
    id: "warehouse-management-warehouses-timezone-create",
    type: "field",
    label: "Timezone",
    description: "Enter a timezone",
    inputType: "text",
  }),
  contactPerson: WarehousesSchema.shape.contactPerson.register(fieldRegistry, {
    id: "warehouse-management-warehouses-contactPerson-create",
    type: "field",
    label: "ContactPerson",
    description: "Enter a contactperson",
    inputType: "text",
  }),
  contactEmail: WarehousesSchema.shape.contactEmail.register(fieldRegistry, {
    id: "warehouse-management-warehouses-contactEmail-create",
    type: "field",
    label: "ContactEmail",
    description: "Enter a contactemail",
    inputType: "text",
  }),
  isActive: WarehousesSchema.shape.isActive.register(fieldRegistry, {
    id: "warehouse-management-warehouses-isActive-create",
    type: "field",
    label: "IsActive",
    description: "Enter an isactive",
    inputType: "bool",
  }),
  location: WarehousesSchema.shape.location.register(fieldRegistry, {
    id: "warehouse-management-warehouses-location-create",
    type: "field",
    label: "Location",
    description: "Enter a location",
    inputType: "geoPoint",
  }),
  images: z.file().array().register(fieldRegistry, {
    id: "warehouse-management-warehouses-images-create",
    type: "field",
    label: "Images",
    description: "Enter an images",
    inputType: "file",
    isArray: true,
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
        .collection(Collections.WarehouseManagementWarehouses)
        .create(value);
      toast.success("Warehouses created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create warehouses: ${error.message} (${error.status})`
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
          <form.SubmitButton>Create Warehouses</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
