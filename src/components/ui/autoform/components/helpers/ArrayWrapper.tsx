import { ArrayWrapperProps } from "@autoform/react";
import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
}) => {
  return (
    <FieldSet>
      <FieldLegend variant="label">{label}</FieldLegend>
      <FieldDescription>{field.description}</FieldDescription>
      <FieldGroup>
        {children}
        <Button onClick={onAddItem} variant="outline" size="sm" type="button">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </FieldGroup>
    </FieldSet>
  );
};
