"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Button } from "../../button";
import { Calendar } from "../../calendar";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";
import { Input } from "../../input";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { useFieldContext } from "..";

export type DateTimeFieldProps = {
	label?: React.ReactNode;
	description?: React.ReactNode;
	showTime?: boolean;
	timeStep?: number;
};

const DateTimeField = (props: DateTimeFieldProps) => {
	const { showTime = true, timeStep = 15 } = props;
	const field = useFieldContext<Date>();
	const [open, setOpen] = React.useState(false);

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const dateValue = field.state.value;
	const dateFormatted = dateValue
		? format(dateValue, showTime ? "PPP HH:mm" : "PPP")
		: "Pick a date";

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			// Preserve time if it exists
			if (dateValue instanceof Date && showTime) {
				const newDate = new Date(date);
				newDate.setHours(dateValue.getHours());
				newDate.setMinutes(dateValue.getMinutes());
				field.handleChange(newDate);
			} else {
				field.handleChange(date);
			}
			setOpen(false);
		}
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const [hours, minutes] = e.target.value.split(":").map(Number);
		if (dateValue instanceof Date) {
			const newDate = new Date(dateValue);
			newDate.setHours(hours);
			newDate.setMinutes(minutes);
			field.handleChange(newDate);
		}
	};

	const timeValue = dateValue
		? `${String(dateValue.getHours()).padStart(2, "0")}:${String(
				dateValue.getMinutes(),
			).padStart(2, "0")}`
		: "00:00";

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel>{props.label}</FieldLabel>
			<div className={`flex gap-2 ${showTime ? "flex-col sm:flex-row" : ""}`}>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							data-empty={!dateValue}
							className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal flex-1"
							onBlur={field.handleBlur}
							aria-invalid={isInvalid}
						>
							<CalendarIcon className="mr-2 size-4" />
							{dateFormatted}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={dateValue}
							onSelect={handleDateSelect}
						/>
					</PopoverContent>
				</Popover>

				{showTime && (
					<Input
						type="time"
						value={timeValue}
						onChange={handleTimeChange}
						onBlur={field.handleBlur}
						step={timeStep}
						className="flex-1"
						aria-invalid={isInvalid}
					/>
				)}
			</div>
			<FieldDescription>{props.description}</FieldDescription>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};

export default DateTimeField;
