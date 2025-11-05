import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { Input } from "../../input";
import { useFieldContext } from "..";

export type RelationFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
};

const RelationField = (props: RelationFieldProps) => {
	const field = useFieldContext<string>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				placeholder="Relation field (TODO: implement)"
				aria-invalid={isInvalid}
				disabled
			/>
			<FieldDescription>{props.description}</FieldDescription>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};

export default RelationField;
