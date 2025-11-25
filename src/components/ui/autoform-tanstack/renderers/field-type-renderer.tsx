import React from "react";
import {
	BoolFieldProps,
	CheckboxGroupFieldProps,
	DateTimeFieldProps,
	EmailFieldProps,
	FileFieldProps,
	GeoPointFieldProps,
	JSONFieldProps,
	NumberFieldProps,
	RadioGroupFieldProps,
	RelationFieldProps,
	RichEditorFieldProps,
	SelectFieldProps,
	TextareaFieldProps,
	TextFieldProps,
	URLFieldProps,
} from "../../forms/fields";

type FieldComponentProps =
	| TextFieldProps
	| EmailFieldProps
	| URLFieldProps
	| NumberFieldProps
	| DateTimeFieldProps
	| SelectFieldProps
	| BoolFieldProps
	| CheckboxGroupFieldProps
	| RadioGroupFieldProps
	| TextareaFieldProps
	| FileFieldProps
	| JSONFieldProps
	| GeoPointFieldProps
	| RichEditorFieldProps
	| RelationFieldProps<any>;

export type FieldRendererProps = {
	field: any;
	inputType: string;
	props: FieldComponentProps;
};

/**
 * Maps input type to corresponding field component
 * Returns the rendered field component based on the input type
 */
export const renderFieldComponent = ({
	field,
	inputType,
	props,
}: FieldRendererProps): React.ReactNode => {
	switch (inputType) {
		case "text":
			return <field.TextField {...(props as TextFieldProps)} />;

		case "email":
			return <field.EmailField {...(props as EmailFieldProps)} />;

		case "url":
			return <field.URLField {...(props as URLFieldProps)} />;

		case "number":
			return <field.NumberField {...(props as NumberFieldProps)} />;

		case "date":
			return <field.DateTimeField {...(props as DateTimeFieldProps)} />;

		case "select":
			return <field.SelectField {...(props as SelectFieldProps)} />;

		case "bool":
			return <field.BoolField {...(props as BoolFieldProps)} />;

		case "checkboxGroup":
			return (
				<field.CheckboxGroupField {...(props as CheckboxGroupFieldProps)} />
			);

		case "radioGroup":
			return <field.RadioGroupField {...(props as RadioGroupFieldProps)} />;

		case "textarea":
			return <field.TextareaField {...(props as TextareaFieldProps)} />;

		case "file":
			return <field.FileField {...(props as FileFieldProps)} />;

		case "json":
			return <field.JSONField {...(props as JSONFieldProps)} />;

		case "geoPoint":
			return <field.GeoPointField {...(props as GeoPointFieldProps)} />;

		case "richEditor":
			return <field.RichEditorField {...(props as RichEditorFieldProps)} />;

		case "relation":
			return <field.RelationField {...(props as RelationFieldProps<any>)} />;

		default:
			return <field.TextField />;
	}
};
