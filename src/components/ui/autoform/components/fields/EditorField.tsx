import { AutoFormFieldProps } from "@autoform/react";
import React from "react";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import type { EditorFieldProps } from "./types";

interface EditorFieldComponentProps extends AutoFormFieldProps {
	fieldConfig?: EditorFieldProps;
}

const EditorField: React.FC<EditorFieldComponentProps> = ({
	id,
	inputProps,
	fieldConfig,
}) => {
	const { key, ...props } = inputProps;
	const {
		placeholder = "Enter your text here...",
		rows = 5,
		minHeight,
		resizable = false,
	} = fieldConfig || {};

	return (
		<InputGroup>
			<InputGroupTextarea
				id={id}
				placeholder={placeholder}
				className={`${resizable ? "" : "resize-none"} ${minHeight || ""}`}
				rows={rows}
				{...props}
			/>
		</InputGroup>
	);
};

export default EditorField;
