import type { RecordListOptions } from "pocketbase";
import type React from "react";
import { useCallback } from "react";
import type { Collections, TypedPocketBase } from "@/lib/pb.types";
import { usePocketBaseClient } from "@/pocketbase";
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

const RelationField = <Records extends RelationItem = RelationItem>(
  props: RelationFieldProps<Records>
) => {
  const pocketbase = usePocketBaseClient();
  const {
    collectionName,
    displayField = "name",
    placeholder = "Search...",
    value = "",
  } = props;

  // Fetcher function to query related records
  const fetcher = useCallback(
    async (query?: string): Promise<Records[]> => {
      try {
        let filter = "";
        if (query) {
          filter = `${displayField} ~ "${query}"`;
        }

        const records = await (pocketbase as TypedPocketBase)
          .collection(collectionName)
          .getList(1, 50, {
            ...{
              filter: filter || undefined,
              sort: `-updated`,
            },
            ...props.recordListOption,
          });

        return records.items as unknown as Records[];
      } catch (error) {
        console.error("Failed to fetch relation records:", error);
        return [];
      }
    },
    [pocketbase, collectionName, displayField, props.recordListOption]
  );

  return (
    <AsyncSelect<Records>
      fetcher={fetcher}
      renderOption={(item) =>
        props.renderOption
          ? props.renderOption(item)
          : String(item[displayField])
      }
      getOptionValue={(item) => item.id}
      getDisplayValue={(item) =>
        props.renderOption
          ? props.renderOption(item)
          : String(item[displayField])
      }
      label={collectionName}
      placeholder={placeholder}
      value={value}
      onChange={(val) => props.onChange?.(val)}
      notFound={
        <div className="py-6 text-center text-sm">No records found</div>
      }
      clearable={true}
    />
  );
};

export default RelationField;
