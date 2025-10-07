import { Check } from 'lucide-react';
import React from 'react';
import { ZodString } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type StringCellProps = {
  validator?: ZodString;
  value: string;
  onSave?: (value: string) => Promise<unknown> | unknown;
  length?: number; /// number of characters to show. if exceed convert to tooltip
  editable?: boolean;
};

const StringCell = (props: StringCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<string>(props.value);

  return (
    <Field>
      {edit ? (
        <div className="flex gap-2.5">
          <Input
            onDoubleClick={() => {
              setEdit(false);
            }}
            onSubmit={() => {
              props.onSave?.(value);
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
                setValue(props.value);
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
          {value.length > (props.length || value.length) && (
            <TooltipContent>{value}</TooltipContent>
          )}
        </Tooltip>
      )}
    </Field>
  );
};

export default StringCell;
