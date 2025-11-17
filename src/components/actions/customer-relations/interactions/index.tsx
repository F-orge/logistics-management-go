import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateInteractionsForm from "./create";
import DeleteInteractions from "./delete";

const InteractionsActions = () => {
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
      title: "Create Interaction",
      description: "Fill out the form to create a new interaction.",
      Element: <CreateInteractionsForm />,
    };
  }

  if (searchQuery.action === "delete" && searchQuery.id) {
    Component = {
      title: "Delete Interaction",
      description: "Are you sure you want to delete this interaction?",
      Element: <DeleteInteractions />,
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
      <DialogContent className="max-h-3/4 overflow-y-auto">
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

export default InteractionsActions;
