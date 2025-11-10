import React from "react";
import { FieldGroup } from "@/components/ui/field";

export const Form = React.forwardRef<
  HTMLFormElement,
  React.ComponentProps<"form">
>(({ children, ...props }, ref) => {
  return (
    <form ref={ref} {...props}>
      <FieldGroup>{children}</FieldGroup>
    </form>
  );
});
