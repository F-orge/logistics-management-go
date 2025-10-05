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

function TextCell({
  value,
  className,
  dialogTitle,
  dialogDescription,
  inputLabel,
  inputDescription,
  onSubmit,
  truncateAfter = 20,
  ...props
}: {
  value: string;
  dialogTitle?: React.ReactNode;
  dialogDescription?: React.ReactNode;
  inputLabel?: React.ReactNode;
  inputDescription?: React.ReactNode;
  onSubmit?: (value: string) => Promise<unknown> | unknown;
  truncateAfter?: number;
} & React.ComponentProps<'div'>) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>(value);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        role="cell"
        className={cn(onSubmit && 'cursor-pointer', className)}
        aria-label={typeof value === 'string' ? value : undefined}
        onDoubleClick={() => setOpen(true)}
        {...props}
      >
        {truncateAfter && value.length > truncateAfter
          ? value.slice(0, truncateAfter) + '…'
          : value}
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
              onChange={(e) => setInputValue(e.target.value)}
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

export default TextCell;
