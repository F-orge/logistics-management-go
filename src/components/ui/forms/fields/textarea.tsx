import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { Textarea as TextareaComponent } from "../../textarea";
import { useFieldContext } from "..";

export type TextareaFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
} & React.ComponentProps<"textarea">;

const TextareaField = (props: TextareaFieldProps) => {
	const field = useFieldContext<string>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
			<TextareaComponent
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
				{...props}
			/>
			<FieldDescription>{props.description}</FieldDescription>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};

export default TextareaField;
