import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { useFieldContext } from '@/components/form';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const DateField = ({
  className,
  label,
  ...props
}: React.ComponentProps<'input'> & {
  label?: string;
}) => {
  const field = useFieldContext<Date>();

  return (
    <div className={cn('grid gap-2.5', className)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!field.state.value}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          >
            <CalendarIcon />
            {field.state.value ? (
              format(field.state.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            required
            mode="single"
            selected={field.state.value}
            onSelect={field.handleChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
