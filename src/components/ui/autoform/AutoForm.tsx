import {
  AutoFormUIComponents,
  AutoForm as BaseAutoForm,
} from "@autoform/react";
import { Form } from "./components/Form";
import { BooleanField } from "./components/fields/BooleanField";
import { DateField } from "./components/fields/DateField";
import { NumberField } from "./components/fields/NumberField";
import { SelectField } from "./components/fields/SelectField";
import { StringField } from "./components/fields/StringField";
import { ArrayElementWrapper } from "./components/helpers/ArrayElementWrapper";
import { ArrayWrapper } from "./components/helpers/ArrayWrapper";
import { ErrorMessage } from "./components/helpers/ErrorMessage";
import { FieldWrapper } from "./components/helpers/FieldWrapper";
import { ObjectWrapper } from "./components/helpers/ObjectWrapper";
import { SubmitButton } from "./components/helpers/SubmitButton";
import { AutoFormProps } from "./types";

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

export function AutoForm<T extends Record<string, any>>({
  uiComponents,
  formComponents,
  ...props
}: AutoFormProps<T>) {
  return (
    <BaseAutoForm
      {...props}
      uiComponents={{ ...ShadcnUIComponents, ...uiComponents }}
      formComponents={{ ...ShadcnAutoFormFieldComponents, ...formComponents }}
    />
  );
}
