import { FieldApi } from "@tanstack/react-form";
import { Trash } from "lucide-react";
import React from "react";
import { Button } from "../button";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import { withForm } from "../forms";
import { SelectFieldProps } from "../forms/fields";
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
                                <f.TextField {...subField.props} />
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
                                <f.NumberField {...subField.props} />
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
                                <f.DateTimeField {...subField.props} />
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
              values.forEach((itemValue, index) => {
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
                              <f.TextField {...fieldConfig.props} />
                              <Button
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
                            <f.NumberField {...fieldConfig.props} />
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => field.removeValue(index)}
                            >
                              <Trash />
                            </Button>
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
                            <f.DateTimeField {...fieldConfig.props} />
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => field.removeValue(index)}
                            >
                              <Trash />
                            </Button>
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
                            <f.SelectField
                              {...(fieldConfig.props as SelectFieldProps)}
                            />
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => field.removeValue(index)}
                            >
                              <Trash />
                            </Button>
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
                            <f.TextField />
                            <FieldDescription>
                              {fieldConfig.description}
                            </FieldDescription>
                            <FieldError errors={f.state.meta.errors} />
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => field.removeValue(index)}
                            >
                              <Trash />
                            </Button>
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
              Component = <field.TextField {...fieldConfig.props} />;
              break;
            case "number":
              Component = <field.NumberField {...fieldConfig.props} />;
              break;
            case "date":
              Component = <field.DateTimeField {...fieldConfig.props} />;
              break;
            case "select":
              Component = (
                <field.SelectField
                  {...(fieldConfig.props as SelectFieldProps)}
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
