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
  defaultOpen = false,
  onOpenChange,
  footer,
  onSave,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave: () => void;
  footer?: React.ReactNode;
}) => {
  return (
    <Dialog open={defaultOpen} onOpenChange={onOpenChange}>
      <DialogContent>
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
