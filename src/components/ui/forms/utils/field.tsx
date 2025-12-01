import { Info, LucideIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../badge";
import {
	Field as BaseField,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldTitle,
} from "../../field";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";
import { useFieldContext } from "..";

export type FieldProps = React.ComponentProps<typeof BaseField> & {
	label?: React.ReactNode;
	title?: React.ReactNode;
	description?: React.ReactNode;
	tooltip?: React.ReactNode;
	tooltipIcon?: LucideIcon;
	contentProps?: React.ComponentProps<typeof FieldContent>;
	labelProps?: React.ComponentProps<typeof FieldLabel>;
	titleProps?: React.ComponentProps<typeof FieldTitle>;
	descriptionProps?: React.ComponentProps<typeof FieldDescription>;
	tooltipProps?: React.ComponentProps<typeof Tooltip>;
};

const Field = ({
	label,
	title,
	description,
	tooltip,
	tooltipIcon,
	contentProps,
	labelProps,
	titleProps,
	descriptionProps,
	tooltipProps,
	...props
}: FieldProps) => {
	const field = useFieldContext<any>();

	const isInvalid = !!field.state.meta.errorMap.onSubmit;

	return (
		<BaseField data-invalid={isInvalid} {...props}>
			{label && (
				<FieldLabel {...labelProps}>
					{label}{" "}
					{tooltip && (
						<Tooltip {...tooltipProps}>
							<TooltipTrigger>
								{tooltipIcon?.({ size: 14 }) || <Info size={14} />}
							</TooltipTrigger>
							<TooltipContent>{tooltip}</TooltipContent>
						</Tooltip>
					)}
				</FieldLabel>
			)}
			{title ? (
				<FieldContent {...contentProps}>
					<FieldTitle {...titleProps}>
						{title}
						<Tooltip {...tooltipProps}>
							{tooltip && (
								<TooltipTrigger>
									{tooltipIcon?.({ size: 14 }) || <Info size={14} />}
								</TooltipTrigger>
							)}
							<TooltipContent>{tooltip}</TooltipContent>
						</Tooltip>
					</FieldTitle>
					{props.children}
					{description && (
						<FieldDescription {...descriptionProps}>
							{description}
						</FieldDescription>
					)}
				</FieldContent>
			) : (
				<>
					{props.children}
					{description && (
						<FieldDescription {...descriptionProps}>
							{description}
						</FieldDescription>
					)}
				</>
			)}
			<FieldError>{field.state.meta.errorMap.onSubmit?.message}</FieldError>
		</BaseField>
	);
};

export default Field;
