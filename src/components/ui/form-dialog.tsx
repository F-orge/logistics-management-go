import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { Button } from './button';

const FormDialog = ({
  children,
  title,
  description,
  open = false,
  onOpenChange,
  footer,
  onSave,
  className,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  open?: boolean;
  className?: string;
  onOpenChange?: (open: boolean) => void;
  onSave: () => void;
  footer?: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle hidden={!!!title}>{title}</DialogTitle>
          <DialogDescription hidden={!!!description}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        {footer ?? (
          <DialogFooter>
            {footer}
            <DialogClose asChild>
              <Button onClick={onSave}>Save</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
