import type React from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldContext } from "..";

export type RadioFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
	options: { label: React.ReactNode; value: string }[];
};

const RadioField = (props: React.ComponentProps<"input"> & RadioFieldProps) => {
	const field = useFieldContext<string>();

	return (
		<RadioGroup
			name={field.name}
			defaultValue={field.state.value}
			value={field.state.value}
			onValueChange={(e) => field.handleChange(e)}
			onBlur={(_) => field.handleBlur()}
		>
			{props.options.map((item) => (
				<Field key={item.value} orientation="horizontal">
					<RadioGroupItem value={field.state.value} id={field.name} />
					<FieldLabel htmlFor={field.name} className={props.className}>
						{item.label}
					</FieldLabel>
				</Field>
			))}
			<FieldError errors={field.state.meta.errors} />
		</RadioGroup>
	);
};

export default RadioField;
