import parsePhoneNumber, { type PhoneNumber } from 'libphonenumber-js';
import { Check, Phone } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type PhoneCellProps = {
  value?: string | null;
  onSave?: (value: string) => Promise<unknown> | unknown;
  editable?: boolean;
  format?: 'international' | 'national' | 'e164' | 'rfc3966';
  defaultCountry?: string;
};

const PhoneCell = (props: PhoneCellProps) => {
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(
    props.value || undefined,
  );
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || undefined);
    }
  }, [props.value]);

  const formatPhoneNumber = (phoneString: string): string => {
    if (!phoneString) return '';

    try {
      const phoneNumber = parsePhoneNumber(
        phoneString,
        props.defaultCountry as any,
      );

      if (!phoneNumber) return phoneString;

      switch (props.format || 'international') {
        case 'national':
          return phoneNumber.formatNational();
        case 'e164':
          return phoneNumber.format('E.164');
        case 'rfc3966':
          return phoneNumber.getURI();
        case 'international':
        default:
          return phoneNumber.formatInternational();
      }
    } catch (error) {
      return phoneString;
    }
  };

  const validatePhoneNumber = (phoneString: string): boolean => {
    if (!phoneString) return true; // Empty is valid

    try {
      const phoneNumber = parsePhoneNumber(
        phoneString,
        props.defaultCountry as any,
      );
      return phoneNumber ? phoneNumber.isValid() : false;
    } catch (error) {
      return false;
    }
  };

  const handleInputChange = (inputValue: string) => {
    setValue(inputValue);

    if (inputValue && !validatePhoneNumber(inputValue)) {
      setError('Invalid phone number');
    } else {
      setError(null);
    }
  };

  const handleSave = () => {
    if (error) return;

    if (props.onSave && value !== undefined) {
      props.onSave(value);
      setEdit(false);
    } else {
      setValue(props.value || undefined);
      setEdit(false);
    }
  };

  if (props.value !== undefined) {
    const formattedValue = formatPhoneNumber(value || '');

    return (
      <Field className={cn(edit && 'min-w-xs')}>
        {edit ? (
          <div className="flex gap-2.5">
            <div className="flex-1">
              <Input
                onDoubleClick={() => setEdit(false)}
                value={value || ''}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter phone number"
                className={cn(error && 'border-red-500')}
              />
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
            <Button onClick={handleSave} size={'icon'} disabled={!!error}>
              <Check />
            </Button>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <FieldLabel
                asChild
                onDoubleClick={() => {
                  if (props.editable) {
                    setEdit(true);
                  }
                }}
                className="cursor-pointer"
              >
                <Button variant={'link'} className="p-0">
                  <a
                    href={
                      parsePhoneNumber(
                        value || '',
                        props.defaultCountry as any,
                      )?.getURI() || `tel:${value || ''}`
                    }
                  >
                    {formattedValue}
                  </a>
                </Button>
              </FieldLabel>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>
                  <strong>Formatted:</strong> {formattedValue}
                </p>
                {props.format !== 'e164' && (
                  <p>
                    <strong>E.164:</strong>{' '}
                    {formatPhoneNumber(value || '').replace(/\s/g, '')}
                  </p>
                )}
                <p>
                  <strong>Click to call:</strong>{' '}
                  {parsePhoneNumber(
                    value || '',
                    props.defaultCountry as any,
                  )?.getURI()}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </Field>
    );
  } else {
    return <>-</>;
  }
};

export default PhoneCell;
