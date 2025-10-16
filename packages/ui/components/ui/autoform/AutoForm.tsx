import React from "react";
import {
  AutoForm as BaseAutoForm,
  type AutoFormUIComponents,
} from "@autoform/react";
import type { AutoFormProps } from "./types";
import { Form } from "./components/Form";
import { FieldWrapper } from "./components/FieldWrapper";
import { ErrorMessage } from "./components/ErrorMessage";
import { SubmitButton } from "./components/SubmitButton";
import { StringField } from "./components/StringField";
import { NumberField } from "./components/NumberField";
import { BooleanField } from "./components/BooleanField";
import { DateField } from "./components/DateField";
import { SelectField } from "./components/SelectField";
import { ObjectWrapper } from "./components/ObjectWrapper";
import { ArrayWrapper } from "./components/ArrayWrapper";
import { ArrayElementWrapper } from "./components/ArrayElementWrapper";
import type { z, ZodObject } from "zod";
import { ZodProvider } from '@autoform/zod'

const ShadcnUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export const ShadcnAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;
export type FieldTypes = keyof typeof ShadcnAutoFormFieldComponents;

export function AutoForm<T extends ZodObject>(props:
    Omit<Parameters<typeof BaseAutoForm>[0],'schema' | 'onSubmit' | 'defaultValues' | 'values' | 'uiComponents' | 'formComponents'> & {
      schema:T,
      onSubmit?:(value:z.infer<T>) => Promise<unknown> | unknown
      defaultValues?:z.infer<T>
      values?:z.infer<T>
    }
  ) {
  return (
    <BaseAutoForm
      {...props}
      schema={new ZodProvider(props.schema)}
      onSubmit={props.onSubmit as any}
      values={props.values}
      defaultValues={props.defaultValues}
      uiComponents={{ ...ShadcnUIComponents, }}
      formComponents={{ ...ShadcnAutoFormFieldComponents, }}
    />
  );
}

