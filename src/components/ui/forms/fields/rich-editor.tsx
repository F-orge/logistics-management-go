import type React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { Textarea as TextareaComponent } from "../../textarea";
import { useFieldContext } from "..";
import { TooltipFieldLabel } from "../utils/tooltip-field-label";

export type RichEditorFieldProps = {};

const RichEditorField = (props: RichEditorFieldProps) => {
	const field = useFieldContext<string>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<TextareaComponent
			id={field.name}
			name={field.name}
			value={field.state.value}
			onBlur={field.handleBlur}
			onChange={(e) => field.handleChange(e.target.value)}
			aria-invalid={isInvalid}
			placeholder="Rich editor field (TODO: implement)"
			disabled
		/>
	);
};

export default RichEditorField;
