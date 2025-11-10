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
  CustomerRelationsCompaniesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { CustomerRelationsCompaniesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsCompaniesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.CustomerRelationsCompanies>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Companies created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: CustomerRelationsCompaniesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.CustomerRelationsCompanies>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Companies updated successfully",
        })
        .unwrap();
    },
  });

export const CompaniesForm = withForm({
  defaultValues: {} as Create<Collections.CustomerRelationsCompanies> | Update<Collections.CustomerRelationsCompanies>,
  render: ({ form }) => {
return (
      <form.AppForm>
        <FieldSet>
          {/* Basic Information */}
          <FieldGroup>
            <FieldLegend>Basic Information</FieldLegend>
            <FieldDescription>
              Manage basic information information
            </FieldDescription>

            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Name"
                  description="Company name"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Contact */}
          <FieldGroup>
            <FieldLegend>Contact</FieldLegend>
            <FieldDescription>
              Manage contact information
            </FieldDescription>

            <form.AppField name="email">
              {(field) => (
                <field.EmailField
                  label="Email"
                  description="Company email"
                  placeholder="example@email.com"
                />
              )}
            </form.AppField>
            <form.AppField name="phone">
              {(field) => (
                <field.TextField
                  label="Phone"
                  description="Company phone"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="website">
              {(field) => (
                <field.TextField
                  label="Website"
                  description="Company website"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Registration */}
          <FieldGroup>
            <FieldLegend>Registration</FieldLegend>
            <FieldDescription>
              Manage registration information
            </FieldDescription>

            <form.AppField name="registrationNumber">
              {(field) => (
                <field.TextField
                  label="Registration Number"
                  description="Business registration number"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="taxId">
              {(field) => (
                <field.TextField
                  label="Tax Id"
                  description="Tax identification number"
                  placeholder=""
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

            <form.AppField name="address">
              {(field) => (
                <field.TextField
                  label="Address"
                  description="Street address"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="city">
              {(field) => (
                <field.TextField
                  label="City"
                  description="City"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="state">
              {(field) => (
                <field.TextField
                  label="State"
                  description="State/Province"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="country">
              {(field) => (
                <field.TextField
                  label="Country"
                  description="Country"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Business */}
          <FieldGroup>
            <FieldLegend>Business</FieldLegend>
            <FieldDescription>
              Manage business information
            </FieldDescription>

            <form.AppField name="industry">
              {(field) => (
                <field.TextField
                  label="Industry"
                  description="Industry sector"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="employees">
              {(field) => (
                <field.NumberField
                  label="Employees"
                  description="Number of employees"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="annualRevenue">
              {(field) => (
                <field.NumberField
                  label="Annual Revenue"
                  description="Annual revenue"
                  placeholder="0"
                  min={0}
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
        <CompaniesForm form={form as any} />
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
    queryKey: ["companies", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.CustomerRelationsCompanies)
        .getOne<CustomerRelationsCompaniesRecord>(searchQuery.id!),
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
        <CompaniesForm form={form as any} />
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
