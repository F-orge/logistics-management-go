import { AutoFormFieldProps } from "@autoform/react";
import { useRouteContext } from "@tanstack/react-router";
import type { RecordListOptions } from "pocketbase";
import React, { useCallback } from "react";
import type { Collections, TypedPocketBase } from "@/lib/pb.types";
import { AsyncSelect } from "../../../async-select";

export interface RelationItem {
  id: string;
  [key: string]: unknown;
}

export type RelationFieldProps<Records extends RelationItem = RelationItem> = {
  collectionName: Collections;
  displayField?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  renderOption?: (item: Records) => React.ReactNode;
  recordListOption?: RecordListOptions;
  required?: boolean;
};

const RelationField: React.FC<AutoFormFieldProps> = (props) => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { value, field, inputProps } = props;

  const [selectedValue, setSelectedValue] = React.useState<string | null>(
    inputProps.value || null
  );

  const config = field.fieldConfig?.customData as RelationFieldProps;

  // Fetcher function to query related records
  const fetcher = useCallback(
    async (query?: string): Promise<any[]> => {
      try {
        let filter = "";
        if (query) {
          filter = `${config.displayField} ~ "${query}"`;
        }

        const records = await (pocketbase as TypedPocketBase)
          .collection(config.collectionName)
          .getList(1, 50, {
            ...{
              filter: filter || undefined,
              sort: `-updated`,
            },
            ...config.recordListOption,
          });
        return records.items as unknown as any[];
      } catch (error) {
        console.error("Failed to fetch relation records:", error);
        return [];
      }
    },
    [pocketbase, field]
  );

  return (
    <>
      {selectedValue && (
        <input {...inputProps} type="hidden" value={selectedValue || ""} />
      )}
      <AsyncSelect<any>
        fetcher={fetcher}
        renderOption={(item) =>
          config.renderOption
            ? config.renderOption(item)
            : String(item[config.displayField || "id"])
        }
        getOptionValue={(item) => item.id}
        getDisplayValue={(item) =>
          config.renderOption
            ? config.renderOption(item)
            : String(item[config.displayField || "id"])
        }
        label={field.fieldConfig?.customData?.collectionName || "Select"}
        placeholder={config.placeholder || "Search..."}
        value={selectedValue || ""}
        onChange={(val) => setSelectedValue(val)}
        notFound={
          <div className="py-6 text-center text-sm">No records found</div>
        }
        clearable={true}
      />
    </>
  );
};

export default RelationField;
