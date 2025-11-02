import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type React from "react";
import { AutoForm } from "./AutoForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import type { ZodObject } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";

export function AutoFormDialog<Schema extends ZodObject>(
  props: React.ComponentProps<typeof DialogPrimitive.Root> &
    React.ComponentProps<typeof AutoForm<Schema>> & {
      title?: React.ReactNode;
      description?: React.ReactNode;
    }
) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <AutoForm
          onFormInit={props.onFormInit}
          schema={props.schema}
          onSubmit={props.onSubmit}
          defaultValues={props.defaultValues}
          withSubmit
        >
          {props.children}
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
}

export const DeleteRecordForm = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Root> & {
    recordId: string;
    onSubmit?: (recordId: string) => Promise<unknown> | unknown;
    title?: React.ReactNode;
    description?: React.ReactNode;
  }
) => {
  return (
    <AlertDialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      defaultOpen={props.defaultOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => props.onSubmit?.(props.recordId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
