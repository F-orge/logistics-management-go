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
import { Collections } from "@/lib/pb.types";
import { ContactsSchema } from "@/pocketbase/schemas/customer-relations/contacts";

const CreateContactsFormSchema = z.object({
  name: ContactsSchema.shape.name.register(fieldRegistry, {
    id: "crm-contacts-name-create",
    type: "field",
    label: "Contact Name",
    description: "Enter the contact name",
    inputType: "text",
  }),
  email: ContactsSchema.shape.email.register(fieldRegistry, {
    id: "crm-contacts-email-create",
    type: "field",
    label: "Email",
    description: "Enter the email address",
    inputType: "email",
  }),
  phoneNumber: ContactsSchema.shape.phoneNumber.register(fieldRegistry, {
    id: "crm-contacts-phoneNumber-create",
    type: "field",
    label: "Phone Number",
    description: "Enter the phone number (optional)",
    inputType: "text",
  }),
  jobTitle: ContactsSchema.shape.jobTitle.register(fieldRegistry, {
    id: "crm-contacts-jobTitle-create",
    type: "field",
    label: "Job Title",
    description: "Enter the job title (optional)",
    inputType: "text",
  }),
  company: ContactsSchema.shape.company.register(fieldRegistry, {
    id: "crm-contacts-company-create",
    type: "field",
    label: "Company",
    description: "Enter the company (optional)",
    inputType: "text",
  }),
  owner: ContactsSchema.shape.owner.register(fieldRegistry, {
    id: "crm-contacts-owner-create",
    type: "field",
    label: "Owner",
    description: "Enter the owner",
    inputType: "text",
  }),
  attachments: ContactsSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-contacts-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
});

const UpdateContactsFormSchema = z.object({
  name: ContactsSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-contacts-name-update",
    type: "field",
    label: "Contact Name",
    description: "Enter the contact name",
    inputType: "text",
  }),
  email: ContactsSchema.shape.email.optional().register(fieldRegistry, {
    id: "crm-contacts-email-update",
    type: "field",
    label: "Email",
    description: "Enter the email address",
    inputType: "email",
  }),
  phoneNumber: ContactsSchema.shape.phoneNumber
    .optional()
    .register(fieldRegistry, {
      id: "crm-contacts-phoneNumber-update",
      type: "field",
      label: "Phone Number",
      description: "Enter the phone number (optional)",
      inputType: "text",
    }),
  jobTitle: ContactsSchema.shape.jobTitle.optional().register(fieldRegistry, {
    id: "crm-contacts-jobTitle-update",
    type: "field",
    label: "Job Title",
    description: "Enter the job title (optional)",
    inputType: "text",
  }),
  company: ContactsSchema.shape.company.optional().register(fieldRegistry, {
    id: "crm-contacts-company-update",
    type: "field",
    label: "Company",
    description: "Enter the company (optional)",
    inputType: "text",
  }),
  owner: ContactsSchema.shape.owner.optional().register(fieldRegistry, {
    id: "crm-contacts-owner-update",
    type: "field",
    label: "Owner",
    description: "Enter the owner",
    inputType: "text",
  }),
});

export const ContactsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["contactss", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.CustomerRelationsContacts)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof CreateContactsFormSchema>
        title="Create Contacts"
        description="Fill in the details to create a new contacts."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsContacts)
              .create(data);
            toast.success("Contacts created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to create contacts: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={CreateContactsFormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof UpdateContactsFormSchema>
        title="Update Contacts"
        description="Update the contacts details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.CustomerRelationsContacts)
              .update(searchQuery.id!, data);
            toast.success("Contacts updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                `Failed to update contacts: ${error.message} (${error.status})`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={UpdateContactsFormSchema}
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
            <AlertDialogTitle>Delete Contacts</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contacts? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.CustomerRelationsContacts)
                    .delete(searchQuery.id!);
                  toast.success("Contacts deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      `Failed to delete contacts: ${error.message} (${error.status})`
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

export default ContactsActions;
