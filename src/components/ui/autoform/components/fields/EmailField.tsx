import { AutoFormFieldProps } from "@autoform/react";
import { Mail } from "lucide-react";
import React from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import type { EmailFieldProps } from "./types";

interface EmailFieldComponentProps extends AutoFormFieldProps {
	fieldConfig?: EmailFieldProps;
}

const EmailField: React.FC<AutoFormFieldProps & EmailFieldComponentProps> = ({
	id,
	inputProps,
	fieldConfig,
	field,
}) => {
	const { key, ...props } = inputProps;
	const { placeholder = "name@example.com", iconSize = "size-4" } =
		fieldConfig || {};

	return (
		<InputGroup>
			<InputGroupInput
				id={id}
				type="email"
				placeholder={placeholder}
				{...props}
			/>
			<InputGroupAddon align="inline-end">
				<Mail className={iconSize} />
			</InputGroupAddon>
		</InputGroup>
	);
};

export default EmailField;
