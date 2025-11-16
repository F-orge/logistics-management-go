import { Trash } from "lucide-react";
import React from "react";
import { Button } from "../../button";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "../../field";

export interface ArrayItemWrapperProps {
	label: string;
	index: number;
	description?: string;
	errors?: any[];
	onRemove: () => void;
	children: React.ReactNode;
}

/**
 * Wrapper for array field items with delete button
 * Renders field in horizontal layout with inline delete button
 * Uses shadcn field component structure with horizontal orientation
 */
export const ArrayItemWrapper: React.FC<ArrayItemWrapperProps> = ({
	label,
	index,
	description,
	errors,
	onRemove,
	children,
}) => {
	const hasErrors = errors && errors.length > 0;

	return (
		<Field data-invalid={hasErrors ? "true" : "false"}>
			<FieldContent>
				<FieldLabel>
					{label} #{index + 1}
				</FieldLabel>
				{(description || hasErrors) && (
					<>
						{description && <FieldDescription>{description}</FieldDescription>}
						{hasErrors && <FieldError errors={errors} />}
					</>
				)}
			</FieldContent>
			<div className="flex items-center gap-2">
				{children}
				<Button
					type="button"
					variant="destructive"
					size="icon-sm"
					onClick={onRemove}
				>
					<Trash />
				</Button>
			</div>
		</Field>
	);
};
