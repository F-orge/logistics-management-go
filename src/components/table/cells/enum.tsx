import { Check, ChevronDown } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type EnumOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type EnumCellProps = {
  value?: string;
  onSave?: (value: string) => Promise<unknown> | unknown;
  editable?: boolean;
  options: EnumOption[];
  placeholder?: string;
  showIcon?: boolean;
};

const EnumCell = (props: EnumCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(props.value);

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || undefined);
    }
  }, [props.value]);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);

    if (props.onSave) {
      props.onSave(selectedValue);
    }
    setEdit(false);
  };

  const handleCancel = () => {
    setValue(props.value);
    setEdit(false);
  };

  const getCurrentLabel = () => {
    const option = props.options.find((opt) => opt.value === value);
    return option?.label || value || '';
  };

  if (props.value !== undefined) {
    const displayLabel = getCurrentLabel();

    return (
      <Field className={cn(edit && 'min-w-xs')}>
        {edit ? (
          <div className="flex gap-2.5">
            <Select value={value} onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={props.placeholder || 'Select an option'}
                />
              </SelectTrigger>
              <SelectContent>
                {props.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleCancel} variant="outline" size={'icon'}>
              ✕
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {props.showIcon && (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            )}
            <FieldLabel
              onDoubleClick={() => {
                if (props.editable) {
                  setEdit(true);
                }
              }}
              className="cursor-pointer"
            >
              {displayLabel}
            </FieldLabel>
          </div>
        )}
      </Field>
    );
  } else {
    return <>-</>;
  }
};

export default EnumCell;
