import React from "react";
import { Checkbox } from "../../checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { useFieldContext } from "..";

type CheckboxOption = { label: string; value: string };

export type CheckboxGroupFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
	options: CheckboxOption[];
};

const CheckboxGroupField = (props: CheckboxGroupFieldProps) => {
	const field = useFieldContext<string[]>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const handleToggle = (optionValue: string) => {
		const currentValue = field.state.value ?? [];
		const isChecked = currentValue.includes(optionValue);

		if (isChecked) {
			const index = currentValue.indexOf(optionValue);
			field.removeValue(index);
		} else {
			field.pushValue(optionValue);
		}
	};

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel>{props.label}</FieldLabel>
			<div className="space-y-2">
				{props.options.map((option) => (
					<div key={option.value} className="flex items-center gap-2">
						<Checkbox
							id={`${field.name}-${option.value}`}
							checked={(field.state.value ?? []).includes(option.value)}
							onCheckedChange={() => handleToggle(option.value)}
							aria-invalid={isInvalid}
						/>
						<label
							htmlFor={`${field.name}-${option.value}`}
							className="cursor-pointer text-sm"
						>
							{option.label}
						</label>
					</div>
				))}
			</div>
			<FieldDescription>{props.description}</FieldDescription>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};

export default CheckboxGroupField;
