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
import { ContactsSchema } from "@/pocketbase/schemas/customer-relations/contacts";

export const CreateSchema = z.object({
  name: ContactsSchema.shape.name.register(fieldRegistry, {
    id: "customer-relations-contacts-name-create",
    type: "field",
    label: "Name",
    description: "Contact name is required",
    inputType: "text",
  }),
  email: ContactsSchema.shape.email.register(fieldRegistry, {
    id: "customer-relations-contacts-email-create",
    type: "field",
    label: "Email",
    description: "Must be a valid email address",
    inputType: "text",
  }),
  phoneNumber: ContactsSchema.shape.phoneNumber.register(fieldRegistry, {
    id: "customer-relations-contacts-phoneNumber-create",
    type: "field",
    label: "PhoneNumber",
    description: "Enter a phonenumber",
    inputType: "text",
  }),
  jobTitle: ContactsSchema.shape.jobTitle.register(fieldRegistry, {
    id: "customer-relations-contacts-jobTitle-create",
    type: "field",
    label: "JobTitle",
    description: "Enter a jobtitle",
    inputType: "text",
  }),
  company: ContactsSchema.shape.company.register(fieldRegistry, {
    id: "customer-relations-contacts-company-create",
    type: "field",
    label: "Company",
    description: "Enter a company",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsCompanies,
      displayField: "name",
      relationshipName: "company",
    },
  }),
  attachments: ContactsSchema.shape.attachments.register(fieldRegistry, {
    id: "customer-relations-contacts-attachments-create",
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
        .pocketbase!.collection(Collections.CustomerRelationsContacts)
        .create({
          ...value,
          owner: meta.pocketbase!.authStore.record?.id,
        });

      toast.success("Contact created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create contact: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateContactsForm = () => {
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
          <form.SubmitButton>Create Contact</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateContactsForm;
