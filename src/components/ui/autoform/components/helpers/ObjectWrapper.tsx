import { ObjectWrapperProps } from "@autoform/react";
import React from "react";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
	label,
	children,
}) => {
	return (
		<FieldSet>
			<FieldLegend variant="label">{label}</FieldLegend>
			<FieldGroup>{children}</FieldGroup>
		</FieldSet>
	);
};
