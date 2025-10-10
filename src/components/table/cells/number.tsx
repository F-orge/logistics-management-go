import { Check } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type NumberCellProps = {
  value: number | undefined | null;
  onSave?: (value: number | undefined | null) => Promise<unknown> | unknown;
  editable?: boolean;
  currency?: string;
};

const NumberCell = (props: NumberCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<number | undefined | null>(
    props.value,
  );

  return (
    <Field className={cn(edit && 'min-w-xs')}>
      {edit ? (
        <div className="flex gap-2.5">
          <Input
            onDoubleClick={() => setEdit(false)}
            value={value || undefined}
            onChange={(e) => setValue(Number(e.target.value))}
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
        <FieldLabel
          onDoubleClick={() => {
            if (props.editable) {
              setEdit(true);
            }
          }}
        >
          {props.currency && value
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: props.currency,
              }).format(value)
            : value}
        </FieldLabel>
      )}
    </Field>
  );
};

export default NumberCell;
