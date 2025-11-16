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
import { CompaniesSchema } from "@/pocketbase/schemas/customer-relations/companies";
import { CreateCompaniesSchema } from "./create";

export const UpdateCompaniesSchema = z.object({
  name: CompaniesSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-companies-name-update",
    type: "field",
    label: "Company Name",
    description: "Enter the company name",
    inputType: "text",
  }),
  street: CompaniesSchema.shape.street.optional().register(fieldRegistry, {
    id: "crm-companies-street-update",
    type: "field",
    label: "Street",
    description: "Enter the street address (optional)",
    inputType: "text",
  }),
  city: CompaniesSchema.shape.city.optional().register(fieldRegistry, {
    id: "crm-companies-city-update",
    type: "field",
    label: "City",
    description: "Enter the city (optional)",
    inputType: "text",
  }),
  state: CompaniesSchema.shape.state.optional().register(fieldRegistry, {
    id: "crm-companies-state-update",
    type: "field",
    label: "State",
    description: "Enter the state (optional)",
    inputType: "text",
  }),
  postalCode: CompaniesSchema.shape.postalCode
    .optional()
    .register(fieldRegistry, {
      id: "crm-companies-postalCode-update",
      type: "field",
      label: "Postal Code",
      description: "Enter the postal code (optional)",
      inputType: "text",
    }),
  country: CompaniesSchema.shape.country.optional().register(fieldRegistry, {
    id: "crm-companies-country-update",
    type: "field",
    label: "Country",
    description: "Enter the country (optional)",
    inputType: "text",
  }),
  phoneNumber: CompaniesSchema.shape.phoneNumber
    .optional()
    .register(fieldRegistry, {
      id: "crm-companies-phoneNumber-update",
      type: "field",
      label: "Phone Number",
      description: "Enter the phone number (optional)",
      inputType: "text",
    }),
  industry: CompaniesSchema.shape.industry.optional().register(fieldRegistry, {
    id: "crm-companies-industry-update",
    type: "field",
    label: "Industry",
    description: "Enter the industry (optional)",
    inputType: "text",
  }),
  website: CompaniesSchema.shape.website.optional().register(fieldRegistry, {
    id: "crm-companies-website-update",
    type: "field",
    label: "Website",
    description: "Enter the website URL (optional)",
    inputType: "url",
  }),
  annualRevenue: CompaniesSchema.shape.annualRevenue
    .optional()
    .register(fieldRegistry, {
      id: "crm-companies-annualRevenue-update",
      type: "field",
      label: "Annual Revenue",
      description: "Enter the annual revenue (optional)",
      inputType: "number",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateCompaniesSchema>,
  validators: {
    onSubmit: UpdateCompaniesSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsCompanies)
        .update(meta.id, value);

      toast.success("Company updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update company: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const UpdateCompaniesForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["company", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {},
  });

  if (!data) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(UpdateCompaniesSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Company</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateCompaniesForm;
