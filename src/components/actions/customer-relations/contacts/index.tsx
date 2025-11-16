import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateContactsForm from "./create";
import DeleteContacts from "./delete";
import UpdateContactsForm from "./update";

const ContactsActions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  let Component:
    | {
        title: string;
        description?: string;
        Element: React.ReactNode;
      }
    | undefined = undefined;

  if (searchQuery.action === "create") {
    Component = {
      title: "Create Contact",
      description: "Fill out the form to create a new contact.",
      Element: <CreateContactsForm />,
    };
  }

  if (searchQuery.action === "update" && searchQuery.id) {
    Component = {
      title: "Update Contact",
      description: "Modify the contact details below.",
      Element: <UpdateContactsForm />,
    };
  }

  if (searchQuery.action === "delete" && searchQuery.id) {
    Component = {
      title: "Delete Contact",
      description: "Are you sure you want to delete this contact?",
      Element: <DeleteContacts />,
    };
  }

  if (!Component) {
    return null;
  }

  return (
    <Dialog
      open={!!Component}
      onOpenChange={(open) => {
        if (!open) {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Component.title}</DialogTitle>
          {Component.description && (
            <DialogDescription>{Component.description}</DialogDescription>
          )}
        </DialogHeader>
        {Component.Element}
      </DialogContent>
    </Dialog>
  );
};

export default ContactsActions;
