"use client";

import type React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "../../input-group";
import { useFieldContext } from "..";
import { CharCountAddon } from "../utils/input-group-patterns";

export type TextareaFieldProps = {
  // InputGroup addon support
  showCharCount?: boolean;
  inputGroupClassName?: string;
  // Composition fallback
  addonStart?: React.ReactNode;
  addonEnd?: React.ReactNode;
} & Omit<
  React.ComponentProps<"textarea">,
  keyof {
    showCharCount: any;
    inputGroupClassName: any;
    addonStart: any;
    addonEnd: any;
    tooltip: any;
    tooltipSide: any;
  }
>;

const TextareaField = (props: TextareaFieldProps) => {
  const field = useFieldContext<string>();

  const {
    showCharCount = false,
    inputGroupClassName,
    addonStart,
    addonEnd,
    maxLength,
    ...textareaProps
  } = props;

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const currentLength = field.state.value?.length ?? 0;

  return (
    <InputGroup className={inputGroupClassName}>
      {/* Start addon */}
      {addonStart && (
        <InputGroupAddon data-align="block-start">{addonStart}</InputGroupAddon>
      )}

      {/* Textarea */}
      <InputGroupTextarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        maxLength={maxLength}
        {...textareaProps}
      />

      {/* End addon - character count and custom addons */}
      {(showCharCount || addonEnd) && (
        <InputGroupAddon align="block-end">
          {addonEnd}
          {showCharCount && (
            <CharCountAddon current={currentLength} max={maxLength} />
          )}
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default TextareaField;
