import { AutoFormFieldProps } from "@autoform/react";
import { MapPin } from "lucide-react";
import React from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import type { GeoPointFieldProps } from "./types";

interface GeoPointFieldComponentProps extends AutoFormFieldProps {
	fieldConfig?: GeoPointFieldProps;
}

const GeoPointField: React.FC<GeoPointFieldComponentProps> = ({
	id,
	inputProps,
	fieldConfig,
}) => {
	const { key, ...props } = inputProps;
	const {
		placeholder = "latitude,longitude (e.g., 40.7128,-74.0060)",
		iconSize = "size-4",
		formatHint,
	} = fieldConfig || {};

	return (
		<div className="flex flex-col gap-2">
			<InputGroup>
				<InputGroupAddon>
					<MapPin className={iconSize} />
				</InputGroupAddon>
				<InputGroupInput
					id={id}
					type="text"
					placeholder={placeholder}
					{...props}
				/>
			</InputGroup>
			{formatHint && (
				<p className="text-xs text-muted-foreground">{formatHint}</p>
			)}
		</div>
	);
};

export default GeoPointField;
