import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { Input } from "../../input";
import { useFieldContext } from "..";

export type FileFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
};

const FileField = (props: FileFieldProps) => {
	const field = useFieldContext<File | File[] | null>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				type="file"
				onBlur={field.handleBlur}
				onChange={(e) => {
					const files = e.target.files;
					if (files) {
						field.handleChange(
							files.length === 1 ? files[0] : Array.from(files),
						);
					}
				}}
				aria-invalid={isInvalid}
				placeholder="File field (TODO: implement)"
				disabled
			/>
			<FieldDescription>{props.description}</FieldDescription>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};

export default FileField;
