import React from 'react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export type NumberCellProps = {
  value: number;
  onSave?: (value: number) => Promise<unknown> | unknown;
  length?: number; /// number of characters to show. if exceed convert to tooltip
};

const NumberCell = (props: NumberCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<number>(props.value);

  return (
    <Field>
      {edit ? (
        <Input
          onSubmit={() => {
            props.onSave?.(value);
            setEdit(false);
          }}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      ) : (
        <FieldLabel onDoubleClick={() => setEdit(true)}>{value}</FieldLabel>
      )}
    </Field>
  );
};

export default NumberCell;
