import {
	type AutoFormUIComponents,
	AutoForm as BaseAutoForm,
} from "@autoform/react";
import { ZodProvider } from "@autoform/zod";
import type { ZodObject, z } from "zod";
import { ArrayElementWrapper } from "./components/ArrayElementWrapper";
import { ArrayWrapper } from "./components/ArrayWrapper";
import { BooleanField } from "./components/BooleanField";
import { DateField } from "./components/DateField";
import { ErrorMessage } from "./components/ErrorMessage";
import { FieldWrapper } from "./components/FieldWrapper";
import { Form } from "./components/Form";
import { NumberField } from "./components/NumberField";
import { ObjectWrapper } from "./components/ObjectWrapper";
import { SelectField } from "./components/SelectField";
import { StringField } from "./components/StringField";
import { SubmitButton } from "./components/SubmitButton";

const ShadcnUIComponents: AutoFormUIComponents = {
	Form,
	FieldWrapper,
	ErrorMessage,
	SubmitButton,
	ObjectWrapper,
	ArrayWrapper,
	ArrayElementWrapper,
};

export const ShadcnAutoFormFieldComponents = {
	string: StringField,
	number: NumberField,
	boolean: BooleanField,
	date: DateField,
	select: SelectField,
} as const;
export type FieldTypes = keyof typeof ShadcnAutoFormFieldComponents;

export function AutoForm<T extends ZodObject>(
	props: Omit<
		Parameters<typeof BaseAutoForm>[0],
		| "schema"
		| "onSubmit"
		| "defaultValues"
		| "values"
		| "uiComponents"
		| "formComponents"
	> & {
		schema: T;
		onSubmit?: (value: z.infer<T>) => Promise<unknown> | unknown;
		defaultValues?: z.infer<T>;
		values?: z.infer<T>;
	},
) {
	return (
		<BaseAutoForm
			{...props}
			schema={new ZodProvider(props.schema)}
			onSubmit={
				props.onSubmit as unknown as Parameters<
					typeof BaseAutoForm
				>[0]["onSubmit"]
			}
			values={props.values}
			defaultValues={props.defaultValues}
			uiComponents={{ ...ShadcnUIComponents }}
			formComponents={{ ...ShadcnAutoFormFieldComponents }}
		/>
	);
}
