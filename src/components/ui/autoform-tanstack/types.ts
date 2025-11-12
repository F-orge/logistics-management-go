/**
 * Form Schema Types
 * Type definitions for the form schema structure used in AutoForm TanStack
 * Uses generics for flexible field value and data types
 */

import React from "react";
import { type ZodType, z } from "zod";
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
} from "../forms/fields";

export const fieldRegistry = z.registry<Group>();

export const fieldSetRegistry =
	z.registry<Omit<FieldSet<z.ZodObject>, "groups">>();

/**
 * Input field types supported by the form
 */
export type InputType = {
	text: TextFieldProps;
	number: NumberFieldProps;
	boolean: CheckboxGroupFieldProps;
	date: DateTimeFieldProps;
	select: SelectFieldProps;
	email: EmailFieldProps;
	url: URLFieldProps;
	textarea: TextareaFieldProps;
	bool: BoolFieldProps;
	checkboxGroup: CheckboxGroupFieldProps;
	radioGroup: RadioGroupFieldProps;
	file: FileFieldProps;
	json: JSONFieldProps;
	geoPoint: GeoPointFieldProps;
	richEditor: RichEditorFieldProps;
	relation: RelationFieldProps<any>;
};

/**
 * Field type - either a single field or a nested fieldset
 */
export type FieldType = "field" | "fieldset";

/**
 * Field layout orientation
 */
export type Orientation = "vertical" | "horizontal" | "responsive";

/**
 * Separator configuration
 */
export type Separator = boolean | string;

/**
 * Generic validation rules for a field
 * TValue: The type of value being validated
 * Uses Zod for runtime validation
 */
export type ValidationRules<TValue = unknown> = ZodType<TValue>;

/**
 * Error state - can be a single string or multiple error objects
 */
export type FieldError = string | FieldErrorObject[];

/**
 * Error object for multiple error states
 */
export interface FieldErrorObject {
	message: string;
	code?: string;
	[key: string]: unknown;
}

/**
 * Generic array configuration for repeating fields or fieldsets
 * TItem: The type of items in the array
 */
export interface ArrayConfig<TItem = unknown> {
	/**
	 * Minimum number of items in the array (required items)
	 */
	minItems?: number;

	/**
	 * Maximum number of items in the array (null for unlimited)
	 */
	maxItems?: number | null;

	/**
	 * Label for add button
	 */
	addLabel?: string;

	/**
	 * Label for remove button
	 */
	removeLabel?: string;

	/**
	 * Default item factory function for creating new array items
	 */
	defaultItem?: () => TItem;
}

/**
 * Base group properties shared between field and fieldset
 * TValue: The type of value this group produces
 * TInputType: The input type this group is associated with
 */
export interface BaseGroup<
	TValue = unknown,
	TInputType extends keyof InputType = keyof InputType,
> {
	/**
	 * Unique identifier for the field/fieldset
	 * Must be kebab-case or snake_case
	 */
	id: string;

	/**
	 * Form field name (falls back to id if not provided)
	 */
	name?: string;

	/**
	 * Label text for the field/fieldset
	 */
	label?: string;

	/**
	 * Helper text for field/fieldset
	 */
	description?: string;

	/**
	 * Whether this field is required
	 */
	required?: boolean;

	/**
	 * Whether this field/fieldset can have multiple instances
	 */
	isArray?: boolean;

	/**
	 * State and error message(s)
	 */
	error?: FieldError;

	/**
	 * Field-level props typed by InputType
	 */
	props?: InputType[TInputType];

	/**
	 * Separator after this group
	 */
	separator?: Separator;
}

/**
 * Generic field group - a single input control
 * TInputType: The type of input component
 * TValue: The type of value this field produces (inferred from TInputType)
 * TArrayItem: The type of items when isArray is true
 */
export interface FieldGroup<
	TInputType extends keyof InputType = keyof InputType,
	TValue = TInputType extends keyof InputType ? InputType[TInputType] : unknown,
	TArrayItem = TValue,
> extends BaseGroup<TValue, TInputType> {
	/**
	 * Type must be "field"
	 */
	type: "field";

	/**
	 * Specific input component type
	 */
	inputType?: TInputType;

	/**
	 * Field layout orientation
	 */
	orientation?: Orientation;

	/**
	 * Validation rules specific to the value type
	 */
	validation?: ValidationRules<TValue>;

	/**
	 * Array configuration (when isArray: true)
	 */
	arrayConfig?: ArrayConfig<TArrayItem>;

	/**
	 * Default value for the field
	 */
	defaultValue?: TValue;
}

/**
 * Generic fieldset group - a container for nested fields
 * TValue: The type of value this fieldset produces (usually an object)
 * TInputType: The default input type for props
 * TArrayItem: The type of items when isArray is true
 */
export interface FieldsetGroup<
	TValue extends Record<string, unknown> = Record<string, unknown>,
	TInputType extends keyof InputType = keyof InputType,
	TArrayItem = TValue,
> extends BaseGroup<TValue, TInputType> {
	/**
	 * Type must be "fieldset"
	 */
	type: "fieldset";

	/**
	 * Nested groups (required if type: "fieldset")
	 * Groups should map to keys in TValue
	 */
	groups: Group[];

	/**
	 * Maximum nesting depth for this fieldset and its children
	 * @default 5
	 * @max 10
	 */
	maxDepth?: number;

	/**
	 * Array configuration (when isArray: true)
	 */
	arrayConfig?: ArrayConfig<TArrayItem>;

	/**
	 * Default value for the fieldset
	 */
	defaultValue?: TValue;
}

/**
 * Union type for both field and fieldset groups
 */
export type Group = FieldGroup | FieldsetGroup;

/**
 * Generic FieldSet represents a semantic grouping of related fields
 * TValues: Record of field names to their value types
 */
export interface FieldSet<TValues extends z.ZodObject> {
	/**
	 * Semantic title for the fieldset
	 */
	legend?: string;

	/**
	 * Helper text describing the entire fieldset
	 */
	description?: string;

	/**
	 * Array of field or fieldset groups
	 */
	groups: Group[];

	/**
	 * Separator after this fieldset
	 */
	separator?: Separator;
}

/**
 * Generic form-level configuration and structure
 * TFormSchema: The Zod schema for form validation
 * TFormProps: The type of form-level props
 */
export interface FormConfig<
	TFormSchema extends z.ZodObject<any> = z.ZodObject<any>,
	TFormProps = React.ComponentProps<"form"> & {
		onSubmit: (data: z.infer<TFormSchema>) => Promise<void> | void;
	},
> {
	/**
	 * Form-level props (className, onSubmit handlers, etc.)
	 */
	props?: TFormProps;

	/**
	 * Array of FieldSet components
	 */
	fieldsets: FieldSet<TFormSchema>[];
}

/**
 * Root schema structure with generic support
 * TSchema: The Zod schema for validation
 * TFormProps: The type of form-level props
 */
export interface FormSchema<
	TSchema extends z.ZodObject<any> = z.ZodObject<any>,
	TFormProps = React.ComponentProps<"form">,
> {
	schema: TSchema;
	form?: FormConfig<TSchema, TFormProps>;
}

/**
 * Type guard to check if a group is a field
 */
export function isFieldGroup(group: Group): group is FieldGroup {
	return group.type === "field";
}

/**
 * Type guard to check if a group is a fieldset
 */
export function isFieldsetGroup(group: Group): group is FieldsetGroup {
	return group.type === "fieldset";
}

/**
 * Utility type to extract the value type from a FieldGroup
 * Example: type MyFieldValue = ExtractFieldValue<typeof myField>;
 */
export type ExtractFieldValue<T> = T extends FieldGroup<any, infer TValue, any>
	? TValue
	: never;

/**
 * Utility type to extract the value type from a FieldsetGroup
 * Example: type MyFieldsetValue = ExtractFieldsetValue<typeof myFieldset>;
 */
export type ExtractFieldsetValue<T> = T extends FieldsetGroup<
	infer TValue,
	any,
	any
>
	? TValue
	: never;

/**
 * Utility type to extract the complete form data type from a FormSchema
 * Example: type MyFormData = ExtractFormData<typeof mySchema>;
 */
export type ExtractFormData<T> = T extends FormSchema<infer TSchema, any>
	? z.infer<TSchema>
	: never;

/**
 * Utility type to make all properties of a form data type optional
 * Useful for partial form updates
 */
export type PartialFormData<T extends Record<string, unknown>> = Partial<T>;

/**
 * Utility type to make all properties of a form data type required
 * Useful for form submission validation
 */
export type RequiredFormData<T extends Record<string, unknown>> = Required<T>;

/**
 * Helper function to detect Zod primitive type and return appropriate input type
 */
const getInputTypeFromZodType = (zodDef: z.ZodUnknown): keyof InputType => {
	if (zodDef instanceof z.ZodEmail) {
		return "email";
	}

	if (zodDef instanceof z.ZodURL) {
		return "url";
	}

	if (zodDef instanceof z.ZodNumber) {
		return "number";
	}

	if (zodDef instanceof z.ZodBoolean) {
		return "bool";
	}

	if (zodDef instanceof z.ZodDate) {
		return "date";
	}

	if (zodDef instanceof z.ZodEnum) {
		return "select";
	}

	if (zodDef instanceof z.ZodRecord) {
		return "json";
	}

	if (zodDef instanceof z.ZodFile) {
		return "file";
	}

	// Default fallback
	return "text";
};

export const toAutoFormFieldSet = <T extends z.ZodObject>(
	schema: T,
): FieldSet<T> => {
	const fieldSetMetadata = fieldSetRegistry.get(schema);

	const groups: Group[] = [];

	for (const [name, def] of Object.entries(schema.shape)) {
		// Strip away ZodOptional wrapper to get the inner type
		let innerDef = def;
		if (def instanceof z.ZodOptional) {
			innerDef = (def as z.ZodOptional<any>).unwrap();
		}

		const fieldMetadata = fieldRegistry.get(def);

		if (fieldMetadata?.type === "fieldset") {
			const fieldsetMeta = fieldMetadata as FieldsetGroup;
			groups.push({
				id: name,
				type: "fieldset",
				label: fieldsetMeta.label,
				description: fieldsetMeta.description,
				required: fieldsetMeta.required,
				isArray: fieldsetMeta.isArray,
				error: fieldsetMeta.error,
				separator: fieldsetMeta.separator,
				arrayConfig: fieldsetMeta.arrayConfig,
				defaultValue: fieldsetMeta.defaultValue,
				maxDepth: fieldsetMeta.maxDepth,
				groups: toAutoFormFieldSet(innerDef as z.ZodObject).groups,
			});
		} else if (fieldMetadata?.type === "field") {
			const fieldMeta = fieldMetadata;
			groups.push({
				id: name,
				type: "field" as const,
				name,
				inputType: fieldMeta.inputType,
				label: fieldMeta.label || name,
				description: fieldMeta.description,
				required: fieldMeta.required,
				isArray: fieldMeta.isArray,
				error: fieldMeta.error,
				separator: fieldMeta.separator,
				orientation: fieldMeta.orientation,
				arrayConfig: fieldMeta.arrayConfig,
				defaultValue: fieldMeta.defaultValue,
				props: fieldMeta.props,
			} as FieldGroup);
		} else if (innerDef instanceof z.ZodObject) {
			// Handle unregistered fieldset (ZodObject)
			groups.push({
				id: name,
				name,
				type: "fieldset",
				label: undefined,
				description: undefined,
				required: false,
				isArray: false,
				groups: toAutoFormFieldSet(innerDef).groups,
				separator: true,
			});
		} else if (innerDef instanceof z.ZodArray) {
			// Handle array types - get the element type
			const arrayElementDef = (innerDef as z.ZodArray<any>).element;
			let elementInnerDef = arrayElementDef;

			// Strip away ZodOptional from array element if present
			if (elementInnerDef instanceof z.ZodOptional) {
				elementInnerDef = (elementInnerDef as z.ZodOptional<any>).unwrap();
			}

			if (elementInnerDef instanceof z.ZodObject) {
				// Array of objects (fieldset array)
				groups.push({
					id: name,
					name,
					type: "fieldset",
					label: undefined,
					description: undefined,
					required: false,
					isArray: true,
					groups: toAutoFormFieldSet(elementInnerDef).groups,
					arrayConfig: {
						minItems: 0,
						maxItems: null,
						addLabel: "Add item",
						removeLabel: "Remove",
					},
					separator: true,
				});
			} else {
				// Array of primitives (field array)
				const inputType = getInputTypeFromZodType(elementInnerDef);

				groups.push({
					id: name,
					type: "field" as const,
					name,
					inputType,
					label: name
						.toLowerCase()
						.split(" ")
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(" "),
					description: undefined,
					required: false,
					isArray: true,
					arrayConfig: {
						minItems: 0,
						maxItems: null,
						addLabel: "Add item",
						removeLabel: "Remove",
					},
				} as FieldGroup);
			}
		} else {
			// Handle unregistered field - detect Zod type and create appropriate field
			const inputType = getInputTypeFromZodType(innerDef);

			if (inputType === "select") {
				// get the enum variants
				const variants = Object.entries((innerDef as z.ZodEnum).enum).map(
					([key, val]) => ({ label: key, value: val.toString() }),
				);

				groups.push({
					id: name,
					type: "field" as const,
					name,
					inputType: "select",
					label: name
						.toLowerCase()
						.split(" ")
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(" "),
					description: undefined,
					required: false,
					isArray: false,
					props: { options: variants },
				});

				continue;
			}

			groups.push({
				id: name,
				type: "field" as const,
				name,
				inputType,
				label: name
					.toLowerCase()
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				description: undefined,
				required: def instanceof z.ZodOptional,
				isArray: false,
			} as FieldGroup);
		}
	}

	return {
		legend: fieldSetMetadata?.legend,
		description: fieldSetMetadata?.description,
		separator: fieldSetMetadata?.separator,
		groups,
	};
};
