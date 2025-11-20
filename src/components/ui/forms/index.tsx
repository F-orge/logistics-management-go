import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
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
import ClearButton from "./utils/clear";
import FormDialog from "./utils/dialog";
import Field from "./utils/field";
import FieldSet from "./utils/fieldset";
import SubmitButton from "./utils/submit";

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
    Field,
  },
  formComponents: { FormDialog, SubmitButton, ClearButton, FieldSet },
});
