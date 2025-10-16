import * as DialogPrimitive from "@radix-ui/react-dialog";
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
