import z from "zod";
import {
	FieldDescription,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "../field";
import { withForm } from "../forms";
import AutoField from "./auto-field";
import { FieldSet as FieldSetType } from "./types";

const AutoFieldSet = withForm({
	props: {} as FieldSetType<z.ZodObject>,
	render: ({ form, ...props }) => {
		return (
			<FieldSet>
				{props.legend && <FieldLegend>{props.legend}</FieldLegend>}
				{props.description && (
					<FieldDescription>{props.description}</FieldDescription>
				)}
				{props.groups.map((field) => {
					if (field.type === "field") {
						return (
							<AutoField
								// todo: fix any
								form={form as any}
								key={field.name}
								fieldGroupConfig={field}
							/>
						);
					} else if (field.type === "fieldset") {
						// Handle array fieldsets by delegating to AutoField
						if (field.isArray) {
							return (
								<AutoField
									key={field.name}
									form={form as any}
									fieldSetGroup={field}
								/>
							);
						}

						// Handle regular nested fieldsets
						return (
							<>
								{field.separator && typeof field.separator === "string" ? (
									<FieldSeparator>{field.separator}</FieldSeparator>
								) : (
									<FieldSeparator />
								)}
								<AutoFieldSet
									key={field.name}
									// todo: fix any
									form={form as any}
									{...field}
								/>
							</>
						);
					}
					return null;
				})}
			</FieldSet>
		);
	},
});

export default AutoFieldSet;
