import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { Input } from "../../input";
import { useFieldContext } from "..";

export type NumberFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
} & React.ComponentProps<"input">;

const NumberField = (props: NumberFieldProps) => {
	const field = useFieldContext<number>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				type="number"
				value={field.state.value ?? ""}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(Number(e.target.value))}
				aria-invalid={isInvalid}
				{...props}
			/>
			<FieldDescription>{props.description}</FieldDescription>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};

export default NumberField;
