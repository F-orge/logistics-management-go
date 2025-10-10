import { Check } from 'lucide-react';
import React, { useEffect } from 'react';
import { ZodString } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type StringCellProps = {
  validator?: ZodString;
  value?: string | null;
  onSave?: (value: string | undefined) => Promise<unknown> | unknown;
  length?: number; /// number of characters to show. if exceed convert to tooltip
  editable?: boolean;
};

const StringCell = (props: StringCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(
    props.value || undefined,
  );

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || undefined);
    }
  }, [props.value]);

  if (props.value !== undefined) {
    return (
      <Field className={cn(edit && 'min-w-xs')}>
        {edit ? (
          <div className="flex gap-2.5 ">
            <Input
              onDoubleClick={() => {
                setEdit(false);
              }}
              value={value}
              onChange={(e) =>
                setValue(
                  props.validator
                    ? props.validator.parse(e.target.value)
                    : e.target.value,
                )
              }
            />
            <Button
              onClick={() => {
                if (props.onSave) {
                  props.onSave(value);
                  setEdit(false);
                } else {
                  setValue(props.value || undefined);
                  setEdit(false);
                }
              }}
              size={'icon'}
            >
              <Check />
            </Button>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <FieldLabel
                onDoubleClick={() => {
                  if (props.editable) {
                    setEdit(true);
                  }
                }}
              >
                {value}
              </FieldLabel>
            </TooltipTrigger>
            {value && value.length > (props.length || value.length) && (
              <TooltipContent>{value}</TooltipContent>
            )}
          </Tooltip>
        )}
      </Field>
    );
  } else {
    return <>-</>;
  }
};

export default StringCell;
