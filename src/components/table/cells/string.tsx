import React from 'react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type StringCellProps = {
  value: string;
  onSave?: (value: string) => Promise<unknown> | unknown;
  length?: number; /// number of characters to show. if exceed convert to tooltip
};

const StringCell = (props: StringCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<string>(props.value);

  return (
    <Field>
      <Tooltip>
        <TooltipTrigger asChild>
          <FieldLabel onDoubleClick={() => setEdit(true)}>{value}</FieldLabel>
        </TooltipTrigger>
        {value.length > (props.length || 0) && (
          <TooltipContent>{value}</TooltipContent>
        )}
      </Tooltip>
      {edit && (
        <Input
          onSubmit={() => {
            props.onSave?.(value);
            setEdit(false);
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </Field>
  );
};

export default StringCell;
