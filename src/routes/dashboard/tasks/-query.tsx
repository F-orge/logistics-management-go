import { z } from "zod";

export const querySchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(25),
  filter: z.string().optional(),
  id: z.string().optional(),
  newTaskDialog: z.boolean().optional(),
  editTaskDialog: z.boolean().optional(),
  deleteTaskDialog: z.boolean().optional()
}).refine(
  (data) => {
    const dialogs = [
      data.newTaskDialog,
      data.editTaskDialog,
      data.deleteTaskDialog,
    ].filter(Boolean);
    return dialogs.length <= 1;
  },
  {
    message: "Only one dialog can be open at a time.",
    path: ["newTaskDialog", "editTaskDialog", "deleteTaskDialog"],
  }
);