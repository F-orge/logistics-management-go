import { useFieldContext } from '@/components/form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const SelectField = ({
  className,
  label,
  multiple,
  options,
  placeholder,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: string;
  description?: string;
  multiple?: boolean;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}) => {
  const field = useFieldContext<string | string[]>();

  return (
    <Field className={className}>
      {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
      {multiple ? (
        <MultiSelect>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue placeholder={placeholder} />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              {options.map((option) => (
                <MultiSelectItem value={option.value}>
                  {option.icon && <option.icon />} {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      ) : (
        <Select
          onValueChange={field.handleChange}
          value={field.state.value as string}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem value={option.value}>
                {option.icon && <option.icon />} {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}
      {field.state.meta.errorMap.onSubmit && (
        <FieldError className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </FieldError>
      )}
    </Field>
  );
};
