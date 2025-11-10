import { ZodProvider } from "@autoform/zod";
import React from "react";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AutoForm } from "../../AutoForm";

export type FormDialogProps<T extends z.ZodObject> = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
} & React.ComponentProps<typeof Dialog>;

const FormDialog = <T extends z.ZodObject>({
  title,
  description,
  schema,
  onSubmit,
  ...dialogProps
}: FormDialogProps<T>) => {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <AutoForm
          schema={new ZodProvider(schema)}
          onSubmit={onSubmit}
          withSubmit
        />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
