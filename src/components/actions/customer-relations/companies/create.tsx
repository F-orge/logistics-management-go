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
import { CompaniesSchema } from "@/pocketbase/schemas/customer-relations/companies";

export const CreateSchema = z.object({
  name: CompaniesSchema.shape.name.register(fieldRegistry, {
    id: "customer-relations-companies-name-create",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  street: CompaniesSchema.shape.street.register(fieldRegistry, {
    id: "customer-relations-companies-street-create",
    type: "field",
    label: "Street",
    description: "Enter a street",
    inputType: "text",
  }),
  city: CompaniesSchema.shape.city.register(fieldRegistry, {
    id: "customer-relations-companies-city-create",
    type: "field",
    label: "City",
    description: "Enter a city",
    inputType: "text",
  }),
  state: CompaniesSchema.shape.state.register(fieldRegistry, {
    id: "customer-relations-companies-state-create",
    type: "field",
    label: "State",
    description: "Enter a state",
    inputType: "text",
  }),
  postalCode: CompaniesSchema.shape.postalCode.register(fieldRegistry, {
    id: "customer-relations-companies-postalCode-create",
    type: "field",
    label: "PostalCode",
    description: "Enter a postalcode",
    inputType: "text",
  }),
  country: CompaniesSchema.shape.country.register(fieldRegistry, {
    id: "customer-relations-companies-country-create",
    type: "field",
    label: "Country",
    description: "Enter a country",
    inputType: "text",
  }),
  phoneNumber: CompaniesSchema.shape.phoneNumber.register(fieldRegistry, {
    id: "customer-relations-companies-phoneNumber-create",
    type: "field",
    label: "PhoneNumber",
    description: "Enter a phonenumber",
    inputType: "text",
  }),
  industry: CompaniesSchema.shape.industry.register(fieldRegistry, {
    id: "customer-relations-companies-industry-create",
    type: "field",
    label: "Industry",
    description: "Enter an industry",
    inputType: "text",
  }),
  website: CompaniesSchema.shape.website.register(fieldRegistry, {
    id: "customer-relations-companies-website-create",
    type: "field",
    label: "Website",
    description: "Enter a website",
    inputType: "text",
  }),
  annualRevenue: CompaniesSchema.shape.annualRevenue.register(fieldRegistry, {
    id: "customer-relations-companies-annualRevenue-create",
    type: "field",
    label: "AnnualRevenue",
    description: "Enter an annualrevenue",
    inputType: "number",
  }),
  attachments: CompaniesSchema.shape.attachments.register(fieldRegistry, {
    id: "customer-relations-companies-attachments-create",
    type: "field",
    label: "Attachments",
    description: "Upload attachments",
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
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsCompanies)
        .create({
          ...value,
          owner: meta.pocketbase!.authStore.record?.id,
        });

      toast.success("Company created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create company: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateCompaniesForm = () => {
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
          <form.SubmitButton>Create Company</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateCompaniesForm;
