import { Trash } from "lucide-react";
import React from "react";
import { Button } from "../../button";
import { FieldGroup, FieldSet } from "../../field";

export interface NestedFieldsetWrapperProps {
  index: number;
  errors?: any[];
  onRemove: () => void;
  children: React.ReactNode;
}

/**
 * Wrapper for nested fieldset array items
 * Renders array of fields in semantic fieldset structure
 * Uses shadcn FieldSet/FieldGroup components for proper nesting
 */
export const NestedFieldsetWrapper: React.FC<NestedFieldsetWrapperProps> = ({
  index,
  errors,
  onRemove,
  children,
}) => (
  <FieldSet className="border rounded-md p-4">
    <FieldGroup>{children}</FieldGroup>
    <div className="flex justify-end pt-2">
      <Button
        type="button"
        variant="destructive"
        size="icon-sm"
        onClick={onRemove}
      >
        <Trash />
      </Button>
    </div>
  </FieldSet>
);
