import { format, formatISO, isValid, parseISO } from 'date-fns';
import { Calendar, CalendarIcon, Check } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type DateCellProps = {
  value?: string | Date | null;
  onSave?: (value: string) => Promise<unknown> | unknown;
  editable?: boolean;
  format?: string;
  showTime?: boolean;
};

const DateCell = (props: DateCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Date | undefined>(() => {
    if (!props.value) return undefined;

    try {
      const date =
        typeof props.value === 'string' ? parseISO(props.value) : props.value;

      return isValid(date) ? date : undefined;
    } catch {
      return undefined;
    }
  });

  const formatDate = (dateValue: string | Date | undefined): string => {
    if (!dateValue) return '';

    try {
      const date =
        typeof dateValue === 'string' ? parseISO(dateValue) : dateValue;

      if (!isValid(date)) return '';

      const formatString = props.format || (props.showTime ? 'PPp' : 'PP');
      return format(date, formatString);
    } catch {
      return '';
    }
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    setValue(selectedDate);
    setOpen(false);

    if (props.onSave && selectedDate) {
      const isoString = formatISO(selectedDate, { representation: 'date' });
      props.onSave(isoString);
    }
    setEdit(false);
  };

  const handleCancel = () => {
    setValue(() => {
      if (!props.value) return undefined;

      try {
        const date =
          typeof props.value === 'string' ? parseISO(props.value) : props.value;

        return isValid(date) ? date : undefined;
      } catch {
        return undefined;
      }
    });
    setEdit(false);
    setOpen(false);
  };

  if (props.value) {
    const formattedValue = formatDate(props.value);

    return (
      <Field className={cn(edit && 'min-w-xs')}>
        {edit ? (
          <div className="flex gap-2.5">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? format(value, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={value}
                  onSelect={handleSelect}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleCancel} variant="outline" size={'icon'}>
              ✕
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <FieldLabel
              onDoubleClick={() => {
                if (props.editable) {
                  setEdit(true);
                }
              }}
              className="cursor-pointer"
            >
              {formattedValue}
            </FieldLabel>
          </div>
        )}
      </Field>
    );
  } else {
    return <>-</>;
  }
};

export default DateCell;
