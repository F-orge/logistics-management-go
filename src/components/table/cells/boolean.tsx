import { Check, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export type BooleanCellProps = {
  value?: boolean | null;
  onSave?: (value: boolean) => Promise<unknown> | unknown;
  editable?: boolean;
};

const BooleanCell = (props: BooleanCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<boolean | undefined>(
    props.value || undefined,
  );

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || undefined);
    }
  }, [props.value]);

  const handleSave = (newValue: boolean) => {
    if (props.onSave) {
      props.onSave(newValue);
    }
    setValue(newValue);
    setEdit(false);
  };

  if (value !== undefined && value !== null) {
    return (
      <Field className={cn(edit && 'min-w-xs')}>
        {edit ? (
          <div className="flex items-center gap-2.5">
            <Switch checked={value} onCheckedChange={handleSave} />
          </div>
        ) : (
          <div
            onDoubleClick={() => {
              if (props.editable) {
                setEdit(true);
              }
            }}
          >
            {value ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <X className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </Field>
    );
  } else {
    return <>-</>;
  }
};

export default BooleanCell;
