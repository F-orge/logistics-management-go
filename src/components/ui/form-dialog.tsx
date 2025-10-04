import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';

const FormDialog = ({
  children,
  title,
  description,
  defaultOpen = false,
  onOpenChange,
  footer,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  footer?: React.ReactNode;
}) => {
  return (
    <Dialog open={defaultOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          {title ?? <DialogTitle>{title}</DialogTitle>}
          {description ?? <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
      {footer ?? <DialogFooter>{footer}</DialogFooter>}
    </Dialog>
  );
};

export default FormDialog;
