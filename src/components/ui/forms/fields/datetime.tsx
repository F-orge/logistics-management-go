"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Calendar } from "../../calendar";
import { Field, FieldDescription, FieldError } from "../../field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../input-group";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { useFieldContext } from "..";
import { TooltipFieldLabel } from "../utils/tooltip-field-label";

export type DateTimeFieldProps = {
  showTime?: boolean;
  timeStep?: number;
  inputGroupClassName?: string;
  showCalendarIcon?: boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const DateTimeField = (props: DateTimeFieldProps) => {
  const {
    showTime = false,
    timeStep = 15,
    inputGroupClassName,
    showCalendarIcon = true,
  } = props;
  const field = useFieldContext<Date>();
  const [open, setOpen] = React.useState(false);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      if (showTime) {
        const newDate = new Date(date);
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
        field.handleChange(newDate);
      } else {
        field.handleChange(new Date(date));
      }
      setOpen(false);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;

    const [hours, minutes] = value.split(":").map(Number);
    const newDate = new Date(field.state.value);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    field.handleChange(newDate);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Date Picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <InputGroup className={inputGroupClassName}>
          <PopoverTrigger asChild>
            <InputGroupButton
              disabled={props.disabled}
              variant="outline"
              data-empty={!field.state.value}
              className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal flex-1"
              onBlur={field.handleBlur}
              aria-invalid={isInvalid}
              type="button"
            >
              {showCalendarIcon && <CalendarIcon className="mr-2 size-4" />}
              {field.state.value
                ? format(field.state.value, showTime ? "PPP p" : "PPP")
                : "Pick a date"}
            </InputGroupButton>
          </PopoverTrigger>
          {!showTime && (
            <InputGroupAddon align="inline-end">
              <CalendarIcon className="size-4 text-muted-foreground" />
            </InputGroupAddon>
          )}
        </InputGroup>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(field.state.value)}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>

      {/* Time Picker */}
      {showTime && (
        <InputGroup className={inputGroupClassName}>
          <InputGroupInput
            type="time"
            value={
              field.state.value
                ? new Date(field.state.value)
                    .toLocaleTimeString()
                    .substring(0, 5)
                : ""
            }
            onChange={handleTimeChange}
            onBlur={field.handleBlur}
            step={timeStep}
            aria-invalid={isInvalid}
          />
          <InputGroupAddon align="inline-end">
            <span className="text-xs text-muted-foreground">
              12-hour format
            </span>
          </InputGroupAddon>
        </InputGroup>
      )}
    </div>
  );
};

export default DateTimeField;
