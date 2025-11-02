import type React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useFieldContext } from "..";

export type SliderFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
	min?: number;
	max?: number;
	step?: number;
};

const SliderField = (
	props: React.ComponentProps<"input"> & SliderFieldProps,
) => {
	const field = useFieldContext<number[]>();

	return (
		<Field>
			{props.description ? (
				<FieldContent>
					<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
					<Slider
						value={field.state.value}
						onValueChange={(e) => field.handleChange(e)}
						max={props.max}
						min={props.min}
						step={props.step}
						className={props.className}
					/>
					<FieldDescription>{props.description}</FieldDescription>
				</FieldContent>
			) : (
				<>
					<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
					<Slider
						value={field.state.value}
						onValueChange={(e) => field.handleChange(e)}
						max={props.max}
						min={props.min}
						step={props.step}
						className={props.className}
					/>
				</>
			)}
			<FieldError errors={field.state.meta.errors} />
		</Field>
	);
};

export default SliderField;
