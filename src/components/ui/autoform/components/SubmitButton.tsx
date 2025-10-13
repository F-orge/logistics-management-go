import React from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/form';

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
};
