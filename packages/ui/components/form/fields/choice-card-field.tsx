import type React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldContext } from "..";

export type ChoiceCardFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
	options: { title?: React.ReactNode; label: React.ReactNode; value: string }[];
};

const ChoiceCardField = (
	props: React.ComponentProps<"input"> & ChoiceCardFieldProps,
) => {
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
				<FieldLabel key={item.value} htmlFor={item.value}>
					<Field orientation="horizontal">
						<FieldContent>
							<FieldTitle>{item.title}</FieldTitle>
							<FieldDescription>{item.label}</FieldDescription>
						</FieldContent>
						<RadioGroupItem value={item.value} id={item.value} />
					</Field>
				</FieldLabel>
			))}
			<FieldError errors={field.state.meta.errors} />
		</RadioGroup>
	);
};

export default ChoiceCardField;
