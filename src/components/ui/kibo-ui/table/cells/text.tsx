import React from 'react';
import { cn } from '@/lib/utils';

function TextCell({
  value,
  className,
  ...props
}: { value: string | null } & React.ComponentProps<'div'>) {
  return (
    <div
      role="cell"
      className={cn(props.onDoubleClick ? 'cursor-pointer' : '', className)}
      aria-label={typeof value === 'string' ? value : undefined}
      {...props}
    >
      {value ?? 'Not Available'}
    </div>
  );
}

export default TextCell;
