import { Button } from "@/components/ui/button";
import * as FileUpload from "@/components/ui/file-upload";
import { X } from "lucide-react";
import React from "react";
import { useFieldContext } from "..";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export type FileFieldProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
};

const FileField = (props: FileFieldProps) => {
  const field = useFieldContext<File[]>();

  return (
    <Field>
      <FieldContent>
        <FieldLabel>{props.label}</FieldLabel>
        <FileUpload.Root
          name={field.name}
          value={field.state.value}
          onValueChange={field.handleChange}
        >
          <FileUpload.Dropzone />
          <FileUpload.Trigger />
          <FileUpload.List>
            {field.state.value.map((file, index) => (
              <FileUpload.Item key={index} value={file} className="flex-col">
                <div className="flex w-full items-center gap-2">
                  <FileUpload.ItemPreview />
                  <FileUpload.ItemMetadata />
                  <FileUpload.ItemDelete asChild>
                    <Button variant="ghost" size="icon" className="size-7">
                      <X />
                    </Button>
                  </FileUpload.ItemDelete>
                </div>
                <FileUpload.ItemProgress />
              </FileUpload.Item>
            ))}
          </FileUpload.List>
          <FileUpload.Clear />
        </FileUpload.Root>
        <FieldDescription>{props.description}</FieldDescription>
        <FieldError errors={field.state.meta.errors} />
      </FieldContent>
    </Field>
  );
};

export default FileField;
