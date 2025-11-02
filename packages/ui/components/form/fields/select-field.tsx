import type React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "..";

export type SelectFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
	options: { label: React.ReactNode; value: string }[];
};

const SelectField = (
	props: React.ComponentProps<"input"> & SelectFieldProps,
) => {
	const field = useFieldContext<string>();

	return (
		<Field>
			{props.description ? (
				<FieldContent>
					<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
					<Select
						name={field.name}
						value={field.state.value}
						onValueChange={(v) => field.handleChange(v)}
					>
						<SelectTrigger>
							<SelectValue placeholder={props.placeholder} />
						</SelectTrigger>
						<SelectContent className={props.className}>
							{props.options.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldDescription>{props.description}</FieldDescription>
				</FieldContent>
			) : (
				<>
					<FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder={props.placeholder} />
						</SelectTrigger>
						<SelectContent className={props.className}>
							{props.options.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</>
			)}
			<FieldError errors={field.state.meta.errors} />
		</Field>
	);
};

export default SelectField;
