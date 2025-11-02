import type React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
} from "@/components/ui/field";
import { useFieldContext } from "..";

export type CheckBoxFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
	orientation?: "vertical" | "horizontal" | "responsive";
};

const CheckBoxField = (
	props: React.ComponentProps<"input"> & CheckBoxFieldProps,
) => {
	const field = useFieldContext<boolean>();

	return (
		<Field orientation={props.orientation || "horizontal"}>
			<Checkbox
				name={field.name}
				checked={field.state.value}
				onCheckedChange={(e) => field.handleChange(Boolean(e.valueOf()))}
			/>
			<FieldContent>
				<FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">
					{props.label}
				</FieldLabel>
				<FieldDescription>{props.description}</FieldDescription>
			</FieldContent>
		</Field>
	);
};

export default CheckBoxField;
