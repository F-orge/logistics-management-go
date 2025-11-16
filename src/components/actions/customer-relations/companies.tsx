import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AutoForm from "@/components/ui/autoform-tanstack/auto-form";
import { fieldRegistry } from "@/components/ui/autoform-tanstack/types";
import { Collections, Create } from "@/lib/pb.types";
import { CompaniesSchema } from "@/pocketbase/schemas/customer-relations/companies";

const CreateCompaniesFormSchema = z.object({
  name: CompaniesSchema.shape.name.register(fieldRegistry, {
    id: "crm-companies-name-create",
    type: "field",
    label: "Company Name",
    description: "Enter the company name",
    inputType: "text",
  }),
  street: CompaniesSchema.shape.street.register(fieldRegistry, {
    id: "crm-companies-street-create",
    type: "field",
    label: "Street",
    description: "Enter the street address (optional)",
    inputType: "text",
  }),
  city: CompaniesSchema.shape.city.register(fieldRegistry, {
    id: "crm-companies-city-create",
    type: "field",
    label: "City",
    description: "Enter the city (optional)",
    inputType: "text",
  }),
  state: CompaniesSchema.shape.state.register(fieldRegistry, {
    id: "crm-companies-state-create",
    type: "field",
    label: "State",
    description: "Enter the state (optional)",
    inputType: "text",
  }),
  postalCode: CompaniesSchema.shape.postalCode.register(fieldRegistry, {
    id: "crm-companies-postalCode-create",
    type: "field",
    label: "Postal Code",
    description: "Enter the postal code (optional)",
    inputType: "text",
  }),
  country: CompaniesSchema.shape.country.register(fieldRegistry, {
    id: "crm-companies-country-create",
    type: "field",
    label: "Country",
    description: "Enter the country (optional)",
    inputType: "text",
  }),
  phoneNumber: CompaniesSchema.shape.phoneNumber.register(fieldRegistry, {
    id: "crm-companies-phoneNumber-create",
    type: "field",
    label: "Phone Number",
    description: "Enter the phone number (optional)",
    inputType: "text",
  }),
  industry: CompaniesSchema.shape.industry.register(fieldRegistry, {
    id: "crm-companies-industry-create",
    type: "field",
    label: "Industry",
    description: "Enter the industry (optional)",
    inputType: "text",
  }),
  website: CompaniesSchema.shape.website.register(fieldRegistry, {
    id: "crm-companies-website-create",
    type: "field",
    label: "Website",
    description: "Enter the website URL (optional)",
    inputType: "url",
  }),
  annualRevenue: CompaniesSchema.shape.annualRevenue.register(fieldRegistry, {
    id: "crm-companies-annualRevenue-create",
    type: "field",
    label: "Annual Revenue",
    description: "Enter the annual revenue (optional)",
    inputType: "number",
  }),
  attachments: CompaniesSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-companies-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
});

const UpdateCompaniesFormSchema = z.object({
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

export const CompaniesActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["companiess", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateCompaniesFormSchema>
        title="Create Companies"
        description="Fill in the details to create a new companies."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsCompanies)
              .create<Create<Collections.CustomerRelationsCompanies>>({
                ...data,
                owner: pocketbase.authStore.record?.id,
              });
            toast.success("Companies created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create companies: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateCompaniesFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateCompaniesFormSchema>
        title="Update Companies"
        description="Update the companies details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsCompanies)
              .update(searchQuery.id!, data);
            toast.success("Companies updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update companies: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateCompaniesFormSchema}
        defaultValues={data as any}
      />
    );
  }

  if (searchQuery.action === "delete" && data) {
    return (
      <AlertDialog
        open={searchQuery.action === "delete"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Companies</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this companies? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsCompanies)
                    .delete(searchQuery.id!);
                  toast.success("Companies deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete companies: ${error.message} (${error.status})`
                    );
                  }
                } finally {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      action: undefined,
                      id: undefined,
                    }),
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default CompaniesActions;
