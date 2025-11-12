/**
 * Form Schema Zod Validation
 * Zod schemas for validating form configurations
 */

import { z } from "zod";

/**
 * Zod schema for InputType
 * Maps input type names to their component props
 */
export const InputTypeSchema = z.record(z.string(), z.any());

/**
 * Zod schema for FieldType
 */
export const FieldTypeSchema = z.enum(["field", "fieldset"]);

/**
 * Zod schema for Orientation
 */
export const OrientationSchema = z.enum([
	"vertical",
	"horizontal",
	"responsive",
]);

/**
 * Zod schema for Separator
 */
export const SeparatorSchema = z.union([z.boolean(), z.string()]);

/**
 * Zod schema for FieldErrorObject
 */
export const FieldErrorObjectSchema = z.object({
	message: z.string(),
	code: z.string().optional(),
});

/**
 * Zod schema for FieldError
 */
export const FieldErrorSchema = z.union([
	z.string(),
	z.array(FieldErrorObjectSchema),
]);

/**
 * Zod schema for ArrayConfig
 */
export const ArrayConfigSchema = z.object({
	minItems: z.number().int().nonnegative().optional(),
	maxItems: z.number().int().positive().nullable().optional(),
	addLabel: z.string().optional(),
	removeLabel: z.string().optional(),
	defaultItem: z.function().optional(),
});

/**
 * Zod schema for BaseGroup properties
 */
export const BaseGroupSchema = z.object({
	id: z.string().regex(/^[a-z0-9_-]+$/, "Must be kebab-case or snake_case"),
	name: z
		.string()
		.regex(/^[a-z0-9_-]+$/)
		.optional(),
	label: z.string().optional(),
	description: z.string().optional(),
	required: z.boolean().optional().default(false),
	isArray: z.boolean().optional().default(false),
	error: FieldErrorSchema.optional(),
	props: z.record(z.string(), z.unknown()).optional(),
	separator: SeparatorSchema.optional(),
});

/**
 * Zod schema for FieldGroup
 */
export const FieldGroupSchema: z.ZodType<any> = z.lazy(() =>
	BaseGroupSchema.extend({
		type: z.literal("field"),
		inputType: z.record(z.string(), z.any()).optional(),
		orientation: OrientationSchema.optional(),
		validation: z.instanceof(z.ZodType).optional(),
		arrayConfig: ArrayConfigSchema.optional(),
		defaultValue: z.unknown().optional(),
	}),
);

/**
 * Zod schema for FieldsetGroup
 */
export const FieldsetGroupSchema: z.ZodType<any> = z.lazy(() =>
	BaseGroupSchema.extend({
		type: z.literal("fieldset"),
		groups: z.array(GroupSchema),
		maxDepth: z.number().int().positive().max(10).optional().default(5),
		arrayConfig: ArrayConfigSchema.optional(),
		defaultValue: z.record(z.string(), z.unknown()).optional(),
	}),
);

/**
 * Zod schema for Group (union of FieldGroup and FieldsetGroup)
 */
export const GroupSchema: z.ZodType<any> = z.lazy(() =>
	z.union([FieldGroupSchema, FieldsetGroupSchema]),
);

/**
 * Zod schema for FieldSet
 */
export const FieldSetSchema: z.ZodType<any> = z.lazy(() =>
	z.object({
		legend: z.string().optional(),
		description: z.string().optional(),
		groups: z.array(GroupSchema),
		separator: SeparatorSchema.optional(),
	}),
);

/**
 * Zod schema for FormConfig
 */
export const FormConfigSchema: z.ZodType<any> = z.lazy(() =>
	z.object({
		props: z.record(z.string(), z.unknown()).optional(),
		fieldsets: z.array(FieldSetSchema),
	}),
);

/**
 * Zod schema for FormSchema (root)
 */
export const FormSchemaSchema: z.ZodType<any> = z.lazy(() =>
	z.object({
		form: FormConfigSchema,
	}),
);

/**
 * Convenience validator functions
 */

/**
 * Validate an entire form schema
 */
export function validateFormSchema(data: unknown) {
	return FormSchemaSchema.safeParse(data);
}

/**
 * Validate a form config
 */
export function validateFormConfig(data: unknown) {
	return FormConfigSchema.safeParse(data);
}

/**
 * Validate a fieldset
 */
export function validateFieldSet(data: unknown) {
	return FieldSetSchema.safeParse(data);
}

/**
 * Validate a group (field or fieldset)
 */
export function validateGroup(data: unknown) {
	return GroupSchema.safeParse(data);
}

/**
 * Validate a field group
 */
export function validateFieldGroup(data: unknown) {
	return FieldGroupSchema.safeParse(data);
}

/**
 * Validate a fieldset group
 */
export function validateFieldsetGroup(data: unknown) {
	return FieldsetGroupSchema.safeParse(data);
}

/**
 * Type inference helpers using Zod's z.infer
 */
export type ValidatedInputType = z.infer<typeof InputTypeSchema>;
export type ValidatedFieldType = z.infer<typeof FieldTypeSchema>;
export type ValidatedOrientation = z.infer<typeof OrientationSchema>;
export type ValidatedSeparator = z.infer<typeof SeparatorSchema>;
export type ValidatedFieldError = z.infer<typeof FieldErrorSchema>;
export type ValidatedArrayConfig = z.infer<typeof ArrayConfigSchema>;
export type ValidatedFieldGroup = z.infer<typeof FieldGroupSchema>;
export type ValidatedFieldsetGroup = z.infer<typeof FieldsetGroupSchema>;
export type ValidatedGroup = z.infer<typeof GroupSchema>;
export type ValidatedFieldSet = z.infer<typeof FieldSetSchema>;
export type ValidatedFormConfig = z.infer<typeof FormConfigSchema>;
export type ValidatedFormSchema = z.infer<typeof FormSchemaSchema>;
