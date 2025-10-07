import { Check } from 'lucide-react';
import React from 'react';
import { ZodURL } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type UrlCellProps = {
  validator?: ZodURL;
  value?: string;
  onSave?: (value: string) => Promise<unknown> | unknown;
  length?: number; /// number of characters to show. if exceed convert to tooltip
  editable?: boolean;
};

const UrlCell = (props: UrlCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(props.value);

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
                  props.onSave(value!);
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
          <FieldLabel asChild>
            <Button
              variant={'link'}
              className="justify-start p-0"
              onDoubleClick={() => {
                if (props.editable) {
                  setEdit(true);
                }
              }}
            >
              {value}
            </Button>
          </FieldLabel>
        )}
      </Field>
    );
  } else {
    return <>-</>;
  }
};

export default UrlCell;
