import { ArrayElementWrapperProps } from "@autoform/react";
import { TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <Field className="relative border border-input rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors">
      <Button
        onClick={onRemove}
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2"
        type="button"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
      <div className="space-y-4">{children}</div>
    </Field>
  );
};
