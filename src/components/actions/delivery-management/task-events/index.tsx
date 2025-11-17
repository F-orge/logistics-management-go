import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateTaskEventForm from "./create";
import DeleteTaskEvent from "./delete";
import UpdateTaskEventForm from "./update";

const TaskEventActions = () => {
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
      title: "Create Task Event",
      description: "Fill out the form to create a new task event.",
      Element: <CreateTaskEventForm />,
    };
  }

  if (searchQuery.action === "update" && searchQuery.id) {
    Component = {
      title: "Update Task Event",
      description: "Modify the task event details below.",
      Element: (
        <Suspense>
          <UpdateTaskEventForm />
        </Suspense>
      ),
    };
  }

  if (searchQuery.action === "delete" && searchQuery.id) {
    Component = {
      title: "Delete Task Event",
      description: "Are you sure you want to delete this task event?",
      Element: <DeleteTaskEvent />,
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

export default TaskEventActions;
