import { FieldApi } from "@tanstack/react-form";
import { Trash } from "lucide-react";
import React from "react";
import { Button } from "../button";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import { withForm } from "../forms";
import {
  BoolFieldProps,
  CheckboxGroupFieldProps,
  DateTimeFieldProps,
  EmailFieldProps,
  FileFieldProps,
  GeoPointFieldProps,
  JSONFieldProps,
  NumberFieldProps,
  RadioGroupFieldProps,
  RelationFieldProps,
  RichEditorFieldProps,
  SelectFieldProps,
  TextareaFieldProps,
  TextFieldProps,
  URLFieldProps,
} from "../forms/fields";
import { Item, ItemGroup, ItemSeparator } from "../item";
import { Group } from "./types";

export type AutoFieldProps = {
  fieldConfig: Group;
};

const AutoField = withForm({
  props: {} as AutoFieldProps,
  render: ({ form, fieldConfig }) => {
    if (fieldConfig.isArray) {
      return (
        <form.AppField name={fieldConfig.name!} mode="array">
          {(field) => {
            const components: React.ReactNode[] = [];
            const values = (field.state.value as any[]) || [];

            if (fieldConfig.type === "fieldset") {
              values.forEach((itemValue, index) => {
                const itemComponents: React.ReactNode[] = [];

                for (const subField of fieldConfig.groups || []) {
                  if (subField.type === "field") {
                    const fieldName = `${fieldConfig.name}[${index}].${subField.name}`;

                    let component: React.ReactNode;

                    switch (subField.inputType) {
                      case "text":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.TextField
                                  {...(subField.props as TextFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "email":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.EmailField
                                  {...(subField.props as EmailFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "url":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.URLField
                                  {...(subField.props as URLFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "number":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.NumberField
                                  {...(subField.props as NumberFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "date":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.DateTimeField
                                  {...(subField.props as DateTimeFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "select":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.SelectField
                                  {...(subField.props as SelectFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "bool":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.BoolField
                                  {...(subField.props as BoolFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "checkboxGroup":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.CheckboxGroupField
                                  {...(subField.props as CheckboxGroupFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "radioGroup":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.RadioGroupField
                                  {...(subField.props as RadioGroupFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "textarea":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.TextareaField
                                  {...(subField.props as TextareaFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "file":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.FileField
                                  {...(subField.props as FileFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "json":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.JSONField
                                  {...(subField.props as JSONFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "geoPoint":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.GeoPointField
                                  {...(subField.props as GeoPointFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "richEditor":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.RichEditorField
                                  {...(subField.props as RichEditorFieldProps)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      case "relation":
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.RelationField
                                  {...(subField.props as RelationFieldProps<any>)}
                                />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                        break;
                      default:
                        component = (
                          <form.AppField key={fieldName} name={fieldName}>
                            {(f) => (
                              <Field data-invalid={f.state.meta.errors?.length}>
                                <FieldLabel>{subField.label}</FieldLabel>
                                <f.TextField />
                                <FieldDescription>
                                  {subField.description}
                                </FieldDescription>
                                <FieldError errors={f.state.meta.errors} />
                              </Field>
                            )}
                          </form.AppField>
                        );
                    }

                    itemComponents.push(component);
                  }
                }

                components.push(
                  <Field
                    key={index}
                    className="flex-col gap-4 border rounded p-3"
                  >
                    <div className="flex flex-col gap-4">{itemComponents}</div>
                    <Field
                      orientation="horizontal"
                      className="gap-2 justify-end"
                    >
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => field.removeValue(index)}
                      >
                        <Trash />
                      </Button>
                    </Field>
                  </Field>
                );
              });
            }

            if (fieldConfig.type === "field") {
              values.forEach((_, index) => {
                const fieldName = `${fieldConfig.name}[${index}]`;

                let component: React.ReactNode;

                switch (fieldConfig.inputType) {
                  case "text":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.TextField
                                {...(fieldConfig.props as TextFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "email":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.EmailField
                                {...(fieldConfig.props as EmailFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "url":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.URLField
                                {...(fieldConfig.props as URLFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "number":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.NumberField
                                {...(fieldConfig.props as NumberFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "date":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.DateTimeField
                                {...(fieldConfig.props as DateTimeFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "select":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.SelectField
                                {...(fieldConfig.props as SelectFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "bool":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.BoolField
                                {...(fieldConfig.props as BoolFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "checkboxGroup":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.CheckboxGroupField
                                {...(fieldConfig.props as CheckboxGroupFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "radioGroup":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.RadioGroupField
                                {...(fieldConfig.props as RadioGroupFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "textarea":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.TextareaField
                                {...(fieldConfig.props as TextareaFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "file":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.FileField
                                {...(fieldConfig.props as FileFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "json":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.JSONField
                                {...(fieldConfig.props as JSONFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "geoPoint":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.GeoPointField
                                {...(fieldConfig.props as GeoPointFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "richEditor":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.RichEditorField
                                {...(fieldConfig.props as RichEditorFieldProps)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  case "relation":
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.RelationField
                                {...(fieldConfig.props as RelationFieldProps<any>)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                    break;
                  default:
                    component = (
                      <form.AppField key={fieldName} name={fieldName}>
                        {(f) => (
                          <Field data-invalid={f.state.meta.errors?.length}>
                            <FieldLabel>
                              {fieldConfig.label} #{index + 1}
                            </FieldLabel>
                            <div className="flex flex-row items-center gap-2.5">
                              <f.TextField />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon-sm"
                                onClick={() => field.removeValue(index)}
                              >
                                <Trash />
                              </Button>
                            </div>
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                          </Field>
                        )}
                      </form.AppField>
                    );
                }

                components.push(
                  <>
                    <Item variant={"muted"}>{component}</Item>
                    <ItemSeparator />
                  </>
                );
              });
            }

            return (
              <Field>
                <FieldLabel>{fieldConfig.label}</FieldLabel>
                <ItemGroup>{components}</ItemGroup>
                <Button
                  type="button"
                  className="mb-4"
                  onClick={() => {
                    field.pushValue(
                      fieldConfig.arrayConfig?.defaultItem?.() as never
                    );
                  }}
                >
                  {fieldConfig.arrayConfig?.addLabel || "Add Item"}
                </Button>
              </Field>
            );
          }}
        </form.AppField>
      );
    }

    return (
      <form.AppField name={fieldConfig.name!}>
        {(field) => {
          let Component: React.ReactNode;

          if (fieldConfig.type !== "field") {
            return <div>Unsupported field type</div>;
          }

          switch (fieldConfig.inputType) {
            case "text":
              Component = (
                <field.TextField {...(fieldConfig.props as TextFieldProps)} />
              );
              break;
            case "email":
              Component = (
                <field.EmailField {...(fieldConfig.props as EmailFieldProps)} />
              );
              break;
            case "url":
              Component = (
                <field.URLField {...(fieldConfig.props as URLFieldProps)} />
              );
              break;
            case "number":
              Component = (
                <field.NumberField
                  {...(fieldConfig.props as NumberFieldProps)}
                />
              );
              break;
            case "date":
              Component = (
                <field.DateTimeField
                  {...(fieldConfig.props as DateTimeFieldProps)}
                />
              );
              break;
            case "select":
              Component = (
                <field.SelectField
                  {...(fieldConfig.props as SelectFieldProps)}
                />
              );
              break;
            case "bool":
              Component = (
                <field.BoolField {...(fieldConfig.props as BoolFieldProps)} />
              );
              break;
            case "checkboxGroup":
              Component = (
                <field.CheckboxGroupField
                  {...(fieldConfig.props as CheckboxGroupFieldProps)}
                />
              );
              break;
            case "radioGroup":
              Component = (
                <field.RadioGroupField
                  {...(fieldConfig.props as RadioGroupFieldProps)}
                />
              );
              break;
            case "textarea":
              Component = (
                <field.TextareaField
                  {...(fieldConfig.props as TextareaFieldProps)}
                />
              );
              break;
            case "file":
              Component = (
                <field.FileField {...(fieldConfig.props as FileFieldProps)} />
              );
              break;
            case "json":
              Component = (
                <field.JSONField {...(fieldConfig.props as JSONFieldProps)} />
              );
              break;
            case "geoPoint":
              Component = (
                <field.GeoPointField
                  {...(fieldConfig.props as GeoPointFieldProps)}
                />
              );
              break;
            case "richEditor":
              Component = (
                <field.RichEditorField
                  {...(fieldConfig.props as RichEditorFieldProps)}
                />
              );
              break;
            case "relation":
              Component = (
                <field.RelationField
                  {...(fieldConfig.props as RelationFieldProps<any>)}
                />
              );
              break;
            default:
              Component = <field.TextField />;
          }

          return (
            <Field data-invalid={field.state.meta.errors}>
              <FieldLabel>{fieldConfig.label}</FieldLabel>
              {Component}
              <FieldDescription>{fieldConfig.description}</FieldDescription>
              <FieldError errors={field.state.meta.errors} />
            </Field>
          );
        }}
      </form.AppField>
    );
  },
});

export default AutoField;
