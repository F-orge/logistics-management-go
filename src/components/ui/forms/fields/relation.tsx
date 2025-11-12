import { useRouteContext } from "@tanstack/react-router";
import { ClientResponseError, type RecordListOptions } from "pocketbase";
import type React from "react";
import { useCallback } from "react";
import { Collections } from "@/lib/pb.types";
import { AsyncSelect } from "../../async-select";
import { useFieldContext } from "..";

export interface RelationItem {
  id: string;
  [key: string]: unknown;
}

export type RelationFieldProps<Records extends RelationItem> = {
  relationshipName: string;
  collectionName: Collections;
  displayField?: string;
  preload?: boolean;
  placeholder?: string;
  renderOption?: (item: Records) => React.ReactNode;
  recordListOption?: RecordListOptions;
  required?: boolean;
};

const RelationField = <Records extends RelationItem>(
  props: RelationFieldProps<Records>
) => {
  const field = useFieldContext<string>();
  const {
    collectionName,
    relationshipName,
    displayField = "name",
    preload = false,
    placeholder = "Search...",
  } = props;

  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  // Fetcher function to query related records
  const fetcher = useCallback(
    async (query?: string): Promise<Records[]> => {
      try {
        let filter = "";
        if (query && displayField) {
          filter = `${displayField} ~ "${query}"`;
        }

        const records = await pocketbase
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
        if (error instanceof ClientResponseError) {
          if (!error.message.includes("The request was autocancelled.")) {
            console.error("PocketBase ClientResponseError:", error.message);
          }
        }
        return [];
      }
    },
    [pocketbase, collectionName, displayField, props.recordListOption]
  );

  return (
    <AsyncSelect<Records>
      fetcher={fetcher}
      preload={preload}
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
      label={relationshipName}
      placeholder={placeholder}
      value={field.state.value ?? ""}
      onChange={field.handleChange}
      notFound={
        <div className="py-6 text-center text-sm">No records found</div>
      }
      clearable={true}
    />
  );
};

export default RelationField;
