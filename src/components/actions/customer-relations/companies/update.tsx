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
import { CompaniesSchema } from "@/pocketbase/schemas/customer-relations/companies";

export const UpdateSchema = z.object({
  name: CompaniesSchema.shape.name.optional().register(fieldRegistry, {
    id: "customer-relations-companies-name-update",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  street: CompaniesSchema.shape.street.optional().register(fieldRegistry, {
    id: "customer-relations-companies-street-update",
    type: "field",
    label: "Street",
    description: "Enter a street",
    inputType: "text",
  }),
  city: CompaniesSchema.shape.city.optional().register(fieldRegistry, {
    id: "customer-relations-companies-city-update",
    type: "field",
    label: "City",
    description: "Enter a city",
    inputType: "text",
  }),
  state: CompaniesSchema.shape.state.optional().register(fieldRegistry, {
    id: "customer-relations-companies-state-update",
    type: "field",
    label: "State",
    description: "Enter a state",
    inputType: "text",
  }),
  postalCode: CompaniesSchema.shape.postalCode
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-companies-postalCode-update",
      type: "field",
      label: "PostalCode",
      description: "Enter a postalcode",
      inputType: "text",
    }),
  country: CompaniesSchema.shape.country.optional().register(fieldRegistry, {
    id: "customer-relations-companies-country-update",
    type: "field",
    label: "Country",
    description: "Enter a country",
    inputType: "text",
  }),
  phoneNumber: CompaniesSchema.shape.phoneNumber
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-companies-phoneNumber-update",
      type: "field",
      label: "PhoneNumber",
      description: "Enter a phonenumber",
      inputType: "text",
    }),
  industry: CompaniesSchema.shape.industry.optional().register(fieldRegistry, {
    id: "customer-relations-companies-industry-update",
    type: "field",
    label: "Industry",
    description: "Enter an industry",
    inputType: "text",
  }),
  website: CompaniesSchema.shape.website.optional().register(fieldRegistry, {
    id: "customer-relations-companies-website-update",
    type: "field",
    label: "Website",
    description: "Enter a website",
    inputType: "text",
  }),
  annualRevenue: CompaniesSchema.shape.annualRevenue
    .optional()
    .register(fieldRegistry, {
      id: "customer-relations-companies-annualRevenue-update",
      type: "field",
      label: "AnnualRevenue",
      description: "Enter an annualrevenue",
      inputType: "text",
    }),
  owner: CompaniesSchema.shape.owner.optional().register(fieldRegistry, {
    id: "customer-relations-companies-owner-update",
    type: "field",
    label: "Owner",
    description: "Enter an owner",
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

  const { data } = useSuspenseQuery({
    queryKey: ["company", searchQuery.id],

    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data as z.infer<typeof UpdateSchema>,
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
          {...toAutoFormFieldSet(UpdateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Company</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateCompaniesForm;
