import { FieldWrapperProps } from "@autoform/react";
import React from "react";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";

const DISABLED_LABELS = ["boolean", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
	label,
	children,
	id,
	field,
	error,
}) => {
	const isDisabled = DISABLED_LABELS.includes(field.type);

	return (
		<Field data-invalid={!!error}>
			{!isDisabled && (
				<FieldLabel htmlFor={id}>
					{label}
					{field.required && <span className="text-destructive"> *</span>}
				</FieldLabel>
			)}
			{children}
			{(field.fieldConfig?.description || error) && (
				<FieldContent>
					{field.fieldConfig?.description && (
						<FieldDescription>{field.fieldConfig.description}</FieldDescription>
					)}
					{error && <FieldError>{error}</FieldError>}
				</FieldContent>
			)}
		</Field>
	);
};
