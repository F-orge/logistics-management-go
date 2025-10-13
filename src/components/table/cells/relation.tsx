import { Check, CheckIcon, ChevronsUpDownIcon, Edit } from 'lucide-react';
import React, { useEffect } from 'react';
import { ZodString } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export type RelationOption = {
  value: string;
  label: string;
  searchValue: string;
  disabled?: boolean;
};

export type RelationCellProps = {
  validator?: ZodString;
  value?: string | null; // id
  onSave?: (value: string | undefined) => Promise<unknown> | unknown;
  editable?: boolean;
  children?: React.ReactNode;
  options: RelationOption[];
  onSearch?: (search: string) => Promise<unknown> | unknown;
};

const RelationCell = (props: RelationCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(
    props.value || undefined,
  );

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || undefined);
    }
  }, [props.value]);

  if (props.value !== undefined) {
    return (
      <Field className={cn(edit && 'min-w-xs')}>
        {edit ? (
          <div className="flex gap-2.5">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-3/4 justify-between"
                >
                  {value &&
                    props.options.find((option) => option.value === value)
                      ?.label}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Record" />
                  <CommandList>
                    <CommandEmpty>No record found.</CommandEmpty>
                    <CommandGroup>
                      {props.options.map((option) => (
                        <CommandItem
                          keywords={[option.label]}
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue,
                            );
                            setOpen(false);
                            props.onSave?.(value);
                            setEdit(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === option.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              onClick={() => setEdit(false)}
              variant="outline"
              size={'icon'}
            >
              ✕
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              onDoubleClick={() => {
                if (props.editable) {
                  setEdit(true);
                }
              }}
              variant={'outline'}
              size={'icon-sm'}
            >
              <Edit className=" text-muted-foreground" />
            </Button>
            <FieldContent>{props.children}</FieldContent>
          </div>
        )}
      </Field>
    );
  } else {
    return <>-</>;
  }
};

export default RelationCell;
