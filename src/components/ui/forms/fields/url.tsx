"use client";

import { Link } from "lucide-react";
import type React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../input-group";
import { useFieldContext } from "..";
import {
  ClearButtonAddon,
  TextAddon,
  ValidationAddon,
} from "../utils/input-group-patterns";

export type URLFieldProps = {
  // InputGroup addon support
  textAddonStart?: string;
  textAddonEnd?: string;
  iconAddonEnd?: React.ReactNode;
  showClearButton?: boolean;
  showValidationIcon?: boolean;
  inputGroupClassName?: string;
  // Composition fallback
  addonStart?: React.ReactNode;
  addonEnd?: React.ReactNode;
} & Omit<
  React.ComponentProps<"input">,
  keyof {
    textAddonStart: any;
    textAddonEnd: any;
    iconAddonEnd: any;
    showClearButton: any;
    showValidationIcon: any;
    inputGroupClassName: any;
    addonStart: any;
    addonEnd: any;
    tooltip: any;
    tooltipSide: any;
  }
>;

const URLField = (props: URLFieldProps) => {
  const field = useFieldContext<string>();

  const {
    textAddonStart = "https://",
    textAddonEnd,
    iconAddonEnd,
    showClearButton = false,
    showValidationIcon = true, // Default to true for URL validation feedback
    inputGroupClassName,
    addonStart,
    addonEnd = <Link />,
    ...inputProps
  } = props;

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleClear = () => {
    field.handleChange("");
  };

  return (
    <InputGroup className={inputGroupClassName}>
      {/* Start addons */}
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      {/* Input */}
      <InputGroupInput
        id={field.name}
        name={field.name}
        type="url"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...inputProps}
      />
      {/* End addons */}
      {addonEnd && (
        <InputGroupAddon align="inline-end">{addonEnd}</InputGroupAddon>
      )}
      {showClearButton && field.state.value && (
        <InputGroupAddon align="inline-end">
          <ClearButtonAddon onClick={handleClear} />
        </InputGroupAddon>
      )}
      {textAddonEnd && (
        <InputGroupAddon align="inline-end">
          <TextAddon text={textAddonEnd} />
        </InputGroupAddon>
      )}
      {iconAddonEnd && (
        <InputGroupAddon align="inline-end">{iconAddonEnd}</InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default URLField;
