import React from "react";
import z from "zod";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import {
  FieldDescription,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../field";
import { useAppForm } from "../forms";
import AutoField from "./auto-field";
import AutoFieldSet from "./auto-fieldset";
import { FormSchema, toAutoFormFieldSet } from "./types";

export type AutoFormProps<Schema extends z.ZodObject> = React.ComponentProps<
  typeof Dialog
> &
  FormSchema & {
    title?: string;
    description?: string;
    defaultValues?: Partial<z.infer<Schema>>;
  } & {
    onSubmit: (data: z.infer<Schema>) => Promise<void> | void;
  };

const AutoForm = <Schema extends z.ZodObject>(props: AutoFormProps<Schema>) => {
  const {
    schema,
    form: formOptions,
    title,
    description,
    ...dialogProps
  } = props;

  const form = useAppForm({
    defaultValues: props.defaultValues as z.infer<typeof props.schema>,
    validators: {
      onSubmitAsync: props.schema,
    },
    onSubmit: ({ value }) => props.onSubmit(value as z.infer<Schema>),
  });

  return (
    <Dialog {...dialogProps}>
      <DialogContent className="max-h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <form
          {...formOptions?.props}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            {
              <AutoFieldSet
                form={form as any}
                {...toAutoFormFieldSet(schema)}
              />
            }
            {/* {formOptions?.fieldsets.map((fieldset, index) => (
              <AutoFieldSet
                // todo: fix any
                form={form as any}
                key={index}
                {...fieldset}
              />
            ))} */}
          </form.AppForm>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AutoForm;
