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
    <div className="flex gap-2.5 items-center">
      <div className="w-full">{children}</div>
      <Button
        onClick={onRemove}
        className="mt-7.5"
        variant="outline"
        type="button"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};
