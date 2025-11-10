import { AutoFormFieldProps } from "@autoform/react";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { FileFieldProps } from "./types";

interface FileFieldComponentProps extends AutoFormFieldProps {
  fieldConfig?: FileFieldProps;
}

const FileField: React.FC<FileFieldComponentProps> = ({
  id,
  inputProps,
  fieldConfig,
}) => {
  const { key, ...props } = inputProps;
  const {
    uploadText = "Click to select a file",
    uploadHint = "or drag and drop",
    iconSize = "size-6",
    accept,
    showImagePreview = true,
    previewSize = "size-16",
    description = "Image preview",
  } = fieldConfig || {};

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      // Create preview for images
      if (showImagePreview && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }

    props.onChange(e);
  };

  const handleClear = () => {
    setPreview(null);
    setFileName("");
    if (inputProps.onChange) {
      const event = new Event("change", { bubbles: true });
      const input = document.getElementById(id) as HTMLInputElement;
      if (input) {
        input.value = "";
        input.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          id={id}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
          {...props}
        />
        <div className="pointer-events-none rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-6 text-center transition-colors hover:border-muted-foreground/50 hover:bg-muted/75">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <svg
                className={`${iconSize} text-primary`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-foreground">
                {fileName || uploadText}
              </p>
              <p className="text-sm text-muted-foreground">{uploadHint}</p>
            </div>
          </div>
        </div>
      </div>

      {(preview || fileName) && (
        <ItemGroup className="gap-2">
          {preview && (
            <Item variant="outline">
              <ItemMedia variant="image">
                <img
                  src={preview}
                  alt={fileName}
                  className={`aspect-square ${previewSize} rounded-md object-cover`}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">{fileName}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleClear}
                  aria-label="Remove file"
                >
                  <X className="size-4" />
                </Button>
              </ItemActions>
            </Item>
          )}

          {!preview && fileName && (
            <Item variant="outline">
              <ItemMedia variant="icon">
                <svg
                  className="size-4 text-muted-foreground"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7H4m0 0L4 4m0 0l1 3h10l1-3m0 0H4m11 4v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5m14 0H3" />
                </svg>
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">{fileName}</ItemTitle>
                <ItemDescription>File selected</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleClear}
                  aria-label="Remove file"
                >
                  <X className="size-4" />
                </Button>
              </ItemActions>
            </Item>
          )}
        </ItemGroup>
      )}
    </div>
  );
};

export default FileField;
