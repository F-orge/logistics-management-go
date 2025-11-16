import { Trash } from "lucide-react";
import React from "react";
import { Button } from "../../button";
import {
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "../../field";
import type { FieldsetGroup } from "../types";

export interface NestedFieldsetWrapperProps {
	index: number;
	errors?: any[];
	onRemove: () => void;
	children: React.ReactNode;
	fieldConfig?: FieldsetGroup;
}

/**
 * Wrapper for nested fieldset array items
 * Renders array of fields in semantic fieldset structure
 * Uses shadcn FieldSet/FieldGroup components for proper nesting
 */
export const NestedFieldsetWrapper: React.FC<NestedFieldsetWrapperProps> = ({
	index,
	errors,
	onRemove,
	children,
	fieldConfig,
}) => {
	const legend = fieldConfig?.label || `Item ${index + 1}`;
	const description = fieldConfig?.description;

	return (
		<FieldSet className="border rounded-md p-4">
			<FieldLegend variant="label">
				{legend} {index + 1}
			</FieldLegend>
			{description && <FieldDescription>{description}</FieldDescription>}
			{errors && errors.length > 0 && (
				<FieldDescription className="text-destructive">
					Errors present
				</FieldDescription>
			)}
			<FieldGroup>{children}</FieldGroup>
			<div className="flex justify-end pt-2">
				<Button
					type="button"
					variant="destructive"
					size="icon-sm"
					onClick={onRemove}
				>
					<Trash />
				</Button>
			</div>
		</FieldSet>
	);
};
