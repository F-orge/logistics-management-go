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
import CreateCompaniesForm from "./create";
import DeleteCompanies from "./delete";
import UpdateCompaniesForm from "./update";

const CompaniesActions = () => {
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
      title: "Create Company",
      description: "Fill out the form to create a new company.",
      Element: <CreateCompaniesForm />,
    };
  }

  if (searchQuery.action === "update" && searchQuery.id) {
    Component = {
      title: "Update Company",
      description: "Modify the company details below.",
      Element: <UpdateCompaniesForm />,
    };
  }

  if (searchQuery.action === "delete" && searchQuery.id) {
    Component = {
      title: "Delete Company",
      description: "Are you sure you want to delete this company?",
      Element: <DeleteCompanies />,
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

export default CompaniesActions;
