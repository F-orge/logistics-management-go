import {
	FormAsyncValidateOrFn,
	FormOptions,
	FormValidateOrFn,
	formOptions,
} from "@tanstack/react-form";
import React from "react";
import z from "zod";
import { Button } from "../button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../dialog";
import { FieldSeparator } from "../field";
import { useAppForm } from "../forms";
import AutoFieldSet from "./auto-fieldset";
import { toAutoFormFieldSet } from "./types";

export type AutoFormProps<TSchema extends z.ZodSchema, TSubmitMeta = never> = {
	formOptions: FormOptions<
		z.infer<TSchema>,
		FormValidateOrFn<z.infer<TSchema>> | undefined,
		FormValidateOrFn<z.infer<TSchema>> | undefined,
		FormAsyncValidateOrFn<z.infer<TSchema>> | undefined,
		FormValidateOrFn<z.infer<TSchema>> | undefined,
		FormAsyncValidateOrFn<z.infer<TSchema>> | undefined,
		FormValidateOrFn<z.infer<TSchema>> | undefined,
		FormAsyncValidateOrFn<z.infer<TSchema>> | undefined,
		FormValidateOrFn<z.infer<TSchema>> | undefined,
		FormAsyncValidateOrFn<z.infer<TSchema>> | undefined,
		FormAsyncValidateOrFn<z.infer<TSchema>> | undefined,
		TSubmitMeta
	>;
	title: string;
	description?: string;
} & React.ComponentProps<typeof Dialog> & {
		children?: (form: ReturnType<typeof useAppForm>) => React.ReactNode;
	};

const AutoForm = <TSchema extends z.ZodSchema, TSubmitMeta = never>(
	props: AutoFormProps<TSchema, TSubmitMeta>,
) => {
	const { formOptions, title, description, ...dialogProps } = props;

	const form = useAppForm(formOptions);

	return (
		<Dialog {...dialogProps}>
			<DialogContent className="max-h-3/4 overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<FieldSeparator />
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<form.AppForm>
						<AutoFieldSet
							form={form as any}
							{...toAutoFormFieldSet(formOptions.validators?.onChange as any)}
						/>
						{props.children?.(form)}
					</form.AppForm>
					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AutoForm;
