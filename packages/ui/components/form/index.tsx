import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import CheckBoxField from "./fields/checkbox-field";
import ChoiceCardField from "./fields/choice-card-field";
import InputField from "./fields/input-field";
import RadioField from "./fields/radio-field";
import SelectField from "./fields/select-field";
import SliderField from "./fields/slider-field";
import SwitchField from "./fields/switch-field";
import TextAreaField from "./fields/textarea-field";
import { AsyncSelectField } from "./fields/async-select-field";
import FileField from "./fields/file-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    CheckBoxField,
    ChoiceCardField,
    InputField,
    RadioField,
    SelectField,
    SliderField,
    SwitchField,
    TextAreaField,
    AsyncSelectField,
    FileField,
  },
  formComponents: {},
});
