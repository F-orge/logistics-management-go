import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import type { FieldsetGroup, Group } from "../types";
import { NestedFieldsetWrapper } from "../wrappers/nested-fieldset-wrapper";
import { renderFieldComponent } from "./field-type-renderer";

export interface ArrayFieldsetRendererProps {
	field: any;
	fieldConfig: Group;
	form: any;
}

/**
 * Renders array fields with nested fieldset structure
 * Each array item contains multiple sub-fields arranged in a fieldset
 */
export const ArrayFieldsetRenderer: React.FC<ArrayFieldsetRendererProps> = ({
	field,
	fieldConfig,
	form,
}) => {
	const values = (field.state.value as any[]) || [];
	const config = fieldConfig as FieldsetGroup;

	return (
		<>
			{values.map((_, index) => {
				const itemComponents: React.ReactNode[] = [];

				for (const subField of config.groups || []) {
					if (subField.type === "field") {
						const fieldName = `${fieldConfig.name}[${index}].${subField.name}`;

						const component = (
							<form.AppField key={fieldName} name={fieldName}>
								{(f: any) => (
									<Field data-invalid={f.state.meta.errors?.length}>
										<FieldLabel>{subField.label}</FieldLabel>
										{renderFieldComponent({
											field: f,
											inputType: subField.inputType || "text",
											props: subField.props || {},
										})}
										<FieldDescription>{subField.description}</FieldDescription>
										<FieldError errors={f.state.meta.errors} />
									</Field>
								)}
							</form.AppField>
						);

						itemComponents.push(component);
					}
				}

				return (
					<NestedFieldsetWrapper
						key={index}
						index={index}
						onRemove={() => field.removeValue(index)}
						fieldConfig={config}
					>
						{itemComponents}
					</NestedFieldsetWrapper>
				);
			})}
		</>
	);
};
