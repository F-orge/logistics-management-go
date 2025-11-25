import React from "react";
import { Button } from "../button";
import { Field, FieldLabel } from "../field";
import { withForm } from "../forms";
import { ArrayFieldsetRenderer } from "./renderers/array-fieldset-renderer";
import { ArraySimpleRenderer } from "./renderers/array-simple-renderer";
import { renderFieldComponent } from "./renderers/field-type-renderer";
import { FieldGroup, FieldsetGroup, Group } from "./types";
import { SingleFieldWrapper } from "./wrappers/single-field-wrapper";

export type AutoFieldProps = {
	fieldGroupConfig?: FieldGroup;
	fieldSetGroup?: FieldsetGroup;
};

const AutoField = withForm({
	props: {} as AutoFieldProps,
	render: ({ form, fieldGroupConfig, fieldSetGroup }) => {
		// Handle fieldGroupConfig (single fields and simple arrays)
		if (fieldGroupConfig) {
			// Handle array fields (simple repeating fields)
			if (fieldGroupConfig.isArray) {
				return (
					<form.AppField name={fieldGroupConfig.name!} mode="array">
						{(field) => {
							const arrayContent = (
								<ArraySimpleRenderer
									field={field}
									fieldConfig={fieldGroupConfig}
									form={form}
								/>
							);

							return (
								<Field>
									<FieldLabel>{fieldGroupConfig.label}</FieldLabel>
									{arrayContent}
									<Button
										type="button"
										className="mb-4"
										onClick={() => {
											field.pushValue(
												fieldGroupConfig.arrayConfig?.defaultItem?.() as never,
											);
										}}
									>
										{fieldGroupConfig.arrayConfig?.addLabel || "Add Item"}
									</Button>
								</Field>
							);
						}}
					</form.AppField>
				);
			}

			// Handle single (non-array) fields
			return (
				<form.AppField name={fieldGroupConfig.name!}>
					{(field) => (
						<SingleFieldWrapper
							label={fieldGroupConfig.label}
							description={fieldGroupConfig.description}
							errors={field.state.meta.errors}
							orientation={fieldGroupConfig.orientation}
						>
							{renderFieldComponent({
								field,
								inputType: fieldGroupConfig.inputType || "text",
								props: fieldGroupConfig.props || {},
							})}
						</SingleFieldWrapper>
					)}
				</form.AppField>
			);
		}

		// Handle fieldSetGroup (nested fieldsets)
		if (fieldSetGroup) {
			// Handle array fieldsets
			if (fieldSetGroup.isArray) {
				return (
					<form.AppField name={fieldSetGroup.name!} mode="array">
						{(field) => {
							return (
								<Field>
									<FieldLabel>{fieldSetGroup.label}</FieldLabel>
									<ArrayFieldsetRenderer
										field={field}
										fieldConfig={fieldSetGroup}
										form={form}
									/>
									<Button
										type="button"
										className="mb-4"
										onClick={() => {
											field.pushValue(
												fieldSetGroup.arrayConfig?.defaultItem?.() as never,
											);
										}}
									>
										{fieldSetGroup.arrayConfig?.addLabel || "Add Item"}
									</Button>
								</Field>
							);
						}}
					</form.AppField>
				);
			}
		}

		return null;
	},
});

export default AutoField;
