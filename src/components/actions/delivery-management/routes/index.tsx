import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateRouteForm from "./create";
import DeleteRoute from "./delete";
import UpdateRouteForm from "./update";

const RouteActions = () => {
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
      title: "Create Route",
      description: "Fill out the form to create a new route.",
      Element: <CreateRouteForm />,
    };
  }

  if (searchQuery.action === "update" && searchQuery.id) {
    Component = {
      title: "Update Route",
      description: "Modify the route details below.",
      Element: <UpdateRouteForm />,
    };
  }

  if (searchQuery.action === "delete" && searchQuery.id) {
    Component = {
      title: "Delete Route",
      description: "Are you sure you want to delete this route?",
      Element: <DeleteRoute />,
    };
  }

  if (Component) {
    return (
      <Dialog
        open={!!searchQuery.action}
        onOpenChange={(open) => {
          if (!open) {
            navigate({
              search: (prev) => ({ ...prev, action: undefined, id: undefined }),
            });
          }
        }}
      >
        <DialogContent className="max-h-3/4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{Component.title}</DialogTitle>
            <DialogDescription>{Component.description}</DialogDescription>
          </DialogHeader>
          {Component.Element}
        </DialogContent>
      </Dialog>
    );
  }
};

export default RouteActions;
