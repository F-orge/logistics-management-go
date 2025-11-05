import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormDialog from "./utils/dialog";
import {
  BoolField,
  CheckboxGroupField,
  DateTimeField,
  EmailField,
  FileField,
  GeoPointField,
  JSONField,
  NumberField,
  RadioGroupField,
  RelationField,
  RichEditorField,
  SelectField,
  TextareaField,
  TextField,
  URLField,
} from "./fields";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    BoolField,
    CheckboxGroupField,
    DateTimeField,
    EmailField,
    FileField,
    GeoPointField,
    JSONField,
    NumberField,
    RadioGroupField,
    RelationField,
    RichEditorField,
    SelectField,
    TextField,
    TextareaField,
    URLField,
  },
  formComponents: { FormDialog },
});
