import { AutoFormFieldProps } from "@autoform/react";
import React from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import type { URLFieldProps } from "./types";

interface URLFieldComponentProps extends AutoFormFieldProps {
	fieldConfig?: URLFieldProps;
}

const URLField: React.FC<URLFieldComponentProps> = ({
	id,
	inputProps,
	fieldConfig,
}) => {
	const { key, ...props } = inputProps;
	const {
		prefix = "https://",
		placeholder = "example.com",
		className = "pl-0.5!",
	} = fieldConfig || {};

	return (
		<InputGroup>
			<InputGroupAddon>
				<InputGroupText>{prefix}</InputGroupText>
			</InputGroupAddon>
			<InputGroupInput
				id={id}
				type="url"
				placeholder={placeholder}
				className={className}
				{...props}
			/>
		</InputGroup>
	);
};

export default URLField;
