import type React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "..";

export type InputFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
};

const InputField = (props: React.ComponentProps<"input"> & InputFieldProps) => {
	const field = useFieldContext<string>();

	return (
		<Field>
			{props.description ? (
				<FieldContent>
					<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
					<Input
						name={field.name}
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={(_) => field.handleBlur()}
					/>
					<FieldDescription>{props.description}</FieldDescription>
				</FieldContent>
			) : (
				<>
					<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
					<Input
						{...props}
						name={field.name}
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={(_) => field.handleBlur()}
					/>
				</>
			)}
			<FieldError errors={field.state.meta.errors} />
		</Field>
	);
};

export default InputField;
