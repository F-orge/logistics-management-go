import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function NumberCell({
  value,
  className,
  dialogTitle,
  dialogDescription,
  inputLabel,
  inputDescription,
  onSubmit,
  decimalPlace = 2,
  ...props
}: {
  value: number;
  dialogTitle?: React.ReactNode;
  dialogDescription?: React.ReactNode;
  inputLabel?: React.ReactNode;
  inputDescription?: React.ReactNode;
  onSubmit?: (value: number) => Promise<unknown> | unknown;
  decimalPlace?: number;
} & React.ComponentProps<'div'>) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<number>(value);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        role="cell"
        className={cn('cursor-pointer', className)}
        aria-label={typeof value === 'string' ? value : undefined}
        onDoubleClick={() => setOpen(true)}
        {...props}
      >
        {Number(value).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: decimalPlace,
        })}
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <FieldGroup>
            <FieldLabel htmlFor="">{inputLabel}</FieldLabel>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
            />
          </FieldGroup>
        </FieldSet>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => onSubmit?.(inputValue ?? '')}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NumberCell;
