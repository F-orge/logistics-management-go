import { AutoFormFieldProps } from "@autoform/react";
import { X } from "lucide-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";
import type { FileFieldProps } from "./types";

const FileField: React.FC<AutoFormFieldProps> = ({ id, inputProps, field }) => {
	const { key, ...props } = inputProps as React.ComponentProps<"input">;
	const inputRef = useRef<HTMLInputElement>(null);
	const { register } = useForm();

	// const {
	//   uploadText = "Click to select a file",
	//   uploadHint = "or drag and drop",
	//   iconSize = "size-6",
	//   accept,
	//   showImagePreview = true,
	//   previewSize = "size-16",
	//   description = "Image preview",
	// } = (field.fieldConfig?.customData as FileFieldProps) || {};

	return (
		<div className="space-y-3">
			<input type="file" {...props} />
		</div>
	);
};

export default FileField;
